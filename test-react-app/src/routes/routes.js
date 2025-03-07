import ProductList from "../components/ProductList/ProductList";
import ProductPage from "../components/ProductPage/ProductPage";
import InfoPage from "../components/InfoPage/InfoPage";
import AuthForm from "../components/Auth/AuthForm";
import AddProduct from "../components/AdminTools/AddProduct";
import EditProduct from "../components/AdminTools/EditProductTools/EditProduct";
import DeleteProduct from "../components/AdminTools/DeleteProduct";
// import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const publicRoutes = [
  { path: "/authorization", element: "AuthForm" },
];

const protectedRoutes = [
  { path: "/", element: "ProductList" },
  { path: "info/:name", element: "InfoPage" },
  { path: "/product/:id", element: "ProductPage" },
  { path: "/admin/add", element: "AddProduct" },
  { path: "/admin/edit", element: "EditProduct" },
  { path: "/admin/delete", element: "DeleteProduct" },
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
  AddProduct,
  EditProduct,
  DeleteProduct,
};
