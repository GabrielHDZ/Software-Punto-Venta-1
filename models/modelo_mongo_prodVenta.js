const mongoose= require('mongoose');
const {Schema}=mongoose;

const esquema_prodVenta=new Schema({
    codigo:{type:String, require:false},
    ide:{type:String, require:true},
    venta:{type:String,require:true}
});

module.exports=mongoose.model('prodVenta',esquema_prodVenta);