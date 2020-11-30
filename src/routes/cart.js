const express=require("express")
const { additemtocart, getcartitems } = require("../controller/cart")
const { requiresignin, userMidddleware } = require("../middleware")
const router=express.Router()



router.post('/user/cart/addtocart',requiresignin,userMidddleware,additemtocart)

router.post('/user/getcartitems',requiresignin,userMidddleware,getcartitems)

module.exports=router