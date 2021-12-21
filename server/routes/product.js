const express = require("express");
const router = express.Router();
var multer  = require('multer');
const app = express();
var bodyParser  = require('body-parser');
const Products = require('../models/productDetails');

let upload = multer({dest: 'uploads/'});
app.use(bodyParser.json());


router.post('/productAdd',async(req,res)=>{
const products= new Products({
    name: req.body.name,
    price:req.body.price,
    model: req.body.model,
})
try{
    const response= await products.save();
    res.json(products);
}
catch(e){
    res.status(500).json({message:err.message})
}
})
