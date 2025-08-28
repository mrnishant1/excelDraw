import Toolbar from "../component/toolbar";
import { CanvasSheet } from "../component/canvas";
export default function draw() {
  return (
    <div className="w-svw h-svh">
      <Toolbar />
      <CanvasSheet />
    </div>
  );
}
