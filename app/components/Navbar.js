import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ModalContext } from "../utils/StateProvider";

export default function Navbar() {
  const { updateModal } = useContext(ModalContext);
  return (
    <section className="body">
      <article className="menu-int">
        <nav>
          <ul className="nav">
            <li>
              <Link to={`/`}>
                <h2>Productos</h2>
              </Link>
              <button onClick={updateModal}>Nuevo producto</button>
            </li>
            <li>
              <Link to={`/clientes`}>
                <h2>Clientes</h2>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
      <article className="outlet">{<Outlet />}</article>
    </section>
  );
}
