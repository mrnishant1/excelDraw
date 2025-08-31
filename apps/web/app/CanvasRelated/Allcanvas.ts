import { Socket } from "socket.io-client";
import rough from "roughjs";
import { useShapeStore } from "@/hooks/useShape";
import { ToolType } from "../Types/tooltype";
import { RoughCanvas } from "roughjs/bin/canvas";
import { ChatType } from "../Types/tooltype";

// import { serverSocket } from "@/hooks/serverSocket";
import { CurrentShape, Shape, PencilShape, Cords } from "../Types/tooltype";

let allExistingShapes: Shape[] = [];

let shape: ToolType;
let isclicked = false;
let myMouseX: number | null = null;
let myMouseY: number | null = null;
let rcs: RoughCanvas;
let ctx: CanvasRenderingContext2D | null;
let globalsocket: Socket | null;
let LocalRoomId: string;
let Localfill: string = "red";
let Localstroke: string = "";
let LocalstrokeWidth: number = 1;
let pencilPath: Cords[] = [];

function isPencil(s: Shape): s is PencilShape {
  return s.shape === "pencil";
}

export function CanvastoDraw(
  canvas: HTMLCanvasElement,
  roomId?: string,
  socketstore?: Socket | null
) {
  console.log("socket.current++: ", socketstore);

  if (roomId) {
    LocalRoomId = roomId;
    console.log("good RoomId here in Allcanvas");
  }

  rcs = rough.canvas(canvas);
  ctx = canvas.getContext("2d");

  if (!socketstore) {
    console.log("socket and globalsocket isn't here");
    globalsocket = null;
  } else {
    globalsocket = socketstore;
  }

  const rect = canvas.getBoundingClientRect();

  if (!ctx) return;

  // ✅ define handlers with stable references
  const handleMouseDown = (e: MouseEvent) => mousedown(e);
  const handleMouseUp = (e: MouseEvent) => mouseup(e, ctx);
  const handleMouseMove = (e: MouseEvent) => {
    // Gets the shape value {GLOBAL ZUSTAND STATE VARIABLE}.................................................
    shape = useShapeStore.getState().shape;
    mousemove(e, shape, rcs, rect);
  };

  // ✅ attach listeners
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  // ✅ return cleanup function
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}

const mousedown = (e: MouseEvent) => {
  isclicked = true;

  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  myMouseX = e.clientX - rect.left;
  myMouseY = e.clientY - rect.top;
};
//Check-------calls Drawinghandler to draw
const mousemove = (
  e: MouseEvent,
  shape: ToolType,

  rcs: RoughCanvas,
  rect: DOMRect
) => {
  if (!isclicked || myMouseX == null || myMouseY == null) return;

  let movingX = e.clientX - rect.left; // current X relative to canvas
  let movingY = e.clientY - rect.top; // current Y relative to canvas

  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }
  // ctx.beginPath();

  if (shape === "pencil") {
    DrawingHandler(
      shape,
      0,
      0,
      movingX,
      movingY,
      Localfill,
      Localstroke,
      LocalstrokeWidth
    );
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // ✅ prevent spam
    DrawingHandler(
      shape,
      myMouseX,
      myMouseY,
      movingX,
      movingY,
      Localfill,
      Localstroke,
      LocalstrokeWidth
    );
    drawAgainPreviousShape(ctx);
  }

  let localshape = { shape, myMouseX, myMouseY, movingX, movingY, isclicked };
  //UserId neeed to put here instead of hardcode one---------------------------------------------------------------------?????????????????????????ERORRRRRRRRRRRRRRRRRRRRRRRRRR
  convertAndSend(
    "a",
    LocalRoomId,
    ChatType.DRAWING,
    JSON.stringify(localshape)
  );
};
//check>-------shapes push or shape dislocate on grab
const mouseup = (e: MouseEvent, ctx: CanvasRenderingContext2D | null) => {
  isclicked = false;
  if (myMouseX == null || myMouseY == null) return;
  if (!ctx) {
    console.log("no ctx here");
    return;
  }
  ctx.beginPath(); //this resets the last cordinates to start with new one where clicked

  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  let endX = e.clientX - rect.left;
  let endY = e.clientY - rect.top;
  let movingX = endX;
  let movingY = endY;
  let localshape = { shape, myMouseX, myMouseY, movingX, movingY, isclicked };
  finalizeShape(shape, myMouseX, myMouseY, endX, endY); //Also resets pencilPath

  //this need to be changes userId is hardcoded for now-----------
  convertAndSend(
    "a",
    LocalRoomId,
    ChatType.DRAWING,
    JSON.stringify(localshape)
  );
};

