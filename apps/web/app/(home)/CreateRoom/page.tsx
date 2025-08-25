"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

interface localRooms {
  name: string;
  password?: string;
  userId: string;
}
export const localRooms: localRooms[] = [];

export default function CreateRoom() {
  const [name, setname] = useState<string >("");
  const [password, setpassword] = useState<string >("");
  const [userId, setuserId] = useState<string>("");
  const Router = useRouter();
  function roomcreateHandler() {
    if (!name.trim() || !password.trim() || !userId.trim()) {alert("provide correct credential");return} 
    
      let room = { name, password, userId };
      localRooms.push(room);
      console.log(localRooms);
      

      Router.push('/rooms/234')
      setname("");
      setpassword("");
      setuserId("")
    
  }

  return (
    <>
      <div className="min-h-screen m-0 p-0 flex items-center justify-center bg-gradient-to-tr from-[#838fa1] via-[#9bc8e4] to-[#579aa9]">
        <div className="w-[30%] h-[100%] m-0 p-[1%] bg-none border-2 border-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h2 className="text-2xl font-hand mb-6 text-center border-b-2 border-gray-800 pb-2">
            Create New Room
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-hand text-lg mb-1">Room Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room name..."
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-hand text-lg mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-hand text-lg mb-1">User ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user ID..."
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
              />
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-hand text-lg rounded-md border-2 border-gray-800 hover:bg-blue-600 transform active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => roomcreateHandler()}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
