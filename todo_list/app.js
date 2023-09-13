const express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

var items = [];
let example = "working"
app.get("/",function(req,res){
    res.render("list",{exej: items})
})
app.post("/",function(req,res){
    let item = req.body.ele1;
    items.push(item);
    res.redirect("/");
})

app.listen(8000,function(){
    console.log("server connected");
})