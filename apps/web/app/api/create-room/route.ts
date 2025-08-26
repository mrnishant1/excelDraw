import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { roomcode, userId, isPrivate, password } = await req.json();


  console.log(roomcode, userId, isPrivate, password);
  if (!roomcode || !userId) throw new Error("roomcode or userID were missing");
  const existingRoom = await prisma.rooms.findUnique({
    where: { roomcode: roomcode },
  });
  console.log("room is ---------" + existingRoom);
  if (existingRoom) {
    return NextResponse.json({ error: "roomcode Not unique" }, { status: 409 });
  } else {
    if (!isPrivate || (isPrivate && !!password)) {
      const room = await prisma.rooms.create({
        data: {
          roomcode: roomcode,
          createdBy: userId,
          isPrivate,
          password,
          memberships: {
            create: {
              userId: userId,
              role: Role.ADMIN,
            },
          },
        },
        include: {
          memberships: true,
        },
      });

      return NextResponse.json({ success: true, room });
    }
  }
}
