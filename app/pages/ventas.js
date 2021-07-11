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
        camera:''
        }
    this.handleInputChange=this.handleInputChange.bind(this);
    this.runCamera=this.runCamera.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
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
                readers : ["code_128_reader"]
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
    runCamera(){
        var resultCollector = Quagga.ResultCollector.create({
            capture: true,
            capacity: 20,
            blacklist: [{
                code: "WIWV8ETQZ1", format: "code_93"
            }, {
                code: "EH3C-%GU23RK3", format: "code_93"
            }, {
                code: "O308SIHQOXN5SA/PJ", format: "code_93"
            }, {
                code: "DG7Q$TV8JQ/EN", format: "code_93"
            }, {
                code: "VOFD1DB5A.1F6QU", format: "code_93"
            }, {
                code: "4SO64P4X8 U4YUU1T-", format: "code_93"
            }],
            filter: function(codeResult) {
                // only store results which match this constraint
                // e.g.: codeResult
                return true;
            }
        });
        var App = {
            init: function() {
                var self = this;
    
                Quagga.init(this.state, function(err) {
                    if (err) {
                        return self.handleError(err);
                    }
                    //Quagga.registerResultCollector(resultCollector);
                    //App.attachListeners();
                    //App.checkCapabilities();
                    Quagga.start();
                });
            },
            handleError: function(err) {
                console.log(err);
            },
            checkCapabilities: function() {
                var track = Quagga.CameraAccess.getActiveTrack();
                var capabilities = {};
                if (typeof track.getCapabilities === 'function') {
                    capabilities = track.getCapabilities();
                }
                this.applySettingsVisibility('zoom', capabilities.zoom);
                this.applySettingsVisibility('torch', capabilities.torch);
            },
            updateOptionsForMediaRange: function(node, range) {
                console.log('updateOptionsForMediaRange', node, range);
                var NUM_STEPS = 6;
                var stepSize = (range.max - range.min) / NUM_STEPS;
                var option;
                var value;
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                for (var i = 0; i <= NUM_STEPS; i++) {
                    value = range.min + (stepSize * i);
                    option = document.createElement('option');
                    option.value = value;
                    option.innerHTML = value;
                    node.appendChild(option);
                }
            },
            applySettingsVisibility: function(setting, capability) {
                // depending on type of capability
                if (typeof capability === 'boolean') {
                    var node = document.querySelector('input[name="settings_' + setting + '"]');
                    if (node) {
                        node.parentNode.style.display = capability ? 'block' : 'none';
                    }
                    return;
                }
                if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
                    var node = document.querySelector('select[name="settings_' + setting + '"]');
                    if (node) {
                        this.updateOptionsForMediaRange(node, capability);
                        node.parentNode.style.display = 'block';
                    }
                    return;
                }
            },
            initCameraSelection: function(){
                var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();
    
                return Quagga.CameraAccess.enumerateVideoDevices()
                .then(function(devices) {
                    function pruneText(text) {
                        return text.length > 30 ? text.substr(0, 30) : text;
                    }
                    var $deviceSelection = document.getElementById("deviceSelection");
                    while ($deviceSelection.firstChild) {
                        $deviceSelection.removeChild($deviceSelection.firstChild);
                    }
                    devices.forEach(function(device) {
                        var $option = document.createElement("option");
                        $option.value = device.deviceId || device.id;
                        $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
                        $option.selected = streamLabel === device.label;
                        $deviceSelection.appendChild($option);
                    });
                });
            },
            attachListeners: function() {
                var self = this;
    
                self.initCameraSelection();
                $(".controls").on("click", "button.stop", function(e) {
                    e.preventDefault();
                    Quagga.stop();
                    self._printCollectedResults();
                });
    
                $(".controls .reader-config-group").on("change", "input, select", function(e) {
                    e.preventDefault();
                    var $target = $(e.target),
                        value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
                        name = $target.attr("name"),
                        state = self._convertNameToState(name);
    
                    console.log("Value of "+ state + " changed to " + value);
                    self.setState(state, value);
                });
            },
            _printCollectedResults: function() {
                var results = resultCollector.getResults(),
                    $ul = $("#result_strip ul.collector");
    
                results.forEach(function(result) {
                    var $li = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
    
                    $li.find("img").attr("src", result.frame);
                    $li.find("h4.code").html(result.codeResult.code + " (" + result.codeResult.format + ")");
                    $ul.prepend($li);
                });
            },
            _accessByPath: function(obj, path, val) {
                var parts = path.split('.'),
                    depth = parts.length,
                    setter = (typeof val !== "undefined") ? true : false;
    
                return parts.reduce(function(o, key, i) {
                    if (setter && (i + 1) === depth) {
                        if (typeof o[key] === "object" && typeof val === "object") {
                            Object.assign(o[key], val);
                        } else {
                            o[key] = val;
                        }
                    }
                    return key in o ? o[key] : {};
                }, obj);
            },
            _convertNameToState: function(name) {
                return name.replace("_", ".").split("-").reduce(function(result, value) {
                    return result + value.charAt(0).toUpperCase() + value.substring(1);
                });
            },
            detachListeners: function() {
                $(".controls").off("click", "button.stop");
                $(".controls .reader-config-group").off("change", "input, select");
            },
            applySetting: function(setting, value) {
                var track = Quagga.CameraAccess.getActiveTrack();
                if (track && typeof track.getCapabilities === 'function') {
                    switch (setting) {
                    case 'zoom':
                        return track.applyConstraints({advanced: [{zoom: parseFloat(value)}]});
                    case 'torch':
                        return track.applyConstraints({advanced: [{torch: !!value}]});
                    }
                }
            },
            setState: function(path, value) {
                var self = this;
    
                if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                    value = self._accessByPath(self.inputMapper, path)(value);
                }
    
                if (path.startsWith('settings.')) {
                    var setting = path.substring(9);
                    return self.applySetting(setting, value);
                }
                self._accessByPath(self.state, path, value);
    
                console.log(JSON.stringify(self.state));
                App.detachListeners();
                Quagga.stop();
                App.init();
            },


            
            inputMapper: {
                inputStream: {
                    constraints: function(value){
                        if (/^(\d+)x(\d+)$/.test(value)) {
                            var values = value.split('x');
                            return {
                                width: {min: parseInt(values[0])},
                                height: {min: parseInt(values[1])}
                            };
                        }
                        return {
                            deviceId: value
                        };
                    }
                },
                numOfWorkers: function(value) {
                    return parseInt(value);
                },
                decoder: {
                    readers: function(value) {
                        if (value === 'ean_extended') {
                            return [{
                                format: "ean_reader",
                                config: {
                                    supplements: [
                                        'ean_5_reader', 'ean_2_reader'
                                    ]
                                }
                            }];
                        }
                        return [{
                            format: value + "_reader",
                            config: {}
                        }];
                    }
                }
            },
            state: {
                inputStream: {
                    type : "LiveStream",
                    constraints: {
                        width: {min: 640},
                        height: {min: 480},
                        facingMode: "environment",
                        aspectRatio: {min: 1, max: 2}
                    },
                    target: document.querySelector('#interactive')
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 2,
                frequency: 10,
                decoder: {
                    readers : [{
                        format: "code_128_reader",
                        config: {}
                    }]
                },
                locate: true
            },
            lastResult : null
        };
    
        App.init();
    
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
            var code = result.codeResult.code;
    
            if (App.lastResult !== code) {
                App.lastResult = code;
                var $node = null, canvas = Quagga.canvas.dom.image;
    
                $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                $node.find("img").attr("src", canvas.toDataURL());
                $node.find("h4.code").html(code);
                $("#result_strip ul.thumbnails").prepend($node);
            }
        });
    
    }
    render(){
        return(
            <>
            <Modal>
                <div className='modal-background'>
                    <button onClick={this.props.onClick}>Close Modal</button>
                    <button onClick={this.runCamera}>Start</button>
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
                        <Boton_flotante onClick={this.showModalCam} titulo='Scanner Bar'></Boton_flotante>
                        {modal}
                    </div>
                </Ul>
            
        ); 
    }
}

export default Home;