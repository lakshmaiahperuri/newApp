const mongoose =require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
      },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
})

module.exports= mongoose.model('Users',loginSchema);