const express = require('express');
const ruta = express.Router();



//RUTAS
ruta.get('/', (req, res) => {
    res.send('ruta de clientes');
});

module.exports = ruta;