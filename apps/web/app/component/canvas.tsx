"use client";
import { useEffect, useRef, useState } from "react";
import {
  CanvastoDraw,
  drawAgainPreviousShape,
} from "@/app/CanvasRelated/Allcanvas";

import { AllmessageHandler } from "@/app/CanvasRelated/AllmessageHandler";
import { useServerSocket } from "@/hooks/useserver";

export function CanvasSheet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, connect, disconnect,loading } = useServerSocket();

  //My code is Like building block, you'll find function as building block with lines like ---------------------------------------------------------------
  //My code is Like building block, you'll find function as building block with lines like ---------------------------------------------------------------
  //My code is Like building block, you'll find function as building block with lines like --------------------------------------------------------------- 


// Helps in canvas Dimension as per canvas not as per browser-----------------
useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

// Resize + Scroll effect, won't affect you Drawinngs -----------------------------------
  useEffect(() => {
    const handleResizeOrScroll = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      console.log("handleresize called---------");
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawAgainPreviousShape();
    };

    handleResizeOrScroll(); // run once
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, []);

//Helps in websocket connection( ) --------------------------
useEffect(() => {
  connect();
}, [connect]);


//(Runs two time) as connection takes time and at first loading = false, connection done loading = true ------------------------------
useEffect(() => {
  if (loading || !canvasRef.current || !socket.current) return;
  const cleanup = CanvastoDraw(canvasRef.current, socket.current);

  return () => {
    cleanup?.();
    disconnect();
  };
}, [loading, socket.current, disconnect]);

//Helps in Message to other user in room-----------------------------
  useEffect(() => {
    if (!socket.current) return;
    const onMessage = (msg: string) => {
      const content = AllmessageHandler(msg);
    };
    socket.current.on("message", onMessage);
    return () => {
      if (socket.current) socket.current.off("message", onMessage);
      disconnect(); 
    };
  }, []);

  return (
    <div className="bg-gray-400 w-[100%] h-[100%]">
      
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid white",
          backgroundColor: "white",
          width: "100%", // CSS-driven
          height: "100%", // CSS-driven
        }}
      />
    </div>
  );
}
