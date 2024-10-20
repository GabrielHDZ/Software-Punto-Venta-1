import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section id="nav">
      <article>
        <nav>
          <ul>
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
      </article>
      <br />
      <article>{<Outlet />}</article>
    </section>
  );
}
