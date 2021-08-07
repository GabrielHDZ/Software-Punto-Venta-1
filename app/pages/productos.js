import React,{Component}from 'react';
import styled from 'styled-components';
import {FcFullTrash} from 'react-icons/fc';
import { RiEditLine } from "react-icons/ri";
import Modal from '../Modal'

import { IconContext } from "react-icons";
import {ImQrcode} from 'react-icons/im';
import Boton_flotante from '../components/Boton_flotante';
import {Ul,List,List2,Input,Form,P,DivButtons,Button} from '../components/formularioComponent';


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
        this.delete=this.delete.bind(this);
    }
    delete(id){
      this.props.onDelete(id);
    }
    render(){
        return(
            <Div1>
                <Div2>
                    <h3>{this.props.data.nombre}</h3>
                    <span>{this.props.data.presentacion}</span>
                    <span>{this.props.data.descripcion}</span>
                    <span>{this.props.data.codigo}</span>
                    <Button onClick={this.delete}>Borrar</Button>
                    <Button>Editar</Button>
                </Div2>
            </Div1>
        )
    }
}
class Productos extends Component{
  constructor(){
    super();
    this.state={
      propiedad_btn:'producto',
      tareas:[]
    };
    this.addTarea=this.addTarea.bind(this);
    this.deleteTask=this.deleteTask.bind(this);
    this.editTask=this.editTask.bind(this);
    this.fetchTasks=this.fetchTasks.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTarea(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/productos/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          titulo: this.state.titulo,
          descripcion: this.state.descripcion
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          /* MANDAR ALERTA DE QUE EL PRODUCTO HA SIDO ACTUALIZADO A LA BASE DE DATOS */
          this.setState({_id: '', titulo: '', descripcion: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/productos', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          /* MANDAR ALERTA DE QUE EL PRODUCTO HA SIDO INGRESADO A LA BASE DE DATOS */
          this.setState({titulo: '', descripcion: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }
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

  editTask(id) {
    fetch(`/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          titulo: data.titulo,
          descripcion: data.descripcion,
          _id: data._id
        });
      });
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
              <CardProducto key={tarea._id} data={tarea} onDelete={this.deleteTask} onEdit={this.editTask} />
            )
          })
        }
      <div>
      <Boton_flotante Clase={this.state.propiedad_btn}/>
      </div>
      </ContentGlobal>
    )
  }
}
  
export default Productos;