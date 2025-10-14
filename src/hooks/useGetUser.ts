// "use client";

// import { createClient } from "@/authlib/client";
// import axiosInstance from "@/lib/axiosInstance";
// import { useQuery } from "@tanstack/react-query";

// // ✅ Get all users
// export function useGetAllUsers() {
//   return useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get("/users");
//       return data.users;
//     },
//   });
// }


// // ✅ Get current logged-in user by ID
// export function useGetCurrentUser() {
//   const supabase = createClient();

//   return useQuery({
//     queryKey: ["currentUser"],
//     queryFn: async () => {
//       const { data: userData, error } = await supabase.auth.getUser();
//       if (error || !userData?.user) return null;

//       const userId = userData.user.id;
//       const { data } = await axiosInstance.get(`/users?id=${userId}`);
//       return data.user;
//     },
//   });
  
// }


"use client";

import { createClient } from "@/authlib/client";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// ✅ Hook: Listen to Supabase Auth changes and refresh user queries
export function useAuthListener() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Listen for login or logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // ❌ User logged out — clear user data from React Query
        queryClient.setQueryData(["currentUser"], null);
      } else {
        // ✅ User logged in — refresh current user data
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    });

    // Cleanup the listener when component unmounts
    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);
}

// ✅ Get all users
export function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users");
      return data.users;
    },
  });
}

// ✅ Get current logged-in user
export function useGetCurrentUser() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Attach listener inside here so it updates automatically
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        queryClient.setQueryData(["currentUser"], null);
      } else {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData?.user) return null;

      const userId = userData.user.id;
      const { data } = await axiosInstance.get(`/users?id=${userId}`);
      return data.user;
    },
  });
}


