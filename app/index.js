import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./utils/StateProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Clientes from "./pages/clientes";
import Productos from "./pages/productos";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/error";
import "./index.css";

const ListRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Productos /> },
      {
        path: "clientes",
        element: <Clientes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={ListRouter} />
    </ContextProvider>
  </React.StrictMode>
);
