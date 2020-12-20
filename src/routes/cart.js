const express=require("express")
const { additemtocart, getcartitems,removeCartItems } = require("../controller/cart")
const { requiresignin, userMidddleware } = require("../middleware")
const router=express.Router()



router.post('/user/cart/addtocart',requiresignin,userMidddleware,additemtocart)

router.post('/user/getcartitems',requiresignin,userMidddleware,getcartitems)

router.post(
    "/user/cart/removeItem",
    requiresignin,userMidddleware,
    removeCartItems
  );

module.exports=router