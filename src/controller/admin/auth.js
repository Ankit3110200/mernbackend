
const User=require('../../models/user')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const shortid=require("shortid")
const jwt_secret="MERNSECRET"
exports.signup=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async (error,user)=>{
    if(user) return res.status(400).json({
        message : "Admin already ragistered"
    });

    const{
        firstname,
        lastname,
        email,
        password
    }=req.body;
    const hash_password=await bcrypt.hash(password,10)
    const _user =new User ({
        firstname,
        lastname,
        email,
        hash_password,
        username :shortid.generate(),
        role :"admin"
    })

    _user.save((err,data)=>{
        if(err){
            return res.status(400).json({
                    message :"something went"
            })
        }
        if(data){
            return res.status(200).json({
                message : "created successfully"
            })
        }
    })
})


}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
            if(user.authenticate(req.body.password)&&user.role==="admin"){
                const token = jwt.sign({_id: user._id, role:user.role},jwt_secret,{ expiresIn:'2d'});
                const {_id,firstname,lastname,email,role,fullname}=user;
                res.cookie('token',token,{expiresIn:'2d'})
                res.status(200).json({
                    token,
                    user:{
                       _id,firstname,lastname,email,role,fullname
                    }
                })
            }else{
                return res.status(400).json({
                    message: "Invalid password"
                })
            }
        }else{
            return res.status(200).json({
                message : "something went wrong"
            })
        }
    })
}


exports.signout=(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({
        message:"SgnOut Successfully"
    })
}




