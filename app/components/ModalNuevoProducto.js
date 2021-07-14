import React,{Component} from 'react';
import Modal from '../Modal';


export default class ModalNuevoProducto extends React.Component{
    constructor(props){
        super(props);
    }
    addNewProduct(){

    }

    render(){
        return(
            <Modal>
                <form onSubmit={this.addNewProduct}>
                    <label>Nombre del producto</label>
                    <input type='text' placeholder='Nombre del producto'></input>
                    <label>Presentacion</label>
                    <input type='text' placeholder='Cantidad'></input>
                    <label>Codigo de Barras</label>
                    <input type='text'></input>
                    <label>Descripcion del producto</label>
                    <textarea type='text' placeholder='Descripcion'></textarea>
                    

                </form>

            </Modal>

        );
    }
}