import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");

  const { dispatch, user, loading, error } = context;

  const loginMutation = useMutation({
    // 1. Before the fetch starts
    onMutate: () => {
      dispatch({ type: "loginStart" }); // Sets loading: true, error: null
    },

    mutationFn: async (credentials: any) => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      return response.json();
    },

    // 2. When fetch succeeds
    onSuccess: (data) => {
      dispatch({ type: "loginSuccess", payload: data });
    },

    // 3. When fetch fails
    onError: (error: Error) => {
      dispatch({ type: "loginError", payload: error.message });
    },
  });

  return {
    user,
    loading, // Now synced with Global Context
    error,   // Now synced with Global Context
    login: loginMutation.mutate,
    logout: () => dispatch({ type: "logout" }),
  };
}
