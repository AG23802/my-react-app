import type { User } from "../types/User";

export interface Action {
  type: string;
  payload?: any;
}

interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "loginStart":
      return { ...state, loading: true, error: null };
    case "loginSuccess":
      return { user: action.payload, loading: false, error: null };
    case "loginError":
      return { ...state, loading: false, error: action.payload };
    case "logout":
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
}
