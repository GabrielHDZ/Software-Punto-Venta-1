import React from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  const modalRoot = document.getElementById("modal");
  return (
    <div>
      <p>Menu modal</p>
      {createPortal(children, modalRoot)}
    </div>
  );
}

export default Modal;
