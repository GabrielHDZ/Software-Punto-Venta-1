import React, { Component, useEffect } from "react";
import Boton_flotante from "../components/Boton_flotante";
import styles from "../css/productos.module.css";

export default function Productos() {
  const [propiedad_btn, setPropiedad] = useState("producto");
  const [tarea, setTarea] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  function deleteTask(id) {
    if (confirm("Are you sure you want to delete it?")) {
      fetch(`/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          /* MANDAR ALERTA DE QUE EL PRODUCTO HA SIDO ELIMINADO DE LA BASE DE DATOS */
          this.fetchTasks();
        });
    }
  }
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tareas: data });
        console.log(this.state.tareas);
      });
  }, []);

  return (
    <>
      <div className={styles.contentCard}>
        {this.state.tareas.map((tarea) => {
          return (
            <CardProducto
              key={tarea._id}
              data={tarea}
              onDelete={() => deleteTask}
              onConsult={() => fetchTasks}
            />
          );
        })}
      </div>
      <Boton_flotante
        Clase={this.state.propiedad_btn}
        onConsult={this.fetchTasks}
      />
    </>
  );
}
