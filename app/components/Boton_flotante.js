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
    background-color: #E91E63; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 1px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        background-color: #2c2fa5; /* Color de fondo al pasar el cursor */
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
    }
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        padding: 12px 20px;
        bottom: 20px;
        right: 20px;
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
                    <div onClick={this.props.onClick} className='modal-background'>
                        <div className='modal-content'>
                            <Btn_flotante>
                                Código
                            </Btn_flotante>
                        </div> 
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
        }
        openModalOptions(){
            this.setState({showOptions:true,showBtnModalOptions:false})
        }

        closeModalOptions(){
            this.setState({showOptions:false,showBtnModalOptions:true})
        }
        render(){
            let modal=this.state.showOptions? <ModalOpciones onClick={this.closeModalOptions}/>:null
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