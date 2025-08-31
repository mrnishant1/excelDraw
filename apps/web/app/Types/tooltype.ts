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


export interface CurrentShape extends cssProps {
  shape: "grab" | "rectangle" | "circle" | "ellipse" | "line" | "select";
  myMouseX: number;
  myMouseY: number;
  endX: number;
  endY: number;
}

export interface PencilShape extends cssProps{
  shape: "pencil";
  points: Cords[];
}

interface cssProps{
Localfill: string|'';
Localstroke: string|'';
LocalstrokeWidth: number|1;
}

export type Shape = CurrentShape | PencilShape;

export interface Cords {
  x: number;
  y: number;
}