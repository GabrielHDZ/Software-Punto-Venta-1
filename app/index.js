import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import Clientes from "./pages/clientes";
import Productos from "./pages/productos";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/error";

import "./index.css";

const routerv6 = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "product",
        element: <h1>Children Component</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <RouterProvider router={routerv6} />
  </React.StrictMode>
);
