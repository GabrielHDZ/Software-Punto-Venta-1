import React, { Component } from 'react';
import Boton_flotante from '../components/Boton_flotante';
import ModalVenta from '../components/componentsVenta/ModalVenta';
import styles from '../css/ventas.module.css';
import { GrAddCircle } from 'react-icons/gr'
import { IconContext } from "react-icons";
import { TiHeadphones } from 'react-icons/ti';

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
                    {this.state.lista_prod.map(producto => {
                        return (
                            <tr key={producto._id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precioUnitario} MXN</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.importe} MXN</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>

        )

    }


}

class Filtros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dia: new Date(),
            typeInput: 'text',
            fechaConsulta: '',
        }
        this.filtroSelect = this.filtroSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.escritura = this.escritura.bind(this);
    }
    filtroSelect(e) {
        const { value } = e.target;
        switch (value) {
            case 'Dia':
                this.setState({ typeInput: 'date' })
                break;
            case 'Semana':
                this.setState({ typeInput: 'week' })
                break;
            case 'Mes':
                this.setState({ typeInput: 'month' })
                break;
            default:
                this.setState({ typeInput: 'text' })
                break;
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    escritura() {
        console.log(this.state.fechaConsulta)
    }
    render() {
        console.log(typeof this.state.dia)
        let options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
        let fecha = this.state.dia.toLocaleDateString('en-US', options)
        let format = fecha.slice(4);
        return (
            <>
                <h2>Ventas del dia {format}</h2>
                <details>
                    <summary>Aplicar filtros de busqueda</summary>
                    <div>
                        <input type='radio' name='presentacion' value='Dia' onClick={this.filtroSelect} />
                        <label>Dia</label>
                        <input type='radio' name='presentacion' value='Semana' onClick={this.filtroSelect} />
                        <label>Semana</label>
                        <input type='radio' name='presentacion' value='Mes' onClick={this.filtroSelect} />
                        <label>Mes</label>

                        <input type={this.state.typeInput} name='fechaConsulta' onChange={this.handleChange}></input>
                        <button onClick={this.escritura}>Consultar</button>
                    </div>

                </details>
            </>


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
            dia: new Date(),
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
                <aside className={styles.aside}>

                    <Filtros fecha={this.state.dia} />


                </aside>
                <section className={styles.container}>
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
                </section>
                {ModaldeVentas}
                <Boton_flotante Clase={this.state.propiedad_btn} openVenta={this.activarModalVenta} />
            </>
        );
    }
}

export default Home;