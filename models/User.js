const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const UserShema=new Schema({  
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        required:true,
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('user',UserShema);