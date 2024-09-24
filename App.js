const express = require('express');
const morgan = require('morgan');
const cors=require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
//SETTINGS
//app.set('cors',cors({origin:'localhost:4321',methods:'GET,POST',allowedHeaders: ['Content-Type', 'Authorization']}))
app.use(cors({origin:'localhost:4321',methods:'GET,POST',allowedHeaders: ['Content-Type', 'Authorization']}));
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
app.use('/productos',express.static(path.join(__dirname, 'public')));
//RUTA NO DEFINIDA ERROR 404
app.use((_, res,__)=> {
    res.status(404).send('Direccion inexistente');
  });
//INICIAR SERVER
app.listen(app.get('port'), () =>console.log(`Escuchando en el puerto:, ${app.get('port')}`));
