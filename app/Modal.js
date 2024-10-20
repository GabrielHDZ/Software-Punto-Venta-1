import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  return (
    <section className="backgroundModal">
      {createPortal(children, document.getElementById("modal"))}
    </section>
  );
}
