const mongoose=require('mongoose')
const listingSchema=new mongoose.Schema({
    src:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    looksFor:{
        type:String
    },
    free:{
        type:Boolean
    },
    category:{
        type:String
    },
    id:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
    
})
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
