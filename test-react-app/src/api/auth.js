const API_URL = "http://localhost:5000";

// Функция для обновления токена
export const refreshToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Нет токена авторизации");
  }

  const response = await fetch(`${API_URL}/user/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Ошибка при обновлении токена");
  }

  localStorage.setItem("token", data.token);
  return data.token;
};

// Обертка для API запросов с автоматическим обновлением токена
export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  let response = await fetch(url, options);

  // Если получаем 401, пробуем обновить токен и повторить запрос
  if (response.status === 401) {
    try {
      await refreshToken();
      const newToken = localStorage.getItem("token");
      options.headers["Authorization"] = `Bearer ${newToken}`;
      response = await fetch(url, options);
    } catch (error) {
      throw new Error("Не авторизован");
    }
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Ошибка запроса");
  }

  return data;
};

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

    console.log("Отправка запроса на проверку авторизации...");
    const response = await fetch(`${API_URL}/user/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Получен ответ:", response.status);
    const data = await response.json();
    console.log("Данные ответа:", data);

    if (!response.ok) {
      throw new Error(data.message || "Ошибка при проверке авторизации");
    }

    return data;
  } catch (error) {
    console.error("Ошибка в checkAuth:", error);
    throw error;
  }
};
