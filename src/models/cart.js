
const mongoose= require("mongoose")
const cartschema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref :'user',
        required:true
    },
   cartitems:[{
        product:{type:mongoose.Types.ObjectId,ref: 'product',required:true},
        quantity:{type:Number,default:1},
        // price:{type:Number,required:true}
    }],
    parentid:{
        type:String
    }

},{timestamps:true})

module.exports=mongoose.model("cart",cartschema);