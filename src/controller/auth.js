const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const jwt_secret="MERNSECRET"
const shortid=require("shortid")
const User=require('../models/user')

const {validationResult}=require("express-validator")

exports.signup=(req,res)=>{

    // const error=validationResult(req);    dont disturb controller signup for vaidation
    // return res.status(400).json({
    //     error: error.array()
    // })

    User.findOne({email:req.body.email})
    .exec(async (error,user)=>{
    if(user) return res.status(400).json({
        message : "user already ragistered"
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
        username :shortid.generate()
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
    .exec(async(error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
            const ispassword=await user.authenticate(req.body.password)
            if(ispassword&&user.role==="user"){
                const token = jwt.sign({_id: user._id,role:user.role},jwt_secret,{ expiresIn:'60d'});
                const {_id,firstname,lastname,email,role,fullname}=user;
                res.status(200).json({
                    token,
                    user:{
                       _id,firstname,lastname,email,role,fullname
                    }
                })
            }else{
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
        }else{
            return res.status(200).json({
                message : "something went wrong"
            })
        }
    })
}







