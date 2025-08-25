"use client"
import React from 'react';

interface RoomCardProps {
    image: string;
    title: string;
    description: string;
    roomid: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ image, title, description,  roomid }) => (
    <div onClick={()=>opentheroom(roomid)} className="room-card h-16 flex flex-row justify-evenly border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-xs bg-white">
        <img
            src={image}
            alt={title}
            className="h-full object-cover"
         
        />
        <div className="p-4 flex flex-col ">
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="m-0 text-gray-500 text-base">{description}</p>
        </div>
    </div>

);

function opentheroom(roomid:string){
    //first check the persoon is authorise to do so 
    //check roomid and personid in membership[] db 
    // if so, connect to websocket and render old message and new ones as well render it on right page
}

export default RoomCard;
