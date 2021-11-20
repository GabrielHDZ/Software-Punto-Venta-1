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
//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
//RUTAS DE CARGA ESTATICA

//RUTAS
app.use('/api/productos', require('./routes/ruta_prod'));
app.use('/api/clientes', require('./routes/ruta_clientes'));
app.use('/api/ventas',require('./routes/ruta_ventas'));

app.use('/Productos',express.static(path.join(__dirname, 'public')));

//RUTA NO DEFINIDA ERROR 404
app.use((req, res, next)=> {
    res.status(404).send('Direccion inexistente');
  });

//INICIAR SERVER
app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto: ', app.get('port'), ' :D');
});