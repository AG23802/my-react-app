import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ }: ProtectedRouteProps) {
  const { user } = useUser();

  if (!user) {
    console.log("User is not logged in, redirecting to login page.");
    // User is not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // User is logged in → render the protected page
  return <Outlet />;
}