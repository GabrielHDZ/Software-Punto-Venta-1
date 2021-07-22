import React from 'react';
import styled from 'styled-components';
import {TiPlusOutline} from "react-icons/ti";
import {ImQrcode} from 'react-icons/im'
import { IconContext } from "react-icons";
import Modal from '../Modal';
import ModalCamera from './LectorCodeBarras';
import ModalNuevoProducto from './ModalNuevoProducto';

const Btn_flotante=styled.button`
    font-size:20px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #442C2E; /* Color de fondo */
    padding: 5px 8px; /* Relleno del boton */
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 1px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    border-bottom: none;
    display: none;
    visibility: hidden;
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
        border-bottom: none;
        display: block;
        visibility: visible;
        
    }
    `;

    const Btn_flotante2=styled.button`
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
    right: 10px;
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

    class ModalOpciones extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return(
                <>
                <Modal>
                    <div className='modal-background'>
                        <Menu>
                            <ul>
                                <Li><span>Agregar Venta</span></Li>
                                <br/>
                                <Li><a onClick={this.props.addNewProducto}>Agregar nuevo producto</a></Li>
                                <br/>
                                <Li><a onClick={this.props.onClose}>Close</a></Li>
                            </ul>
                        </Menu>
                    </div>
                </Modal>
                </>
            )
        }
    }
    export default class Boton_flotante extends React.Component{
        constructor(props){
            super(props)
            this.state={showOptions:false,
                        showBtnModalOptions:true,
                        showModalEscaner:false,
                        showNuevoProducto:false,
                        codigo_barra:''
            }
            this.openModalOptions=this.openModalOptions.bind(this);
            this.closeModals=this.closeModals.bind(this);
            this.openCamera=this.openCamera.bind(this);
            this.asignar_codigo=this.asignar_codigo.bind(this);
            this.openNewProducto=this.openNewProducto.bind(this);
        }
        openModalOptions(){
            this.setState({showOptions:true,
                showBtnModalOptions:false,
                showModalEscaner:false,
                showNuevoProducto:false})
        }
        openCamera(){
            this.setState({showOptions:false,
                showModalEscaner:true,
                showBtnModalOptions:false,
                showNuevoProducto:false})
        }
        closeModals(){
            this.setState({showOptions:false,
                showBtnModalOptions:true,
                showModalEscaner:false,
                showNuevoProducto:false})
        }
        asignar_codigo(codigo){
            this.setState({codigo_barra:codigo,
                showNuevoProducto:true,
                showModalEscaner:false,
                showBtnModalOptions:false,
                showOptions:false})
        }
        openNewProducto(){
            this.setState({showOptions:false,
                showModalEscaner:false,
                showBtnModalOptions:false,
                showNuevoProducto:true})
        }
        render(){
            let boton=this.state.showBtnModalOptions? (<Btn_flotante onClick={this.openModalOptions}>
                <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                    <div>
                        <TiPlusOutline />
                    </div>
                </IconContext.Provider>
            </Btn_flotante>):null;

            let boton2=this.state.showBtnModalOptions?(<Btn_flotante2 onClick={this.openCamera}>
                <IconContext.Provider value={{ color: "white", size:"1.5em", title:"Ventas"}}>
                    <div>
                        <ImQrcode />
                    </div>
                </IconContext.Provider>
            </Btn_flotante2>):null;
            let modalOpciones=this.state.showOptions? <ModalOpciones onClose={this.closeModals} addNewProducto={this.openNewProducto} />:null
            let modalEscaner=this.state.showModalEscaner? <ModalCamera openMenu={this.closeModals} escribirCodigo={this.asignar_codigo}/>:null
            let ModalNewProducto=this.state.showNuevoProducto? <ModalNuevoProducto onClose={this.closeModals} codigo={this.state.codigo_barra} openCam={this.openCamera}/>:null
            return(
                <>
                    <div>
                        {boton}
                        {boton2}
                        {modalOpciones}
                        {modalEscaner}
                        {ModalNewProducto}
                    </div>
                </>
            )
        }
    }