import { HOST } from "../data";

export const fetchProductById = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Используемый токен:", token); // Для отладки

  const response = await fetch(`${HOST}/products/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("Ответ сервера:", data); // Для отладки

  if (!response.ok) {
    throw new Error(data.message || "Сетевая ошибка");
  }
  return data;
};
