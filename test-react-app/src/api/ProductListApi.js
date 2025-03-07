import { HOST } from "../data";

export const fetchProductList = async () => {
  const response = await fetch(`${HOST}/products`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Сетевая ошибка");
  }
  return await response.json();
};  

export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${HOST}/admin/delete/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },  
  });
  if (!response.ok) { 
    const error = await response.json();
    throw new Error(error.message || "Ошибка при удалении товара");    
  }
  return await response.json();
};
