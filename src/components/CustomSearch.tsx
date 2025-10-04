"use client";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import { useDebounce } from "use-debounce";
import { IoIosCloseCircle } from "react-icons/io";
import { useSearchParams } from "next/navigation";

const CustomSearch = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [text, setText] = useState(query ? query : "");
  const [value] = useDebounce(text, 1000); // Debounce the input to avoid too many updates delay for 1000 milliseconds
  const updateQueryParams = useUpdateQuery();
//  worked on this 
  useEffect(() => {
    if (value.trim()) {
      updateQueryParams({ q: value.trim() });
    } else {
      updateQueryParams({ q: "" });
    }
  }, [value, updateQueryParams]);

  // const handleClose = () => {
  //   setText("");
  //   return updateQueryParams({
  //     q: "",
  //   });
  // };
  return (
    <div className="md:w-full max-w-md gap-10 relative ">
      <BiSearch className="absolute right-4 top-1/2 -translate-1/2  text-gray-400 text-2xl " />
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="border-1 px-7 py-1 rounded-md w-full placeholder:p-2"
        placeholder="search recipes"
      />
      {/* <IoIosCloseCircle
        className="absolute right-0 top-1/2 -translate-1/2  text-gray-400 text-2xl "
        onClick={handleClose}
      /> */}
    </div>
  );
};

export default CustomSearch;
