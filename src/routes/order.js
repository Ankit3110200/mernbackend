const express=require("express")

const { getOrders, addOrder } = require("../controller/order")
const { requiresignin, userMidddleware } = require("../middleware")
const router=express.Router()



router.post('/addorder',requiresignin,userMidddleware,addOrder)

router.get('/getorder',requiresignin,userMidddleware,getOrders)

module.exports=router