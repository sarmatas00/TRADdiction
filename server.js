
const express = require("express")
const path = require("path")
const mongoose=require("mongoose")
const Listing=require('./models/listing.js')

const app= express()
app.set('view engine','ejs');
//const 

async function findInDb(id){
    try{
         const ans=await Listing.find({userId:id});
         return ans;
    }catch(err){
        return null;
    }
}
async function saveInDb(details){
    try{
        const list=new Listing(details);
        list.save();
        return true;
    }catch(err){
        return false;
    }
}


app.set('views',path.join(__dirname,'views'))
app.use("/static",express.static(path.join(__dirname,"/frontend","/static")))
app.use(express.json({limit:'50mb'}))

mongoose.connect('mongodb://localhost:27017/TRADdiction',{useNewUrlParser:true, useUnifiedTopology: true})
.then(res=>{
    //console.log(res);
})
.catch(err=>{
    console.log(err,"errorrrmen");
})
app.get('/user/addList/:id',(req,res)=>{
    const {id}=req.params;
    findInDb(id).then(data=>{
        //console.log(data);
        res.send({data})
    });
    //res.sendFile(path.resolve(__dirname,"frontend","index.html"))
    //console.log(Listing.find({userId:id}));

})

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","index.html"))
})
app.post('/newListing',(req,res)=>{
   const ans=saveInDb(req.body);
   if(ans){
       res.send(true);
   }else{
       res.send(false);
   }

})

app.listen(3000)