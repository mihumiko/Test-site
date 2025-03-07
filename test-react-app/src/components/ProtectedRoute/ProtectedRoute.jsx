import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, checkAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      checkAuth().catch((error) => {
        console.error("Auth check failed:", error);
      });
    }
  }, [isAuthenticated, checkAuth]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/authorization" replace />;
  }

  return children;
}
