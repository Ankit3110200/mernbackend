
const mongoose= require("mongoose")
const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String,
        
    },
    categoryimage:{
        type:String
    },

    parentid:{
        type:String
    }

},{timestamps:true})

module.exports=mongoose.model("category",categoryschema);