const express = require("express");
const pool_mysql = require("../conexion_mysql");
const router = express.Router();
const dates = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
//FORMATO DE FECHA DD/MM/YYYY
//let formato=Intl.DateTimeFormat('nl-BE');
//FORMATO DE FECHA MM/DD/YYYY
const formato = Intl.DateTimeFormat("en-US");
const fecha = formato.format(dates);

//MODELO DE LAS CARACTERISTICAS DE UNA VENTA REALIZADA

//RUTA LISTAR TODAS LOS PRODUCTOS
router.get("/", async (req, res) => {
  res.json(tarea);
});
router.get("/", async (req, res) => res.json({ status: 200 }));

router.get("/:id", async (req, res) => res.json("tarea"));

router.get("/state/:id", async (req, res) => res.json(ta));

router.post("/", async (req, res) => res.json({ status: "Venta creada" }));

//rutas de la lista de venta activa
router.post("/addProducto/:id", async (req, res) =>
  res.json({ status: "Producto agregado" })
);
router.get("/listaProducts/activa/:id", async (req, res) => res.json(tarea));

router.delete("/deleteProdList/:id", async (req, res) =>
  res.json({ status: "Producto eliminado" })
);

router.put("/:id", async (req, res) =>
  res.json({ status: "Venta actualizada" })
);

router.delete("/:id", async (req, res) =>
  res.json({ status: "Venta eliminada" })
);

module.exports = router;
