import React,{Component} from 'react';
import Modal from '../../Modal';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { TiDelete } from 'react-icons/ti';
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

export default class ModalVenta extends React.Component{
    constructor(props){
        super(props)
        this.state={
            scanner:false,
            codigoBarras:'',
            nombre:'',
            listaProductos:[],
            prod_busqueda:[]
        }
        this.setScanner=this.setScanner.bind(this);
        this.closeScanner=this.closeScanner.bind(this);
        this.asignCodeBar=this.asignCodeBar.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.seleccion=this.seleccion.bind(this);
    }

    setScanner(){
        this.setState({scanner:true})
    }
    closeScanner(){
        this.setState({scanner:false})
    }
    asignCodeBar(codigo){
        this.setState({codigoBarras:codigo})
    }

    handleChange(e){
        const{name,value}=e.target;
        this.setState({[name]:value},()=>{
            fetch(`/api/productos/name/${this.state.nombre}`)
            .then(res => res.json())
            .then(data => {
                if(data.length===0){
                    console.log('no existe lo que busca')
                    this.setState({prod_busqueda:[]})
                }else{
                    /* data.map(datos=>{
                    this.setState((state)=>({prod_busqueda:[state.prod_busqueda,datos.nombre]}))
                    }) */
                    this.setState({prod_busqueda:data})
                }
                
            });
        });
        //recogemos lo que hay en el input y buscamos en la bd
    }
    seleccion(nombre){
        console.log(nombre)
    }

    render(){
        let ModalEsc=this.state.scanner?<ModalCamera openMenu={this.closeScanner} escribirCodigo={this.asignCodeBar}/>:null;
        return(
            <>
            {ModalEsc}
            <Modal>
                <FondoModal>
                    <VentanaModal>
                        <ModalTitle>
                            <button onClick={this.props.onClose}>
                                <IconContext.Provider value={{ color: "black", size:"2em", title:"Close Modal"}}>
                                    <div>
                                        <TiDelete/>
                                    </div>
                                </IconContext.Provider>
                            </button>
                            <P>{this.state.codigoBarras}</P>
                        </ModalTitle>
                        <ModalBody>
                            <table>
                                <thead>
                                    <tr>
                                        <th><P>Clave</P></th>
                                        <th><P>Codigo</P></th>
                                        <th><P>Nombre</P></th>
                                        <th><P>Peso</P></th>
                                        <th><P>Cantidad</P></th>
                                        <th><P>Unidad</P></th>
                                        <th><P>SubTotal</P></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <BodyOptions>
                                <button onClick={this.setScanner}>opcion1</button>
                            </BodyOptions>
                        </ModalBody>
                            <Form>
                                <P>Nombre del producto</P>
                                <Input name='nombre' type='text' onChange={this.handleChange}/>
                                {this.state.prod_busqueda.map(busqueda=>{
                                return(
                                    <button key={busqueda._id} onClick={this.seleccion(busqueda.nombre)}><P>{busqueda.nombre}</P></button>
                                )
                                })}
                            </Form> 
                    </VentanaModal>
                </FondoModal>
            </Modal>
            </>
        )
    }
}