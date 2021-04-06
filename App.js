const express = require('express');
const app = express();
const mysql = require('mysql');

/* const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
}); */

//SETTINGS
app.set('port', 5000);
//SETUP PUBLIC FOLDER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//INICIA CONEXION DATABASE
//conexion.connect();
//RUTAS
app.get('/', (req, res) => {
    res.send('WELCOME SERVER OF DATA TIENDITA');
});


app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto: ', app.get('port'), ' :D');
});