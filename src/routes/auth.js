const express=require("express")

const { signup, signin } = require("../controller/auth")
const { requiresignin } = require("../middleware")
const router=express.Router()

const { validatereq, isreqvalidate, validatereqsignin } = require("../validators/auth")

router.post('/signin',validatereqsignin,isreqvalidate,signin)

router.post('/signup',validatereq,isreqvalidate,signup)

router.post('/profile',requiresignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})
module.exports=router