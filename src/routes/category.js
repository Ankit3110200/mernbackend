const express=require("express")
const { addcategory, getcat, updatecategory, deletecategories } = require("../controller/category")
const { requiresignin, adminMidddleware } = require("../middleware")
const router=express.Router()

const multer=require("multer")

const shortid=require("shortid")
const path=require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),"uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })


const upload=multer({storage})

router.post('/category/create',requiresignin,adminMidddleware,upload.single("categoryimage"),addcategory)
router.get('/category/getcategory',getcat)
router.post('/category/update',upload.array("categoryimage"),updatecategory)
router.post('/category/delete',deletecategories)

module.exports=router