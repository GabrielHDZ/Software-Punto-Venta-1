import React,{Component}from 'react';
import styled from 'styled-components';
import {FcFullTrash} from 'react-icons/fc';
import { RiEditLine } from "react-icons/ri";
import Modal from '../Modal'

import { IconContext } from "react-icons";
import {ImQrcode} from 'react-icons/im';
import Boton_flotante from '../components/Boton_flotante';
import {Ul,List,List2,Input,Form,P,DivButtons,Button} from '../components/formularioComponent';
import ModalNuevoProducto from '../components/ModalNuevoProducto';


const ContentGlobal=styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  @media all and (max-width: 800px) {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  @media all and (max-width: 600px) {
    display: grid;
    grid-template-columns:auto;
  }
`;

const Div1=styled.div`
    background-color:#FEDBD0;
    border:1px solid #442c2e;
    padding:0;
    margin:0px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
    }
`;

const Div2=styled.div`
    margin:15px;
`;

class CardProducto extends React.Component{
    constructor(props){
        super(props);
        this.state={
          modalEdicion:false
        }
        this.delete=this.delete.bind(this);
        this.mostrarModal=this.mostrarModal.bind(this);
        this.seeCard=this.seeCard.bind(this);
        this.consult=this.consult.bind(this);
    }
    delete(){
      this.props.onDelete(this.props.data._id);
    }
    mostrarModal(){
      this.setState({modalEdicion:true})
    }
    seeCard(){
      this.setState({modalEdicion:false})
    }
    consult(){
      this.props.onConsult();
    }

    render(){
        let generarModal=this.state.modalEdicion? 
        <ModalNuevoProducto onClose={this.seeCard} identificador={this.props.data._id} onConsult={this.consult}/>:null;
        return(
          <>
            <Div1>
              <Div2>
                  <h3>{this.props.data.nombre}</h3>
                  <span>{this.props.data.presentacion}</span>
                  <span>{this.props.data.descripcion}</span>
                  <span>{this.props.data.codigo}</span>
                  <Button onClick={this.delete}>Borrar</Button>
                  <Button onClick={this.mostrarModal}>Editar</Button>
              </Div2>
            </Div1>
            {generarModal}
            </>
        )
    }
}
class Productos extends Component{
  constructor(){
    super();
    this.state={
      propiedad_btn:'producto',
      tareas:[],
      addTarea:''
    };
    this.deleteTask=this.deleteTask.bind(this);
    this.fetchTasks=this.fetchTasks.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          /* MANDAR ALERTA DE QUE EL PRODUCTO HA SIDO ELIMINADO DE LA BASE DE DATOS */
          this.fetchTasks();
        });
    }
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        this.setState({tareas: data});
        console.log(this.state.tareas);
      });
  }

  render() {
    return (
      <ContentGlobal>
        { 
          this.state.tareas.map(tarea => {
            return (
              <CardProducto key={tarea._id} data={tarea} onDelete={this.deleteTask} onConsult={this.fetchTasks}/>
            )
          })
        }
      <div>
      <Boton_flotante Clase={this.state.propiedad_btn} onConsult={this.fetchTasks}/>
      </div>
      </ContentGlobal>
    )
  }
}
  
export default Productos;