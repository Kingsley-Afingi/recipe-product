"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCartArrowDown, FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosHeartEmpty } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineHelpOutline } from "react-icons/md";
import { useCartStore } from "@/store/useCartStore"; // 👈 import your cart store
import { useAuthListener, useGetCurrentUser } from "@/hooks/useGetUser";

const Navbar = () => {
  useAuthListener();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);

  const { data: currentUser } = useGetCurrentUser();
  const items = useCartStore((state) => state.cart); // 👈 subscribe to items

  return (
    <div className="flex mb-18">
      <div className="bg-white shadow-md w-full fixed top-0 z-50">
        <header className="container mx-auto p-2 py-3 flex justify-between items-center">
          <Link href="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>

          {/* Help Dropdown */}
          <button
            className={`flex md:gap-2  items-center justify-center cursor-pointer px-2 py-2 text-black rounded-md hover:b-green-700 transition-colors ${
              helpDropdown ? " text-yellow-400" : " text-black font-bold"
            }`}
            onClick={() => setHelpDropdown(!helpDropdown)}
          >
            <MdOutlineHelpOutline className="text-2xl" />
            <h2>Help</h2>
          </button>
          {helpDropdown && (
            <div className="absolute md:right-[800px] right-45 mt-[100px] w-30 bg-white rounded-md shadow-lg z-50">
              <Link href="/customer" className="block px-4 py-2 cursor-pointer">
                <button className="w-full cursor-pointer py-2 shadow-lg rounded-md hover:bg-amber-700 text-white font-bold bg-amber-600">
                  Live Chat
                </button>
              </Link>
            </div>
          )}
          {/* Right Side */}

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
            className={`flex md:gap-2 gap-1 items-center justify-center cursor-pointer md:px-2 p-1 md:py-2 py-1 bg-green-600 rounded-md hover:bg-green-700 text-white transition-colors ${
              openDropdown
                ? "bg-green-700 text-yellow-400"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            <span>
              <FaRegUser className="text-xl" />
            </span>
            <span>
              {/* <UserProfile /> */}
              <div>
                {currentUser ? (
                  <p>{currentUser?.name || currentUser?.email}</p>
                ) : (
                  <p>Create Account</p>
                )}
              </div>
            </span>
            {openDropdown ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
        </header>

        {/* User Dropdown Menu */}
        {openDropdown && (
          <div className="absolute md:right-12 right-0 mt-[-13px] w-45 bg-white rounded-md shadow-lg z-50">
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
