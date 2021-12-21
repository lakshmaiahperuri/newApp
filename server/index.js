const express = require('express')
var cors = require('cors')
var bodyParser  = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express()
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const productsRouter = require('./routes/products')
const loginRouter= require('./routes/loginAuth')
mongoose.connect('mongodb://localhost:27017/Posts',{ useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use("*",cors())
app.use(bodyParser.json());
app.use('/products', productsRouter)
app.use('/reg',loginRouter)

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
  app.post('/signUp', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var password = req.body.password; 
    var mobile =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":password, 
        "mobile":mobile 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 


// const mailOptions={
//   from:'lakshmaiahperuri494@gmail.com',
//   to:"vimalraj.nie@gmail.com",
//   subject:'hello',
//   text:'Hi vimal'
// }
// transporter.sendMail(mailOptions,function(error,info){
//   if (error){
//     console.log(error);
//   }else{
//     console.log('Email sent successfully:'+info.responce)
//   }
// })
 
app.listen(4000, () => console.log('Server Started'))


