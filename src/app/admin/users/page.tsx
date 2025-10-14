"use client";

import { useGetAllUsers } from "@/hooks/useGetUser";

export default function UserProfile() {

 const { data: allUsers } = useGetAllUsers();
  return (
      <div>
      <h2>👥 All Users</h2>
      {allUsers?.map((u: any) => (
        <div key={u.id} className="flex gap-50 px-2 py-2 border">
          <div>{u.name} </div>
          <div> {u.email}</div>
        </div>
      ))}
    </div>
  );
}
