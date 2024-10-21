import React, { useState, useEffect } from "react";
import CardProducto from "../components/productos/cardProductos";
import { ajax } from "../utils/fetch";
import Modal from "../Modal";
import BotonFlotante from "../components/Boton_flotante";
import { IconContext } from "react-icons";
import { ImPlus } from "react-icons/im";
function ModalP({ close }) {
  return (
    <div className="modal">
      <h1>Modal Products</h1>
      <button onClick={close}>CLose</button>
    </div>
  );
}
const Ventana = ({ btn }) => <>{btn && <button>Click me</button>}</>;

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
        <button className="floating-button" onClick={() => setShowModal(true)}>
          <IconContext.Provider
            value={{ color: "white", size: "2em", title: "Ventas" }}
          >
            <div>
              <ImPlus />
            </div>
          </IconContext.Provider>
        </button>
        {showModal && (
          <Modal>
            <ModalP close={() => setShowModal(false)}></ModalP>
          </Modal>
        )}
      </section>
    </>
  );
}
