// "use client";
// import { useState, useEffect } from "react";
// import { useServerSocket } from "@/hooks/useserver";
// import { AllmessageHandler } from "@/app/CanvasRelated/AllmessageHandler";
// import { ChatType } from "@/app/Types/tooltype";

// interface Props {
//   params: { id: string };
// }

// export function TextChat({ params }: Props) {
//   const [sendmsg, setsendmsg] = useState<string | null>();
//   const [recievedmsg, setrecievedmsg] = useState<string[]>([]);
//   const { socket, connect, disconnect } = useServerSocket();

//   //connection and RECIEVES messages-------------------
//   useEffect(() => {
//     if (!socket.current) {
//       console.log("socket isn't here");
//       return;
//     }
//     //If user recieves the message------------------------------------
//     const onMessage = (msg: string) => {
//       const content = AllmessageHandler(msg);
//       console.log(content);
//       if (content) {
//         setrecievedmsg((prev) => [...prev, content]); // append to state
//       }
//     };
//     socket.current.on("message", onMessage);
//     return () => {
//       if (socket.current) socket.current.off("message", onMessage); // ✅ properly removes
//       disconnect();
//       console.log("socket off");
//     };
//   }, [socket.current]);

//   // Connects to Websocket server on click-------------------------
//   function handleclick() {
//     console.log("handle clicked");
//     connect();
//   }
//   //CONVERT And SEND the message to json that are going out--------------------
//   function convertAndSend(
//     userId: string | null,
//     type: ChatType,
//     content: string | null
//   ) {
//     if (socket.current && content !== null) {
//       let convertedMessage = {
//         userId: userId ?? "",
//         roomId: params.id,
//         type: type,
//         content: content,
//       };
//       socket.current.send(JSON.stringify(convertedMessage));
//       setsendmsg(""); // clear input after sending
//     }
//   }

//   return (
//     <>
//       <div className="bg-gray-300 w-full h-svh overflow-y-auto">
//         Right side for Chats
//         <div className="flex flex-col gap-1">
//           <button onClick={handleclick}>click to chat</button>
//           <div className="flex flex-row absolute bottom-3.5 ">
//             <input
//               type="text"
//               value={sendmsg ?? ""}
//               onChange={(e) => setsendmsg(e.target.value)}
//               placeholder="Type your message"
//             />
//             <button
//               onClick={() =>
//                 convertAndSend("userId", ChatType.TEXT, sendmsg || null)
//               }
//             >
//               Send Message
//             </button>
//           </div>
//           other mssge we got from users: {recievedmsg}
//         </div>
//       </div>
//     </>
//   );
// }
