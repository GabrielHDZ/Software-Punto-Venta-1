import React from "react";

export default function CardProducto({ prop }) {
  const { id_producto, nombre, descripcion, precio_unitario, stock_minimo } =
    prop;
  return (
    <article className="ComponentCard">
      <h1>{nombre}</h1>
      <p>
        <span>$</span>
        {precio_unitario}
      </p>
      <p>{descripcion}</p>
    </article>
  );
}
