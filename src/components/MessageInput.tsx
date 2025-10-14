// THIS IS PERFECTLY WORKING WELL WITHOUT TYPING INDICATOR
"use client";

import { useState } from "react";

interface Props {
  onSend: (content: string) => void | Promise<void>;
}

export default function MessageInput({ onSend }: Props) {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = value.trim();
    if (!text) return;
    try {
      setSending(true);
      await onSend(text);
      setValue("");
    } catch (err) {
      console.error("send error", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={sending}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
      >
        {sending ? "..." : "Send"}
      </button>
    </form>
  );
}