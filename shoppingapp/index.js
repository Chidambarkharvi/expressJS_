const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");

const port = 4002;

const app = express();
const productsRouter = require("./routes/product")

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// let products = [fs.readFileSync("data/view.txt")];
// console.log(products.toString);

// const products = fs.readFileSync("data/view.txt")
// console.log(products.toString)

//body parse middleware
app.use(express.urlencoded({ extended: true }));
app.use("/products",productsRouter)

app.get("/", (req, res) => {
  res.render("./landingpage.handlebars");
});

// app.get("/products/product", (req, res) => {
//   res.render("./products.handlebars", { products });
// });

// app.get("/products/add-product", (req, res) => {
//   res.render("./add-product.handlebars");
// });

// app.post("/products/add-product", (req, res) => {
//   fs.appendFileSync("./data/view.txt", JSON.stringify(req.body));

//   console.log(req.body);
//   let { _id, pName, pDesc, pPrice } = req.body;
//   _id = parseInt(_id);
//   pPrice = parseInt(pPrice);
//   products.push({
//     _id,
//     pName,
//     pDesc,
//     pPrice,
//   });
//   res.redirect("/products/product");
// });

// app.get("/products/edit-product/:_id", (req, res) => {
//   console.log(req.params._id);
//   _id = parseInt(req.params._id);
//   const index = products.findIndex((product) => {
//     return parseInt(product._id) === parseInt(_id);
//   });
//   const selectedProduct = products[index];
//   res.render("./edit-product.handlebars", { selectedProduct });
// });
// app.post("/products/edit-product", (req, res) => {
//   console.log(req.body);
//   let { _id, pName, pDesc, pPrice } = req.body;
//   _id = parseInt(_id);
//   pPrice = parseInt(pPrice);

//   const index = products.findIndex((product) => {
//     return parseInt(product._id) === parseInt(_id);
//   });

//   products.splice(index, 1, { _id, pName, pDesc, pPrice });
//   res.redirect("/products/product");
// });

// app.get("/products/delete-product/:_id", (req, res) => {
//   console.log(req.params._id);
//   _id = parseInt(req.params._id);

//   const index = products.findIndex((product) => {
//     return product;
//   });

//   products.splice(index, 1);
//   res.redirect("/products/product");
// });

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
