
"use client";

import { createClient } from "@/authlib/client";
import { useCartStore } from "@/store/useCartStore";
// import { createClient } from "@/supabase/client"; // 👈 Import your Supabase client
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface RecipeCardsProps {
  recipe: any;
  onDelete?: (id: number) => void;
  onEdit?: (recipe: any) => void;
  isAdmin?: boolean;
  onView?: (recipe: any) => void;
}

export default function RecipeCards({
  recipe,
  onEdit,
  onDelete,
  isAdmin,
  onView,
}: RecipeCardsProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [userId, setUserId] = useState<string | null>(null);

  // 👇 Fetch logged-in user ID from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (data?.user) {
        setUserId(data.user.id);
      }
    };

    fetchUser();
  }, []);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // 👇 Now correctly pass both the item and userId
    addToCart(
      {
        recipe_id: recipe.id, // 👈 make sure recipe.id is a UUID
        name: recipe.name,
        price: Number(recipe.price),
        image_url: recipe.image, // 👈 mapped from recipe.image
        quantity: 1,
      },
      userId
    );
  };

  return (
    <div className="w-full p-2 shadow-[#3232470D] border border-slate-300 rounded-lg shadow hover:shadow-blue-900 transition-all ease-out group relative">
      <div className="relative">
        <div className="absolute w-full">
          {isAdmin && (
            <div className="flex items-center justify-between">
              {onEdit && (
                <button
                  className="text-3xl text-blue-500 cursor-pointer"
                  onClick={() => onEdit(recipe)}
                >
                  <CiEdit />
                </button>
              )}
              {onDelete && (
                <button
                  className="text-3xl text-red-500 cursor-pointer"
                  onClick={() => onDelete(recipe.id)}
                >
                  <MdDeleteForever />
                </button>
              )}
            </div>
          )}
        </div>

        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-[150px] object-cover rounded cursor-pointer"
          onClick={() => onView?.(recipe)}
        />
      </div>

      <div className="flex justify-between items-center my-1">
        <small className="text-[#ADADAD]">Dairy Free</small>
        <small className="text-[#ADADAD]">
          Price: <span className="text-black">${recipe.price}</span>
        </small>
      </div>

      <h3 className="font-semibold text-[1rem]">{recipe.name}</h3>
      <p className="text-gray-600">
        <span className="text-gray-600 font-semibold">Ingredients:</span>{" "}
        {Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(", ").substring(0, 20) + "..."
          : recipe.ingredients?.substring(0, 20)}
      </p>

      <p className="text-gray-700">
        <span className="text-gray-600 font-semibold">Instructions:</span>{" "}
        {Array.isArray(recipe.instructions)
          ? recipe.instructions.join(",").substring(0, 20) + "..."
          : ""}
      </p>

      <div className="flex justify-between mt-2">
        <p>Review-Count</p>
        <p className="flex gap-2 items-center">
          <span className="text-[#FDC040]">5.8</span>
          <span className="text-[#ADADAD]">30</span>
        </p>
      </div>

      <div className="flex justify-between mt-1">
        <h3 className="text-red-500">
          <span className="text-gray-600 font-semibold">Pretime:</span>{" "}
          {recipe.prepTimeMinutes}
        </h3>

        <div className="flex gap-2 items-center">
          <span className="text-[#252525]">
            <FaRegHeart />
          </span>

          {/* 👇 Updated to use handleAddToCart */}
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity py-2 px-4 cursor-pointer duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

