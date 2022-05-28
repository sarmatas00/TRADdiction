const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    number:{
        type:Number,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    zip:{
        type:String,
    },
    terms:{
        type:String,
        enum:['on','off'],
    },
    type:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:true
    },
    
})
const User=mongoose.model('User',userSchema);
module.exports=User;