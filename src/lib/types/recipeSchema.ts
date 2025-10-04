// recipeSchema.ts
import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  prepTimeMinutes: z.string().min(1, "Prep time is required"),
  price: z.string().min(1, "Price is required"),
  ingredients: z.string().min(1, "Ingredients required"), // 👈 string for form
  instructions: z.string().min(1, "Instructions required"), // 👈 string for form
  image: z.string().url("Must be a valid image URL"),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
