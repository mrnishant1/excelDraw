import { ReactNode } from "react";
import { Leftside } from "./Leftpage";

export default function Layout({children}: {
  children:ReactNode
}) {
  return (
    <div className="flex flex-row">
        <Leftside/>
        {children}
    </div>
  );
}

