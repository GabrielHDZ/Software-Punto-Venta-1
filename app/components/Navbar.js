import React from "react";
import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  TiShoppingCart,
  TiClipboard,
  TiGroup,
  TiContacts,
} from "react-icons/ti";
import { IconContext } from "react-icons";

const Navbar = () => {
  return (
    <div>
      <nav className="menu-navbar-superior">
        <ul>
          <li>
            <Link to={`/ventas`}>
              <h1>Ventas</h1>
            </Link>
          </li>
          <li>
            <Link to={`/clientes`}>
              <h1>Clientes</h1>
            </Link>
          </li>
          <li>
            <Link to={`/distribuidores`}>
              <h1>Distribuidores</h1>
            </Link>
          </li>
          <li>
            <Link to={`/product`}>
              <h1>Productos</h1>
            </Link>
          </li>
        </ul>
      </nav>
      {Outlet}
    </div>
  );
};

export default Navbar;
