import React from "react";

const Banner = () => {
  return (
    <div className="">
      <div className='bg-[url("/images/banner.svg")] mt-10 bg-cover bg-center md:h-[312px] h-[170px] w-full md:rounded-4xl rounded-lg'>
        <div className="w-[346px] md:ml-11 md:pt-17 pt-8 ml-3">
          <small className="font-medium text-[1.4rem] leading-[127%] text-[#DC582A]">
            Trending now
          </small>
          <p className="font-poppins font-bold md:text-[2.4rem] text-[1.9rem] leading-[117%] text-white">
            Mike’s famous salad with cheese
          </p>
          <span className="font-poppins text-medium text-[1.25rem] leading-[127%] text-white">
            By John Mike
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// "use client";
// import React, { useEffect, useState } from "react";

// const images = [
//   "/images/banner.svg",
//   "/images/recipe.png",
//   "/images/recipe2.png",
// ];

// const Banner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Automatically change background every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 5000); // 5000ms = 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className={`bg-cover bg-center md:h-[355px] h-[190px] w-full md:rounded-4xl rounded-lg transition-all duration-1000`}
//       style={{ backgroundImage: `url(${images[currentIndex]})` }}
//     >
//       <div className="w-[346px] md:ml-11 md:pt-17 pt-8 ml-3">
//         <small className="font-medium text-[1.4rem] leading-[127%] text-[#DC582A]">
//           Trending now
//         </small>
//         <p className="font-poppins font-bold md:text-[2.4rem] text-[2rem] leading-[127%] text-white">
//           Mike’s famous salad with cheese
//         </p>
//         <span className="font-poppins text-medium text-[1.25rem] leading-[127%] text-white">
//           By John Mike
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Banner;

// "use client";
// import React, { useEffect, useState } from "react";

// const images = [
//     "/images/banner.svg",
//   "/images/recipe.png",
//   "/images/recipe2.png",
//   "/images/recipe3.png",
//   "/images/recipe4.png",
//   "/images/recipe5.png",
//   "/images/recipe6.png",
//   "/images/recipe7.png",
//   "/images/recipe8.png",
//   "/images/recipe9.png",
//   "/images/recipe10.png",
//   "/images/recipe11.png",
//   "/images/recipe12.png",
// ];

// const Banner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide every 5s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative overflow-hidden md:h-[355px] h-[190px] w-full md:rounded-4xl rounded-lg">
//       {/* Slider wrapper */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className="min-w-full bg-cover bg-center h-[355px]"
//             style={{ backgroundImage: `url(${img})` }}
//           >
//             <div className="w-[346px] md:ml-11 md:pt-17 pt-8 ml-3">
//               <small className="font-medium text-[1.4rem] leading-[127%] text-[#DC582A]">
//                 Trending now
//               </small>
//               <p className="font-poppins font-bold md:text-[2.4rem] text-[2rem] leading-[127%] text-white">
//                 Mike’s famous salad with cheese
//               </p>
//               <span className="font-poppins text-medium text-[1.25rem] leading-[127%] text-white">
//                 By John Mike
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;

// "use client";
// import React, { useEffect, useState } from "react";

// const images = [
//   "/images/banner.svg",
//   "/images/recipe.png",
//   "/images/recipe2.png",
//   "/images/recipe3.png",
//   "/images/recipe4.png",
//   "/images/recipe5.png",
//   "/images/recipe6.png",
//   "/images/recipe7.png",
//   "/images/recipe8.png",
//   "/images/recipe9.png",
//   "/images/recipe10.png",
//   "/images/recipe11.png",
//   "/images/recipe12.png",
// ];

// const Banner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide every 3s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) =>
//         prev === images.length - 1 ? 0 : prev + 1
//       ); // loop through all
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative overflow-hidden md:h-[355px] h-[190px] w-full md:rounded-4xl rounded-lg">
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className="min-w-full bg-cover bg-center md:h-[325px] h-[190px]"
//             style={{ backgroundImage: `url(${img})` }}
//           >
//             <div className="w-[346px] md:ml-11 md:pt-17 pt-8 ml-3">
//               <small className="font-medium text-[1.4rem] leading-[127%] text-[#DC582A]">
//                 Trending now
//               </small>
//               <p className="font-poppins font-bold md:text-[2.4rem] text-[2rem] leading-[127%] text-white">
//                 Mike’s famous salad with cheese
//               </p>
//               <span className="font-poppins text-medium text-[1.25rem] leading-[127%] text-white">
//                 By John Mike
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;
