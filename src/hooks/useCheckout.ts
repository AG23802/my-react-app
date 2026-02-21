import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FruitContext } from "../context/FruitContext";
import { useContext } from "react";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { state, dispatch } = useContext(FruitContext)!;

  return useMutation({
    // 1. The actual function that talks to the server
    mutationFn: async (newCart: any) => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/fruits/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCart),
      });
      return response.json();
    },
    // 2. What to do when the server says "OK"
    onSuccess: () => {
      console.log("Data saved!");
      dispatch({
        type: "CHECKOUT",
        payload: state,
      });
      // This tells React Query to re-fetch the fruits/cart list in case stock levels changed after checkout,
      // so the UI stays in sync with the server
      queryClient.invalidateQueries({ queryKey: ["fruits"] });
    },

    onError: (error) => {
      console.error("Save failed:", error);
    },
  });
}
