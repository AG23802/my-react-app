import type { Dispatch } from "react";

export const initializeUser = async (
  dispatch: Dispatch<any>,
  storedAuth: any,
  removeStoredAuth: () => void,
) => {
  console.log(storedAuth);

  const token = storedAuth?.accessToken;
  if (!token) {
    // If no token, just stop loading so the app shows the Login page
    dispatch({ type: "STOP_LOADING" });
    return;
  };

  try {
    // Call your new /me endpoint
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log("Re-authentication successful, user data:", userData);
      dispatch({ type: "loginSuccess", payload: userData });
    } else {
      // Token might be expired
      dispatch({ type: "logout" }); // Ensure loading is set to false here too
      removeStoredAuth();
    }
  } catch (err) {
    console.error("Failed to re-authenticate", err);
    // 🚨 Add this so the app actually loads even if the API is down
    dispatch({ type: "STOP_LOADING" });
  }
};
