
const express = require('express');
const router = express.Router();
const productController = require('../controller/product')

router.get("/products",productController.getAllProduct)

router.get("/add-products",(req, res) => {
    res.render("./add-product.handlebars")
})

router.post("/edit-product",productController.editProduct)
router.post("/add-product",productController.addProduct)

router.get("/edit-product/:_id",productController.editGet)
router.get("/delete-product/:_id",productController.deleteProduct)
module.exports = router;