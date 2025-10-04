"use client"
export interface RecipePayload {
  name: string;
  prepTimeMinutes: string;
  price: string;
  ingredients: string[];   // 👈 arrays
  instructions: string[];
  image: string;
}
