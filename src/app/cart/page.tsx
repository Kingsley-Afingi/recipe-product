"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
// import { createClient } from "@/supabase/client";
// import Image from "next/image";
import { createClient } from "@/authlib/client";

export default function CartPage() {
  const {
    cart,
    fetchCartFromDB,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  // 🟢 Fetch user and cart on mount
  useEffect(() => {
    const loadUserCart = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) return;

      setUserId(data.user.id);
      await fetchCartFromDB(data.user.id);
    };

    loadUserCart();
  }, []);

  // 🧮 Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!userId) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg font-semibold">Please login to view your cart.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-3">
      {/* Cart Total */}
          <div className="mt-6 flex justify-between border-t py-3">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
             <h1 className="text-2xl font-bold  text-center">🛒 Your Cart</h1>
            <button className="bg-green-600 px-2 py-1 rounded-md text-white cursor-pointer">CheckOut</button>
          </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center gap-3">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Decrease Qty */}
                  <button
                    onClick={() => decreaseQty(item.id, userId)}
                    className="bg-gray-200 px-2 rounded text-xl"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  {/* Increase Qty */}
                  <button
                    onClick={() => increaseQty(item.id, userId)}
                    className="bg-gray-200 px-2 rounded text-xl"
                  >
                    +
                  </button>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.id, userId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          

          {/* Clear Cart Button */}
          <div className="text-center mt-6">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
