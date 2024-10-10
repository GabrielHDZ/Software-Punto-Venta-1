import React from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  return (
    <div>
      <p>Menu modal</p>
      {createPortal(children, document.getElementById("modal"))}
    </div>
  );
}

export default Modal;
