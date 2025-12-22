
"use client";

import { useGetCurrentUser } from "@/hooks/useGetUser";
import { useCartStore } from "@/store/useCartStore";
import { CiEdit } from "react-icons/ci";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

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

  // ✅ Use React Query to get the current user
  const { data:currentUser, isLoading, isError, error } = useGetCurrentUser();

  const handleAddToCart = () => {
    if (isLoading) {
      toast.info("Checking your login status...");
      return;
    }

    if (isError || !currentUser) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    // ✅ Add to cart for the authenticated user
    addToCart(
      {
        recipe_id: recipe.id,
        name: recipe.name,
        price: Number(recipe.price),
        image_url: recipe.image,
        quantity: 1,
      },
      currentUser.id // ✅ pulled directly from React Query hook
    );

    toast.success(`${recipe.name} added to your cart!`);
  };

  return (
    <div className="w-full p-2 shadow-[#3232470D] border border-slate-300 rounded-lg shadow hover:shadow-blue-900 transition-all ease-out group relative">
      {/* Admin Buttons */}
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

      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-[150px] object-cover rounded cursor-pointer"
        onClick={() => onView?.(recipe)}
      />

      {/* Recipe Info */}
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

      {/* Rating & Pretime */}
      <div className="flex justify-between mt-2">
        <p>Review-Count</p>
        <p className="flex gap-2 items-center">
          <span className="text-[#FDC040]">5.8</span>
          <span className="text-[#ADADAD]">30</span>
        </p>
      </div>

      <div className="flex justify-between mt-1">
        <h3 className="text-red-500">
          <span className="text-gray-600 font-semibold">Prep time:</span>{" "}
          {recipe.prepTimeMinutes}
        </h3>

        <div className="flex gap-2 items-center">
          <span className="text-[#252525]">
            <FaRegHeart />
          </span>

          {/* ✅ Now uses React Query hook for user check */}
          <button
            onClick={handleAddToCart}
            className="bg-green-500 px-1 text-white rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity md:py-2 md:px-2  cursor-pointer duration-300"
          >
             <FaCartPlus className="text-3xl"/>
          </button>
        </div>
      </div>
    </div>
  );
}


