
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import anxiosInstance from "@/lib/axiosInstance";
import CustomInput from "@/components/Custom-input";
import { RecipeFormData, recipeSchema } from "@/lib/types/recipeSchema";
import { RecipePayload } from "@/lib/types/recipeBackendType";
import { useUpdateRecipe } from "@/hooks/useUpdateRecipe"; // ✅ import your hook

interface RecipeFormProps {
  recipe?: any;
  onClose?: () => void;
}

export default function RecipeForm({ recipe, onClose }: RecipeFormProps) {
  const { control, handleSubmit, reset } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: recipe?.name || "",
      prepTimeMinutes: recipe?.prepTimeMinutes || "",
      ingredients: recipe?.ingredients?.join(", ") || "",
      instructions: recipe?.instructions?.join(". ") || "",
      image: recipe?.image || "",
    },
  });

  const queryClient = useQueryClient();

  // ✅ Add Recipe (POST)
  const mutation = useMutation({
    mutationFn: (newRecipe: RecipePayload) =>
      anxiosInstance.post("/recipes", newRecipe),
    onSuccess: () => {
      toast.success("✅ Recipe added successfully");
      reset();
      onClose?.();
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || "Something went wrong");
    },
  });

  // ✅ Update Recipe (PATCH) using your custom hook
  const updateMutation = useUpdateRecipe();

  const onSubmit = (data: RecipeFormData) => {
    const payload: RecipePayload = {
      ...data,
      ingredients: data.ingredients.split(",").map((i) => i.trim()),
      instructions: data.instructions.split(".").map((i) => i.trim()),
    };

    if (recipe?.id) {
      // 🔹 Use custom hook for update
      updateMutation.mutate(
        { id: recipe.id, data: payload },
        {
          onSuccess: () => {
            onClose?.();
          },
        }
      );
    } else {
      // 🔹 Create new recipe
      mutation.mutate(payload);
    }
  };

  const isPending =
    updateMutation.isPending || mutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border bg-white  rounded-md h-fit w-[320px]"
    >
      <CustomInput
        type="text"
        label="Recipe Name"
        name="name"
        placeholder="Margherita Pizza"
        control={control}
        required
      />

      <CustomInput
        type="text"
        label="Prep Time (minutes)"
        name="prepTimeMinutes"
        placeholder="10"
        control={control}
        required
      />
      <CustomInput
        type="text"
        label="Price"
        name="price"
        placeholder="$50"
        control={control}
        required
      />

      <CustomInput
        type="textarea"
        label="Ingredients (comma separated)"
        name="ingredients"
        placeholder="comma separated"
        control={control}
        required
      />

      <CustomInput
        type="textarea"
        label="Instructions (separated by .)"
        name="instructions"
        placeholder="reheat the oven to 475°F (245°C)."
        control={control}
        required
      />

      <CustomInput
        type="text"
        label="Recipe Image (URL)"
        name="image"
        placeholder="https://cdn.dummyjson.com/recipe-images/2.webp"
        control={control}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isPending
          ? recipe?.id
            ? "Updating..."
            : "Posting..."
          : recipe?.id
          ? "Update Recipe"
          : "Add Recipe"}
      </button>
    </form>
  );
}

