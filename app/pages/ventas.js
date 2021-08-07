import React, { Component } from 'react';
import {Ul,List,List2,Input,Form,P,DivButtons,Contenedor3} from '../components/formularioComponent';
import {IconContext} from 'react-icons';
import { BiEdit,BiTrash} from "react-icons/bi";
import Boton_flotante from '../components/Boton_flotante';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            propiedad_btn:'venta',
            nombre:'',
            cantidad:'',
            preciou:'',
            preciot:'',
            _id:'',
            formResponsivo:true,
            ventas:[]
        };
        this.handleChange=this.handleChange.bind(this);
        this.addTarea=this.addTarea.bind(this);
    }
    handleChange(e){
        const{name,value}=e.target;
        if(name==='cantidad' || name==='preciou'){
            let sumatt=this.state.cantidad*this.state.preciou;
            this.setState({preciot:sumatt});
        };
        this.setState({
            [name]:value
        });
    }

    addTarea(e){
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

    deleteTask(id){
        if(confirm('Desea eliminar esta venta?')){
            fetch(`/api/ventas/${id}`,{
                method:'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                this.fetchTask();
            })
        }
    }
    editTask(id){
        fetch(`/api/ventas/${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('respuesta',data);
            this.setState({
                nombre:data.nombre,
                cantidad:data.cantidad,
                preciou:data.preciou,
                preciot:data.preciot,
                _id:data._id
            });
        });
    }

    componentDidMount(){
        this.checkPixel();
        this.fetchTask();
    }

    checkPixel(){
        if (window.screen.width < 1024) 
            this.setState({formResponsivo:false})
    }
    fetchTask(){
        /* axios.get('/api/ventas')
        .then(res =>res.json())
        .then(data =>{
            this.setState({ventas:data});
            console.log(this.state.ventas);
        }); */
        fetch('/api/ventas')
        .then(res =>res.json())
        .then(data =>{
            this.setState({ventas:data});
            console.log(this.state.ventas);
        });
    }
    render(){
        return(
                <Ul>
                    <List>     
                        <Contenedor3>
                            <Form onSubmit={this.addTarea}>
                                <P>Producto</P>
                                <Input name='nombre' type='text' onChange={this.handleChange} value={this.state.nombre} placeholder='Galletas Marias'></Input>
                                <P>Cantidad</P>
                                <Input name='cantidad' type='number' onChange={this.handleChange} value={this.state.cantidad} min="1" max="50" placeholder='Cantidad en numero'></Input>
                                <P>Precio unitario</P>
                                <Input name='preciou' type='number' onChange={this.handleChange} value={this.state.preciou} min="1" placeholder='$$'></Input>
                                <P>Precio total</P>
                                <Input name='preciot' onChange={this.handleChange} value={this.state.preciot} min="1" placeholder='$$' disabled></Input>
                                <Input type='submit' value='Guardar'></Input>
                            </Form>
                        </Contenedor3>
                    </List>
                    <List2>
                        <table >
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.ventas.map(tarea => {
                                return (
                                    <tr key={tarea._id}>
                                    <td>{tarea.nombre}</td>
                                    <td>{tarea.cantidad}</td>
                                    <td>{tarea.preciou}</td>
                                    <td>{tarea.preciot}</td>
                                    <td>
                                        <DivButtons>
                                            <button onClick={(e) => this.deleteTask(tarea._id,e)}>
                                                <i><IconContext.Provider value={{ color: "palevioletred", size:"1em"}}>
                                                        <div>
                                                            <BiTrash/>
                                                        </div>
                                                    </IconContext.Provider>
                                                </i>
                                            </button>
                                            <button onClick={this.editTask.bind(this,tarea._id)} style={{margin: '4px'}}>
                                                <i><IconContext.Provider value={{ color: "palevioletred", size:"1em"}}>
                                                        <div>
                                                            <BiEdit/>
                                                        </div>
                                                    </IconContext.Provider>
                                                </i>
                                            </button>
                                        </DivButtons>
                                    </td>
                                    </tr>
                                )
                                })
                            }
                            </tbody>
                        </table>
                    </List2>
                    <div>
                        <Boton_flotante Clase={this.state.propiedad_btn}/>
                    </div>
                </Ul>
            
        ); 
    }
}

export default Home;