"use client";

import { Message } from "@/lib/types/messageType";
import { useEffect, useRef } from "react";

interface Props {
  messages?: Message[]; // optional so other code can pass undefined safely
  meId: string;
}

export default function MessageList({ messages = [], meId }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Auto scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return <div className="text-gray-400">No messages yet</div>;
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {messages.map((msg) => {
        const isMe = msg.sender_id === meId;
        return (
          <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] px-2 py-1 rounded-lg text-sm ${
                isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`}
            >
              <div>{msg.content}</div>
              <div className="text-[10px] text-gray-900 ">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* 👇 dummy div for scrolling */}
      <div ref={bottomRef} />
    </div>
  );
}
