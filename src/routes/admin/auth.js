const express=require("express")
const { signup, signin,signout } = require("../../controller/admin/auth")
const { requiresignin } = require("../../middleware")
const router=express.Router()
const { validatereq, isreqvalidate,validatereqsignin } = require("../../validators/auth")

router.post('/admin/signin',validatereqsignin,isreqvalidate,signin)

router.post('/admin/signup',validatereq,isreqvalidate,signup)

router.post('/admin/signout',requiresignin,signout)

// router.post('/profile',requiresignin,(req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// })
module.exports=router