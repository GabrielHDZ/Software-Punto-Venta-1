import React,{Component}from 'react';
import Boton_flotante from '../components/Boton_flotante';
import ModalNuevoProducto from '../components/ModalNuevoProducto';
import styles from '../css/productos.module.css'

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
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                  <h3 className={styles.title}>{this.props.data.nombre}</h3>
                  <h4>{this.props.data.descripcion}</h4>
                </div>
                <div className={styles.cardBody}>
                  <p>Presentacion: {this.props.data.presentacion}</p>
                  <p>Codigo: {this.props.data.codigo}</p>
                  <p>Precio de compra: {this.props.data.precioCompra} MXN</p>
                  <p>Precio de venta: {this.props.data.precioVenta} MXN</p>
                  
                </div>
                <div className={styles.cardOptions}>
                  <button onClick={this.delete}>Borrar producto</button>
                  <button onClick={this.mostrarModal}>Editar informacion</button>
                </div>
                  
                  
              </div>
            </div>
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
      <>
        <div className={styles.contentCard}>
        { 
          this.state.tareas.map(tarea => {
            return (
              <CardProducto key={tarea._id} data={tarea} onDelete={this.deleteTask} onConsult={this.fetchTasks}/>
            )
          })
        }
        </div>
        <Boton_flotante Clase={this.state.propiedad_btn} onConsult={this.fetchTasks}/>
      </>
    )
  }
}
  
export default Productos;