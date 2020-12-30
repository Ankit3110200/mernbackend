const home = require('../models/home');
const Home=require('../models/home')


exports.addheading =(req,res)=>{
   const {name,category,products,parentid}=req.body
   console.log(req.body)
    const home=new Home({
        heading:name,
        category,
        products,
        parentid
    });
    home.save((error,heading)=>{
        if(error) return res.status(400).json({error})
        if(heading) {
            return res.status(200).json({heading})
        }
    })
}

exports.gethomedata=(req,res)=>{
    Home.find({})
    .exec((error,homedata)=>{
        if(error) return res.status(400).json({error})
        if(homedata) {
       
           res.status(200).json({homedata})
        }
    })
}