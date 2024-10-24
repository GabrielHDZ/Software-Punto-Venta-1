import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="body">
      <div className="menu-int">
        <nav>
          <ul className="nav">
            <li>
              <Link to={`/`}>
                <h1>Productos</h1>
              </Link>
            </li>
            <li>
              <Link to={`/clientes`}>
                <h1>Clientes</h1>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="outlet">{<Outlet />}</div>
    </section>
  );
}
