const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
//const mysql = require('mysql');
const { mongoose } = require('./conexion_mongodb');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//RUTAS
app.use('/api/productos', require('./routes/ruta_prod'));

app.use('/api/clientes', require('./routes/clientes'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//INICIAR SERVER
app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto: ', app.get('port'), ' :D');
});