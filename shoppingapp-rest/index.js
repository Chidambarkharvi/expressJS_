const express = require('express');
const mongoose = require('mongoose');
const port = 3200;
const app = express();


const dbUrl =  "mongodb+srv://Sachinkharvi25:kharvi25@cluster0.iz93i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err)=>{
    if(!err){
        console.log("DB connected succesfully")
    }else{
        console.log("DB not connected")
    }
})
const productRoutes = require("./routes/product")
//body parser middleware
app.use(express.urlencoded({extended:true}))
//json middleware
app.use(express.json());

//router level middleware
app.use("/products",productRoutes)

app.get("/errors",(req, res,) => {
    res.status(500).send("something went wrong")

})



app.listen(port,()=>{
    console.log(`server is listening on port ${port} `)
})