const Category = require("../../models/category")
const Product = require("../../models/product")

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
            childern: createcat(categories, cate._id)
        });
    }
    return categorylist;
}

exports.intialData = async (req, res) => {
    const categories = await Category.find({}).exec()
    const products = await Product.find({})
        .select('_id name price quantity slug description productpicture category')
        .populate({ path: "category", select: "_id name" })
        .exec()
    res.status(200).json({
        categories:createcat(categories),
        products
    })
}