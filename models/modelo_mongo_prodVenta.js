const mongoose= require('mongoose');
const {Schema}=mongoose;

const esquema_prodVenta=new Schema({
    idProd:{type:String, require:true},
    idVenta:{type:String,require:true},
    cantidad:{type:Number,require:true},
    precioUnitario:{type:Number,require:true},
    importe:{type:Number,require:true}
    
});


module.exports=mongoose.model('prodVenta',esquema_prodVenta);