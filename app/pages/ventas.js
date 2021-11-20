import React, { Component } from 'react';
import {Ul,List,List2,Input,Form,P,DivButtons,Contenedor3} from '../components/formularioComponent';
import Boton_flotante from '../components/Boton_flotante';
import ModalVenta from '../components/componentsVenta/ModalVenta';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            propiedad_btn:'venta',
            nombre:'',
            cantidad:'',
            preciou:'',
            preciot:'',
            _id:'',
            ventas:[],
            modalVenta:false,
            ventaActiva:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.addTarea=this.addTarea.bind(this);
        this.activarModalVenta=this.activarModalVenta.bind(this);
        this.desactivarModalVenta=this.desactivarModalVenta.bind(this);
    }
    activarModalVenta(){ 
        fetch('/api/ventas/state/63437')
        .then(res=>res.json())
        .then(data=>{
            console.log(data.length)
            if(data.length === 0){
                console.log('Crear nueva venta, No hay activos');
                fetch('/api/ventas',{
                    method:'POST',
                    body:JSON.stringify(this.state),
                    headers:{
                        'Accept':'Application/json',
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    this.activarModalVenta();
                })
            }
            else if(data.length === 1){
                //Venta activa
                data.map(dato=>{
                    this.setState({ventaActiva:dato._id})
                });
                this.setState({modalVenta:true});
            }else{
                console.log('ERROR, existencia simultanea de 2 o mas ventas activas')
            }
        });
    }

    desactivarModalVenta(){
        this.setState({modalVenta:false})
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
        this.fetchTask();
    }

    fetchTask(){
        fetch('/api/ventas')
        .then(res =>res.json())
        .then(data =>{
            this.setState({ventas:data});
            console.log(this.state.ventas);
        });
    }

    
    render(){
        let ModaldeVentas= this.state.modalVenta? 
        <ModalVenta 
        onClose={this.desactivarModalVenta} 
        id_Venta={this.state.ventaActiva}
        />:null;
        return(
            <Ul>
                <List>     
                    <Contenedor3>
                        
                    </Contenedor3>
                </List>
                <List2>
                    
                </List2>
                <div>
                    {ModaldeVentas}
                    <Boton_flotante Clase={this.state.propiedad_btn} openVenta={this.activarModalVenta}/>
                </div>
            </Ul>
        ); 
    }
}

export default Home;