const express = require("express");
const { requiresignin, adminMidddleware } = require("../middleware");
const {addheading,gethomedata} =require("../controller/home")
const router = express.Router();

router.post(`/home/create`, requiresignin, adminMidddleware, addheading);

router.get('/home/data',gethomedata)
module.exports = router;