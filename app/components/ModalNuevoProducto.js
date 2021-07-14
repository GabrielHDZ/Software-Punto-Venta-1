import React,{Component} from 'react';
import Modal from '../Modal';
import { Form,P,Input } from './formularioComponent';
import styled from 'styled-components';

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
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
        color:#000;
    }
`;
const Contenedor3=styled.div`
    background-color:#442c2e;
    border-radius:5%;
    grid-column: 2;
    grid-row: 4;

`;

export default class ModalNuevoProducto extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            cantidad:'',
            precio:'',
            preciou:''
        }
    }
    handleChange(e){
        const{name,value}=e.target;
        this.setState({
            [name]:value
        });
    }
    addNewProduct(e){
        //e Es un evento sintetico
        e.preventDefault(); 
        if(this.state._id){
            fetch(`/api/ventas/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify({
                    nombre:this.state.nombre,
                    cantidad:this.state.cantidad,
                    preciou:this.state.preciou,
                    preciot:this.state.preciot
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({_id:'',nombre:'',cantidad:'',preciou:'',preciot:''});
                this.fetchTask();
            });
        }else{
            //condicion para evaluar si todos los campos del formulario han sido rellenados
            if(this.state.nombre && this.state.cantidad && this.state.preciou && this.state.preciot){
                fetch('/api/ventas',{
                    method:'POST',
                    body:JSON.stringify(this.state),
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('data',data);
                    this.setState({nombre:'',cantidad:'',preciou:'',preciot:''});
                    this.fetchTask();
                })
                .catch(err=>console.error(err));
            }else{
            alert('faltan campos por rellenar');
            }
        }
    }

    render(){
        return(
            <Modal>
                <Contenedor>
                    <Contenedor2>
                        <Contenedor3>
                            <button onClick={this.props.onClose}>Close</button>
                            <Form onSubmit={this.addNewProduct}>
                                <P>Nombre del Producto</P>
                                <Input name='nombre' type='text' onChange={this.handleChange} value={this.state.nombre} placeholder='Galletas Marias'></Input>
                                <P>Presentacion</P>
                                <Input name='presentacion' type='text' onChange={this.handleChange} value={this.state.cantidad} min="1" max="50" placeholder='Cantidad en numero'></Input>
                                <P>Codigo de barras</P>
                                <Input name='codigo' type='text' onChange={this.handleChange} value={this.state.preciou} min="1" placeholder='$$'></Input>
                                <P>Descripcion</P>
                                <Input name='preciot' onChange={this.handleChange} value={this.state.preciot} min="1" placeholder='$$' disabled></Input>
                                <Input type='submit' value='Guardar'></Input>
                            </Form>  
                        </Contenedor3>
                    </Contenedor2>
                </Contenedor>
            </Modal>
        );
    }
}