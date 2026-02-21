import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useRegister() {
  const { dispatch } = useContext(UserContext)!;

  return useMutation({
    // 1. The actual function that talks to the server
    mutationFn: async (user: any) => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed"); // <- important
    }

      return response.json();
    },
    // 2. What to do when the server says "OK"
    onSuccess: () => {
      console.log("Data saved!");
      dispatch({
        type: "loginSuccess"
      });
    },

    onError: (error) => {
      console.error("Save failed:", error);
    },
  });
}
