"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//-----------------------API endpoints------------------
async function creatroom(
  roomCode: string,
  userId: string,
  isPrivate: boolean,
  password?: string
) {
  try {
    
    if (!roomCode.trim() || !userId.trim()) {
      throw new Error("Provide correct credentials");
    }
    if (isPrivate && !password) {
      throw new Error("Password is required for private rooms.");
    }

    const res = await axios.post("/api/create-room", {
      roomCode,
      userId,
      isPrivate,
      password,
    });

    console.log("Room created:", res.data);
    alert(res.data);
    return res.data;
  } catch (error) {
    alert(error);
  }
}
async function joinRoom(roomcode: string, userId: string, password?: string) {
  console.log("frontend hit----------------" + roomcode, userId);
  try {
    if (!roomcode.trim() || !userId.trim()) {
      throw new Error("Provide correct credentials");
    }

    const res = await axios.post("/api/join-room", {
      roomcode,
      userId,
      password,
    });

    console.log("Joined room:", res.data);
    alert(JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    alert(error);
  }
}

//------------------------Components----------------------------------
export default function CreateRoom() {
  const [roomcode, setroomcode] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [userId, setuserId] = useState<string>("");
  const [create, setcreate] = useState(true);
  const [publicroom, setprivacy] = useState(true);

  const handlesubmit = async () => {
    if (create) {
      creatroom(roomcode, userId, !publicroom, password);
    } else {
      joinRoom(roomcode, userId, password);
    }
  };


  // //get userId intead of getting from user
  // useEffect(() => {
  //   async function call(){
  //     const session = await getServerSession(authOptions);
  //     if(!session) return;
  //     setuserId(session.user.id);
  //     console.log(session.user.id)
    
  //   };
  //   call();
    
  // }, []);

  return (
    <>
      <div className="min-h-screen m-0 p-0 flex items-center justify-center bg-gradient-to-tr from-[#838fa1] via-[#9bc8e4] to-[#579aa9]">
        <div className="w-[30%] h-[100%] m-0 p-[1%] bg-none border-2 border-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => setcreate((prev) => !prev)}
            />
            {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div> */}
            <span>{create ? "Join" : "Create"}</span>
          </label>

          <h2 className="text-2xl font-hand mb-6 text-center border-b-2 border-gray-800 pb-2">
            {create ? "Create New Room" : "Join Room"}
          </h2>

          <div className="space-y-4">
            {/* roomname */}
            <div>
              <label className="block font-hand text-lg mb-1">Room Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a unique room name..."
                value={roomcode}
                onChange={(e) => {
                  (setroomcode(e.target.value), console.log(roomcode));
                }}
                required
              />
            </div>
            {/* Uid */}
            <div>
              <label className="block font-hand text-lg mb-1">User ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user ID..."
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                required
              />
            </div>
            {/* privacy */}
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setprivacy((prev) => !prev)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span>{publicroom ? "Private it" : "Public it"}</span>
            </label>
            {/* Password */}
            <div
              className={`${publicroom ? "hidden" : "visible"} transition-transform`}
            >
              <label className="block font-hand text-lg mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-hand text-lg rounded-md border-2 border-gray-800 hover:bg-blue-600 transform active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => handlesubmit()}
            >
              {create ? "Create" : "Join"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
