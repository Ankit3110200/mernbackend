const express=require("express")
const { addAddress, getAddress } = require("../controller/address")
const { requiresignin, userMidddleware } = require("../middleware")
const router=express.Router()



router.post('/user/address/create',requiresignin,userMidddleware,addAddress)

router.post('/user/getaddress',requiresignin,userMidddleware,getAddress)

module.exports=router