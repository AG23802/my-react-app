// context/UserContext.tsx
import { createContext, useReducer, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userReducer } from "../reducers/userReducer";
import type { User } from "../types/User.js";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UserContextType extends UserState {
  dispatch: React.Dispatch<any>;
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

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };