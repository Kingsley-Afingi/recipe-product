"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/recipes" className="text-blue-600 underline">
            Manage Recipes
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="text-blue-600 underline">
            Manage Users
          </Link>
        </li>
        <li>
          <button className="text-gray-600" disabled>
            (Users & Orders coming later)
          </button>
        </li>
      </ul>
    </div>
  );
}
