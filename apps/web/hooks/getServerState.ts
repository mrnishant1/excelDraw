import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface ServerState {
  socketstore: Socket | null;
  setsocketstore: (socket: Socket | null) => void;
}

export const getServerState = create<ServerState>((set) => ({
  socketstore: null,
  setsocketstore: (socketstore: Socket | null) => set({ socketstore }),
}));
