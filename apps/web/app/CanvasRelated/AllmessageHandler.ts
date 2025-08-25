import { DrawingHandler, DrawingMessageHandler } from "./Allcanvas";
import { ToolType } from "../Types/tooltype";
import { ChatType } from "../Types/tooltype";

export function AllmessageHandler(msg:string,canvas?:HTMLCanvasElement){
    console.log("message came to AllmessageHandler:", msg);
    //Parse message to JSON--------
    
    const message_recieved:{userId:string, roomId: string, type: ChatType, content:string} = JSON.parse(msg);
    if(message_recieved.type=== ChatType.TEXT){
        return message_recieved.content
    }
    else if(message_recieved.type === ChatType.DRAWING){
        let parsedDrawingMessage:{ shape:ToolType, myMouseX:number, myMouseY:number, endX:number, endY:number,isclicked:boolean } = JSON.parse(message_recieved.content)  
        DrawingMessageHandler(parsedDrawingMessage.shape,parsedDrawingMessage.myMouseX,parsedDrawingMessage.myMouseY,parsedDrawingMessage.endX, parsedDrawingMessage.endY,parsedDrawingMessage.isclicked);
        
        return(message_recieved.content);
    }
}

// AllmessageHandler: {"shape":"rectangle","myMouseX":56.84999084472656,"myMouseY":487,"endX":119.84999084472656,"endY":283}