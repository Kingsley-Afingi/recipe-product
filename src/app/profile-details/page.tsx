
// "use client";
// import React, { useState, useEffect } from "react";
// import { createClient } from "@/authlib/client";
// import { useRouter } from "next/navigation";
// import { PiLockKeyFill } from "react-icons/pi";
// import { BiUser } from "react-icons/bi";
// import { toast } from "sonner"; // 👈 import toast
// import { useAuthListener, useGetCurrentUser } from "@/hooks/useGetUser";

// export default function UserSettings() {
//   useAuthListener()
//   const { data:currentUser, isLoading } = useGetCurrentUser();
//   const supabase = createClient();
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (currentUser) {
//       setName(currentUser.name || "");
//       setEmail(currentUser.email || "");
//     }
//   }, [currentUser]);

//   async function updateName() {
//     const { error } = await supabase.auth.updateUser({ data: { name } });
//     if (error) toast.error(error.message);
//     else toast.success("Name updated successfully!");
    
//   }

//   async function updateEmail() {
//     const { error } = await supabase.auth.updateUser({ email });
//     if (error) toast.error(error.message);
//     else toast.success("Check your inbox for the email update link!");
//   }

//   if (isLoading) return <p>Loading user settings...</p>;

//   return (
//     <div className="h-screen bg-gray-100 px-3 py-3 w-[700px] mx-auto space-y-4">
//       <div className=" text-center  justify-center space-y-4">
//         <h2>User Profile</h2>
//         <p>Hello, {currentUser?.email || ""} 👋</p>
//       </div>

//       <div className=" space-y-3">
//         <div className=" shadow-md  px-2 py-3 bg-white rounded-md h-fit space-y-4">
//           <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white w-full shadow-md ">
//             <BiUser className="text-xl" />
//             <p>Profile Details</p>
//           </div>
//           <p>Current Email: {currentUser?.email}</p>
//           <p>Current Name: {currentUser?.name}</p>
//         </div>

//         <div className="shadow-md px-2 py-3 bg-white rounded-md h-fit space-y-2">
//           <div className="flex items-center py-2 px-3 gap-2 font-bold bg-white w-full shadow-md ">
//             <PiLockKeyFill className="text-2xl" />
//             <small>Update Personal Details</small>
//           </div>

//           <div className="space-y-3">
//             <h3>Update Email</h3>
//             <div className="flex gap-2 flex-col items-start">
//                 <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="outline-none px-2 py-1 bg-gray-200 w-[280px] cursor-pointer text-black rounded-md"
//             />
//             <button
//               onClick={updateEmail}
//               className="text-blue-800 cursor-pointer"
//             >
//               Save
//             </button>
//             </div>

//             <h3>Update Name</h3>
//             <div className="flex gap-2 flex-col items-start">
//                 <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="outline-none px-2 py-1 bg-gray-200 w-[280px] text-black rounded-md"
//             />
//             <button
//               onClick={updateName}
//               className="text-blue-800 cursor-pointer"
//             >
//               Save
//             </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/authlib/client";
import { useRouter } from "next/navigation";
import { PiLockKeyFill } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import { toast } from "sonner";
import { useAuthListener, useGetCurrentUser } from "@/hooks/useGetUser";

export default function UserSettings() {
  useAuthListener();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
    const { error } = await supabase.auth.updateUser({ email });
    if (error) toast.error(error.message);
    else toast.success("Check your inbox for the email update link!");
  }

  if (isLoading) return <p className="text-center mt-10">Loading user settings...</p>;

  return (
    <div
      className="
        min-h-screen bg-gray-100 
        px-4 sm:px-6 lg:px-10 py-6 
        flex flex-col items-center
      "
    >
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Profile
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Hello, {currentUser?.email || ""} 👋
        </p>
      </div>

      {/* Card Container */}
      <div
        className="
          w-full max-w-2xl 
          flex flex-col gap-4
        "
      >
        {/* Profile Details */}
        <div className="shadow-md px-4 py-4 bg-white rounded-md space-y-4">
          <div className="flex items-center font-bold py-2 px-3 gap-2 bg-white shadow-sm rounded-md">
            <BiUser className="text-xl text-blue-500" />
            <p className="text-gray-700 text-base sm:text-lg">
              Profile Details
            </p>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            <b>Current Email:</b> {currentUser?.email}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            <b>Current Name:</b> {currentUser?.name}
          </p>
        </div>

        {/* Update Personal Details */}
        <div className="shadow-md px-4 py-4 bg-white rounded-md space-y-3">
          <div className="flex items-center py-2 px-3 gap-2 font-bold bg-white shadow-sm rounded-md">
            <PiLockKeyFill className="text-2xl text-blue-500" />
            <small className="text-gray-700 text-base sm:text-lg">
              Update Personal Details
            </small>
          </div>

          <div className="space-y-5">
            {/* Update Email */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
                Update Email
              </h3>
              <div
                className="
                  flex flex-col sm:flex-row sm:items-center sm:gap-3 
                  space-y-2 sm:space-y-0
                "
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    outline-none px-3 py-2 bg-gray-200 
                    w-full sm:w-[300px] text-black rounded-md
                  "
                />
                <button
                  onClick={updateEmail}
                  className="
                    text-blue-700 hover:text-blue-900 
                    font-semibold transition
                  "
                >
                  Save
                </button>
              </div>
            </div>

            {/* Update Name */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
                Update Name
              </h3>
              <div
                className="
                  flex flex-col sm:flex-row sm:items-center sm:gap-3 
                  space-y-2 sm:space-y-0
                "
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    outline-none px-3 py-2 bg-gray-200 
                    w-full sm:w-[300px] text-black rounded-md
                  "
                />
                <button
                  onClick={updateName}
                  className="
                    text-blue-700 hover:text-blue-900 
                    font-semibold transition
                  "
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
