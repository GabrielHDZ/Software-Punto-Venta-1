import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export function ContextProvider({ children }) {
  const [modal, setModal] = useState(false);
  const updateModal = () => setModal(modal ? false : true);
  return (
    <ModalContext.Provider value={{ modal, updateModal }}>
      {children}
    </ModalContext.Provider>
  );
}
