"use client";
import React from "react";

interface RoomCardProps {
  image: string;
  title: string;
  description: string;
  roomid: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  title,
  description,
  roomid,
}) => (
  <div
    onClick={() => opentheroom(roomid)}
    className="room-card group cursor-pointer flex items-center gap-4 p-4 w-full 
               bg-white rounded-xl border border-gray-200 shadow-sm 
               hover:shadow-md hover:border-gray-300 transition-all duration-200"
  >
    {/* Profile Picture */}
    <div className="relative h-14 w-14 flex-shrink-0">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover rounded-full border border-gray-200"
      />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 truncate mt-1">
        {description}
      </p>
    </div>

    {/* CTA / Status */}
    <div className="flex-shrink-0 text-sm font-medium text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity">
      Join →
    </div>
  </div>
);

function opentheroom(roomid: string) {
  // first check if the person is authorized
  // check roomid and personid in membership[] db 
  // if authorized, connect to websocket & render messages
}

export default RoomCard;
