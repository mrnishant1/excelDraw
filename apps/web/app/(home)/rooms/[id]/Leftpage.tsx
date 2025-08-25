import RoomCard from "@/components/ui/roomcard"
export function Leftside(){
    
    return (<>
        <div className="w-80 h-screen bg-gray-500 border-r border-gray-300 flex flex-col py-4 gap-2.5">
        <div className="h-[100px] w-full  content-center ">F2code</div>
            <RoomCard roomid='' image='/face.png' title="first rooom" description="this id room" />
            <RoomCard roomid='' image='/face.png' title="first rooom" description="this id room" />
            <RoomCard roomid='' image='/face.png' title="first rooom" description="this id room" />
            <RoomCard roomid='' image='/face.png' title="first rooom" description="this id room" />
            <RoomCard roomid='' image='/face.png' title="first rooom" description="this id room" />
        </div>
    </>)
    
}
