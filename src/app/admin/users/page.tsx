"use client";

import { useGetAllUsers } from "@/hooks/useGetUser";

export default function UserProfile() {
  const { data: allUsers } = useGetAllUsers();
  return (
    <div className="w-full max-w-4xl mx-auto p-3 space-y-2">
      <h2 className="text-xl font-semibold mb-4">👥 All Users</h2>

      {allUsers?.map((u: any) => (
        <div
          key={u.id}
          className="
        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 py-2 border rounded-md text-sm sm:text-base
      "
        >
          <div className="font-medium break-all">{u.name}</div>

          <div className="text-gray-600 break-all">{u.email}</div>
        </div>
      ))}
    </div>
  );
}
