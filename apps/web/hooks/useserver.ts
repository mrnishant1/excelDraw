import { io, Socket } from "socket.io-client";
import { useRef, useState, useCallback } from "react";

export function useServerSocket(): {
  socket: React.MutableRefObject<Socket | null>;
  connect: () => void;
  disconnect: () => void;
  loading: boolean;
} {
  const socketRef = useRef<Socket | null>(null);
  const [loading, setLoading] = useState(true);

  const connect = useCallback(() => {
    if (!socketRef.current) {
      setLoading(true);
      const s = io("http://localhost:4000");
      socketRef.current = s;

      s.on("connect", () => {
        console.log("Frontend connected ✅");
        setLoading(false);
      });

      s.on("disconnect", () => {
        console.log("Frontend disconnected ❌");
        setLoading(true);
      });
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setLoading(true);
    }
  }, []);

  return { socket: socketRef, connect, disconnect, loading };
}