// check----- Draws all Previous Shapes
export function drawAgainPreviousShape(ctx:CanvasRenderingContext2D) {
  allExistingShapes.forEach((s) => {
    if (s.shape === "pencil") {
      console.log("Previous pencil called ");
      ctx.beginPath();
      s.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    } else {
      DrawingHandler(
        s.shape,
        s.myMouseX,
        s.myMouseY,
        s.endX,
        s.endY,
        s.Localfill,
        s.Localstroke,
        s.LocalstrokeWidth
        // rcs
      );
    }
  });
}
// check----- Draws Shapes
export function DrawingHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number,
  fill?: string,
  stroke?: string,
  strokeWidth?: number | 1

  // rcs: RoughCanvas
) {
  console.log("DrawingHandler called:", shape, myMouseX, myMouseY, endX, endY);

  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }
  switch (shape) {
    case "rectangle":
      rcs.rectangle(myMouseX, myMouseY, endX - myMouseX, endY - myMouseY, {
        fill: Localfill,
        stroke: Localstroke,
        strokeWidth: strokeWidth,
      });

      break;
    case "circle":
      rcs.circle(
        myMouseX,
        myMouseY,
        Math.abs(endY - myMouseY) + Math.abs(endX - myMouseX),
        { fill: Localfill, stroke: Localstroke, strokeWidth: strokeWidth }
      );
      break;
    case "ellipse":
      rcs.ellipse(
        myMouseX,
        myMouseY,
        Math.abs(endX - myMouseX),
        Math.abs(endY - myMouseY),
        { fill: Localfill, stroke: Localstroke, strokeWidth: strokeWidth }
      );
      break;
    case "line":
      rcs.line(myMouseX, myMouseY, endX, endY, {
        fill: Localfill,
        stroke: Localstroke,
        strokeWidth: strokeWidth,
      });
      break;

    case "pencil":
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.beginPath(); // reset path to current point
      ctx.moveTo(endX, endY);

      pencilPath.push({ x: endX, y: endY });

      console.log("pencil");
      break;
    case "select":
      console.log("select mode");
      break;
    case "grab":
      if (!ctx) {
        console.log("no contxt");
        return;
      }
      Grab(ctx, endX - myMouseX, endY - myMouseY);
      break;
    default:
      console.log("no shape matched");
  }
}

let viewOffsetX = 0;
let viewOffsetY = 0;
//check----------Grabs Canvas
function Grab(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
  viewOffsetX = dx;
  viewOffsetY = dy;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.translate(viewOffsetX, viewOffsetY);
  //Redraw each shapes as on every GRAB call Canvas cleared----------------
  drawAgainPreviousShape(ctx);
  ctx.restore();
}

function convertAndSend(
  userId: string | null,
  roomId: string,
  type: ChatType,
  content: string | null
) {
  if (globalsocket && content !== null) {
    let convertedMessage = {
      userId: userId ?? "",
      roomId: roomId,
      type: type,
      content: content,
    };

    //Message send to Backend Socket
    // console.log("message sent from Allcanvas.ts")
    globalsocket.emit("sendMessage", {
      roomId,
      message: JSON.stringify(convertedMessage),
    });
  }
}

// let messagePencil:Cords[] =[];
export function DrawingMessageHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  MessageendX: number,
  MessageendY: number,
  isclicked: boolean
) {
  if (!ctx) {
    console.log("No CTX in drawingMessageHandler");
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawAgainPreviousShape(ctx);

  // draw the live one

  if (shape === "pencil") {
    DrawingHandler("pencil", 0, 0, MessageendX, MessageendY);
    pencilPath.push({ x: MessageendX, y: MessageendY });
  } else {
    DrawingHandler(shape, myMouseX, myMouseY, MessageendX, MessageendY);
  }

  if (!isclicked) {
    finalizeShape(shape, myMouseX, myMouseY, MessageendX, MessageendY);
  }
}

//CHECK--------Just Push shapes as json in allExistingShapes or On Grab changes cords---------------
function finalizeShape(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number
) {
  if (shape === "pencil") {
    allExistingShapes.push({
      shape: "pencil",
      points: [...pencilPath],
      Localfill: Localfill,
      Localstroke: Localstroke,
      LocalstrokeWidth: LocalstrokeWidth,
    } as PencilShape);

    pencilPath = [];
  } else if (shape !== "grab") {
    allExistingShapes.push({
      shape,
      myMouseX,
      myMouseY,
      endX,
      endY,
      Localfill: Localfill,
      Localstroke: Localstroke,
      LocalstrokeWidth: LocalstrokeWidth,
    } as CurrentShape);
  } else {
    allExistingShapes.forEach((s) => {
      if (isPencil(s)) {
        s.points.forEach((p) => {
          p.x += viewOffsetX;
          p.y += viewOffsetY;
        });
      } else {
        s.myMouseX += viewOffsetX;
        s.myMouseY += viewOffsetY;
        s.endX += viewOffsetX;
        s.endY += viewOffsetY;
      }
    });
  }
}
