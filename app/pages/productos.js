import React,{Component}from 'react';
import styled from 'styled-components';
import {FcFullTrash} from 'react-icons/fc';
import { RiEditLine } from "react-icons/ri";


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
class Productos extends Component{
  constructor(){
    super();
    this.state={
      titulo:'',
      descripcion:'',
      _id:'',
      tareas:[]
    };
    this.handleChange=this.handleChange.bind(this);
    this.addTarea=this.addTarea.bind(this);
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
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <form onSubmit={this.addTarea}>
                    <div>
                      <div>
                        <input name="titulo" onChange={this.handleChange} value={this.state.titulo} type="text" placeholder="Task Title" autoFocus/>
                      </div>
                    </div>
                    <div>
                      <div>
                        <textarea name="descripcion" onChange={this.handleChange} value={this.state.descripcion} cols="30" rows="10" placeholder="Task Description"></textarea>
                      </div>
                    </div>

                    <button type="submit">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.tareas.map(tarea => {
                      return (
                        <tr key={tarea._id}>
                          <td>{tarea.titulo}</td>
                          <td>{tarea.descripcion}</td>
                          <td>
                            <Button onClick={() => this.deleteTask(tarea._id)}><FcFullTrash/></Button>
                            <Button primary onClick={() => this.editTask(tarea._id)}style={{margin: '4px'}}><i><RiEditLine/></i></Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
  
export default Productos;