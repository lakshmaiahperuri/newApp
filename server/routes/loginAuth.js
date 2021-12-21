 const express = require("express");
 const router = express.Router();
 const nodemailer = require('nodemailer')
 var bodyParser  = require('body-parser');
 const jwt = require("jsonwebtoken");
 const Users= require('../models/users');
 const app = express();
 var bcrypt = require('bcryptjs');
 var session = require('express-session')
 const verifyToken= require('../routes/verifyToken');
 var multer  = require('multer');

 const upload = multer({
  //pdest: 'images',
  limits: {
  fileSize: 1000000
  },
  // fileFilter(req, file, cb) {
  // if (!file.originalname.match(/\.(doc|docx)$/)) {
  // return cb(new Error('Please upload a Word document'))
  // }
  // cb(undefined, true) } 
});

 const loginValidation = require('../validations/validation')
 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

 app.use(bodyParser.json());

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
            const user= await Users.findOne({email:req.body.email}).select('name password');
            console.log(user,"userrrrrrrrrrrrrrrrrrrrrrr")
            if(!user){
                return res.status(400).send("email is wrong");
            }
            const validPassword= await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                return res.status(400).send("password is wrong");
            }else{
              const token = jwt.sign({ _id: user._id }, 'lakshmaiaahahahahh');
              res.header("auth-token", token).send(token);
             // res.json(token);
              console.log(token,"lkshmaiahahaha");
            }
            
        });
        // Search user by name
   router.get('/users',async(req,res)=>{
   
    try{
      const list = await Users.find({ "name" : req.query.name });
      res.json(list)
      }
      catch(err){
        res.status(500).json({message:err.message});
      }
   })
    //Upload a picture
        router.post('/uploadAvatar', upload.single('avatar'),async(req,res)=>{
          console.log('fisryyyyyyyyyyyyyy')
          const user= new Users();
          await req.user.save()
          res.send('user')
          try{
            const newAvatar= await user.save();
            console.log(newAvatar);
            res.json(user);
        }
        catch(err){
            res.status(404).json({message: err.message});
        }
        }),  
        module.exports=router;

