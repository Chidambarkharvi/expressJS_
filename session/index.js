const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {redirect}  = require("statuses");

const port = 4002;
const oneDay = 24 * 60 * 60 * 1000;

const uname = "sachinkharvi";
const pwd = "sachinkharvi";

const app = express();

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

//cookie level middleware
app.use(cookieParser());

//setting up cookie handlebars
app.engine("handlebars", exphbs());
app.set("view engine ", "handlebars");

//body parser middleware

app.use(express.urlencoded({ extended: true }));

//user page



//login page

app.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (username === uname && password === pwd) {
    req.session.userid = username;
    console.log(req.session.userid)
    res.render('./users.handlebars',{uname});
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/", (req, res) => {
if(req.session.userid){
    res.redirect("/user")
}else{
    res.render("./login.handlebars")
}
})

app.listen(port,()=>{
    console.log(`the server is listening on ${port}`)
})