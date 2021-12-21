const express = require("express");    
const router = express.Router();
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const path = require("path");
const fs = require("fs");
var bcrypt = require('bcryptjs');
const Users= require('../models/users');
const jwt = require("jsonwebtoken");
const Purchase =require('../models/purchaseProd');
const Comments = require('../models/comments');
var multer  = require('multer');
const verifyToken= require('./verifyToken');
const loginUser = require('./loginAuth');
const xlsxtojson= require('xlsx-to-json');
const xlstojson= require('xls-to-json');
const Products = require('../models/productDetails');
const mongoose = require("mongoose");
    
      //product adding
      router.post('/productAdd',async(req,res)=>{
        console.log("eddd");
        const usedProducts= new Products({
            name: req.body.name,
            price:req.body.price, 
            model:req.body.model 
        })
        try{
            const response= await usedProducts.save();
            // res.json(usedProducts);
            // console.log(response);
            const productList= await Products.find();
            res.status(200).json(usedProducts);

        }
        catch(e){
          res.status(500).json({message:e.message})
        }
        });
        //count of all
router.get('/productCount',async(req,res)=>{
  try{
    const productList= await Products.find();

    res.status(200).json(productList.length);
  }
  catch(e){
    res.status(500).json({message:err.message});
  }
})
//
router.get('/purchaseCount',async(req,res)=>{
  try{
    const purchasedList= await Purchase.find();

    res.status(200).json(purchasedList.length);
  }
  catch(e){
    res.status(500).json({message:err.message});
  }
})
router.post('/purchase',async(req,res)=>{
  const purchaseProducts= new Purchase ({
     name:req.body.name,
     price:req.body.price,
     model:req.body.model,
     quantity:req.body.quantity,
     deliveryLocation:req.body.deliveryLocation,
     productId: req.body.product,
     userId:req.body.user,
    });
  try{
        const response= await purchaseProducts.save();
        res.json(purchaseProducts);
  }
  catch(e){
    res.status(404).json({message: e.message});
  }
});
//getting all the purchased products
router.get('/purchasedProducts',async(req,res)=>{
  console.log(req.query, req.body, req.params,  "firstttt");
  let query={};
  var user = req.query.user;
  if (user) {
    query.userId = user;
  }
  console.log('aaaaaaaaaaa', req.query)
  try{
    const purchasedList= await Purchase.find(query);
    res.status(200).json(purchasedList);
  }
  catch(e){
    res.status(404).json({message:err.message})

  }
})
//search by name in the product list
router.get('/productList', function(req, res, next) {
  console.log('req--------', req.query, req.params, req.body);
  let query= {}
  var search = req.query.search;
  if (search) {
    query.name = search;
  }
  Products.find(query, function (err, products) {
      if(err) {
      res.json(err);
      }
      else{
      res.json(products);
      }
  });
});
//update a product
router.put('/edit/:id',updateProduct,async(res,req)=>{
  
})
async function updateProduct(req,res,next){
  let newProduct;
  try{
    newProduct= await Products.findByIdAndUpdate(req.params.id,req.body,{new:true})
  if (newProduct == null) {
    return res.status(404).send({ message: "Cannot find Product" }); 
    
  }
} 
catch (err) {
  return res.status(500).json({ message: err.message });
}
res.newProduct = newProduct;
console.log("newwwwwwww",newProduct);
}
//Get a single product
router.get('/single/:id',async(req,res)=>{
  try{
     let single = await Products.findById(req.params.id)
     return res.json(single)
  }
  catch(err){
    return res.status(500).json({ message: err.message });
  }
});

//delete a product 
router.delete('/delete/:id',getProduct,async(req,res)=>{
  
  try{
      await res.product.remove();
      res.send({ message: " Post Deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
  }
  });
  async function getProduct(req, res, next) {
    let product;
    try {
     product= await Products.findById(req.params.id);
      if (product == null) {
        return res.status(404).send({ message: "Cannot find Product" }); 
        
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
  };
  router.post('/userAdd',async(req,res)=>{
    //passwords
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user= new Users({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashedPassword     
    });
    const transporter= nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
         auth:{
          user:"lakshmaiahperuri494@gmail.com",
          pass:"peruri@494"
        }
      });
       const mailOptions={
        from:'lakshmaiahperuri494@gmail.com',
        to:'lakshmaiahperuri617@gmail.com',
        subject:'Hello'+''+user.name+ 'Welcome to Vue Posts Application',
        text:'You are now able to add your posts in the web page...'
      }
      transporter.sendMail(mailOptions,function(error,info){
        if (error){
          console.log(error);
        }else{
          console.log('Email sent successfully:'+ info.responce)
        }
      })
    const emailExist = await Users.findOne({ email: req.body.email });
if (emailExist) return res.status(400).send("Email already exists");
    try{
        const newUser= await user.save();
        console.log(newUser);
        res.json(user)
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
});
router.post('/login',async(req,res)=>{
    const user= await Users.findOne({email:req.body.email});
    console.log(user,"userrrrrrrrrrrrrrrrrrrrrrr")
    if(!user){
        return res.status(400).send("email is wrong");
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send("password is wrong");
    }else{
      const token = jwt.sign({ _id: user._id }, 'lakshmaiaahahahahh');
      res.header("auth-token", token).send({user,token});
     // res.json(token);
      console.log(token,"lkshmaiahahaha");
    }
    
});
  //Verify token function
//   async function verifyToken(req,res,next){
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("Access Denied");
//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

module.exports=router;                 