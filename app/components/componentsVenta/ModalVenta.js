import React,{Component} from 'react';
import Modal from '../../Modal';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { TiDelete,TiMinus,TiPlus } from 'react-icons/ti';
import { Form,P,Input,Button } from '../formularioComponent';
import ModalCamera from '../LectorCodeBarras';


const FondoModal=styled.div`
    background-color:rgba(0, 0, 0, 0.5);
    width:100%;
    height: 100%;
    top:0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
`;

const VentanaModal=styled.div`
    background-color:#442c2e;
    display:flex;
    flex-direction:column;
    @media all and (max-width: 600px) {

    }
`;

const ModalTitle=styled.div`
    display:flex;
    flex-direction:row;
    font-size:22px;
    letter-spacing: 2px; /* Espacio entre letras */
    padding: 3px 0px; /* Relleno del boton */
`;
const ModalBody=styled.div`
    display:flex;
    flex-direction:column;
    padding: 10px 5px; /* Relleno del boton */
`;
const BodyOptions=styled.div`
    display:flex;
    flex-direction:row;
`;
class ProdEncontrados extends Component{
    constructor(props){
        super(props)
        this.click=this.click.bind(this);
    }
    click(){
        this.props.click(this.props.produc)
    }
    render(){
        const {iden,produc}=this.props;
        return(
        <button id={iden} onClick={this.click}>{produc.nombre}</button>
    )
    }
    
}

class ListaProductos extends Component{
    constructor(props){
        super(props)
        this.state={
            nombre:this.props.nombre,
            cantidad:this.props.cantidad,
            precioU:this.props.precioUnitario,
            importe:this.props.importe
        }
    }

    render(){
        return(
            <div>
                <P>{this.state.nombre}</P>
                <P>{this.state.cantidad}</P>
            </div>
        )
    }
}
export default class ModalVenta extends React.Component{
    constructor(props){
        super(props)
        this.state={
            scanner:false,
            codigoBarras:'',
            nombre:'',
            precioU:0,
            prod_busqueda:[],
            id_venta_activa:props.id_Venta,
            opciones:true,
            clave:'',
            nombre_seleccionado:'',
            cantidad:1,
            alerta:false,
            lista_product_add:[]
        }
        this.setScanner=this.setScanner.bind(this);
        this.closeScanner=this.closeScanner.bind(this);
        this.asignCodeBar=this.asignCodeBar.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.seleccion=this.seleccion.bind(this);
        this.tipeoCantidad=this.tipeoCantidad.bind(this);
        this.addProduct=this.addProduct.bind(this);
    }
    componentDidMount(){
        fetch(`/api/ventas/listaProducts/activa/${this.state.id_venta_activa}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
        this.setState({lista_product_add:data});
        console.log(this.state);
        });
    }
    setScanner(){
        this.setState({scanner:true})
    }
    closeScanner(){
        this.setState({scanner:false})
    }
    asignCodeBar(codigo){
        fetch(`/api/productos/code/${codigo}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.length===0){
                console.log('no se recuperaron datos del codigo de barras ingresado')
                    this.setState({form:false,existeDatos:false,inexistenciaDatos:true})
            }else{
                data.map(datos=>{
                console.log("datos",datos)
                    if(datos._id){
                        this.setState({
                            nombre:datos.nombre,
                            clave:datos._id,
                            codigoBarras:datos.codigo,
                            precioU:datos.precioVenta,
                            opciones:false
                        })
                    }
                })
            }
        });
    }

    handleChange(e){
        const{name,value}=e.target;
        if(value!=null){
            this.setState({[name]:value},()=>{
                fetch(`/api/productos/name/${this.state.nombre}`)
                .then(res => res.json())
                .then(data => {
                    if(data.length===0){
                        console.log('no existe lo que busca')
                        this.setState({prod_busqueda:[]})
                    }else{
                        this.setState({prod_busqueda:data})
                    }
                    
                });
            });
        }
        //recogemos lo que hay en el input y buscamos en la bd
    }
    seleccion(dataProducto){
        this.setState({
            opciones:false,
            clave:dataProducto._id,
            nombre:dataProducto.nombre,
            precioU:dataProducto.precioVenta
        });
    }
    tipeoCantidad(e){
        const {value}=e.target;
        if(value === ""){
            this.setState({alerta:true});
        }else{
            this.setState({alerta:false});
        }
        this.setState({cantidad:value})
    }
    addProduct(){
        console.log(this.state)
        fetch(`/api/ventas/addProducto/101010`,{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({opciones:true,prod_busqueda:[]})
            console.log(this.state);
        })
    }

    render(){
        let alertaEscritura=this.state.alerta? <span><P>Se esta ecribiendo caracteres no aceptados</P></span>:null
        const{onClose,id_Venta} = this.props;
        let ModalEsc=this.state.scanner?
        <ModalCamera 
        openMenu={this.closeScanner} 
        escribirCodigo={this.asignCodeBar}
        />:null;
        let Opciones=this.state.opciones
        ? (<>
            <button onClick={this.setScanner}>Escanear</button>
            <Form> 
            <P>Nombre del producto</P>
            <Input name='nombre' type='text' onChange={this.handleChange}/>
            {this.state.prod_busqueda.map(busqueda=>{
            return(
                <ProdEncontrados 
                key={busqueda._id} 
                iden={busqueda._id} 
                produc={busqueda} 
                click={this.seleccion}/>
            )
            })}
            </Form>
        </>)
        :
            <Form>
                <P>{this.state.nombre}</P>
                <P>{this.state.precioU}</P>
                <Button onClick={()=>{this.setState((state)=>({cantidad:parseInt(state.cantidad)-1}))}}>
                    <IconContext.Provider value={{ color: "black", size:"2em", title:"Close Modal"}}>
                        <div>
                            <TiMinus/>
                        </div>
                    </IconContext.Provider>
                </Button>
                <Button onClick={()=>{this.setState((state)=>({cantidad:parseInt(state.cantidad)+1}))}}>
                    <IconContext.Provider value={{ color: "black", size:"2em", title:"Close Modal"}}>
                        <div>
                            <TiPlus/>
                        </div>
                    </IconContext.Provider>
                </Button>
                <Input name="cantidad" type="number" onChange={this.tipeoCantidad} value={this.state.cantidad} min="1"/>
                {alertaEscritura}
                <Button onClick={()=>{this.setState({opciones:true})}}>Cancelar</Button>
                <Button onClick={this.addProduct}>Agregar</Button>
            </Form>;
        return(
            <> 
            {ModalEsc}
            <Modal>
                <FondoModal>
                    <VentanaModal>
                        <ModalTitle>
                            <button onClick={onClose}>
                                <IconContext.Provider value={{ color: "black", size:"2em", title:"Close Modal"}}>
                                    <div>
                                        <TiDelete/>
                                    </div>
                                </IconContext.Provider>
                            </button>
                            <P>{this.state.id_venta_activa}</P>
                            <P>{this.state.codigoBarras}</P>
                        </ModalTitle>
                        <ModalBody>
                            {this.state.lista_product_add.map((producto)=>{
                                return(
                                    <ListaProductos key={producto._id} datos={producto}/>
                                )
                            })}
                            <BodyOptions>
                                {Opciones}
                            </BodyOptions>
                        </ModalBody>
                    </VentanaModal>
                </FondoModal>
            </Modal>
            </>
        )
    }
}