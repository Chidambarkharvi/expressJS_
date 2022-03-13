const express = require("express");
const { updateOne } = require("../models/product");
const product = require("../models/product");

//reading product 
const getAllProduct = async (req, res, next) => {
  try {
    const products = await product.find().lean();
    res.json({
      error: false,
      message: "",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};


//add-product
const addProduct = async (req, res,next) => {
  try{
    let{pName,pDesc,pPrice}=req.body 
  await product.insertMany([{
    pName,
    pDesc,
    pPrice
  }])
  res.json({
    error: false,
    message: "product added succesfully",
data:null,
  })
  }
  catch(err){
    next(err);
  }
}

//edit-product

const editProduct = async (req, res,next) => {
  try{
    let{_id,pName,pDesc,pPrice}=req.body 
await product.updateOne(
  {_id},{
    $set: {
      pName,pDesc,pPrice
    }
  
})
res.json({
  error: false,
  message: "product editted succesfully",
data:null,
})
  
  
}
catch(err){
next(err)
}}


const deleteProduct = async (req, res,next)=>{
  let{_id} = req.body

  try{
    await product.deleteOne(
      {_id}
    )
    res.json({
      error: false,
      message: "product deleted succesfully",
    data:null,
    })

  }
  catch(err){
    next(err)
  }
}
module.exports={
    getAllProduct,addProduct,editProduct,deleteProduct
}

