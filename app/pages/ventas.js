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

    desactivarModalVenta(){this.setState({modalVenta:false})}

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
                <div>
                    {ModaldeVentas}
                    <Boton_flotante Clase={this.state.propiedad_btn} openVenta={this.activarModalVenta}/>
                </div>
        ); 
    }
}

export default Home;