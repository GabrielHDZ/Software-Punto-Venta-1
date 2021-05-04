const mongoose = require('mongoose');
const { Schema } = mongoose;

const esquema_venta= new Schema({
    nombre: { type: String, require: true },
    cantidad: { type: Number, require: true },
    preciou:{type:Number,require:true},
    preciot:{type:Number,require:true},
    fecha:{type:Date,requere:true}
});

module.exports = mongoose.model('Venta', esquema_venta);