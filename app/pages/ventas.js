import React, { Component } from 'react';
import Boton_flotante from '../components/Boton_flotante';
import ModalVenta from '../components/componentsVenta/ModalVenta';
import styles from '../css/ventas.module.css';
import { GrAddCircle } from 'react-icons/gr'
import { IconContext } from "react-icons";

class ProductoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venta: props.venta,
            lista_prod: []
        }
    }

    componentDidMount() {
        fetch(`/api/ventas/listaProducts/activa/${this.state.venta}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ lista_prod: data });
                console.log(this.state);
            });
    }
    render() {
        return (
            <ul>
                {this.state.lista_prod.map(producto => {
                    return (
                        <li key={producto._id}>{producto.nombre} {producto.precioUnitario} {producto.cantidad} {producto.importe}</li>
                    )

                })}
            </ul>

        )

    }


}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propiedad_btn: 'venta',
            nombre: '',
            cantidad: '',
            preciou: '',
            preciot: '',
            _id: '',
            ventas: [],
            modalVenta: false,
            ventaActiva: '',
            lista_prod: [],
        };
        this.activarModalVenta = this.activarModalVenta.bind(this);
        this.desactivarModalVenta = this.desactivarModalVenta.bind(this);
    }
    activarModalVenta() {
        fetch('/api/ventas/state/63437')
            .then(res => res.json())
            .then(data => {
                console.log(data.length)
                if (data.length === 0) {
                    console.log('Crear nueva venta, No hay activos');
                    fetch('/api/ventas', {
                        method: 'POST',
                        body: JSON.stringify(this.state),
                        headers: {
                            'Accept': 'Application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            this.activarModalVenta();
                        })
                }
                else if (data.length === 1) {
                    //Venta activa
                    data.map(dato => {
                        this.setState({ ventaActiva: dato._id })
                    });
                    this.setState({ modalVenta: true });
                } else {
                    console.log('ERROR, existencia simultanea de 2 o mas ventas activas')
                }
            });
    }

    desactivarModalVenta() { this.setState({ modalVenta: false }) }

    componentDidMount() {
        this.fetchTask();
    }

    fetchTask() {
        fetch('/api/ventas')
            .then(res => res.json())
            .then(data => {
                this.setState({ ventas: data });
                console.log(this.state.ventas);
            });
    }

    render() {
        let ModaldeVentas = this.state.modalVenta ?
            <ModalVenta
                onClose={this.desactivarModalVenta}
                id_Venta={this.state.ventaActiva}
            /> : null;
        return (
            <>
                <div className={styles.container}>
                    {this.state.ventas.map(venta => {
                        let fecha = venta.fecha;
                        let format = fecha.slice(0, 10);
                        return (
                            <div key={venta._id} className={styles.card}>
                                <div className={styles.titulo}>
                                    <h3>Nombre del comprador: {venta.comprador}</h3>
                                    <h4>Fecha: {format}</h4>
                                </div>
                                <details>
                                    <summary>
                                        Lista de productos
                                    </summary>

                                    <ProductoList venta={venta._id} />

                                </details>
                                <span>Total: {venta.totalVenta} MXN.</span>
                            </div>

                        )

                    })}
                </div>
                {ModaldeVentas}
                <Boton_flotante Clase={this.state.propiedad_btn} openVenta={this.activarModalVenta} />
            </>

        );
    }
}

export default Home;