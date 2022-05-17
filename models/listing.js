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
        type:String
    },
    looksFor:{
        type:String
    },
    free:{
        type:Boolean,
        required:true
    },
    category:{
        type:String
    },
    id:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    }
    
})
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
