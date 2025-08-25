import { Socket } from "socket.io-client";
import rough from "roughjs";
import { useShapeStore } from "@/hooks/useShape";
import { ToolType } from "../Types/tooltype";
import { RoughCanvas } from "roughjs/bin/canvas";
import { ChatType } from "../Types/tooltype";
// import { serverSocket } from "@/hooks/serverSocket";

let allExistingShapes: CurrentShape[] = [];
let shape: ToolType;
let isclicked = false;
let myMouseX: number | null = null;
let myMouseY: number | null = null;
let endX: number | null = null;
let endY: number | null = null;
let rcs: RoughCanvas;
let ctx: CanvasRenderingContext2D | null;
let globalsocket: Socket | null;

interface CurrentShape {
  shape: ToolType;
  myMouseX: number;
  myMouseY: number;
  endX: number;
  endY: number;
}

export function CanvastoDraw(
  canvas: HTMLCanvasElement,
  socketstore: Socket | null
) {
  console.log("socket.current++: ", socketstore);
  rcs = rough.canvas(canvas);
  ctx = canvas.getContext("2d");
  globalsocket = socketstore;

  const rect = canvas.getBoundingClientRect();

  if (!ctx) return;
  // ✅ define handlers with stable references
  const handleMouseDown = (e: MouseEvent) => mousedown(e);
  const handleMouseUp = (e: MouseEvent) => mouseup(e, socketstore);
  const handleMouseMove = (e: MouseEvent) => {
    shape = useShapeStore.getState().shape; // read fresh value
    mousemove(e, shape, rcs, rect, socketstore);
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

const mousemove = (
  e: MouseEvent,
  shape: ToolType,

  rcs: RoughCanvas,
  rect: DOMRect,
  socketstore?: Socket | null
) => {
  if (!isclicked || myMouseX == null || myMouseY == null) return;

  endX = e.clientX - rect.left; // current X relative to canvas
  endY = e.clientY - rect.top; // current Y relative to canvas

  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // ✅ prevent spam
  drawAgainPreviousShape();
  DrawingHandler(shape, myMouseX, myMouseY, endX, endY);

  let localshape = { shape, myMouseX, myMouseY, endX, endY, isclicked };
  convertAndSend("a", ChatType.DRAWING, JSON.stringify(localshape));
};

const mouseup = (e: MouseEvent, socketstore?: Socket | null) => {
  isclicked = false;

  if (myMouseX == null || myMouseY == null) return;

  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  endX = e.clientX - rect.left;
  endY = e.clientY - rect.top;
  let localshape = { shape, myMouseX, myMouseY, endX, endY };

  if (shape != "grab") {
    allExistingShapes.push(localshape);
  } else {
    allExistingShapes.forEach((shape) => {
      if (endX && endY && myMouseX && myMouseY) {
        shape.myMouseX += viewOffsetX;
        shape.myMouseY += viewOffsetY;
        shape.endX += viewOffsetX;
        shape.endY += viewOffsetY;
      }
    });
  }

  convertAndSend("a", ChatType.DRAWING, JSON.stringify(localshape));
};

export function drawAgainPreviousShape() {
  allExistingShapes.forEach((shape) => {
    DrawingHandler(
      shape.shape,
      shape.myMouseX,
      shape.myMouseY,
      shape.endX,
      shape.endY
      // rcs
    );
  });
}

export function DrawingHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number
  // rcs: RoughCanvas
) {
  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }

  switch (shape) {
    case "rectangle":
      rcs.rectangle(myMouseX, myMouseY, endX - myMouseX, endY - myMouseY);
      break;
    case "circle":
      rcs.circle(
        myMouseX,
        myMouseY,
        Math.abs(endY - myMouseY) + Math.abs(endX - myMouseX)
      );
      break;
    case "ellipse":
      rcs.ellipse(
        myMouseX,
        myMouseY,
        Math.abs(endX - myMouseX),
        Math.abs(endY - myMouseY)
      );
      break;
    case "line":
      rcs.line(myMouseX, myMouseY, endX, endY);
      break;
    case "pencil":
      rcs.circle(endX, endY, 0.1);
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

function Grab(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
  viewOffsetX = dx;
  viewOffsetY = dy;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.save();
  ctx.translate(viewOffsetX, viewOffsetY);
  allExistingShapes.forEach((shape) => {
    DrawingHandler(
      shape.shape,
      shape.myMouseX,
      shape.myMouseY,
      shape.endX,
      shape.endY
      // rcs
    );
  });
  ctx.restore();
}

function convertAndSend(
  userId: string | null,
  type: ChatType,
  content: string | null
) {
  if (globalsocket && content !== null) {
    let convertedMessage = {
      userId: userId ?? "",
      roomId: "",
      type: type,
      content: content,
    };
    globalsocket.send(JSON.stringify(convertedMessage));
  }
}

export function DrawingMessageHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number,
  isclicked: boolean
) {
  if (!ctx) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawAgainPreviousShape();
  DrawingHandler(shape, myMouseX, myMouseY, endX, endY);
  if (!isclicked) {
    if (shape != "grab") {
      allExistingShapes.push({shape, myMouseX, myMouseY, endX, endY});
    } else {
      allExistingShapes.forEach((shape) => {
        if (endX && endY && myMouseX && myMouseY) {
          shape.myMouseX += viewOffsetX;
          shape.myMouseY += viewOffsetY;
          shape.endX += viewOffsetX;
          shape.endY += viewOffsetY;
        }
      });
    }
  }
}
