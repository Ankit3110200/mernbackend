const express=require("express");
const { createPage, getpage } = require("../../controller/admin/page");
const { upload, adminMidddleware, requiresignin } = require("../../middleware");
const router=express.Router()

router.post("/page/create",requiresignin,adminMidddleware,upload.fields([
    {name:"banners"},
    {name:"products"}
]),createPage)

router.get(`/page/:category/:type`,getpage)
module.exports=router;