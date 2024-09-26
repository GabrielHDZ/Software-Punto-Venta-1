import React, { useState } from "react";
import Boton_flotante from "../components/Boton_flotante";
import ModalVenta from "../components/componentsVenta/ModalVenta";
import styles from "../css/ventas.module.css";


export default function Ventas() {
  const [ventaData,setVentaData]= useState({
      propiedad_btn: "venta",
      nombre: "",
      cantidad: "",
      preciou: "",
      preciot: "",
      _id: "",
      ventas: [],
      modalVenta: false,
      ventaActiva: "",
      lista_prod: [],
      dia: new Date(),
      dateFilter: "",
    });
  }
  function activarModalVenta() {
    fetch("/api/ventas/state/63437")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          console.log("Crear nueva venta, No hay activos");
          fetch("/api/ventas", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              "Accept": "Application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              this.activarModalVenta();
            });
        } else if (data.length === 1) {
          //Venta activa
          data.map((dato) => {
            this.setState({ ventaActiva: dato._id });
          });
          this.setState({ modalVenta: true });
        } else {
          console.log("ERROR, existencia simultanea de 2 o mas ventas activas");
        }
      });
  }

  function desactivarModalVenta() {
    this.setState({ modalVenta: false });
  }

  useEffect(() => {
     fetch("/api/ventas")
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         /*                 this.setState({ ventas: data });
             console.log(this.state.ventas);
                 console.log(this.state); */
       });
  }, [])
  

  function updateStateFilter(date) {
    this.setState({ dateFilter: date });
    this.fetchTask();
  }
    
  return (
      <>
        <section className={styles.container}>
          {this.state.ventas.map((venta) => {
            let fecha = venta.fecha;
            let format = fecha.slice(0, 10);
            return (
              <div key={venta._id} className={styles.card}>
                <div className={styles.titulo}>
                  <h3>Nombre del comprador: {venta.comprador}</h3>
                  <h4>Fecha: {format}</h4>
                </div>
                <details>
                  <summary>Lista de productos</summary>
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.lista_prod.map((producto) => {
                        return (
                          <tr key={producto._id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.precioUnitario} MXN</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.importe} MXN</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </details>
                <span>Total: {venta.totalVenta} MXN.</span>
              </div>
            );
          })}
        </section>
        {ModaldeVentas}
        <Boton_flotante
          Clase={this.state.propiedad_btn}
          openVenta={this.activarModalVenta}
        />
      </>
    ); 
}
