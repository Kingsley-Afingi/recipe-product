
// "use client";
// import { useState, useEffect } from "react";
// import { createClient } from "@/authlib/client";
// import { useRouter } from "next/navigation";
// import { PiLockKeyFill } from "react-icons/pi";
// import { BiUser } from "react-icons/bi";
// import Link from "next/link";
// import { toast } from "sonner";
// import { useCartStore } from "@/store/useCartStore";
// import { useGetCurrentUser } from "@/hooks/useGetUser";

// export default function UserSettings() {
//   const { data:currentUser, isLoading } = useGetCurrentUser();
//   const supabase = createClient();
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 🔥 When user data loads, populate state
//   useEffect(() => {
//     if (currentUser) {
//       setName(currentUser.name || "");
//       setEmail(currentUser.email || "");
//     }
//   }, [currentUser]);

//   async function updateName() {
//     const {error} = await supabase.auth.updateUser({ data: { name } });
//     if(error) toast.error(error.message)
//         else toast.success("Name updated! successfully")
//   }

//   async function updateEmail() {
//     await supabase.auth.updateUser({ email });
//     alert("Email update link sent to new email!");
//   }

//   async function updatePassword() {
//     const {error} = await supabase.auth.updateUser({ password });
//     if(error) toast.error(error.message)
//         else toast.success("Password updated! successfully")
//   }

//   async function logout() {
//     const { clearCart } = useCartStore.getState();
//     const {error} = await supabase.auth.signOut();
//     clearCart();
   
//     if(error) toast.error(error.message)
//         else toast.success("you have been logOut successfully")
//     router.push("/");
//   } 

  
//   if (isLoading) return <p>Loading user settings...</p>;

//   return (
//     <div className="h-screen bg-blue-400 my-6 w-[1000px] mx-auto">
//       <div className=" text-center my-6 justify-center">
//         <h2>User Settings</h2>
//         <p>Hellow, {currentUser?.email || ""} 👋</p>
//       </div>

//       <div className="flex justify-center  gap-3 space-y-2">
//         <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-4">
//           <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white w-full shadow-md ">
//             <BiUser className="text-xl" />
//             <p>Profile Details</p>
//           </div>
//           <Link href="/profile-details">
//             <p>Basic Details</p>
//           </Link>
//           <p>
//             <b>Current Name:</b> {currentUser?.name}
//           </p>
//         </div>

//         <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-3">
//           <div className="flex items-center py-2 px-3 gap-2 font-bold bg-white w-full shadow-md ">
//             <PiLockKeyFill className="text-2xl" />
//             <p>Security Settings</p>
//           </div>
//           <div className="flex flex-col space-y-3">
//             <Link
//               href="/forgot-password"
//               className="text-gray-400 cursor-pointer"
//             >
//               Forgot-Password
//             </Link>
//             <Link
//               href="/reset-password"
//               className="text-gray-400 cursor-pointer"
//             >
//               Reset-Password
//             </Link>
//           </div>
//           <div>
//             <button
//               onClick={logout}
//               className="bg-red-500 rounded-md cursor-pointer px-2 text-white"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/authlib/client";
import { useRouter } from "next/navigation";
import { PiLockKeyFill } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { useGetCurrentUser } from "@/hooks/useGetUser";

export default function UserSettings() {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 When user data loads, populate state
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  async function updateName() {
    const { error } = await supabase.auth.updateUser({ data: { name } });
    if (error) toast.error(error.message);
    else toast.success("Name updated successfully!");
  }

  async function updateEmail() {
    await supabase.auth.updateUser({ email });
    alert("Email update link sent to new email!");
  }

  async function updatePassword() {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast.error(error.message);
    else toast.success("Password updated successfully!");
  }

  async function logout() {
    const { clearCart } = useCartStore.getState();
    const { error } = await supabase.auth.signOut();
    clearCart();

    if (error) toast.error(error.message);
    else toast.success("You have been logged out successfully!");
    router.push("/");
  }

  if (isLoading) return <p className="text-center mt-10">Loading user settings...</p>;

  return (
    <div className="min-h-screen bg-blue-400 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">User Settings</h2>
        <p className="text-white text-sm sm:text-base">
          Hello, {currentUser?.email || ""} 👋
        </p>
      </div>

      {/* Content Container */}
      <div
        className="
          flex flex-col sm:flex-row 
          justify-center items-start gap-6 
          w-full max-w-4xl mx-auto
        "
      >
        {/* Profile Section */}
        <div className="flex-1 shadow-md px-4 py-5 bg-white rounded-md space-y-4 w-full">
          <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white shadow-sm rounded-md">
            <BiUser className="text-xl text-blue-500" />
            <p className="text-gray-700">Profile Details</p>
          </div>

          <Link href="/profile-details" className="text-blue-600 underline">
            Basic Details
          </Link>

          <p className="text-gray-600">
            <b>Current Name:</b> {currentUser?.name || "No name set"}
          </p>
        </div>

        {/* Security Section */}
        <div className="flex-1 shadow-md px-4 py-5 bg-white rounded-md space-y-4 w-full">
          <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white shadow-sm rounded-md">
            <PiLockKeyFill className="text-2xl text-blue-500" />
            <p className="text-gray-700">Security Settings</p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              Forgot Password
            </Link>
            <Link
              href="/reset-password"
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              Reset Password
            </Link>
          </div>

          <div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 w-full sm:w-auto px-4 py-2 rounded-md text-white font-semibold transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
