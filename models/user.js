const mongoose=require('mongoose')
/*
{
      email:"user1@gmail.com",
      pass:"Aa123456!",
      type:"user",
      userID:1232
    },
*/
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
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