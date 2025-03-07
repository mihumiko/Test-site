import { createContext, useState, useContext, useEffect } from "react";
import { checkAuth } from "../api/auth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return false;
    }

    try {
      const data = await checkAuth();
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
      if (
        error.message === "Токен истек" ||
        error.message === "Не авторизован"
      ) {
        console.log(
          "Токен истек или недействителен, выполняем выход из системы"
        );
        logout();
      }
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthStatus();
      setLoading(false);
    };

    initAuth();

    const interval = setInterval(checkAuthStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    checkAuth: checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
