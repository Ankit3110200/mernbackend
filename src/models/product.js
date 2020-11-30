
const mongoose= require("mongoose")
const productschema=new mongoose.Schema({
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
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    offers:{
        type:Number
    },
    productpicture:[
        {img :{type:String}}
    ],
    reviews:[
        {
            userid : {type:mongoose.Schema.Types.ObjectId, ref :"user"},
            review : String
        }
    ],
    category :{type:mongoose.Schema.Types.ObjectId, ref :"category",required:true },
    createby:{ type:mongoose.Schema.Types.ObjectId, ref :"user",required:true},
    updateDate:Date

},{timestamps:true})

module.exports=mongoose.model("product",productschema);