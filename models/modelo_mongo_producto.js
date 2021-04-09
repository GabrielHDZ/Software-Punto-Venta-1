const mongoose = require('mongoose');
const { Schema } = mongoose;

const Schema_prod = new Schema({
    titulo: { type: String, require: true },
    descripcion: { type: String, require: true }
});

module.exports = mongoose.model('Producto', Schema_prod);