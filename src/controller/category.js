const Category=require("../models/category")
const slugify=require("slugify")
const shortid=require("shortid")


//recursive unction of subcategory list
function createcat(categories, parentid = null) {
    const categorylist = [];
    let category;
    if (parentid == null) {
        category = categories.filter(cat => cat.parentid == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentid == parentid);
    }
    for (let cate of category) {
        categorylist.push({
            _id: cate.id,
            name: cate.name,
            slug: cate.slug,
            parentid: cate.parentid,
            type: cate.type,
            childern: createcat(categories, cate._id)
        });
    }
    return categorylist;
}

exports.addcategory =(req,res)=>{
    const categoryobj={
        name:req.body.name,
        slug:`${slugify(req.body.name)}-${shortid.generate()}`
    }
    if(req.file){
        categoryobj.categoryimage ="http://localhost:7000/public/"+req.file.filename;
    }
    if(req.body.parentid){
        categoryobj.parentid=req.body.parentid;
    }

    const cat=new Category(categoryobj);
    cat.save((error,category)=>{
        if(error) return res.status(400).json({error})
        if(category) {
            return res.status(200).json({category})
        }
    })
}


exports.getcat=(req,res)=>{
    Category.find({})
    .exec((error,cat)=>{
        if(error) return res.status(400).json({error})
        if(cat) {
            const categorylist =createcat(cat);
           res.status(200).json({categorylist})
        }
})
}

exports.updatecategory=async (req,res)=>{
    const {_id,name,parentid,type}=req.body
    const updatedcategories=[]
    if(name instanceof Array){
       
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                type:type[i]
            }
            if(parentid[i]!==""){
                category.parentid=parentid[i] 
            }
            const updatedcategory=await Category.findOneAndUpdate({_id: _id[i]},category,{new:true})
            updatedcategories.push(updatedcategory)  
        }
        return res.status(201).json({updatedcategories:updatedcategories})

    }else{
        const category={
            name,
            type
        }
        if(parentid!==""){
            category.parentid=parentid 
        }
        const updatedcategory=await Category.findOneAndUpdate({_id},category,{new:true})
        return res.status(201).json({updatedcategory})
    }

}

exports.deletecategories=async (req,res)=>{
    const {ids}=req.body.payload
    const deletedcategories=[]
    for(let i=0;i<ids.length;i++){
        const deletecategory=await Category.findByIdAndDelete({_id:ids[i]._id})
        deletedcategories.push(deletecategory)
    }
    if(deletedcategories.length==ids.length){
    res.status(200).json({message:"category removed"})
}else{
    res.status(400).json({message:"something went wrong"})
}
}