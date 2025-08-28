import RoomCard from "@/components/ui/roomcard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function Leftside() {
  console.log("Left side -----------------------------------------");
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session));
  const userId = session?.user.id;

  if (!userId) return <div className="text-center text-red-500 p-6">⚠️ No session found</div>;

  const response = await prisma.rooms.findMany({
    where: { memberships: { some: { userId: userId } } },
  });
  console.log(response);

  if (!response || response.length === 0) {
    return <div className="text-center text-gray-500 p-6">You haven’t joined any rooms yet 🚪</div>;
  }

  return (
    <div className="p-6 self-center ">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Your Joined Rooms
      </h1>

      {/* Room Grid */}
      <div className="flex flex-col gap-1">
        {response.map((room, index) => (
          <RoomCard
            key={index}
            roomid={room.roomcode}
            image="/face.png"
            description={`Created by: ${room.createdBy} • ID: ${room.id}`}
            title={room.roomcode}
          />
        ))}
      </div>
    </div>
  );
}
