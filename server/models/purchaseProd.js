const mongoose =require('mongoose');

const purchaseSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    deliveryLocation:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    productId : {
        type: mongoose.Types.ObjectId,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
      }
    
})

module.exports= mongoose.model('Purchase',purchaseSchema);