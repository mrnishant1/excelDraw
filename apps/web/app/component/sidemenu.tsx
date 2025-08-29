import Link from "next/link";
import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { MdMeetingRoom } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { TbAccessPoint } from "react-icons/tb";
import { RiGroup2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
export default function Sidemenu({visiblety}:{visiblety:ReactNode}) {
  return (
    <>
    <div className={`${visiblety?"visible":"hidden"} font-cursive text-2xl items-center fixed top-[12%] left-[12%] h-[70%] w-[15%] transform -translate-x-1/2 bg-[#d2e3e6] shadow-2xl rounded-lg p-3 flex flex-col`}>
        <div className="w-full h-full p-2 border-gray-500 border-2 rounded-md">
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/rooms"    >   {<CgProfile/>} Profile</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/rooms"    >   {<MdMeetingRoom/>} Rooms</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/api/signin">  {<CiLogin/>} Login</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/create-join"> {<TbAccessPoint/>} Create Room</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/create-join"> {<RiGroup2Line/>} Join Room</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/api/auth/signout"> {<IoMdLogOut/>} Logout</Link>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-700 h-[1px] w-full my-4 dark:bg-default-border-color-dark"></div>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 " href="https://github.com/mrnishant1/excelDraw">  Github</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 " href="https://www.linkedin.com/in/nishant-kumar-692477226/">  Linkedin</Link>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-700 h-[1px] w-full my-4 dark:bg-default-border-color-dark"></div>
        </div>
    </div>
    </>
  );
}
