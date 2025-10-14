
"use client";
import { useSearchParams } from "next/navigation";
import { useGetRecipes } from "@/hooks/useGetRecipes";
import CustomSearch from "@/components/CustomSearch";
import RecipeCards from "./RecipeCard";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function RecipeList() {
  const  searchParams = useSearchParams();
  const q = searchParams.get("q") || ""

  const { data: recipes, isLoading, isError } = useGetRecipes(q);
  const [selectedRecipe,setSelectedRecipe] = useState<any | null>(null)

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch recipes</p>;

  return (
        <div>
      <div className=" container mx-auto px-2 py-3">
        
        <div className="mb-4 flex items-center justify-between">
          <CustomSearch />
          {/* this button is for displaying the total mumber of recipes */}
          <button className="px-2 py-1 md:flex hidden bg-gray-700 rounded-lg text-white ">{recipes?.length || 0} recipe{recipes?.length===1 ? "" : "s"} found</button>
        </div>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-3">
            {recipes && recipes.length > 0? (
                recipes.map((recipe:any) => (
                    <RecipeCards key={recipe.id} recipe={recipe}
                    onView={(d)=>setSelectedRecipe(d)}
                    />
                ))
            ):(
                <p className="text-red-500">
                    recipe not found
                </p>
            )}
        </section>
        <div className="w-full flex mt-3 justify-center">
          <button className="px-3 py-1 bg-amber-800 text-white">
            Show More
          </button>
        </div>
      </div>
       <Modal isOpen={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} className="fixed inset-0 bg-black opacity-50" >
        {selectedRecipe && (
          <div className="">
            {/* <div className="fixed inset-0 bg-slate-300 bg-opacity-50"></div> */}
            <div className="p-3 md:w-[600px] w-full  h-fit bg-white items-center justify-center  rounded-md">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-[300px] object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{selectedRecipe.name}</h2>
            <p className="text-gray-700 mt-2">
              <strong>Ingredients:</strong> {selectedRecipe.ingredients}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Instructions:</strong> {selectedRecipe.instructions}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Prep Time:</strong> {selectedRecipe.prepTimeMinutes} min
            </p>
          </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
