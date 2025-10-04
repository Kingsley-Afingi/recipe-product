"use client";
import { createClient } from "@/authlib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const supabase = createClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
  });

  return {
    user: data,
    isLoading,
    isError,
    error,
  };
}


// "use client";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export function useGetUsers() {
//   return useQuery<any[], Error>({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axios.get("/api/users");
//       return res.data.users;
//     },
//   });
// }
