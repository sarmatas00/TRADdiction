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
    id:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    category:{
        type:String
    }
})
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
