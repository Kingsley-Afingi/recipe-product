"use client";
import UserProfile from "@/app/admin/users/page";
import Link from "next/link";
import { useState } from "react";
import { FaCartArrowDown, FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosHeartEmpty } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineHelpOutline } from "react-icons/md";
import { useCartStore } from "@/store/useCartStore"; // 👈 import your cart store

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);

  
  const items = useCartStore((state) => state.cart); // 👈 subscribe to items

  const categories = [
    "All Categories",
    "Healthy Eating",
    "Appetizers",
    "Recipes & Menue",
    "Drinks & Coctails",
    "Drinks & Coctails",
    "Main Courses",
    "Desserts",
    "Drinks",
    "Desserts",
    "Healthy",
    "Snacks",
  ];

  return (
    <div className="flex mb-18">
      <div className="bg-white shadow-md w-full fixed top-0 z-50">
        <header className="container mx-auto p-2 py-3 flex justify-between items-center">
          <div>
            <img src="/images/logo.svg" alt="logo" />
          </div>

          {/* Search */}
          <div className="bg-slate-300 md:flex hidden w-[377px] justify-between">
            <select name="" id="" className="w-[122px] outline-0">
              {categories.map((categorie, index) => (
                <option value="" key={index}>
                  {categorie}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border-none outline-none w-[142px] py-2"
              placeholder="| Search for recipe"
            />
            <button className="bg-[#509E2F] p-2">search</button>
          </div>

          <Link href="admin">Admin</Link>

          {/* Right Side */}
          <div className="flex gap-10 relative">
            {/* Help Dropdown */}
            <button
              className={`flex gap-2 items-center justify-center cursor-pointer px-2 py-2 text-black rounded-md hover:b-green-700 transition-colors ${
                helpDropdown ? " text-yellow-400" : " text-black font-bold"
              }`}
              onClick={() => setHelpDropdown(!helpDropdown)}
            >
              <MdOutlineHelpOutline className="text-2xl" />
              <h2>Help</h2>
            </button>
            {helpDropdown && (
              <div className="absolute mt-[50px] w-30 bg-white rounded-md shadow-lg z-50">
                <Link
                  href="/live-chat"
                  className="block px-4 py-2 cursor-pointer"
                >
                  <button className="w-full cursor-pointer py-2 shadow-lg rounded-md hover:bg-amber-700 text-white font-bold bg-amber-600">
                    Live Chat
                  </button>
                </Link>
              </div>
            )}

            {/* Cart Button with Badge */}
            <Link href="/cart">
            <button className="relative flex gap-2 items-center justify-center font-bold cursor-pointer">
              <FaCartArrowDown className="text-2xl" />
              

              {items.length > 0 && (
                <span className="absolute -top-0 left-4 bg-green-600 text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            </Link>

            {/* User Dropdown */}
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex gap-2 items-center justify-center cursor-pointer px-2 py-2 bg-green-600 rounded-md hover:bg-green-700 text-white transition-colors ${
                openDropdown
                  ? "bg-green-700 text-yellow-400"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <span>
                <FaRegUser className="text-xl" />
              </span>
              <span>
                <UserProfile />
              </span>
              {openDropdown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
          </div>
        </header>

        {/* User Dropdown Menu */}
        {openDropdown && (
          <div className="absolute right-12 mt-[-13px] w-45 bg-white rounded-md shadow-lg z-50">
            <Link href="/login" className="block px-4 py-2 cursor-pointer">
              <button className="w-full cursor-pointer py-2 shadow-lg rounded-md hover:bg-amber-700 text-white font-bold bg-amber-600">
                Sign In
              </button>
            </Link>
            <hr className="my-2" />
            <Link
              href="/myAccount"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex gap-3 items-center">
                <span>
                  <FaRegUser className="text-xl" />
                </span>
                <span>My Account</span>
              </div>
            </Link>
            <Link href="/cart" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex gap-3 items-center">
                <span>
                  <LuShoppingBag className="text-xl" />
                </span>
                <span>Orders</span>
              </div>
            </Link>
            <Link
              href="/wishlist"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex gap-3 items-center">
                <span>
                  <IoIosHeartEmpty className="text-xl" />
                </span>
                <span>Wishlist</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
