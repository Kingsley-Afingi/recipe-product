"use client";

import { createClient } from "@/authlib/client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password", // 👈 must match your reset page
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email for the reset link!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleForgotPassword}
        className="w-[350px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border px-3 py-2 w-full rounded mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
