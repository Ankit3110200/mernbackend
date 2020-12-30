const mongoose= require("mongoose")
const homeschema=new mongoose.Schema({
    heading:{
        type:String,
        required:true,
        trim:true
    },
    products:[{product:{type:mongoose.Schema.Types.ObjectId, ref :"product",required:true}}],
    
    category :{type:mongoose.Schema.Types.ObjectId, ref :"category",required:true },
    parentid:{
        type:String
    },

},{timestamps:true})

module.exports=mongoose.model("home",homeschema);