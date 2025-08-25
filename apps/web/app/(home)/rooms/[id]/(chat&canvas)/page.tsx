import Toolbar from "../../../../component/toolbar";
import { CanvasSheet } from "@/app/component/canvas";
import { TextChat } from "@/app/component/TextChat";

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
        {/* <TextChat params={{ id: params.id }} /> */}
      {/* <div className="absolute top-[10%] right-[2%]">
      </div> */}
    </div>
  );
}
