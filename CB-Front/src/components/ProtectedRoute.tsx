import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type UserRole = 1 | 20;

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole?: UserRole;
};

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
