const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const fs = require('fs');
const app = express();
let products = [{
    _id: 1,
    pName: 'Bag',
    pDesc: 'wearable',
    price: 1232

}]
router.get('/product', (req, res) => {
    res.render('./products.handlebars', { products })
})
//ADDING the  new products

router.get('/add-product', (req, res) => {
    res.render('./add-product.handlebars', { products })
})


router.post('/add-product', function (req, res) {
    fs.appendFileSync('./data/view.txt', JSON.stringify(req.body))
    console.log(req.body)
    //object destrutring
    let { _id, pName, pDesc, price } = req.body
    _id = parseInt(_id,) //convert string to number
    price = parseInt(price) //convert string to number
    products.push({
        _id,
        pName,
        pDesc,
        price
    })
    res.redirect('/products/product')

})

//EDIT the products
router.get('/edit-product/:_id', function (req, res) {
    console.log(req.params._id)
    _id = parseInt(req.params._id)
    const index = products.findIndex((products) => {
        return parseInt(products._id) === parseInt(_id)  //check the id equal or not
    })
    const selectedProduct = products[index]
    res.render('./edit-product.handlebars', { selectedProduct })

})

router.post('/edit-product/', function (req, res) {
    console.log(req.body)
    let { _id, pName, pDesc, price } = req.body
    _id = parseInt(_id,) //convert string to number
    price = parseInt(price) //convert string to number

    const index = products.findIndex((products) => {
        return parseInt(products._id) === parseInt(_id)
    })
    products.splice(index, 1, { _id, pName, pDesc, price })
    res.redirect('/products/product')

})

//TO DELeTE
router.get('/delete-product/:_id', (req, res) => {
    console.log(req.params);
    _id = parseInt(req.params._id);
    const index = products.indexOf((p) => {
        return parseInt(p._id) === _id
    })
    products.splice(index, 1)
    res.redirect('/products/product')


})


module.exports = router



