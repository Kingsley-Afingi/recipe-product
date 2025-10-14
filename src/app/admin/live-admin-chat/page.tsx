// "use client";

// import MessageInput from "@/components/MessageInput";
// import MessageList from "@/components/MessageList";
// import { useGetCurrentUser } from "@/hooks/useGetUser";
// import { supabase } from "@/lib/supabaseClient";
// import { useEffect, useState, useRef } from "react";
// // import { useGetAllUsers } from "@/hooks/useGetUser";


// interface Message {
//   id: string;
//   customer_id: string;
//   sender_id: string;
//   sender_role: string;
//   content: string;
//   created_at: string;
// }

// export default function AdminPage() {
//   const [conversations, setConversations] = useState<string[]>([]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [activeCustomer, setActiveCustomer] = useState<string | null>(null);
//   const [userMap, setUserMap] = useState<{ [id: string]: string }>({});
//   const messageChannelRef = useRef<any>(null);
//    const { data: currentUser, isLoading: userLoading } = useGetCurrentUser();


//   // 🧠 Load conversations
//   useEffect(() => {
//     async function loadConversations() {
//       const { data, error } = await supabase
//         .from("messages")
//         .select("customer_id")
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error loading conversations:", error);
//         return;
//       }

//       const ids = Array.from(new Set(data.map((m) => m.customer_id)));
//       setConversations(ids);

//       try {
//         const res = await fetch("/api/users");
//         const json = await res.json();

//         const map: Record<string, string> = {};
//         json.users?.forEach((u: any) => {
//           map[u.id] = u.user_metadata?.name || u.email || "Unknown User";
//         });
//         setUserMap(map);
//       } catch (err) {
//         console.error("Error fetching user map:", err);
//       }
//     }

//     loadConversations();

//     const conversationChannel = supabase
//       .channel("admin-conversations")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "messages" },
//         (payload) => {
//           const newCustomerId = payload.new.customer_id;
//           setConversations((prev) =>
//             prev.includes(newCustomerId) ? prev : [newCustomerId, ...prev]
//           );
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(conversationChannel);
//     };
//   }, []);

//   // 🧠 Load messages for selected customer
//   useEffect(() => {
//     if (!activeCustomer) return;
//     let isMounted = true;

//     async function loadMessages() {
//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("customer_id", activeCustomer)
//         .order("created_at", { ascending: true });

//       if (error) {
//         console.error("Error fetching messages:", error);
//       } else if (isMounted) {
//         setMessages(data || []);
//       }
//     }

//     loadMessages();

//     if (messageChannelRef.current) {
//       supabase.removeChannel(messageChannelRef.current);
//     }

//     const channel = supabase
//       .channel(`chat-${activeCustomer}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "messages",
//           filter: `customer_id=eq.${activeCustomer}`,
//         },
//         (payload) => {
//           const newMsg = payload.new as Message;
//           setMessages((prev) =>
//             prev.some((m) => m.id === newMsg.id) ? prev : [...prev, newMsg]
//           );
//         }
//       )
//       .subscribe();

//     messageChannelRef.current = channel;

//     return () => {
//       isMounted = false;
//       supabase.removeChannel(channel);
//     };
//   }, [activeCustomer]);

//   // ✅ Send message
//   const handleSend = async (content: string) => {
//     if (!activeCustomer) {
//       alert("Please select a conversation first.");
//       return;
//     }

//     const payload = {
//       customer_id: activeCustomer,
//       sender_id: "admin",
//       sender_role: "admin",
//       content,
//       created_at: new Date().toISOString(),
//     };

//     const { error } = await supabase.from("messages").insert([payload]);

//     if (error) {
//       console.error("❌ Error sending message:", error);
//       alert("Failed to send message. Check console for details.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full max-w-6xl mx-auto border bg-white">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           activeCustomer ? "hidden md:block" : "block"
//         } md:w-1/4 w-full border-r p-4 bg-gray-50`}
//       ><h2 className="font-bold mb-4 text-lg text-center md:text-left">
//   {userLoading
//     ? "Loading user..."
//     : currentUser
//     ? `Logged in as ${currentUser.name}`
//     : "No user logged in"}
// </h2>


//         <h2 className="font-bold mb-4 text-lg text-center md:text-left">
//           Conversations
//         </h2>
//         {conversations.length === 0 ? (
//           <p className="text-gray-400 text-center md:text-left">
//             No conversations yet
//           </p>
//         ) : (
//           <ul className="space-y-1">
//             {conversations.map((cid) => (
//               <li
//                 key={cid}
//                 onClick={() => setActiveCustomer(cid)}
//                 className={`p-2 cursor-pointer rounded ${
//                   cid === activeCustomer ? "bg-gray-300" : "hover:bg-gray-100"
//                 }`}
//               >
//                 {userMap[cid] || `User (${cid.slice(0, 6)}...)`}
//                 {/* {currentUser?.name} */}
//               </li>
//             ))}
//           </ul>
//         )}
//       </aside>

//       {/* Chat Section */}
//       <main
//         className={`flex-1 flex flex-col ${
//           !activeCustomer ? "hidden md:flex" : "flex"
//         }`}
//       >
//         {/* Header (mobile back button) */}
//         <div className="md:hidden p-2 border-b flex items-center justify-between bg-gray-100">
//           <button
//             onClick={() => setActiveCustomer(null)}
//             className="text-sm text-blue-500 font-semibold"
//           >
//             ← Back
//           </button>
//           <h2 className="font-bold text-gray-700 text-sm">
//             {activeCustomer
//               ? userMap[activeCustomer] || "Chat"
//               : "Conversations"}
//           </h2>
//         </div>

