const express = require('express');
const router = express.Router();
let dates=new Date();
//FORMATO DE FECHA DD/MM/YYYY
//let formato=Intl.DateTimeFormat('nl-BE');
//FORMATO DE FECHA MM/DD/YYYY
let formato=Intl.DateTimeFormat('en-US');
let fecha=formato.format(dates);

//MODELO DE LAS CARACTERISTICAS DE UNA VENTA REALIZADA
const Venta = require('../models/modelo_mongo_venta');

//RUTA LISTAR TODAS LOS PRODUCTOS
router.get('/', async(req, res) => {
    const tarea = await Venta.find();
    res.json(tarea);
});

router.get('/:id', async(req, res) => {
    const tarea = await Venta.findById(req.params.id);
    res.json(tarea);
});

router.post('/', async(req, res) => {
    const { nombre, cantidad,preciou,preciot } = req.body;
    const newVenta = new Venta({ nombre, cantidad,preciou,preciot,fecha });
    await newVenta.save();
    res.json({ status: 'Venta agregada' });
});

// UPDATE a new task
router.put('/:id', async(req, res) => {
    const { nombre,cantidad,preciou,preciot} = req.body;
    const newVenta= { nombre,cantidad,preciou,preciot,fecha};
    await Venta.findByIdAndUpdate(req.params.id, newVenta);
    res.json({ status: 'Venta actualizada' });
});

router.delete('/:id', async(req, res) => {
    await Venta.findByIdAndRemove(req.params.id);
    res.json({ status: 'Venta eliminada, dinero devuelto :(' });
});

module.exports = router;