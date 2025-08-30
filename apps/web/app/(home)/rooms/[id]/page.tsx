import Toolbar from "../../../component/toolbar";
import { CanvasSheet } from "@/app/component/canvas";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import ErrorPage from "@/app/component/error";
import { ShareButton } from "../../../component/sharebutton";

// import
interface Props {
  params: { id: string };
}

export default async function RoomPage({ params }: Props) {
  
  const roomId = params.id

  //now get the userid from session see it membership & roomId
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.redirect("/api/signin");
  const userId = session.user.id;
  console.log(userId)
  const seeformembership = await prisma.membership.findFirst({
    where: { userId: userId, roomId: roomId },
  });

  
  if (!seeformembership) {
      const errorMessage = "You are not a member of this room."; 
      return <ErrorPage error={errorMessage} />;
  }
  //frontend--------------------------------------
  return (
    <div className="w-svw h-svh">
      <ShareButton params={roomId}/>
      <Toolbar />
      <CanvasSheet params={roomId} />
    </div>
  );
}
