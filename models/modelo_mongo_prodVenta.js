/* const mongoose = require('mongoose');
const { Schema } = mongoose;
//definicion del esquema fijo usado en mongodb
const esquema_prodVenta = new Schema({
    idProd: { type: String, require: true },
    nombre: { type: String, require: false },
    cantidad: { type: Number, require: true },
    precioUnitario: { type: Number, require: true },
    importe: { type: Number, require: true }
});

module.exports = mongoose.model('prodVenta', esquema_prodVenta);
 */