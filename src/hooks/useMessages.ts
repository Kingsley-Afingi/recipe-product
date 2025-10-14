"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";

export interface Message {
  id: string;
  customer_id: string;
  sender_id: string;
  sender_role: "admin" | "customer";
  sender_name: string | null; // ✅ added
  content: string;
  created_at: string;
}

export function useRealtimeMessages(customerId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!customerId) return;

    let isMounted = true;

    async function loadMessages() {
      // 1. Load existing history (include sender_name)
      const { data, error } = await supabase
        .from("messages")
        .select("id, customer_id, sender_id, sender_role, sender_name, content, created_at")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: true });

      if (!error && data && isMounted) {
        setMessages(data as Message[]);
      }

      // 2. Clean up previous subscription
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current).catch(() => {});
        channelRef.current = null;
      }

      // 3. Subscribe for realtime new messages
      const channel = supabase
        .channel(`realtime-messages-${customerId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `customer_id=eq.${customerId}`,
          },
          (payload) => {
            const newMsg = payload.new as Message;
            setMessages((prev) => {
              // ✅ prevent duplicate messages
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        )
        .subscribe();

      channelRef.current = channel;
    }

    loadMessages();

    return () => {
      isMounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current).catch(() => {});
      }
    };
  }, [customerId]);

  return { messages, setMessages };
}
