import { HOST } from "../data";

export const fetchProductById = async (id) => {
 

  const response = await fetch(`${HOST}/products/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Сетевая ошибка");
  }
  return data;
};
