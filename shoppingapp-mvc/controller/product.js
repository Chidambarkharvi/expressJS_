const express = require("express");
const { updateOne } = require("../model/product");
const product = require("../model/product");

//reading product
const getAllProduct = async (req, res, next) => {
  try {
    const products = await product.find().lean();
    res.render("./products.handlebars", { products });
  } catch (err) {
    next(err);
  }
};

//add-product
const addProduct = async (req, res, next) => {
  try {
    let { pName, pDesc, pPrice } = req.body;
    await product.insertMany([
      {
        pName,
        pDesc,
        pPrice,
      },
    ]);

    //   res.json({
    //     error: false,
    //     message: "product added succesfully",
    // data:null,
    //   })
    res.redirect("/products/products");
  } catch (err) {
    next(err);
  }
};

//edit-product

const editProduct = async (req, res, next) => {
  try {
    let { _id, pName, pDesc, pPrice } = req.body;
    await product.updateOne(
      { _id },
      {
        $set: {
          pName,
          pDesc,
          pPrice,
        },
      }
    );
    // res.json({
    //   error: false,
    //   message: "product editted succesfully",
    // data:null,
    // })
    res.redirect("/products/products");
  } catch (err) {
    next(err);
  }
};

const editGet = async (req, res) => {
  console.log(req.params._id);
  try {
    const productToEdit = await product.findOne({ _id: req.params._id }).lean();
    res.render("./edit-product.handlebars", {
      selectedProduct: productToEdit,
    });
  } catch (err) {
    res.redirect("/error");
  }
};

const deleteProduct = async (req, res, next) => {
  let _id = req.params._id;

  try {
    await product.deleteOne({ _id });
    res.redirect("/products/products");
    // res.json({
    //   error: false,
    //   message: "product deleted succesfully",
    // data:null,
    // })
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllProduct,
  addProduct,
  editProduct,
  deleteProduct,
  editGet,
};
