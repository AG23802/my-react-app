// context/UserContext.tsx
import { createContext, useReducer, useEffect, type ReactNode, type Dispatch } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userReducer } from "../reducers/userReducer";
import type { User } from "../types/User.js";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UserContextType extends UserState {
  dispatch: Dispatch<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage("user", null);

  const [state, dispatch] = useReducer(userReducer, {
    user: storedUser, // Initialize from LocalStorage
    loading: false,
    error: null,
  });

  // 🔄 Sync LocalStorage whenever the state.user changes
  useEffect(() => {
    if (state.user) {
      setStoredUser(state.user);
    } else {
      removeStoredUser();
    }
  }, [state.user, setStoredUser, removeStoredUser]);


  // inside UserProvider.tsx
useEffect(() => {
  const initializeUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      // Call your new /me endpoint
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        dispatch({ type: "loginSuccess", payload: userData });
      } else {
        // Token might be expired
        removeStoredUser();
      }
    } catch (err) {
      console.error("Failed to re-authenticate", err);
    }
  };

  initializeUser();
}, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };