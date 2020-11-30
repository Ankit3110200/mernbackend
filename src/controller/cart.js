const { response } = require("express")
const Cart =require("../models/cart")
const user = require("../models/user")

function runUpdate(condition,updateData){
    return new Promise((resolve,reject)=>{
        Cart.findOneAndUpdate(condition,updateData,{upsert:true})
        .then(resolve=>resolve())
        .catch(reject=>reject(err))        
    })
}
exports.additemtocart=(req,res)=>{
    Cart.findOne({user:req.user._id})
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error})
        if(cart){
            let promisearray=[]

            req.body.cartitems.forEach((cartItem)=>{
                const product=cartItem.product

                const item=cart.cartitems.find(c=>c.product==product)
                let condtion,action;
                if(item){
                    condtion={"user":req.user._id,"cartitems.product":product};
                    action={
                        "$set":{
                            "cartitems.$":cartItem
                        }
                    };
                }
                else{
                    condtion={user:req.user._id};
                    action={
                        "$push":{
                            "cartitems":cartItem
                        }
                    };    
            }
            promisearray.push(runUpdate(condtion,action))

            })
            
        // Cart.findOneAndUpdate(condtion,action).exec((error,_cart)=>{
        //     if(error) return res.status(400).json({error})
        //     if(_cart) return res.status(200).json({cart:_cart})
        // })
            // res.status(200).json({message:cart})
            Promise.all(promisearray)
            .then(response=>res.status(200).json({response}))
            .catch(error=>res.status(400).json({error}))
        }else{
            const cart =new Cart({
                user:req.user._id,
                cartitems:req.body.cartitems
            })
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error})
                if(cart) return res.status(200).json({cart})
            })
        }
    })
   
}

exports.getcartitems=(req,res)=>{
    Cart.findOne({user:req.user._id})
    .populate('cartitems.product','_id name price productpicture')
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error})
        if(cart){
            let cartitems={};
            cart.cartitems.forEach((item,index)=>{
                cartitems[item.product._id.toString()]={
                    _id:item.product._id.toString(),
                    name:item.product.name,
                    img:item.product.productpicture[0].img,
                    price:item.product.price,
                    qty:item.quantity
                }
            })
            res.status(200).json({cartitems})
        }
    })
}
