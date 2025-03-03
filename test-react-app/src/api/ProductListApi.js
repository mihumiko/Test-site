import { HOST } from "../data";

export const fetchProductList = async () => {
  const response = await fetch(`${HOST}/products`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Сетевая ошибка");
  }
  return await response.json();
};
