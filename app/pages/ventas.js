import React, { Component } from 'react';
import {Ul,List,List2,Input,Form,P,DivButtons} from '../components/formularioComponent';
import {IconContext} from 'react-icons';
import { BiEdit,BiTrash} from "react-icons/bi";
import Boton_flotante from '../components/Boton_flotante';
import Quagga from 'quagga';
import Modal from '../Modal';



class ModalCamera extends React.Component{
    constructor(props){
    super(props);
    this.state={
        barcode:'code_128',
        resolution:'640x480',
        size:'medium',
        sample:true,
        workers:'4',
        camera:'',
        codigo_barra:''
        }
    this.handleInputChange=this.handleInputChange.bind(this);
    this.runCamera=this.runCamera.bind(this);
    }

    handleInputChange() {
        Quagga.stop();
        this.props.onClick();
      }
    componentDidMount(){
        Quagga.CameraAccess.getActiveStreamLabel();
        Quagga.CameraAccess.enumerateVideoDevices()
                .then(function(devices) {
                    devices.forEach(function(device) {
                        console.log('name device: '+device.label)
                    });
                });
        Quagga.init({
            numOfWorkers: 2,
            locate: true,
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: {min: 640},
                    height: {min: 480},
                    facingMode: "environment"
                },
                target: document.querySelector('#interactive')
            },
            frequency: 10,
            decoder: {
                readers : ["ean_reader"]
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            debug:false
            }
        ,function(err) {
            if (err) {
                return self.handleError(err);
            }
            Quagga.start();
        });
        
    }
    
    stateCode(codex){
        this.setState({codigo_barra:codex})
    }
    runCamera(){
        Quagga.onProcessed(function(result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }
                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });
        Quagga.onDetected(function(result) {
            stateCode(result.codeResult.code);
            console.log(result.codeResult.code);
            Quagga.stop();
        });        
    }
    
    render(){
        return(
            <>
            <Modal>
                <div className='modal-background'>
                    <button onClick={this.handleInputChange}>Close Modal</button>
                    <button onClick={this.runCamera}>Start</button>
                    <div>
                            <h4>Datos del producto{this.state.codigo_barra}</h4>
                        </div>
                    <div className='modal-content'>
                        <div id="interactive"></div>
                        
                    </div> 
                </div>
            </Modal>
            </>
        )
    }
}
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            cantidad:'',
            preciou:'',
            preciot:'',
            _id:'',
            modalCam:false,
            ventas:[]
        };
        this.handleChange=this.handleChange.bind(this);
        this.addTarea=this.addTarea.bind(this);
        this.showModalCam=this.showModalCam.bind(this);
        this.closeModalCam=this.closeModalCam.bind(this);
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

    showModalCam(){
        this.setState({modalCam:true});
    }
    closeModalCam(){
        this.setState({modalCam:false});
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
        let modal=this.state.modalCam? <ModalCamera onClick={this.closeModalCam}/>:null
        return(
                <Ul>
                    <div id="scanner-container"></div>
                    <List>
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
                        <Boton_flotante onClick={this.showModalCam} titulo='+'></Boton_flotante>
                        {modal}
                    </div>
                </Ul>
            
        ); 
    }
}

export default Home;