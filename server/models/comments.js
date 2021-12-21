const mongoose =require('mongoose');

const commentsSchema = mongoose.Schema({
    avatar:{
        type:Buffer
    }
})
module.exports= mongoose.model('Comments',commentsSchema);