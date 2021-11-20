import React,{Component} from 'react';
import Modal from '../Modal';
import { Form,P,Input,Button } from './formularioComponent';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import {ImQrcode} from 'react-icons/im';
import {TiDelete} from 'react-icons/ti';
import ModalCamera from './LectorCodeBarras';
import { useForm } from 'react-hook-form';


const Contenedor=styled.div`
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

const Contenedor2=styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    @media all and (max-width: 600px) {
    top:30px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    }
`;
const Contenedor3=styled.div`
    background-color:#442c2e;
    border-radius:5%;
    grid-column: 2;
    grid-row: 4;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
    }
`;

const Contenedor4=styled.div`
    display:flex;
    flex-direction:row;
`;

export default class ModalNuevoProducto extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            presentacion:'',
            codigo:this.props.codigo,
            descripcion:'',
            precioVenta:'',
            precioCompra:'',
            openLector:false,
            existeDatos:false,
            inexistenciaDatos:false,
            form:false,
            _id:this.props.identificador,
            precioCompraError:false,
            precioVentaError:false
        }

        this.modalLector=this.modalLector.bind(this);
        this.closeModalLector=this.closeModalLector.bind(this);
        this.retornoExitosoLector=this.retornoExitosoLector.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.addNewProduct=this.addNewProduct.bind(this);
        this.mostrarForm=this.mostrarForm.bind(this);
        this.CloseAndConsult=this.CloseAndConsult.bind(this);
        this.simulate_barra=this.simulate_barra.bind(this);
    }
    componentDidMount(){
        if(this.state.codigo){
            //consulta a la bd los datos del producto basado en el codigo de barras obtenido
            this.consultaObjeto(this.state.codigo)
        }else if(this.state._id){
            this.consultaObjetoId(this.state._id)
        }else{
            this.setState({form:true});
        }
    }

    consultaObjeto(codi){
        fetch(`/api/productos/code/${codi}`)
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
                            presentacion:datos.presentacion,
                            codigo:datos.codigo,
                            descripcion:datos.descripcion,
                            precioVenta:datos.precioVenta,
                            precioCompra:datos.precioCompra,
                            form:false,
                            existeDatos:true,
                            inexistenciaDatos:false
                        })
                    }
                })
            }
        });
    }

    consultaObjetoId(id){
        fetch(`/api/productos/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.length===0){
                console.log('no se recuperaron datos del codigo de barras ingresado')
                    this.setState({form:false,existeDatos:false,inexistenciaDatos:true})
            }else{
                this.setState({
                    nombre:data.nombre,
                    presentacion:data.presentacion,
                    codigo:data.codigo,
                    descripcion:data.descripcion,
                    precioCompra:data.precioCompra,
                    precioVenta:data.precioVenta,
                    form:true
                })
            }
        });
    }
    modalLector(){
        this.setState({openLector:true});
    }
    closeModalLector(){
        this.setState({openLector:false});
    }
    retornoExitosoLector(code){
        this.setState({openLector:false,codigo:code});
    }
    mostrarForm(){
        this.setState({form:true,existeDatos:false,inexistenciaDatos:false})
    }
    handleChange(e){
        const {name,value}=e.target;
        console.log(name,' :: ',value)
        this.setState({
            [name]:value
        });
        
        if(name==='precioVenta'){
            if(value === ""){
                this.setState({precioVentaError:true});
            }else{
                this.setState({precioVentaError:false});
            }
        }else if(name==='precioCompra'){
            if(value === ""){
                this.setState({precioCompraError:true});
            }else{
                this.setState({precioCompraError:false});
            }
        }else{
            this.setState({
            [name]:value
        });
        }
            
    }
    addNewProduct(e){
        //e Es un evento sintetico
        e.preventDefault(); 
        if(this.state._id){
            fetch(`/api/productos/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify({
                    nombre:this.state.nombre,
                    presentacion:this.state.presentacion,
                    codigo:this.state.codigo,
                    descripcion:this.state.descripcion,
                    precioCompra:this.state.precioCompra,
                    precioVenta:this.state.precioVenta
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({_id:'',nombre:'',presentacion:'',codigo:'',descripcion:'',precioCompra:'',precioVenta:''});
                this.CloseAndConsult();
            });
        }else{
            fetch('/api/productos',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('Respuesta del servidor: ',data);
                this.setState({nombre:'',presentacion:'',codigo:'',descripcion:'',precioVenta:'',precioCompra:''});
                this.CloseAndConsult();
            })
            .catch(err=>console.error(err));
        }
    }

    CloseAndConsult(){
        this.props.onConsult();
        this.props.onClose();
    }
    simulate_barra(){
        this.setState({codigo:'7501011104099'})
    }

    render(){
        let alertaEscrituraPrecioVenta=this.state.precioVentaError
        ? <span><P>Se esta ecribiendo caracteres no aceptados</P></span>
        :null
        let alertaEscrituraPrecioCompra=this.state.precioCompraError
        ? <span><P>Se esta ecribiendo caracteres no aceptados</P></span>
        :null
        let form=this.state.form
        ? (<Form>
            <P>Nombre del Producto</P>
            <Input name='nombre' type='text' onChange={this.handleChange} value={this.state.nombre} placeholder=''></Input>
            <P>Presentacion</P>
            <Input name='presentacion' type='text' onChange={this.handleChange} value={this.state.presentacion} min="1" max="50" placeholder=''></Input>
            <P>Codigo de barras</P>
            <Contenedor4><Input name='codigo' value={this.state.codigo} disabled></Input>
            <Button onClick={this.modalLector}>
                <IconContext.Provider value={{ color: "dark", size:"1.5em", title:"Ventas"}}>
                    <div>
                        <ImQrcode />
                    </div>
                </IconContext.Provider>
            </Button></Contenedor4>
            <P>Descripcion</P>
            <Input name='descripcion' onChange={this.handleChange} value={this.state.descripcion}></Input>
            <P>Precio de compra</P>
            <Input name='precioCompra' onChange={this.handleChange} value={this.state.precioCompra} type="number"></Input>
            {alertaEscrituraPrecioCompra}
            <P>Precio en venta</P>
            <Input name='precioVenta' onChange={this.handleChange} value={this.state.precioVenta} type="number"></Input>
            {alertaEscrituraPrecioVenta}

            <Button onClick={this.simulate_barra}>Simular Code</Button>
            <Button onClick={this.addNewProduct}>Guardar</Button>
        </Form> )
        :null;
        let lectorModal=this.state.openLector
        ? <ModalCamera 
            escribir    Codigo={this.retornoExitosoLector} 
            openMenu={this.closeModalLector}
            />
        :null;
        
        let mensajeExistencia=this.state.existeDatos
        ? (<Form>
                <P>{this.state.nombre}</P>
                <br/>
                <P>{this.state.presentacion}</P>
                <br/>
                <P>{this.state.codigo}</P>
                <br/>
                <P>{this.state.descripcion}</P>
                <br/>
                <P>{this.state.precioVenta}</P>
                <br/>
                <Button>Agregar a venta</Button>
                <Button onClick={this.props.openCam}>Escanear de nuevo</Button>       
            </Form>):null
        let mensajeInexistencia=this.state.inexistenciaDatos?
            (<Form>
                <P>El codigo {this.state.codigo} no pertenece a ningun producto, ¿Desea añadir un nuevo producto?</P>
                <Button onClick={this.props.openCam}>Escanear de nuevo</Button>
                <Button onClick={this.mostrarForm}>Agregar a lista productos de venta</Button>
            </Form>)
        :null
        return(  
            <>
            <Modal>
                <Contenedor>
                    <Contenedor2>
                        <Contenedor3>
                            <button onClick={this.props.onClose}>
                                <IconContext.Provider value={{ color: "black", size:"2em", title:"Close Modal"}}>
                                    <div>
                                        <TiDelete/>
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
}