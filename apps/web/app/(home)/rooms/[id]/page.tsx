import Toolbar from "../../../component/toolbar";
import { CanvasSheet } from "@/app/component/canvas";
import { authOptions } from "@/lib/authOption";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import ErrorPage from "@/app/component/error";
import { ShareButton } from "../../../component/sharebutton";
import { FaSave } from "react-icons/fa";

// import

export default async function RoomPage( {params}: {params: Promise<{ id: string }>}) {
  
  const {id}  = await params;
 

  //now get the userid from session see it membership & roomId
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.redirect("/api/signin");
  const userId = session.user.id;
  console.log(userId)
  const seeformembership = await prisma.membership.findFirst({
    where: { userId: userId, roomId: id },
  });

  
  if (!seeformembership) {
      const errorMessage = "You are not a member of this room."; 
      return <ErrorPage error={errorMessage} />;
  }
  //frontend--------------------------------------CanvasSheet for Canvas----------> calls canvastoDraw that handes all drawing related matter
  //------------------------------------ share button-----------> to share live collaboration
  //----------------------toolbar for tools
  return (
    <div className="w-svw h-svh">
      {/* <div className="fixed top-4 right-[10%] transform -translate-x-1/2 bg-[#d2e3e6]  rounded-lg p-5 flex hover:shadow-md active:scale-95 z-50"  >   {<FaSave/>} </div> */}
      <ShareButton params={id}/>
      <Toolbar />
      <CanvasSheet params={id} />
    </div>
  );
}
