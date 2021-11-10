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
const prodVenta=require('../models/modelo_mongo_prodVenta');

//RUTA LISTAR TODAS LOS PRODUCTOS
router.get('/', async(req, res) => {
    const tarea = await Venta.find();
    res.json(tarea);
});

router.get('/:id', async(req, res) => {
    const tarea = await Venta.findById(req.params.id);
    res.json(tarea);
});

router.get('/state/:id', async(req,res) => {
    const ta = await Venta.find({estado:{$eq:true}});
    res.json(ta); 
});

router.post('/', async(req, res) => {
    const comprador='';
    const total='';
    const estado=true;
    const newVenta = new Venta({ comprador,total,fecha,estado});
    await newVenta.save();
    res.json({ status: 'Venta creada' });
});

//rutas de la lista de venta activa
router.post('/addProducto/:id', async(req,res)=>{
    const {idProd,idVenta,cantidad,precioUnitario,importe} = req.body;
    const newProductVenta = new prodVenta({idProd,idVenta,cantidad,precioUnitario,importe});
    await prodVenta.save();
    res.json({status:'Producto agregado a la lista'})
})

router.get('/listaProducts/activa/:id', async(req, res) => {
    const tarea = await prodVenta.find({idVenta:{$eq:req.body.activa}});
    res.json(tarea);
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