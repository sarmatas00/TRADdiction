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
    looksFor:{
        type:String
    },
    free:{
        type:Boolean,
        required:true
    },
    userId:{
        type:Number,
        required:true
    }
})
const Listing=mongoose.model('Listing',listingSchema);
export default Listing;
