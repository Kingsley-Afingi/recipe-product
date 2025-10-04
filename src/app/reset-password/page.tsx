"use client";

import { createClient } from "@/authlib/client";
import { useState } from "react";
// import { createClient } from "@/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) setMessage(error.message);
    else setMessage("Password updated! You can now log in.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleResetPassword}
        className="w-[350px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="border px-3 py-2 w-full rounded mb-3"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Update Password
        </button>
        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