//         <div className="flex-1 p-4 overflow-y-auto">
//           {activeCustomer ? (
//             <MessageList messages={messages} meId={"admin"} />
//           ) : (
//             <div className="text-gray-400 text-center mt-10 text-sm md:text-base">
//               Select a conversation to view messages
//             </div>
//           )}
//         </div>

//         {activeCustomer && (
//           <div className="border-t p-2 md:p-4 bg-gray-50">
//             <MessageInput onSend={handleSend} />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


"use client";

import MessageInput from "@/components/MessageInput";
import MessageList from "@/components/MessageList";
import { useGetCurrentUser } from "@/hooks/useGetUser";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState, useRef } from "react";

interface Message {
  id: string;
  customer_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  created_at: string;
}

export default function AdminPage() {
  const [conversations, setConversations] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeCustomer, setActiveCustomer] = useState<string | null>(null);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const messageChannelRef = useRef<any>(null);

  // ✅ Fetch logged-in user (from your custom hook)
  const { data: currentUser, isLoading: userLoading } = useGetCurrentUser();

  // 🧠 Load conversations + user info
  useEffect(() => {
    async function loadConversations() {
      const { data, error } = await supabase
        .from("messages")
        .select("customer_id")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading conversations:", error);
        return;
      }

      const ids = Array.from(new Set(data.map((m) => m.customer_id)));
      setConversations(ids);

      // ✅ Fetch all users once
      try {
        const res = await fetch("/api/users");
        const json = await res.json();
        if (json.users) {
          const map: Record<string, string> = {};
          json.users.forEach((u: any) => {
            map[u.id] = u.name || u.email || "Unknown User";
          });
          setUserMap(map);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    loadConversations();

    // ✅ Real-time updates for new conversations
    const conversationChannel = supabase
      .channel("admin-conversations")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newCustomerId = payload.new.customer_id;
          setConversations((prev) =>
            prev.includes(newCustomerId) ? prev : [newCustomerId, ...prev]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(conversationChannel);
    };
  }, []);

  // 🧠 Load messages for selected customer
  useEffect(() => {
    if (!activeCustomer) return;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("customer_id", activeCustomer)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
    }

    loadMessages();

    // ✅ Real-time updates for this chat
    if (messageChannelRef.current)
      supabase.removeChannel(messageChannelRef.current);

    const channel = supabase
      .channel(`chat-${activeCustomer}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `customer_id=eq.${activeCustomer}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
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
  }, [activeCustomer]);

  // ✅ Send message
  const handleSend = async (content: string) => {
    if (!activeCustomer) {
      alert("Please select a conversation first.");
      return;
    }

    const payload = {
      customer_id: activeCustomer,
      sender_id: currentUser?.id || "admin",
      sender_role: "admin",
      content,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("messages").insert([payload]);
    if (error) {
      console.error("❌ Error sending message:", error);
      alert("Failed to send message. Check console for details.");
    }
  };

  // ✅ UI
  return (
    <div className="flex flex-col md:flex-row h-screen w-full max-w-6xl mx-auto border bg-white">
      {/* Sidebar */}
      <aside
        className={`${
          activeCustomer ? "hidden md:block" : "block"
        } md:w-1/4 w-full border-r p-4 bg-gray-50`}
      >
        <h2 className="font-bold mb-2 text-lg text-center md:text-left">
          {userLoading
            ? "Loading user..."
            : currentUser
            ? `👤 Logged in as ${currentUser.name}`
            : "No user logged in"}
        </h2>

        <h2 className="font-bold mb-3 text-lg text-center md:text-left">
          Conversations
        </h2>

        {conversations.length === 0 ? (
          <p className="text-gray-400 text-center md:text-left">
            No conversations yet
          </p>
        ) : (
          <ul className="space-y-1">
            {conversations.map((cid) => (
              <li
                key={cid}
                onClick={() => setActiveCustomer(cid)}
                className={`p-2 cursor-pointer rounded ${
                  cid === activeCustomer ? "bg-gray-300" : "hover:bg-gray-100"
                }`}
              >
                {userMap[cid] || `User (${cid.slice(0, 6)}...)`}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Chat Section */}
      <main
        className={`flex-1 flex flex-col ${
          !activeCustomer ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="md:hidden p-2 border-b flex items-center justify-between bg-gray-100">
          <button
            onClick={() => setActiveCustomer(null)}
            className="text-sm text-blue-500 font-semibold"
          >
            ← Back
          </button>
          <h2 className="font-bold text-gray-700 text-sm">
            {activeCustomer ? userMap[activeCustomer] || "Chat" : "Conversations"}
          </h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {activeCustomer ? (
            <MessageList messages={messages} meId={currentUser?.id || "admin"} />
          ) : (
            <div className="text-gray-400 text-center mt-10 text-sm md:text-base">
              Select a conversation to view messages
            </div>
          )}
        </div>

        {activeCustomer && (
          <div className="border-t p-2 md:p-4 bg-gray-50">
            <MessageInput onSend={handleSend} />
          </div>
        )}
      </main>
    </div>
  );
}
