import React, { Component } from 'react';
import Modal from '../../Modal';
import { IconContext } from 'react-icons';
import { TiDelete, TiMinus, TiPlus } from 'react-icons/ti';
import ModalCamera from '../LectorCodeBarras';
import styles from '../../css/ModalVenta.module.css';
import { ImQrcode } from 'react-icons/im';
class ProdEncontrados extends Component {
    constructor(props) {
        super(props)
        this.click = this.click.bind(this);
    }
    click() {
        this.props.click(this.props.produc)
    }
    render() {
        const { iden, produc } = this.props;
        return (
            <button id={iden} onClick={this.click}>{produc.nombre}</button>
        )
    }
}

class ListaProductos extends Component {
    constructor(props) {
        super(props)
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    componentDidMount() {
        this.props.totales(this.props.datos.importe);
    }
    deleteProduct() {
        this.props.deleteP(this.props.datos._id, this.props.datos.importe)
    }
    render() {
        return (
            <tr>
                <td><p>{this.props.datos.nombre}</p></td>
                <td><p>{this.props.datos.cantidad}</p></td>
                <td><p>{this.props.datos.precioUnitario}</p></td>
                <td><p>{this.props.datos.importe}</p></td>
                <td><button onClick={this.deleteProduct}>Delete</button></td>
            </tr>
        )
    }
}
export default class ModalVenta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scanner: false,
            codigoBarras: '',
            nombre: '',
            precioU: 0,
            prod_busqueda: [],
            id_venta_activa: props.id_Venta,
            opciones: true,
            clave: '',
            nombre_seleccionado: '',
            cantidad: 1,
            alerta: false,
            lista_product_add: [],
            total: 0,
            comprador: ''
        }
        this.setScanner = this.setScanner.bind(this);
        this.closeScanner = this.closeScanner.bind(this);
        this.asignCodeBar = this.asignCodeBar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.seleccion = this.seleccion.bind(this);
        this.tipeoCantidad = this.tipeoCantidad.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.Consulta_productos_venta = this.Consulta_productos_venta.bind(this);
        this.sumaTotales = this.sumaTotales.bind(this);
        this.deleteProducto = this.deleteProducto.bind(this);
        this.completeBuy = this.completeBuy.bind(this);

    }
    componentDidMount() {
        this.Consulta_productos_venta();
    }
    Consulta_productos_venta() {
        fetch(`/api/ventas/listaProducts/activa/${this.state.id_venta_activa}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ lista_product_add: data });
                console.log(this.state);
            });
    }
    setScanner() {
        this.setState({ scanner: true })
    }
    closeScanner() {
        this.setState({ scanner: false })
    }
    asignCodeBar(codigo) {
        fetch(`/api/productos/code/${codigo}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length === 0) {
                    console.log('no se recuperaron datos del codigo de barras ingresado')
                    this.setState({ form: false, existeDatos: false, inexistenciaDatos: true })
                } else {
                    data.map(datos => {
                        console.log("datos", datos)
                        if (datos._id) {
                            this.setState({
                                nombre: datos.nombre,
                                clave: datos._id,
                                codigoBarras: datos.codigo,
                                precioU: datos.precioVenta,
                                opciones: false
                            })
                        }
                    })
                }
            });
    }
    handleChange(e) {
        const { name, value } = e.target;
        if (value != null) {
            this.setState({ [name]: value }, () => {
                fetch(`/api/productos/name/${this.state.nombre}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length === 0) {
                            console.log('no existe lo que busca')
                            this.setState({ prod_busqueda: [] })
                        } else {
                            this.setState({ prod_busqueda: data })
                        }

                    });
            });
        }
        //recogemos lo que hay en el input y buscamos en la bd
    }
    seleccion(dataProducto) {
        this.setState({
            opciones: false,
            clave: dataProducto._id,
            nombre: dataProducto.nombre,
            precioU: dataProducto.precioVenta
        });
    }
    tipeoCantidad(e) {
        const { value } = e.target;
        if (value === "") {
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ cantidad: value })
    }
    addProduct() {
        fetch(`/api/ventas/addProducto/101010`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ opciones: true, prod_busqueda: [], cantidad: 1 })
                this.Consulta_productos_venta();
            })
    }
    sumaTotales(importe) {
        this.setState((state) => ({ total: parseInt(state.total) + importe }));
    }
    deleteProducto(id, importe) {
        if (confirm('eliminar producto?')) {
            fetch(`api/ventas/deleteProdList/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.Consulta_productos_venta();
                    this.setState((state) => ({ total: parseInt(state.total) - importe }));
                    console.log(res);
                });
        }

    }
    completeBuy() {
        console.log(this.state);
        let cliente = prompt(`Venta finalizada, el monto total a pagar es: ${this.state.total} MNX, \n ¿Desea agregar el nombre del cliente?`);
        //Detectamos si el usuario ingreso un valor
        if (cliente != null) {
            alert('Venta concluida a nombre de: ' + cliente);
            fetch(`/api/ventas/${this.state.id_venta_activa}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comprador: cliente,
                    totalVenta: this.state.total
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {

                });
        }
        //Detectamos si el usuario NO ingreso un valor
        else {
            alert("Venta cancelada");
        }
    }

    render() {
        let alertaEscritura = this.state.alerta ? <span><P>Se esta ecribiendo caracteres no aceptados</P></span> : null
        const { onClose, id_Venta } = this.props;
        let ModalEsc = this.state.scanner ?
            <ModalCamera
                openMenu={this.closeScanner}
                escribirCodigo={this.asignCodeBar}
            /> : null;
        let Opciones = this.state.opciones
            ? (<>
                <div className={styles.form}>
                    <p>Nombre del producto</p>
                    <div className={styles.formulario}>
                        <input name='nombre' type='text' onChange={this.handleChange} autoCapitalize='sentences' placeholder='Maseca' />
                        <button onClick={this.setScanner}>
                            <IconContext.Provider value={{ color: "white", size: "2em", title: "Close Modal" }}>
                                <div>
                                    <ImQrcode />
                                </div>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className={styles.listados}>
                    {this.state.prod_busqueda.map(busqueda => {
                        return (
                            <ProdEncontrados
                                key={busqueda._id}
                                iden={busqueda._id}
                                produc={busqueda}
                                click={this.seleccion} />
                        )
                    })}
                </div>
            </>)
            :
            <div className={styles.formSeleccion}>
                <div className={styles.formHeader}>
                    <p>Nombre: {this.state.nombre}</p>
                    <p>Precio de venta: {this.state.precioU} MXN</p>
                </div>
                <div className={styles.formBody}>
                    <button onClick={() => { this.setState((state) => ({ cantidad: parseInt(state.cantidad) - 1 })) }}>
                        <IconContext.Provider value={{ color: "black", size: "2em", title: "Close Modal" }}>
                            <div>
                                <TiMinus />
                            </div>
                        </IconContext.Provider>
                    </button>
                    <input name="cantidad" type="number" onChange={this.tipeoCantidad} value={this.state.cantidad} min="1" />
                    <button onClick={() => { this.setState((state) => ({ cantidad: parseInt(state.cantidad) + 1 })) }}>
                        <IconContext.Provider value={{ color: "black", size: "2em", title: "Close Modal" }}>
                            <div>
                                <TiPlus />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
                {alertaEscritura}
                <div className={styles.formFooter}>
                    <button className={styles.btnCancelProducto} onClick={() => { this.setState({ opciones: true, cantidad: 1 }) }}>Cancelar</button>
                    <button className={styles.btnAddProducto} onClick={this.addProduct}>Agregar</button>
                </div>
            </div>;
        return (
            <>
                {ModalEsc}
                <Modal>
                    <div className={styles.backgroundModal}>
                        <div className={styles.modal}>
                            <div className={styles.titulo}>
                                <h3>Venta activa</h3>
                                <button onClick={onClose}>
                                    <IconContext.Provider value={{ color: "black", size: "2em", title: "Close Modal" }}>
                                        <div>
                                            <TiDelete />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className={styles.cuerpo}>
                                <div className={styles.tabla}>
                                    <table className={styles.tabla}>
                                        <thead>
                                            <tr>
                                                <th><p>Nombre</p></th>
                                                <th><p>Cant</p></th>
                                                <th><p>Pcio U.</p></th>
                                                <th><p>Importe</p></th>
                                                <th><p>Opciones</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lista_product_add.map((producto) => {
                                                return (
                                                    <ListaProductos key={producto._id} datos={producto} totales={this.sumaTotales} deleteP={this.deleteProducto} />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.bodyopciones}>
                                    <div className={styles.opciones}>
                                        {Opciones}
                                    </div>
                                    <div className={styles.terminacion}>
                                        <div className={styles.subTotal}>Total: <br /> {this.state.total}MXN.</div>
                                        <button className={styles.btnTerminacion} onClick={this.completeBuy}>Terminar <br />venta</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}