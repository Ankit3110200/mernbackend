const mongoose=require("mongoose")
const bcrypt=require('bcrypt')

const userschema=new mongoose.Schema({
    firstname :{
        type:String,
        require:true,
        trim: true,
        min:3,
        max:20
    },
    lastname :{
        type:String,
        require:true,
        trim: true,
        min:3,
        max:20
    },
   username:{
        type:String,
        require:true,
        trim: true,
        unique:true,
       index:true,
       lowercase:true
    },
   email:{
        type:String,
        require:true,
        trim: true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'    
    },
    contactNumber:{
        type:String
    },
    profilepicture:{
        type:String
    }


},{timestamps:true})

// userschema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password,10)
// })

userschema.virtual("fullname")
.get(function(){
    return `${this.firstname} ${this.lastname}`;
})
userschema.methods={
        authenticate:async function(password){
            return await bcrypt.compare(password,this.hash_password)
        }
}
module.exports=mongoose.model('user',userschema)