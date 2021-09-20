const mongoose = require('mongoose');
const { Schema } = mongoose;

const esquema_venta= new Schema({
    comprador:{type:Number,require:false},
    total:{type:Number,require:true},
    fecha:{type:Date,requere:true}
});

module.exports = mongoose.model('Venta', esquema_venta);