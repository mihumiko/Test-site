const API_URL = "http://localhost:5000";

// Функция для регистрации
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Ошибка при регистрации");
  }
  return data;
};

// Функция для входа
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Ошибка при входе");
  }
  return data;
};

// Функция для проверки авторизации
export const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Нет токена авторизации");
    }

    const response = await fetch(`${API_URL}/user/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка при проверке авторизации");
    }

    return data;
  } catch (error) {
    console.error("Ошибка в checkAuth:", error);
    throw error;
  }
};
