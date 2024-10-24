import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="body">
      <article className="menu-int">
        <nav>
          <ul className="nav">
            <li>
              <Link to={`/`}>
                <h2>Productos</h2>
              </Link>
              <button>Nuevo producto</button>
            </li>
            <li>
              <Link to={`/clientes`}>
                <h1>Clientes</h1>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
      <article className="outlet">{<Outlet />}</article>
    </section>
  );
}
