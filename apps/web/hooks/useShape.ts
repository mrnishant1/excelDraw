import { ToolType } from '@/app/Types/tooltype';
import {create} from 'zustand';

interface ToolState {
  shape: ToolType;
  setShape: (shape: ToolType) => void;
}


export const useShapeStore = create<ToolState>((set) => ({
  shape: "rectangle", // default
  setShape: (shape) => set({ shape }),
}));