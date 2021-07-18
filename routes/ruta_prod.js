const express = require('express');
const router = express.Router();

//MODELO DE PRODUCTO
const Producto = require('../models/modelo_mongo_producto');

//RUTA LISTAR TODAS LOS PRODUCTOS
router.get('/', async(req, res) => {
    const tarea = await Producto.find();
    res.json(tarea);
});

router.get('/:id', async(req, res) => {
    const tarea = await Producto.findById(req.params.id);
    res.json(tarea);
});
//BUSQUEDA POR MEDIO DE CODIGO DE BARRAS
router.get('/:code', async(req, res) => {
    const tarea = await Producto.find({codigo:req.params.codigo});
    res.json(tarea);
});

router.post('/', async(req, res) => {
    const { nombre,presentacion,codigo,descripcion } = req.body;
    const newProducto = new Producto({ nombre,presentacion,codigo,descripcion });
    await newProducto.save();
    res.json({ status: 'Producto agregado correctamente' });
});

// UPDATE a new task
router.put('/:id', async(req, res) => {
    const { titulo, descripcion } = req.body;
    const newTask = { titulo, descripcion };
    await Producto.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Producto actualizado' });
});

router.delete('/:id', async(req, res) => {
    await Producto.findByIdAndRemove(req.params.id);
    res.json({ status: 'Producto Deleted' });
});


module.exports = router;