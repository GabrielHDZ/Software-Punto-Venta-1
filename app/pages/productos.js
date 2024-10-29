import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../utils/StateProvider";
import CardProducto from "../components/productos/cardProductos";
import NuevoProducto from "../components/productos/NuevoProducto";
import { ajax } from "../utils/fetch";
import Modal from "../Modal";
import { IconContext } from "react-icons";
import { ImPlus } from "react-icons/im";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const { modal, updateModal } = useContext(ModalContext);
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
    <section className="page_productos">
      {productos.map((e) => (
        <CardProducto key={e.id_producto} prop={e} />
      ))}
      <button className="floating-button">
        <IconContext.Provider
          value={{ color: "white", size: "2em", title: "Ventas" }}
        >
          <div>
            <ImPlus />
          </div>
        </IconContext.Provider>
      </button>
      {modal && (
        <Modal>
          <NuevoProducto close={updateModal}></NuevoProducto>
        </Modal>
      )}
    </section>
  );
}
