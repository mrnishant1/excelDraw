"use client"
import { ToolType } from "@/app/Types/tooltype";
import { useShapeStore } from "@/hooks/useShape";


export default function Toolbar() {

    const {shape,setShape} = useShapeStore();
  
  return (
    
    <div className="flex flex-row absolute top-0 left-[50%] gap-6">
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("grab"), console.log(shape)}}>grab</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("rectangle"), console.log(shape)}}>rectangle</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("circle"), console.log(shape)}}>circle</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("ellipse"), console.log(shape)}}>elipse</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("line"), console.log(shape)}}>line</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("pencil"), console.log(shape)}}>pencil</button>
      <button className="bg-blue-400 rounded-md hover:cursor-grab" onClick={() => { setShape("select"), console.log(shape)}}>select</button>

    </div>
  );
}


