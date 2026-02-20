import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(UserContext);

  if (!user) {
    console.log("User is not logged in, redirecting to login page.");
    // User is not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // User is logged in → render the protected page
  return <Outlet />;
}