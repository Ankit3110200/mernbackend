const { intialData }= require("../../controller/admin/intialData") ;

const express=require("express");
const { requiresignin, adminMidddleware } = require("../../middleware");
const router=express.Router()

router.post("/intialdata",requiresignin,adminMidddleware,intialData)

module.exports=router;