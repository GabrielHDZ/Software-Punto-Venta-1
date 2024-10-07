import React, { Component } from "react";
import Modal from "../Modal";
import { Form, P, Input, Button } from "./formularioComponent";
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
  function mostrarForm() {
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
      <P>Se esta ecribiendo caracteres no aceptados</P>
    </span>
  ) : null;
  let alertaEscrituraPrecioCompra = this.state.precioCompraError ? (
    <span>
      <P>Se esta ecribiendo caracteres no aceptados</P>
    </span>
  ) : null;
  let form = this.state.form ? (
    <Form>
      <P>Nombre del Producto</P>
      <Input
        name="nombre"
        type="text"
        onChange={this.handleChange}
        value={this.state.nombre}
        placeholder=""
      ></Input>
      <P>Presentacion</P>
      <Input
        name="presentacion"
        type="text"
        onChange={this.handleChange}
        value={this.state.presentacion}
        min="1"
        max="50"
        placeholder=""
      ></Input>
      <P>Codigo de barras</P>
      <div className="style.componente4">
        <Input name="codigo" value={this.state.codigo} disabled></Input>
        <Button onClick={this.modalLector}>
          <IconContext.Provider
            value={{ color: "dark", size: "1.5em", title: "Ventas" }}
          >
            <div>
              <ImQrcode />
            </div>
          </IconContext.Provider>
        </Button>
      </div>
      <P>Descripcion</P>
      <Input
        name="descripcion"
        onChange={this.handleChange}
        value={this.state.descripcion}
      ></Input>
      <P>Precio de compra</P>
      <Input
        name="precioCompra"
        onChange={this.handleChange}
        value={this.state.precioCompra}
        type="number"
      ></Input>
      {alertaEscrituraPrecioCompra}
      <P>Precio en venta</P>
      <Input
        name="precioVenta"
        onChange={this.handleChange}
        value={this.state.precioVenta}
        type="number"
      ></Input>
      {alertaEscrituraPrecioVenta}

      <Button onClick={this.simulate_barra}>Simular Code</Button>
      <Button onClick={this.addNewProduct}>Guardar</Button>
    </Form>
  ) : null;
  let lectorModal = this.state.openLector ? (
    <ModalCamera
      escribir
      Codigo={this.retornoExitosoLector}
      openMenu={this.closeModalLector}
    />
  ) : null;

  let mensajeExistencia = this.state.existeDatos ? (
    <Form>
      <P>{this.state.nombre}</P>
      <br />
      <P>{this.state.presentacion}</P>
      <br />
      <P>{this.state.codigo}</P>
      <br />
      <P>{this.state.descripcion}</P>
      <br />
      <P>{this.state.precioVenta}</P>
      <br />
      <Button>Agregar a venta</Button>
      <Button onClick={this.props.openCam}>Escanear de nuevo</Button>
    </Form>
  ) : null;
  let mensajeInexistencia = this.state.inexistenciaDatos ? (
    <Form>
      <P>
        El codigo {this.state.codigo} no pertenece a ningun producto, ¿Desea
        añadir un nuevo producto?
      </P>
      <Button onClick={this.props.openCam}>Escanear de nuevo</Button>
      <Button onClick={this.mostrarForm}>
        Agregar a lista productos de venta
      </Button>
    </Form>
  ) : null;
  return (
    <>
      <Modal>
        <Contenedor>
          <Contenedor2>
            <Contenedor3>
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
              {form}
              {mensajeExistencia}
              {mensajeInexistencia}
            </Contenedor3>
          </Contenedor2>
        </Contenedor>
      </Modal>
      {lectorModal}
    </>
  );
}
