"use client";
import React from "react";
import { useGetUser } from "@/hooks/useGetUsers";

export default function UserProfile() {
  const { user} = useGetUser();

 
  return (
    <div>
      {user ? (
        <p>Hi, {user?.user_metadata?.name || user.email} </p>
      ) : (
        <p>Create Account</p>
      )}
    </div>
  );
}


