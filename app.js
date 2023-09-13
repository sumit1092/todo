const express = require('express');
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");


const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task",trySchema);

  const todo1 = new item({
    name: "create new task",
  });

  const todo2 = new item({
    name: "learn dsa",
  });

  const todo3 = new item({
    name: "web development",
  });

   todo1.save();
   todo2.save();
   todo3.save();


app.get("/",function(req,res){
    item.find({}).then(function(foundItems){
        res.render("list",{ejes:foundItems});
    })
    .catch(function(err){
        console.log(err);
    })
});

app.post("/",function(req,res){
    const itemName = req.body.name;
    const todo4 = new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});


app.post("/delete",function(req,res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked).then(function(){
        console.log("deleted");
        res.redirect("/");
    })
    .catch(function(err){
        console.log(err);
    });
});


app.listen(8000,function(){
    console.log("server connected");
});