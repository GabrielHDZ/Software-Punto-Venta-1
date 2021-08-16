import React from 'react';
import styled from 'styled-components';
import {TiPlusOutline} from "react-icons/ti";
import {ImQrcode} from 'react-icons/im'
import {MdAddShoppingCart} from 'react-icons/md'
import { IconContext } from "react-icons";
import Modal from '../Modal';
import ModalCamera from './LectorCodeBarras';
import ModalNuevoProducto from './ModalNuevoProducto';

const Btn_flotante=styled.button`
    font-size:18px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #442C2E; /* Color de fondo */
    padding: 5px 8px; /* Relleno del boton */
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        background-color: #FEDBD0; /* Color de fondo al pasar el cursor */
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
        color:#000;
    }
    @media only screen and (max-width: 600px) {
        font-size: 18px;
        padding: 5px 8px; /* Relleno del boton */
        border-radius: 50%;
        bottom: 20px;
        right: 20px;
        
    }
    `;

    const Btn_flotante2=styled.button`
    font-size:16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #442C2E; /* Color de fondo */
    padding: 5px 8px; /* Relleno del boton */
    border-radius: 50%;
    position: fixed;
    bottom: 80px;
    right: 25px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        background-color: #FEDBD0; /* Color de fondo al pasar el cursor */
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
        color:#000;
    }
    @media only screen and (max-width: 600px) {
        font-size: 16px;
        padding: 5px 8px; /* Relleno del boton */
        border-radius: 50%;
        bottom: 80px;
        right: 25px;
    }
    `;

    const Menu=styled.div`
    font-size: 25px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 600px) {
        font-size: 17px;
    }
    `;

    const Li=styled.li`
        top:15px;
        list-style:none;
        transition: all 300ms ease 0ms;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        &:hover {
            background-color: #442C2E; /* Color de fondo al pasar el cursor */
            box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
            transform: translateY(-7px);
        }
    `;

    export default class Boton_flotante extends React.Component{
        constructor(props){
            super(props)
            this.state={showBtnEscaner:true,
                        showBtnNewProducto:false,
                        showBtnNewVenta:false,
                        showModalEscaner:false,
                        showNuevoProducto:false,
                        codigo_barra:''
            }
            this.closeModals=this.closeModals.bind(this);
            this.openCamera=this.openCamera.bind(this);
            this.asignar_codigo=this.asignar_codigo.bind(this);
            this.openNewProducto=this.openNewProducto.bind(this);
            this.openNewCompra=this.openNewCompra.bind(this);
            this.onConsult=this.onConsult.bind(this);
        }

        componentDidMount(){
            if(this.props.Clase==='venta'){
                this.setState({showBtnNewVenta:true})
            }else if(this.props.Clase==='producto'){
                this.setState({showBtnNewProducto:true})
            }
        }
        openCamera(){
            this.setState({
                showModalEscaner:true,
                showBtnEscaner:false,
                showBtnNewProducto:false,
                showBtnNewVenta:false,
                showNuevoProducto:false})
        }
        closeModals(){
            this.setState({showBtnEscaner:true,
                showBtnNewProducto:false,
                showBtnNewVenta:false,
                showModalEscaner:false,
                showNuevoProducto:false})
            if(this.props.Clase==='venta'){
                this.setState({showBtnNewVenta:true})
            }else if(this.props.Clase==='producto'){
                this.setState({showBtnNewProducto:true})
            }
        }
        asignar_codigo(codigo){
            this.setState({codigo_barra:codigo,
                showNuevoProducto:true,
                showBtnEscaner:false,
                showBtnNewProducto:false,
                showBtnNewVenta:false,
                showModalEscaner:false})
        }
        openNewProducto(){
            this.setState({showBtnEscaner:false,
                showBtnNewProducto:false,
                showBtnNewVenta:false,
                showModalEscaner:false,
                showNuevoProducto:true})
        }
        openNewCompra(){
            this.setState({
                showBtnEscaner:false,
                showBtnNewProducto:false,
                showNtbNewVenta:false,
                showModalEscaner:false,
                showNuevoProducto:false
            })
        }

        onConsult(){
            this.props.onConsult();
        }
        render(){
            //Btn Add new Producto
            let btnNewProducto=this.state.showBtnNewProducto? (<Btn_flotante onClick={this.openNewProducto}>
                <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                    <div>
                        <TiPlusOutline />
                    </div>
                </IconContext.Provider>
            </Btn_flotante>):null;
            //Btn Add new Producto
            let btnNewCompra=this.state.showBtnNewVenta? (<Btn_flotante onClick={this.openNewProducto}>
                <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                    <div>
                        <MdAddShoppingCart />
                    </div>
                </IconContext.Provider>
            </Btn_flotante>):null;
            
            let boton2=this.state.showBtnEscaner?(<Btn_flotante2 onClick={this.openCamera}>
                <IconContext.Provider value={{ color: "white", size:"1.5em", title:"Ventas"}}>
                    <div>
                        <ImQrcode />
                    </div>
                </IconContext.Provider>
            </Btn_flotante2>):null;

            let modalEscaner=this.state.showModalEscaner? <ModalCamera openMenu={this.closeModals} escribirCodigo={this.asignar_codigo}/>:null
            let ModalNewProducto=this.state.showNuevoProducto? <ModalNuevoProducto onClose={this.closeModals} codigo={this.state.codigo_barra} openCam={this.openCamera} onConsult={this.onConsult}/>:null
            return(
                <>
                    <div>
                        {btnNewProducto}
                        {btnNewCompra}
                        {boton2}
                        {modalEscaner}
                        {ModalNewProducto}
                    </div>
                </>
            )
        }
    }