import React, { useState, useEffect } from "react";
import CardProducto from "../components/productos/cardProductos";
import { ajax } from "../utils/fetch";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    ajax("/api/productos", { method: "GET" })
      .then((res) => res.json())
      .then(function (response) {
        setProductos(Object.values(response));
      })
      .catch(function (error) {
        console.log(`Error in fetch data ${error}`);
      });
  }, []);
  return (
    <>
      <h1>Productos</h1>
      <section className="page_productos">
        {productos.map((e) => (
          <CardProducto key={e.id_producto} prop={e} />
        ))}
      </section>
    </>
  );
}
