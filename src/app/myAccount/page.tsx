
"use client";
import React from "react";

import { useState, useEffect } from "react";
import { createClient } from "@/authlib/client";
import { useGetUser } from "@/hooks/useGetUsers";
import { useRouter } from "next/navigation";
import { PiLockKeyFill } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";

export default function UserSettings() {
  const { user, isLoading } = useGetUser();
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 When user data loads, populate state
  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  async function updateName() {
    const {error} = await supabase.auth.updateUser({ data: { name } });
    // alert("Name updated!");
    if(error) toast.error(error.message)
        else toast.success("Name updated! successfully")
  }

  async function updateEmail() {
    await supabase.auth.updateUser({ email });
    alert("Email update link sent to new email!");
  }

  async function updatePassword() {
    const {error} = await supabase.auth.updateUser({ password });
    if(error) toast.error(error.message)
        else toast.success("Password updated! successfully")
  }

  async function logout() {
    const { clearCart } = useCartStore.getState();
    const {error} = await supabase.auth.signOut();
    clearCart();
    // ✅ clear the cart from Zustand store
  // useCartStore.getState().clearCart();
  

    if(error) toast.error(error.message)
        else toast.success("you have been logOut successfully")
    router.push("/");
  } 

  

  if (isLoading) return <p>Loading user settings...</p>;

  return (
    <div className="h-screen bg-blue-400 my-6 w-[1000px] mx-auto">
      <div className=" text-center my-6 justify-center">
        <h2>User Settings</h2>
        <p>Hellow, {user?.user_metadata?.name || user?.email} 👋</p>
      </div>

      <div className="flex justify-center  gap-3 space-y-2">
        <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-4">
          <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white w-full shadow-md ">
            <BiUser className="text-xl" />
            <p>Profile Details</p>
          </div>
          <Link href="/profile-details">
            <p>Basic Details</p>
          </Link>
          <p>
            <b>Current Name:</b> {user?.user_metadata?.name}
          </p>
        </div>

        <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-3">
          <div className="flex items-center py-2 px-3 gap-2 font-bold bg-white w-full shadow-md ">
            <PiLockKeyFill className="text-2xl" />
            <p>Security Settings</p>
          </div>
          <div className="flex flex-col space-y-3">
            <Link
              href="/forgot-password"
              className="text-gray-400 cursor-pointer"
            >
              Forgot-Password
            </Link>
            <Link
              href="/reset-password"
              className="text-gray-400 cursor-pointer"
            >
              Reset-Password
            </Link>
          </div>
          <div>
            <button
              onClick={logout}
              className="bg-red-500 rounded-md cursor-pointer px-2 text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
