import React,{Component}from 'react';
import styled from 'styled-components';
import {FcFullTrash} from 'react-icons/fc';
import { RiEditLine } from "react-icons/ri";
import Modal from '../Modal'
import Boton_flotante from '../components/Boton_flotante';
import {Form} from '../components/formularioComponent';
import CardProducto from '../components/CardProducto';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const ContentGlobal=styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding:5%;
  @media all and (max-width: 800px) {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  @media all and (max-width: 600px) {
    display: grid;
    grid-template-columns:auto;
  }
`;
class Child extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <>
        <Modal>
          <div className='modal-background'>
            <div className='modal-content'>
              <Form>
                <h2>Agregar nuevo producto</h2>
                <input name='nombre'></input>
                <input name='descripcion' type='text'></input>
              </Form>
              <button onClick={this.props.onClick}>Close Modal</button>
            </div> 
          </div>
        </Modal>
      </>
    )
  }
}

class Productos extends Component{
  constructor(){
    super();
    this.state={
      titulo:'',
      descripcion:'',
      _id:'',
      tareas:[],
      showModal:false
    };
    this.handleChange=this.handleChange.bind(this);
    this.addTarea=this.addTarea.bind(this);
    this.showModal=this.showModal.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.deleteTask=this.deleteTask.bind(this);
    this.editTask=this.editTask.bind(this);
    this.fetchTasks=this.fetchTasks.bind(this);
  }
  showModal(){
    this.setState({showModal:true});
  }
  closeModal(){
    this.setState({showModal:false});
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
    let modal=this.state.showModal ? <Child onClick={this.closeModal}/>:null;
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
      <Boton_flotante recargaData={this.fetchTasks}/>
      </div>
      </ContentGlobal>
      
    )
  }
}
  
export default Productos;