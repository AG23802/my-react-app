// context/UserContext.tsx
import {
  createContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userReducer } from "../reducers/userReducer";
import type { User } from "../types/User.js";
import { initializeUser } from "../auth/initializeUser.ts";

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
  const [storedAuth, , removeStoredAuth] = useLocalStorage(
    "auth",
    null,
  );

  const [state, dispatch] = useReducer(userReducer, {
    user: null, // Initialize from LocalStorage
    loading: true,
    error: null,
  });

  useEffect(() => {
    console.log("UserProvider mounted, initializing user...");
    initializeUser(dispatch, storedAuth, removeStoredAuth);
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
