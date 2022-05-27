const mongoose=require('mongoose')
const messageSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
})
const Message=mongoose.model('Message',messageSchema);
module.exports=Message;