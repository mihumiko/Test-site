import ProductList from "../components/ProductList/ProductList";
import ProductPage from "../components/ProductPage/ProductPage";
import InfoPage from "../components/InfoPage/InfoPage";
import AuthForm from "../components/Auth/AuthForm";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const publicRoutes = [
  { path: "/authorization", element: "AuthForm" },
];

const protectedRoutes = [
  { path: "/", element: "ProductList" },
  { path: "info/:name", element: "InfoPage" },
  { path: "/product/:id", element: "ProductPage" },
];

export const routes = [
  ...publicRoutes,
  ...protectedRoutes.map(route => ({
    ...route,
    element: route.element,
    protected: true
  }))
];

export const compon = {
  ProductList,
  InfoPage,
  ProductPage,
  AuthForm,
};
