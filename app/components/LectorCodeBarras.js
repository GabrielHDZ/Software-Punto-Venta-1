import React, { Component } from "react";
import Quagga from "quagga";
import Modal from "../Modal";
import { IconContext } from "react-icons";
import { TiDelete, TiZoom } from "react-icons/ti";
import styles from "../css/lectorCodeBarras.module.css";

//interface for the component quagga scanner
export default class ModalCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: "code_128",
      resolution: "640x480",
      size: "medium",
      sample: true,
      workers: "4",
      camera: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.runCamera = this.runCamera.bind(this);
    this.stateCode = this.stateCode.bind(this);
  }

  handleInputChange() {
    Quagga.stop();
    this.props.openMenu();
  }
  stateCode(result) {
    this.props.escribirCodigo(result.codeResult.code);
    Quagga.stop();
  }
  componentDidMount() {
    Quagga.CameraAccess.getActiveStreamLabel();
    Quagga.CameraAccess.enumerateVideoDevices().then(function (devices) {
      devices.forEach(function (device) {
        console.log("name device: " + device.label);
      });
    });
    Quagga.init(
      {
        numOfWorkers: 2,
        locate: true,
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 420,
            height: 340,
            facingMode: "environment",
          },
          target: document.querySelector("#interactive"),
        },
        frequency: 10,
        decoder: {
          readers: ["ean_reader"],
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        debug: false,
      },
      function (err) {
        if (err) {
          return self.handleError(err);
        }
        Quagga.start();
      }
    );
  }
  runCamera() {
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });
    Quagga.onDetected(this.stateCode);
  }
  componentWillUnmount() {
    Quagga.offDetected(this.stateCode);
  }

  render() {
    return (
      <Modal>
        <Contenedor>
          <Contenedor2>
            <div id="interactive" className={styles.viewport} />
            <br></br>
            <Contenedor3>
              <button className={styles.buttonSucess} onClick={this.runCamera}>
                <IconContext.Provider
                  value={{ color: "black", size: "2em", title: "Ventas" }}
                >
                  <div>
                    <TiZoom />
                  </div>
                </IconContext.Provider>
              </button>
              <button
                className={styles.buttonCancel}
                onClick={this.handleInputChange}
              >
                <IconContext.Provider
                  value={{ color: "black", size: "2em", title: "Ventas" }}
                >
                  <div>
                    <TiDelete />
                  </div>
                </IconContext.Provider>
              </button>
            </Contenedor3>
          </Contenedor2>
        </Contenedor>
      </Modal>
    );
  }
}
