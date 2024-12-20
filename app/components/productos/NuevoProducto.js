import React from "react";

export default function NuevoProducto({ close }) {
  return (
    <div className="backgroundModal" onClick={close}>
      <form className="producto" onClick={(e) => e.stopPropagation()}>
        <button onClick={close}>Cerrar</button>
        <details>
          <summary>Nombre del producto</summary>
          <p>Escriba el nombre del producto que desea agregar</p>
        </details>
        <input type="text" id="nombre" />
        <details>
          <summary>Descripcion del producto</summary>
          <p>Describa el producto en 120 palabras</p>
        </details>
        <input type="text" id="descripcion" />
        <details>
          <summary>Precio de venta del producto</summary>
          <p>
            Asigne el precio de venta del producto, evaluando el precio de
            compra, transporte y ganancias netas.
          </p>
        </details>
        <input type="number" id="precio_venta" />
        <details>
          <summary>Stock del producto</summary>
          <p>
            Cantidad de piezas que minimamente se deba de almacenar, para evitar
            desabasto del producto
          </p>
        </details>
        <input type="stock" id="stock" />
      </form>
    </div>
  );
}
