export type ToolType = "grab"|"rectangle" | "circle" | "ellipse" | "line" | "pencil" | "select";

export interface Shape_in_Message{
    shape:ToolType;
    myMouseX: number;
    myMouseY: number;
    width: number;
    height: number;
    endX: number|null;
    endY: number|null;
}

export enum ChatType {
  TEXT = "Text",
  DRAWING = "Drawing",
  IMAGE = "Image",
  FILE="File",
}