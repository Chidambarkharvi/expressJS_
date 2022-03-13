const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 5000;
const uname = "sachinkharvi";
const pwd = "sachinkharvi";
const oneDay = 24 * 60 * 60 * 1000;

const app = express();

const dbUrl ="mongodb+srv://Sachinkharvi25:kharvi25@cluster0.iz93i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connecting mongodb database

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("DB connected succesfully");
    } else {
      console.log("DB not connected");
    }
  }
);



//session level middleware
app.use(
  session({
    secret: "thisisasecretkey",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: oneDay,
    },
  })
);

//importing routes

const productRoutes = require("./routes/product");

//setting up handlebars

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//body parser middleware
app.use(express.urlencoded({ extended: true }));

//router level middleware

app.use(express.json());


app.use("/products", productRoutes);

app.get("/", (req, res) => {
  
  res.render("./login.handlebars")

});








app.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (username === uname && password === pwd) {
    req.session.userid = username;
    res.redirect('/products/products');
  } else {
    res.redirect("/");
  }
});

//error routes

app.get("/error", (req, res) => {
  res.status(500).send("something went wrong");
});

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});

