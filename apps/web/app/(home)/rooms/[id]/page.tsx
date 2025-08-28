import Toolbar from "../../../component/toolbar";
import { CanvasSheet } from "@/app/component/canvas";
import { TextChat } from "@/app/component/TextChat";
import { Leftside } from "../Leftpage";

// import
interface Props {
  params: { id: string };
}

export default function RoomPage({ params }: Props) {
  //frontend--------------------------------------
  return (
    <div className="w-svw h-svh">
    
      <Toolbar />
      <CanvasSheet />
    </div>
  );
}
