const mongoose = require('mongoose');
const { Schema } = mongoose;

const Schema_prod = new Schema({
    nombre: { type: String, require: true },
    presentacion:{type:String,require:true},
    codigo:{type:String,require:false},
    descripcion: { type: String, require: false }
});

module.exports = mongoose.model('Producto', Schema_prod);