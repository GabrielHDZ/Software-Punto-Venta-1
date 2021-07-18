import React,{Component} from "react";
import Modal from "../Modal";
export default class ModaldeProducto extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <>
            <Modal>
                <div className='modal-background'>
                        <ul>
                            <li>
                                <a onClick={this.closeModalOpenLectorBnt}>Escanear Código</a>
                            <br/>
                            <span>Agregar Venta</span>
                            <br/>
                            <a onClick={this.props.onClose}>Agregar como nuevo producto</a>
                            <br/>
                            <a onClick={this.props.onClose}>Close</a>
                            </li>
                            
                        </ul>
                        <span>Info del producto {this.props.codeProd}</span>
                </div>
            </Modal>
            </>
        )
    }
}