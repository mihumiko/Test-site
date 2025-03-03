import ProductList from "../components/ProductList/ProductList";
import ProductPage from "../components/ProductPage/ProductPage";
import InfoPage from "../components/InfoPage/InfoPage";
import AuthForm from "../components/Auth/AuthForm";

export const routes = [
  { path: "/", element: "ProductList" },
  { path: "info/:name", element: "InfoPage" },
  { path: "/product/:id", element: "ProductPage" },
  { path: "/authorization", element: "AuthForm" },
];

export const compon = {
  ProductList: ProductList,
  InfoPage: InfoPage,
  ProductPage: ProductPage,
  AuthForm: AuthForm,
};
