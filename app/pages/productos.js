import React, { useState, useEffect } from "react";
import { ajax } from "../utils/fetch";
function Productos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    ajax("/api/productos", { method: "GET" })
      .then((res) => res.json())
      .then(function (response) {
        console.log("render");
        setProductos(Object.values(response));
      })
      .catch(function (error) {
        console.log(`Error in fetch data ${error}`);
      });
  }, []);
  return (
    <>
      <h1>Productos</h1>
      {productos.map((e) => (
        <div key={e.id_producto}>
          <h1>{e.nombre}</h1>
          <h1>{e.precio_unitario}</h1>
        </div>
      ))}
    </>
  );
}
export default Productos;
