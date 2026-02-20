import { createContext, useReducer, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import type { User } from '../types/User.js';
import type { Action } from '../types/Action.js';

interface UserProviderProps {
  children: ReactNode;
}

interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<any>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultCartContext: UserContextType = {
  user: null,
  loading: false,
  error: null,
  dispatch: () => {},
  login: async () => {},
  logout: () => {},
};

const UserContext = createContext(defaultCartContext);

function UserProvider({ children }: UserProviderProps) {
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(
    'user',
    null
  );

  const userReducer = (state: State, action: Action) => {
    switch (action.type) {
      case "loginStart":
        return { ...state, loading: true, error: null };
      case 'loginSuccess':
        return { user: action.payload, loading: false, error: null };
      case 'loginError':
        return { ...state, loading: false, error: action.payload };
      case 'logout':
        return { user: null, loading: false, error: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, { user: storedUser, loading: false, error: null });

  const login = async (username: string, password: string) => {
    dispatch({ type: "loginStart" });
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStoredUser({...data, username: username});
        dispatch({ type: 'loginSuccess', payload: data });
      } else {
        dispatch({ type: 'loginError', payload: data.error });
      }
    } catch (error: any) {
      dispatch({ type: 'loginError', payload: error.message });
    }
  };

  const logout = () => {
    removeStoredUser();
    dispatch({ type: 'logout' });
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
