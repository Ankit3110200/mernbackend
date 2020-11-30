const express = require("express")
const app=express()
const mongoose =require("mongoose")
const path=require("path")
const cors= require("cors")
//constants
const port=process.env.port||7000
const MONGO_DB_USER="root"
const MONGO_DB_PASSWORD="admin"
const MONGO_DB_DB="ecommerce"


//router
const authRoutes=require("./routes/auth")
const adminRoutes=require("./routes/admin/auth")
const catRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const cartRoutes=require("./routes/cart")
const intialDataRoutes=require("./routes/admin/intialData")
const pageRoutes=require("./routes/admin/page")
const addressRoutes=require("./routes/address")
const orderRoutes=require("./routes/order")

//or we can you use bodyparser() from body-parser library

// mongodb+srv://root:<password>@cluster0.cnyo8.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.cnyo8.mongodb.net/${MONGO_DB_DB}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(()=>{
    console.log("DataBase Connected")
}).catch((err)=>{
    console.log(err)
});

app.use(cors());
app.use(express.json()); 
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes);

app.use('/api',adminRoutes);

app.use('/api',catRoutes);

app.use('/api',productRoutes);

app.use('/api',cartRoutes);

app.use('/api',orderRoutes);

app.use('/api',intialDataRoutes)

app.use('/api',pageRoutes)

app.use('/api',addressRoutes)
// app.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message : "hello from the server"
//     })
// })

// app.post('/data',(req,res,next)=>{
//     res.status(200).json({
//         message : req.body
//     })
// })

app.listen(port,()=>{
    console.log(`running on ${port}`);
})