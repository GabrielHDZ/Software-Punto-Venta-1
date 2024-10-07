import React from "react";
import { TiPlusOutline } from "react-icons/ti";
import { ImQrcode } from "react-icons/im";
import { MdAddShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import ModalCamera from "./LectorCodeBarras";
import ModalNuevoProducto from "./ModalNuevoProducto";
import styles from "../css/boton_flotante.module.css";

function Boton_flotante({ clase }) {
  const [menu, setMenu] = useState({
    showBtnEscaner: true,
    showBtnNewProducto: false,
    showBtnNewVenta: false,
    showModalEscaner: false,
    showNuevoProducto: false,
    codigo_barra: "",
  });

  const handleChange = (event) => {
    setMenu({
      ...menu,
      [event.target.name]: event.target.value,
    });
  };

  function changeState(status) {
    setMenu({
      ...menu,
      status: true,
    });
  }
  function loadModal(clase) {
    if (clase === "venta") {
      changeState("showModalVenta");
    } else if (clase === "producto") {
      changeState("showModalNewProducto");
    }
  }
  function loadBtn(clase) {
    if (clase === "venta") {
      changeState("showModalVenta");
    } else if (clase === "producto") {
      changeState("showModalNewProducto");
    }
  }
  function openCamera() {
    setMenu({
      ...menu,
      showModalEscaner: true,
    });
  }
  function closeModals() {
    this.setState({
      ...menu,
      showBtnEscaner: true,
      showBtnNewProducto: false,
      showBtnNewVenta: false,
      showModalEscaner: false,
      showNuevoProducto: false,
    });
    if (this.props.Clase === "venta") {
      this.setState({ showBtnNewVenta: true });
    } else if (this.props.Clase === "producto") {
      this.setState({ showBtnNewProducto: true });
    }
  }
  function asignar_codigo(codigo) {
    this.setState({
      codigo_barra: codigo,
      showNuevoProducto: true,
      showBtnEscaner: false,
      showBtnNewProducto: false,
      showBtnNewVenta: false,
      showModalEscaner: false,
    });
  }
  function openNewProducto() {
    this.setState({
      showBtnEscaner: false,
      showBtnNewProducto: false,
      showBtnNewVenta: false,
      showModalEscaner: false,
      showNuevoProducto: true,
    });
  }
  function openNewVenta() {
    this.setState({
      showBtnEscaner: false,
      showBtnNewProducto: false,
      showBtnNewVenta: true,
      showModalEscaner: false,
      showNuevoProducto: false,
    });
  }
  function onConsult() {
    this.props.onConsult();
  }
  function openModal() {
    this.props.openVenta();
  }

  //Btn Add new Producto
  let btnNewProducto = this.state.showBtnNewProducto ? (
    <button className={styles.Boton_flotante} onClick={this.openNewProducto}>
      <IconContext.Provider
        value={{ color: "white", size: "2em", title: "Ventas" }}
      >
        <div>
          <TiPlusOutline />
        </div>
      </IconContext.Provider>
    </button>
  ) : null;
  //Btn Add new Producto
  let btnNewVenta = this.state.showBtnNewVenta ? (
    <button className={styles.Boton_flotante} onClick={this.openModal}>
      <IconContext.Provider
        value={{ color: "white", size: "2em", title: "Ventas" }}
      >
        <div>
          <MdAddShoppingCart />
        </div>
      </IconContext.Provider>
    </button>
  ) : null;

  let boton2 = this.state.showBtnEscaner ? (
    <button className={styles.Btn_flotante2} onClick={this.openCamera}>
      <IconContext.Provider
        value={{ color: "white", size: "1.5em", title: "Ventas" }}
      >
        <div>
          <ImQrcode />
        </div>
      </IconContext.Provider>
    </button>
  ) : null;

  let modalEscaner = this.state.showModalEscaner ? (
    <ModalCamera
      openMenu={this.closeModals}
      escribirCodigo={this.asignar_codigo}
    />
  ) : null;
  let ModalNewProducto = this.state.showNuevoProducto ? (
    <ModalNuevoProducto
      onClose={this.closeModals}
      codigo={this.state.codigo_barra}
      openCam={this.openCamera}
      onConsult={this.onConsult}
    />
  ) : null;
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
