import React, { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { ImQrcode, ImPlus } from "react-icons/im";
import { MdAddShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import ModalCamera from "./LectorCodeBarras";
import ModalNuevoProducto from "./ModalNuevoProducto";

export default function BotonFlotante() {
  const [ShowBtnScaner, setSHowBtnScanner] = useState(true);
  const [ShowBtnNewProduct, setShowBtnNewProduct] = useState(false);
  const [ShowBtnNewVenta, setShowBtnNewVenta] = useState(false);
  const [ShowModalScanner, setSHowBtnNewScanner] = useState(false);
  const [ShownNuevoProducto, setShowNuevoProducto] = useState(false);
  const [codigo_barra, setCodigoBarra] = useState("");

  function BtnNewProducto() {
    return (
      <>
        {ShowBtnNewProduct && (
          <button>
            <IconContext.Provider
              value={{ color: "white", size: "2em", title: "Ventas" }}
            >
              <div>
                <TiPlusOutline />
              </div>
            </IconContext.Provider>
          </button>
        )}
      </>
    );
  }
  function BtnNewVenta() {
    return (
      <>
        {ShowBtnNewVenta && (
          <button>
            <IconContext.Provider
              value={{ color: "white", size: "2em", title: "Ventas" }}
            >
              <div>
                <MdAddShoppingCart />
              </div>
            </IconContext.Provider>
          </button>
        )}
      </>
    );
  }
  function Boton2() {
    return (
      <>
        {ShowModalScanner && (
          <button>
            <IconContext.Provider
              value={{ color: "white", size: "1.5em", title: "Ventas" }}
            >
              <div>
                <ImQrcode />
              </div>
            </IconContext.Provider>
          </button>
        )}
      </>
    );
  }
  let ModalEscaner = () => {
    ShowBtnScaner && <ModalCamera />;
  };
  function ModalNewProducto() {
    return (
      ShownNuevoProducto && (
        <ModalNuevoProducto
          onClose={closeModals}
          codigo={state.codigo_barra}
          openCam={openCamera}
          onConsult={onConsult}
        />
      )
    );
  }
  return (
    <div className="floating-button">
      <h1>Menu</h1>
      <BtnNewProducto />
      <BtnNewVenta />
      <Boton2 />
      <ModalEscaner />
      <ModalNewProducto />
    </div>
  );
}
