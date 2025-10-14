
import { supabase } from "@/supabase/supabaseClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string; // cart item id (uuid)
  recipe_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
};

type CartStore = {
  cart: CartItem[];
  fetchCartFromDB: (userId: string) => Promise<void>;
  addToCart: (item: Omit<CartItem, "id">, userId: string) => Promise<void>;
  removeFromCart: (cartId: string, userId: string) => Promise<void>;
  increaseQty: (cartId: string, userId: string) => Promise<void>;
  decreaseQty: (cartId: string, userId: string) => Promise<void>;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // 🟢 Load cart when user logs in
      fetchCartFromDB: async (userId) => {
        
        const { data, error } = await supabase
          .from("cart")
          .select("id, recipe_id, name, price, quantity, image_url")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching cart:", error);
          return;
        }

        set({ cart: data || [] });
      },

      // 🟢 Add item (and persist to DB)
      addToCart: async (item, userId) => {
        const existing = get().cart.find(
          (i) => i.recipe_id === item.recipe_id
        );

        if (existing) {
          // If item already exists, increase quantity
          await get().increaseQty(existing.id, userId);
          return;
        }

        const { data, error } = await supabase
          .from("cart")
          .insert([{ ...item, user_id: userId }])
          .select();

          // THIS ERROR CHECKING IS VERY GOOD
        if (error) {
  console.error("Error adding to cart:", JSON.stringify(error, null, 2));
  alert(`Add to cart failed: ${error.message || "Unknown error"}`);
  return;
}


        set({ cart: [...get().cart, ...(data || [])] });
      },

      // 🟢 Remove item
      removeFromCart: async (cartId, userId) => {
        const { error } = await supabase
          .from("cart")
          .delete()
          .eq("id", cartId)
          .eq("user_id", userId);

        if (error) {
          console.error("Error removing from cart:", error);
          return;
        }

        set({
          cart: get().cart.filter((item) => item.id !== cartId),
        });
      },

      // 🟢 Increase quantity
      increaseQty: async (cartId, userId) => {
        const target = get().cart.find((item) => item.id === cartId);
        if (!target) return;

        const newQty = target.quantity + 1;

        const { error } = await supabase
          .from("cart")
          .update({ quantity: newQty })
          .eq("id", cartId)
          .eq("user_id", userId);

        if (!error) {
          set({
            cart: get().cart.map((item) =>
              item.id === cartId ? { ...item, quantity: newQty } : item
            ),
          });
        }
      },

      // 🟢 Decrease quantity
      decreaseQty: async (cartId, userId) => {
        const target = get().cart.find((item) => item.id === cartId);
        if (!target || target.quantity <= 1) return;

        const newQty = target.quantity - 1;

        const { error } = await supabase
          .from("cart")
          .update({ quantity: newQty })
          .eq("id", cartId)
          .eq("user_id", userId);

        if (!error) {
          set({
            cart: get().cart.map((item) =>
              item.id === cartId ? { ...item, quantity: newQty } : item
            ),
          });
        }
      },

      // 🧹 Clear cart (on logout)
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // still persisted for offline use
    }
  )
);
