const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3001;

const app = express();
const oneDay = 24*60*60*1000

const obj = [{
    "name":"megha T",
    "age":35
},{
  "name":"roystan",
  age:23  
},{
    "name":"sourav",
    "age":22
}]
//cookie parser middleware
app.use(cookieParser())

app.get("/read-cookie",(req,res) => {
    console.log(req.cookies);
    if(req.cookies){
        res.send("cookies exist"+ " " + JSON.stringify(req.cookies));
    }else{
res.send("cookies does not exist");
    }
})


//create non persistent cookie
const dd = 100*100*100;
app.get("/create-cookie",(req,res) => {
    res.cookie("myname",dd)
    res.cookie("age",22)

    res.send("non-persistent-cookie has been created");

})



//create persistent cookie
app.get("/create-pcookie",(req,res) => {
    res.cookie("password","12345")
    res.cookie("email","sachin@gmail.com",{
        maxAge: 840220
    })
    res.send("persistent-cookie has been created");
})


//create persistent object cookie

app.get("/create-objcookie",(req,res) => {
    res.cookie("data",{
        "name":"Sachu",
        "place":"bhatkal"
    },{
        maxAge:oneDay
    })
    res.send("one persistent-object-cookie has been created")
})

//create array of object cookie
app.get("/create-arrcookie",(req,res)=>{
    res.cookie("array",obj,{
        maxAge:oneDay
    })
    res.send("one persistent-array-object-cookie has been created") 
})

app.get("/clear-cookie",(req,res) => {
    res.clearCookie("myname")
    res.send("myname has been cleared");
})

app.get("/clearall-cookie",(req,res) => {
    for(var cookie in  req.cookies){
        res.clearCookie(cookie)
        
    }
    res.send("cookies has been cleared");
})

app.listen(3002,() => {
    console.log("listening on port 3000");
})