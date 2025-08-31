import { ToolType } from '@/app/Types/tooltype';
import {create} from 'zustand';
import { Color } from '@/app/Types/tooltype';
interface ToolState {
  shape: ToolType;
  setShape: (shape: ToolType) => void;
}


export const useShapeStore = create<ToolState>((set) => ({
  shape: "rectangle", // default
  setShape: (shape) => set({ shape }),
}));

interface FillStroke {
  strokecolor: Color;
  setstrokecolor: (strokecolor:Color)=> void
}

export const useStrokeColor = create<FillStroke>((set)=>({
  strokecolor: Color.Black,
  setstrokecolor: (strokecolor)=>set({strokecolor})
}))


interface FillBg {
  bgcolor: Color;
  setbgcolor: (becolor:Color)=> void
}

export const useBGFill = create<FillBg>((set)=>({
  bgcolor: Color.Transparent,
  setbgcolor: (bgcolor: Color)=> set({bgcolor})
}))