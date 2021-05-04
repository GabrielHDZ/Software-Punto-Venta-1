const mongoose = require('mongoose');
const USER = "usuario-tienda-node";
const PASSWORD = "HvdfJaD5EhAh7vbd";
const database = "Tienda";
const url_data = `mongodb+srv://${USER}:${PASSWORD}@cluster0.kfoqm.mongodb.net/${database}?retryWrites=true&w=majority`;
//mongodb+srv://usuario-tienda-node:<password>@cluster0.kfoqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const url_local = `mongodb://127.0.0.1:27017/tienda_local_node`;

mongoose.connect(url_local, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Conexion establecida mongoose mongodb atlas'))
    .catch(error => console.error(error));

module.exports = mongoose;