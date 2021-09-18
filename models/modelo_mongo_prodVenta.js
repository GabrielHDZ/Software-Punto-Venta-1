const mongoose= require('mongoose');
const {Schema}=mongoose;

const esquema_prodVenta=new Schema({
    codProd:{type:String, require:false},
    idProd:{type:String, require:true},
    cantidad:{type:Int,require:true},
    idVenta:{type:String,require:true}
});

module.exports=mongoose.model('prodVenta',esquema_prodVenta);