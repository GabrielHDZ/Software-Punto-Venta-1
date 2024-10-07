import React, { Component, useEffect } from "react";
import styles from "../css/productos.module.css";

export default function Productos() {
  const [propiedad_btn, setPropiedad] = useState("producto");
  const [tarea, setTarea] = useState([]);

  return (
    <>
      <div className={styles.contentCard}>
        {this.state.tareas.map((tarea) => {
          return (
            <div
              className={styles.Boton_flotante}
              key={tarea._id}
              data={tarea}
              onDelete={() => console.log("execute delete function")}
              onConsult={() => console.log("execute consult")}
            />
          );
        })}
      </div>
      <div
        className={style.Boton_flotante}
        Clase={this.state.propiedad_btn}
        onConsult={this.fetchTasks}
      />
    </>
  );
}
