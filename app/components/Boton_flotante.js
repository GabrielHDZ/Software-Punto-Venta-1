import React from "react";
import { TiPlusOutline } from "react-icons/ti";
import { ImQrcode } from "react-icons/im";
import { MdAddShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import ModalCamera from "./LectorCodeBarras";
import ModalNuevoProducto from "./ModalNuevoProducto";
import styles from "../css/boton_flotante.module.css";

export default function Boton_flotante({ clase }) {
  const [ShowBtnScaner, setSHowBtnScanner] = useState(true);
  const [ShowBtnNewProduct, setShowBtnNewProduct] = useState(false);
  const [ShowBtnNewVenta, setShowBtnNewVenta] = useState(false);
  const [ShowModalScanner, setSHowBtnNewScanner] = useState(false);
  const [ShownNuevoProducto, setShowNuevoProducto] = useState(false);
  const [codigo_barra, setCodigoBarra] = useState("");

  const handleChange = (event) => {
    /* setMenu({
      ...menu,
      [event.target.name]: event.target.value,
    }); */
  };

  function changeState(status) {}
  function loadModal(clase) {}
  function loadBtn(clase) {}
  function openCamera() {}
  function closeModals() {}
  function asignar_codigo(codigo) {}
  function openNewProducto() {}
  function openNewVenta() {}
  function onConsult() {}
  function openModal() {}

  //Btn Add new Producto
  let btnNewProducto = (
    <button className={styles.Boton_flotante} onClick={this.openNewProducto}>
      <IconContext.Provider
        value={{ color: "white", size: "2em", title: "Ventas" }}
      >
        <div>
          <TiPlusOutline />
        </div>
      </IconContext.Provider>
    </button>
  );
  //Btn Add new Producto
  let btnNewVenta = (
    <button className={styles.Boton_flotante} onClick={this.openModal}>
      <IconContext.Provider
        value={{ color: "white", size: "2em", title: "Ventas" }}
      >
        <div>
          <MdAddShoppingCart />
        </div>
      </IconContext.Provider>
    </button>
  );

  let boton2 = (
    <button className={styles.Btn_flotante2} onClick={openCamera}>
      <IconContext.Provider
        value={{ color: "white", size: "1.5em", title: "Ventas" }}
      >
        <div>
          <ImQrcode />
        </div>
      </IconContext.Provider>
    </button>
  );

  let modalEscaner = (
    <ModalCamera openMenu={closeModals} escribirCodigo={asignar_codigo} />
  );
  let ModalNewProducto = (
    <ModalNuevoProducto
      onClose={closeModals}
      codigo={state.codigo_barra}
      openCam={openCamera}
      onConsult={onConsult}
    />
  );
  return (
    <>
      <div>
        {btnNewProducto}
        {btnNewVenta}
        {boton2}
        {modalEscaner}
        {ModalNewProducto}
      </div>
    </>
  );
}
