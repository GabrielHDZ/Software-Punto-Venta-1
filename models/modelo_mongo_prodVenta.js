const mongoose= require('mongoose');
const {Schema}=mongoose;

const esquema_prodVenta=new Schema({
    idProd:{type:String, require:true},
    idVenta:{type:String,require:true},
    cantidad:{type:Int,require:true},
    precioUnitario:{type:double,require:true},
    importe:{type:double,require:true}
    
});


module.exports=mongoose.model('prodVenta',esquema_prodVenta);