import React from 'react';
import styled from 'styled-components';
import {TiPlusOutline} from "react-icons/ti";
import { IconContext } from "react-icons";
import Modal from '../Modal';

const Btn_flotante=styled.button`
    font-size: 14px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #442C2E; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 1px;
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
        font-size: 14px;
        padding: 12px 20px;
        bottom: 20px;
        right: 20px;
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
            this.closeModalOpenLectorBnt=this.closeModalOpenLectorBnt.bind(this);
        }
        closeModalOpenLectorBnt(){
            this.props.onClose();
            this.props.onClick();
        }
        render(){
            return(
                <>
                <Modal>
                    <div className='modal-background'>
                        <Menu>
                            <ul>
                                <Li><a onClick={this.closeModalOpenLectorBnt}>Escanear Código</a></Li>
                                <br/>
                                <Li><span>Agregar Venta</span></Li>
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
                        showBtnModalOptions:true
            }
            this.openModalOptions=this.openModalOptions.bind(this);
            this.closeModalOptions=this.closeModalOptions.bind(this);
            this.closeModalOpenLector=this.closeModalOpenLector.bind(this);
        }
        closeModalOpenLector(){
            this.props.onClick();
            this.setState({showOptions:false,showBtnModalOptions:true})
            
        }
        openModalOptions(){
            this.setState({showOptions:true,showBtnModalOptions:false})
        }

        closeModalOptions(){
            this.setState({showOptions:false,showBtnModalOptions:true})
        }
        render(){
            let modal=this.state.showOptions? <ModalOpciones onClose={this.closeModalOptions} onClick={this.props.onClick}/>:null
            let btn_modal=this.state.showBtnModalOptions? (<Btn_flotante onClick={this.openModalOptions}>
                <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                    <div>
                        <TiPlusOutline />
                    </div>
                </IconContext.Provider>
            </Btn_flotante>):null
            return(
                <>
                    <div>
                        {btn_modal}
                        {modal}
                    </div>
                </>
            )
        }
    }