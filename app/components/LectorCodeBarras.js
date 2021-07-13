import React, { Component } from 'react';
import Quagga from 'quagga';
import Modal from '../Modal';

export default class ModalCamera extends React.Component{
    constructor(props){
    super(props);
    this.state={
        barcode:'code_128',
        resolution:'640x480',
        size:'medium',
        sample:true,
        workers:'4',
        camera:'',
        }
    this.handleInputChange=this.handleInputChange.bind(this);
    this.runCamera=this.runCamera.bind(this);
    this.stateCode=this.stateCode.bind(this);
    }

    handleInputChange() {
        Quagga.stop();
        this.props.onClick();
    }
    stateCode(result){
        this.props.addCode(result.codeResult.code);
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
        Quagga.onDetected(this.stateCode);  
    }
    
    render(){
        return(
            <>
            <Modal>
                <div className='modal-background'>
                    <button onClick={this.handleInputChange}>Close Modal</button>
                    <button onClick={this.runCamera}>Start</button>
                    <div>
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