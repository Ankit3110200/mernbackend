const mongoose= require("mongoose")
const pageschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    banners:[

        {img:{type:String,},
        navigateTo:{type:String}}
    ],
    products:[
        {img:{type:String,},
        navigateTo:{type:String}}
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true,
        unique:true
    },
    createby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("page",pageschema);