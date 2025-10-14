"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabase/supabaseClient";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";
import { useGetCurrentUser } from "@/hooks/useGetUser";
// import SignOut from "@/components/SignOut";

export default function CustomerPage() {
  const {data:currentUser, isLoading } = useGetCurrentUser();
  const [messages, setMessages] = useState<any[]>([]);
  const messageChannelRef = useRef<any>(null);

  // 🧠 Load messages on login
  useEffect(() => {
    if (!currentUser) return;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("customer_id", currentUser.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data || []);
      }
    }

    loadMessages();

    // ✅ Real-time listener for new messages (from admin or self)
    if (messageChannelRef.current) {
      supabase.removeChannel(messageChannelRef.current);
    }

    const channel = supabase
      .channel(`customer-chat-${currentUser.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `customer_id=eq.${currentUser.id}`,
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev) =>
            prev.some((m) => m.id === newMsg.id) ? prev : [...prev, newMsg]
          );
        }
      )
      .subscribe();

    messageChannelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // ✅ Send message (Customer → Admin)
  const handleSend = async (content: string) => {
    if (!currentUser) return;

    const payload = {
      customer_id: currentUser.id,
      sender_id: currentUser.id,
      sender_role: "customer",
      content,
    };

    const { error } = await supabase.from("messages").insert([payload]);
    if (error) {
      console.error("Error sending message:", error.message);
      return;
    }

    // 🟡 No manual append; real-time listener will auto-update
  };

  if (isLoading) return <div>Loading user...</div>;
  if (!currentUser) return <div>Please log in to chat</div>;

  const meId = currentUser.id;

  return (
    <div className="flex flex-col  bg-gray-50">
      {/* Sign out button */}
      <div className="p-3">
        {/* <SignOut /> */}
      </div>

      {/* Chat container */}
      <div
        className="
          flex flex-col border 
          mx-auto 
          w-full sm:w-[90%] md:w-[600px] 
          h-screen
          rounded-lg shadow-sm bg-gray-100
        "
      >
        {/* Header */}
        <div className="p-4 font-semibold text-gray-700 border-b text-center text-sm sm:text-base">
          Welcome, {currentUser.user_metadata?.name || currentUser.email}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <MessageList messages={messages} meId={meId} />
        </div>

        {/* Input */}
        <div className="border-t p-3 sm:p-4 bg-gray-50">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}