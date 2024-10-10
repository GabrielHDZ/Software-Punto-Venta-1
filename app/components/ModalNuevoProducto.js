import React, { Component } from "react";
import Modal from "../Modal";
import { IconContext } from "react-icons";
import { ImQrcode } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import ModalCamera from "./LectorCodeBarras";
import style from "../css/modal_nuevo_producto.module.css";

function ModalNuevoPorducto() {
  const [state, setState] = useState({
    nombre: "",
    presentacion: "",
    codigo: this.props.codigo,
    descripcion: "",
    precioVenta: "",
    precioCompra: "",
    openLector: false,
    existeDatos: false,
    inexistenciaDatos: false,
    form: false,
    _id: this.props.identificador,
    precioCompraError: false,
    precioVentaError: false,
  });

  function componentDidMount() {
    if (this.state.codigo) {
      //consulta a la bd los datos del producto basado en el codigo de barras obtenido
      this.consultaObjeto(this.state.codigo);
    } else if (this.state._id) {
      this.consultaObjetoId(this.state._id);
    } else {
      this.setState({ form: true });
    }
  }

  function consultaObjeto(codi) {
    fetch(`/api/productos/code/${codi}`)
      .then((res) => res.json())
      .then((data) => {});
  }

  function consultaObjetoId(id) {
    fetch(`/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => {});
  }
  function modalLector() {
    this.setState({ openLector: true });
  }
  function closeModalLector() {
    this.setState({ openLector: false });
  }
  function retornoExitosoLector(code) {
    this.setState({ openLector: false, codigo: code });
  }
  function mostrarform() {
    this.setState({ form: true, existeDatos: false, inexistenciaDatos: false });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    if (name === "precioVenta") {
      if (value === "") {
        this.setState({ precioVentaError: true });
      } else {
        this.setState({ precioVentaError: false });
      }
    } else if (name === "precioCompra") {
      if (value === "") {
        this.setState({ precioCompraError: true });
      } else {
        this.setState({ precioCompraError: false });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }
  function addNewProduct(e) {
    //e Es un evento sintetico
    e.preventDefault();
    if (this.state._id) {
      fetch(`/api/productos/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {});
    } else {
      fetch("/api/productos", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.error(err));
    }
  }

  function CloseAndConsult() {
    this.props.onConsult();
    this.props.onClose();
  }
  function simulate_barra() {
    this.setState({ codigo: "7501011104099" });
  }

  let alertaEscrituraPrecioVenta = this.state.precioVentaError ? (
    <span>
      <p>Se esta ecribiendo caracteres no aceptados</p>
    </span>
  ) : null;
  let alertaEscrituraPrecioCompra = this.state.precioCompraError ? (
    <span>
      <p>Se esta ecribiendo caracteres no aceptados</p>
    </span>
  ) : null;
  let form = this.state.form ? (
    <form>
      <p>Nombre del producto</p>
      <input
        name="nombre"
        type="text"
        onChange={this.handleChange}
        value={this.state.nombre}
        placeholder=""
      ></input>
      <p>presentacion</p>
      <input
        name="presentacion"
        type="text"
        onChange={this.handleChange}
        value={this.state.presentacion}
        min="1"
        max="50"
        placeholder=""
      ></input>
      <p>Codigo de barras</p>
      <div className={style.contenedor4}>
        <input name="codigo" value={this.state.codigo} disabled></input>
        <button className={style.button} onClick={this.modalLector}>
          <IconContext.provider
            value={{ color: "dark", size: "1.5em", title: "Ventas" }}
          >
            <div>
              <ImQrcode />
            </div>
          </IconContext.provider>
        </button>
      </div>
      <p>Descripcion</p>
      <input
        name="descripcion"
        onChange={this.handleChange}
        value={this.state.descripcion}
      ></input>
      <p>precio de compra</p>
      <input
        name="precioCompra"
        onChange={this.handleChange}
        value={this.state.precioCompra}
        type="number"
      ></input>
      {alertaEscrituraprecioCompra}
      <p>precio en venta</p>
      <input
        name="precioVenta"
        onChange={this.handleChange}
        value={this.state.precioVenta}
        type="number"
      ></input>
      {alertaEscrituraprecioVenta}

      <button>Simular Code</button>
      <button></button>
    </form>
  ) : null;
  let lectorModal = this.state.openLector ? (
    <ModalCamera escribir Codigo openMenu />
  ) : null;

  let mensajeExistencia = this.state.existeDatos ? (
    <form>
      <p>{this.state.nombre}</p>
      <br />
      <p>{this.state.presentacion}</p>
      <br />
      <p>{this.state.codigo}</p>
      <br />
      <p>{this.state.descripcion}</p>
      <br />
      <p>{this.state.precioVenta}</p>
      <br />
      <button>Agregar a venta</button>
      <button>Escanear de nuevo</button>
    </form>
  ) : null;
  let mensajeInexistencia = this.state.inexistenciaDatos ? (
    <form>
      <p>
        El codigo {this.state.codigo} no pertenece a ningun producto, ¿Desea
        añadir un nuevo producto?
      </p>
      <button onClick={this.props.openCam}>Escanear de nuevo</button>
      <button onClick={this.mostrarform}>
        Agregar a lista productos de venta
      </button>
    </form>
  ) : null;
  return (
    <>
      <Modal>
        <div>
          <div2>
            <div3>
              <button onClick={this.props.onClose}>
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "2em",
                    title: "Close Modal",
                  }}
                >
                  <div>
                    <TiDelete />
                  </div>
                </IconContext.Provider>
              </button>
            </div3>
          </div2>
        </div>
      </Modal>
      {lectorModal}
    </>
  );
}
