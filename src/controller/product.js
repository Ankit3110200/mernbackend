
const Product = require("../models/product")
//const multer =require("multer")
const shortid=require("shortid")
const slugify = require("slugify")
const Category = require("../models/category")
const category = require("../models/category")
const product = require("../models/product")

exports.createproduct=(req,res)=>{
    // res.status(200).json({
    //     file :req.files,
    //     body:req.body
    // })
    const {name,price,description,category,quantity,createby}=req.body

    let productpicture=[];
    if(req.files.length>0){
        productpicture=req.files.map(file=>{
            return {img: file.filename}
        })
    }
    const product = new Product({
        name:req.body.name,
        slug: slugify(name),
        price,
        description,
        productpicture,
        category,
        quantity,
        createby:req.user._id
    
    })
    product.save((error,product)=>{
        if(error){return res.status(400).json({error})}
        if(product){
            return res.status(200).json({product})
        }
    })
  }
exports.getproductbyslug=(req,res)=>{
    const {slug}=req.params;
    Category.findOne({slug:slug}).select("_id type")
    .exec((error,category)=>{
        if(error){
            res.status(400).json({error})
        }
        if(category){
            Product.find({category:category._id})
            .exec((error,products)=>{
                if(error){
                    res.status(400).json({error})
                }

                if (category.type) {
                if(products.length>0){
                res.status(200).json({
                    products,
                  productbyprice: { under5k: products.filter(product=>product.price<=5000),
                    under10k: products.filter(product=>product.price>5000 && product.price<=10000),
                    under15k: products.filter(product=>product.price>10000 && product.price<=15000),
                    under20k: products.filter(product=>product.price>15000 && product.price<=20000),
                    under30k: products.filter(product=>product.price>20000 && product.price<=30000),
}
                })
                }
            }else{
                res.status(200).json({ products })
            }

            })
        }
    })
}

exports.getproductsofpage=(req,res)=>{
    const {slug}=req.params;
    Category.findOne({slug:slug}).select("_id")
    .exec((error,category)=>{
        if(error){
            res.status(400).json({error})
        }
        if(category){
            Product.find({category:category._id})
            .exec((error,products)=>{
                if(error){
                    res.status(400).json({error})
                }

                if(products.length>0){
                res.status(200).json({
                    products,
                 }
                )
                }
            })
        }
    })
}

exports.getproductdetailsbyid=(req,res)=>{
    const {productid}=req.params
    if(productid){
        Product.findOne({_id:productid})
        .exec((error,product)=>{
            if(error) return res.status(400).json({error})
            if(product){
                return res.status(200).json({product})
            }
        })
    }else{
        return res.status(400).json({error:"params required"})
    }
}


exports.deleteProductById = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
      Product.deleteOne({ _id: productId }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    } else {
      res.status(400).json({ error: "Params required" });
    }
  };
  
  exports.getProducts = async (req, res) => {
    const products = await Product.find({})
      .select("_id name price quantity slug description productpicture category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };