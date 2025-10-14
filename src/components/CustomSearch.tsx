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

  return (
    <div className="md:w-full max-w-[300px] gap-10 relative ">
      <BiSearch className="absolute right-1 top-1/2 -translate-1/2  text-gray-400 text-2xl " />
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="border-1 px-2 py-1 rounded-md w-full placeholder:p-1"
        placeholder="search recipes"
      />
    </div>
  );
};

export default CustomSearch;
