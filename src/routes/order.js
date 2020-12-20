const express=require("express")

const { getOrders, addOrder, getOrder } = require("../controller/order")
const { requiresignin, userMidddleware } = require("../middleware")
const router=express.Router()



router.post('/addorder',requiresignin,userMidddleware,addOrder)

router.get('/getorders',requiresignin,userMidddleware,getOrders)

router.post("/getOrder", requiresignin, userMidddleware, getOrder);
module.exports=router