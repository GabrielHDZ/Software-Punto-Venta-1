const mongoose = require('mongoose');
const { Schema } = mongoose;

const esquema_venta= new Schema({
    comprador:{type:Number,require:false},
    totalVenta:{type:Number,require:false},
    fecha:{type:Date,requere:true},
    estado:{type:Boolean,requere:true}
});

module.exports = mongoose.model('Venta', esquema_venta);