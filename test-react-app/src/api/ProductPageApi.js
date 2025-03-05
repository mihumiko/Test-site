import { HOST } from "../data";

export const fetchProductById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${HOST}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Сетевая ошибка");
  }
  return await response.json();
};
