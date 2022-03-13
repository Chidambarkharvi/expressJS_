const express = require("express");
const exphbs = require("express-handlebars");
const port = 3002;

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const person = {
    name: "sachin",
    id: 23,
  };
  res.render("./home.handlebars", { person });
});

app.get("/about", (req, res) => {
  const person = [
    {
      name: "sachin",
      id: 33,
    },
    {
      name: "sourav",
      id: 34,
    },
    {
      name: "manu",
      id: 35,
    },
  ];

  res.render("./about.handlebars",{person})
});
app.get("/contact",(req, res) =>{
const user = ["harsha","jeroy","roysten","praveena"]
res.render("./contact.handlebars",{user})
})

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
