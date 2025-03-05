import { routes, compon } from "../../routes/routes";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function RoutesList() {
  return (
    <Box sx={{ flex: 1 }}>
      <Routes>
        {routes.map((route) => {
          const Component = compon[route.element];
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>
                    {Component ? <Component /> : <h1>Компонент не найден</h1>}
                  </ProtectedRoute>
                ) : Component ? (
                  <Component />
                ) : (
                  <h1>Компонент не найден</h1>
                )
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}
