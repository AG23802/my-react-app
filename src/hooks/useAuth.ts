import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { User } from "../store/types/user";
import { useLocalStorage } from "./useLocalStorage";
import type { Auth } from "../auth/interfaces/Auth";

interface LoginResponse {
  user: User;
  auth: Auth;
}

export default function useAuth() {
  const context = useContext(UserContext);
    const [storedAuth, setStoredAuth, removeStoredAuth] = useLocalStorage<Auth | null>(
      "auth",
      null,
    );
  if (!context) throw new Error("useAuth must be used within UserProvider");

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
    onSuccess: (loginResponse: LoginResponse) => {
      // ✅ Save TOKENS to storage (Persistence)
      setStoredAuth(loginResponse?.auth);

      // ✅ Dispatch USER to Context (UI State)
      // This makes 'user' available to the rest of your app immediately
      dispatch({ type: "loginSuccess", payload: loginResponse.user });
    },

    // 3. When fetch fails
    onError: (error: Error) => {
      dispatch({ type: "loginError", payload: error.message });
    },
  });

  return {
    user,
    loading, // Now synced with Global Context
    error, // Now synced with Global Context
    login: loginMutation.mutate,
    logout: () => {
      removeStoredAuth();
      dispatch({ type: "logout" });
    },
  };
}
