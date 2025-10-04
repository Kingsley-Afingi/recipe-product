
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/authlib/client";
import { useGetUser } from "@/hooks/useGetUsers";
import { useRouter } from "next/navigation";
import { PiLockKeyFill } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import { toast } from "sonner"; // 👈 import toast

export default function UserSettings() {
  const { user, isLoading } = useGetUser();
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  async function updateName() {
    const { error } = await supabase.auth.updateUser({ data: { name } });
    if (error) toast.error(error.message);
    else toast.success("Name updated successfully!");
    
  }

  async function updateEmail() {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) toast.error(error.message);
    else toast.success("Check your inbox for the email update link!");
  }

  if (isLoading) return <p>Loading user settings...</p>;

  return (
    <div className="h-screen bg-gray-100 px-3 py-3 w-[700px] mx-auto space-y-4">
      <div className=" text-center  justify-center space-y-4">
        <h2>User Profile</h2>
        <p>Hello, {user?.user_metadata?.name || user?.email} 👋</p>
      </div>

      <div className=" space-y-3">
        <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-4">
          <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white w-full shadow-md ">
            <BiUser className="text-xl" />
            <p>Profile Details</p>
          </div>
          <p>Current Email: {user?.email}</p>
          <p>Current Name: {user?.user_metadata?.name}</p>
        </div>

        <div className="shadow-md px-2 py-3 bg-white rounded-md h-fit space-y-2">
          <div className="flex items-center py-2 px-3 gap-2 font-bold bg-white w-full shadow-md ">
            <PiLockKeyFill className="text-2xl" />
            <small>Update Personal Details</small>
          </div>

          <div className="space-y-3">
            <h3>Update Email</h3>
            <div className="flex gap-2 flex-col items-start">
                <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-2 py-1 bg-gray-200 w-[280px] cursor-pointer text-black rounded-md"
            />
            <button
              onClick={updateEmail}
              className="text-blue-800 cursor-pointer"
            >
              Save
            </button>
            </div>

            <h3>Update Name</h3>
            <div className="flex gap-2 flex-col items-start">
                <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none px-2 py-1 bg-gray-200 w-[280px] text-black rounded-md"
            />
            <button
              onClick={updateName}
              className="text-blue-800 cursor-pointer"
            >
              Save
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
