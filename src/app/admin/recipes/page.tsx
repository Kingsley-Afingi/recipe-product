
"use client";

import { useDeleteRecipe } from "@/hooks/useDeleteRecipe";
import { useState } from "react";
import { useGetRecipes } from "@/hooks/useGetRecipes";
import RecipeCards from "@/recipes/RecipeCard";
import Modal from "@/components/Modal";
import RecipeForm from "@/recipes/RecipeForm";
import AddRecipeModal from "@/components/AddRecipeModal";

export default function ManageRecipes() {
  const { data: recipes, isLoading, isError } = useGetRecipes();
  const DeleteRecipe = useDeleteRecipe();
  const [editingRecipe, setEditingRecipe] = useState(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-160">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch recipes</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Recipes</h1>
      <div className="mb-4">
        <AddRecipeModal />
      </div>

      {/* ✅ Reuse RecipeCard */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
        {recipes?.length ? (
          recipes.map((recipe: any) => (
            <RecipeCards
              key={recipe.id}
              recipe={recipe}
              isAdmin // 👈 now buttons will show
              // explain this code for me to layman understanding  word by word
              onEdit={(r) => setEditingRecipe(r)}
              onDelete={(id) => DeleteRecipe.mutate(id)}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      {/* Edit modal */}
      <Modal isOpen={!!editingRecipe} onClose={() => setEditingRecipe(null)}>
        <RecipeForm
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
        />
      </Modal>
    </div>
  );
}
