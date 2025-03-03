import { HOST } from "../data";

export const fetchProductById = async (id) => {
  const response = await fetch(`${HOST}/products/${id}`);
  if (!response.ok) {
    throw new Error("Сетевая ошибка");
  }
  return await response.json();
};
