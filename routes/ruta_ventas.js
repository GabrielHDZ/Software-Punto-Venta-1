const express = require('express');
const pool_mysql =require('../conexion_mysql');
const router = express.Router();
const dates=new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const fecha=dates.toLocaleDateString('en-US', options)
//FORMATO DE FECHA DD/MM/YYYY
//let formato=Intl.DateTimeFormat('nl-BE');
//FORMATO DE FECHA MM/DD/YYYY
/* const formato=Intl.DateTimeFormat('en-US');
const fecha=formato.format(dates); */

//MODELO DE LAS CARACTERISTICAS DE UNA VENTA REALIZADA
const Venta = require('../models/modelo_mongo_venta');
const prodVenta=require('../models/modelo_mongo_prodVenta');

//RUTA LISTAR TODAS LOS PRODUCTOS
/* router.get('/', async(req, res) => {
    const tarea = await Venta.find();
    res.json(tarea);
}); */
router.get('/',async(req,res)=>{
    try {
        const connection = await pool_mysql.getConnection();
        console.log('Conexión a la base de datos establecida');
        await connection.release();
        const [rows, _] = await connection.execute('SELECT * FROM store');
        res.json(rows)
        await connection.end();
      } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
      }
})

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
    let idProd=req.body.clave;
    let nombre=req.body.nombre;
    let idVenta = req.body.id_venta_activa;
    let cantidad = req.body.cantidad;
    let precioUnitario = req.body.precioU;
    let importe = Number.parseFloat(cantidad) * Number.parseFloat(precioUnitario);
    const newProductVenta = new prodVenta({idProd,nombre,idVenta,cantidad,precioUnitario,importe});
    await newProductVenta.save();
    res.json({status:'Producto agregado a la lista'})
})
router.get('/listaProducts/activa/:id', async(req, res) => {
    const venta="^"+req.params.id+"";
    const tarea = await prodVenta.find({idVenta:{$regex:venta}});
    res.json(tarea);
});
router.delete('/deleteProdList/:id', async(req, res) => {
    await prodVenta.findByIdAndRemove(req.params.id);
    res.json({ status: 'Producto eliminado de la lista de venta actual' });
});

// UPDATE a new task
router.put('/:id', async(req, res) => {
    const { comprador,totalVenta} = req.body;
    const estado=false;
    const newVenta= { comprador,totalVenta,fecha,estado};
    await Venta.findByIdAndUpdate(req.params.id, newVenta);
    res.json({ status: 'Venta actualizada' });
});

router.delete('/:id', async(req, res) => {
    await Venta.findByIdAndRemove(req.params.id);
    res.json({ status: 'Venta eliminada, dinero devuelto :(' });
});

module.exports = router;