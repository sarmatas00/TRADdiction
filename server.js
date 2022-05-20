

const express = require("express")
const path = require("path")
const mongoose=require("mongoose")
const Listing=require('./models/listing.js')
const User=require('./models/user.js')
const bcrypt=require("bcrypt")
const initializePassport=require("./passport-config")
const passport=require("passport")
const flash=require("express-flash")
const session=require("express-session")
const methodOverride=require("method-override")
const seed=require("./seed.js")



const TradeRequest = require("./models/trade_request.js")
const Category = require("./models/category.js")


const app= express()
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use("/static",express.static(path.join(__dirname,"/static")))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(session({
    secret:"My Secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))


mongoose.connect('mongodb://localhost:27017/TRADdiction',{useNewUrlParser:true, useUnifiedTopology: true})
.then(async res=>{
    
    seed.connect()
})
.catch(err=>{
    console.log(err,"errorrrmen");
})

async function findListingInDbById(id){
    try{
         const ans=await Listing.findOne({id:id});
         return ans;
    }catch(err){
        return (err);
    }
}


async function findUserByEmailDb(email){
    try{
        const ans=await User.findOne({email:email})
        return ans;
    }catch(err){
        console.log("Error finding user by email");
        return null;
    }
}
async function findUserByIdDb(id){
    try{
        const ans=await User.findOne({id:id});
        return ans;
    }catch(err){
        console.log("Error finding user by ID");
        return null;
    }
}
async function findUserListings(userID){
    try{
        const ans=await Listing.find({userId:userID});
        return ans;
    }catch(err){
        console.log("Error finding listings of user");
        return null;
    }
}
async function findListingsForApproval(){
    try{
        let ans=Listing.find({id:{$regex:/admin/,$options:'i'}})
        
        return ans;
    }catch(err){console.log("Erro findListingsForApproval");return null;}
}
async function findUsersIncomingRequests(userID){
    try{
        tradeReqs=await TradeRequest.find({'itemWanted.userId':userID})
        return tradeReqs;
    }catch(err){
        console.log("DBErrorFindingUsersIncomingRequest");
        return null;
    }
}

async function findListingsForCarousel(){
    try{
        let ans=Listing.find({id:{$regex:/carousel/,$options:'i'}})
        
        return ans;
    }catch(err){console.log("Error findListingsForCarousel");return null;}
}

async function checkForSameRequest(provided,wanted){
    const allRequests=await TradeRequest.find({})
    
    for(let req of allRequests){
        if(req.itemProvided.title===provided && req.itemWanted.title===wanted){
            return true
        }
    }
    return false

}


//DB DONE
initializePassport(passport,findUserByEmailDb,findUserByIdDb)

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect("/login")
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    return next()
}















app.get("/",async (req,res)=>{
    
    if(req.isAuthenticated()){
        
        res.render("main",{categories:await Category.find(),listings:(await Listing.find()).filter((listing)=>!listing.id.includes("carousel")),logged:true,user:req.user,carousel:await findListingsForCarousel()})
    }else{
        res.render("main",{categories:await Category.find(),listings:(await Listing.find()).filter((listing)=>!listing.id.includes("carousel")),logged:false,carousel:await findListingsForCarousel()})
    }


})




app.get("/login",checkNotAuthenticated,(req,res)=>{
    
    res.render("login")
})

app.post("/login",checkNotAuthenticated,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),(req,res)=>{
    if(req.user.type==="admin"){
        res.redirect("/manage")
    }else{
        res.redirect("/")
    }
})


app.get("/signup",checkNotAuthenticated,(req,res)=>{
    res.render("signup")
})

//DB CONNECTED
app.post("/signup",checkNotAuthenticated,async (req,res)=>{
    try{
        const details=req.body
        console.log(details,details.password);
        const hashedPass= await bcrypt.hash(details.password,10)
        
        
        
        const emailExists=await User.findOne({email:details.email})
        if(emailExists!==undefined){console.log("email found");}
        
        if(emailExists){
            req.flash("error","This email has already been registered!")
            res.redirect("/signup")

        }else{
            details.password=hashedPass
            
            const newUser=new User({id:Date.now().toString(),...details,type:"user"});
            newUser.save();
            console.log("saved user in db");
            res.redirect("/login")

        }

        
        
    }catch(e){
        console.log(e);

        res.redirect("/signup")
    }
    
})

app.delete("/logout",(req,res)=>{
    req.logout()
    res.redirect("/")
})

app.get("/recover",checkNotAuthenticated,(req,res)=>{
    res.render("forgetPass")
})
//DB CONNECTED
app.post("/recover",checkNotAuthenticated,async (req,res)=>{
    try{
        let dbFound=await findUserByEmailDb(req.body.emailRec);
        let mail=dbFound.email;
        if(mail){console.log("We have this ",mail);}
        if(mail){
            req.flash("exists","Please check your email, in order to recover your password!")
        }else{
            req.flash("exists","No account with that email has been registered!")
        }
        res.redirect("/recover")
    }catch{
        res.redirect("/login")
    }
    

})
//Done not tested
app.get("/listing/:id",checkAuthenticated,async(req,res)=>{
    const myListings=await findUserListings(req.user.id)
    
    let isHisListing=false
    for(let listing of myListings){
        if(listing.id===req.params.id)
            isHisListing=true;
    }
    try{
        if(isHisListing){
            req.flash("error","You can't make a trade with yourself!")
        }
        res.render("trade",{logged:true,user:req.user,listing:await findListingInDbById(req.params.id),myListings})
    }catch{
        res.redirect("/")
    }
})


//db done not tested
app.post("/listing/:id",checkAuthenticated,async (req,res)=>{
    
    try{
        
        if(req.body.tradeFor!==undefined){
        let itemWanted=await findListingInDbById(req.params.id);
        const request={id:Date.now().toString(),itemProvided:await findListingInDbById(req.body.tradeFor),itemWanted:itemWanted}
        let tradeRequest=new TradeRequest(request)
        if(await checkForSameRequest(request.itemProvided.title,request.itemWanted.title)){
            req.flash("success","You have already made that trade request, try again later")
        }else{
            req.flash("success","Request has been made, awaiting approval!")
            await tradeRequest.save();

        }
        }else{
            req.flash("success","List an item first")
            
        }
        res.redirect(`/listing/${req.params.id}`)
    }catch(E){
        console.log("error",E);
        req.flash("success","List an item first")

        res.redirect(`/listing/${req.params.id}`)
    }
    
})



//Done not tested?
app.get('/items',checkAuthenticated,async(req,res)=>{
    const user=await findUserByIdDb(req.user.id)
    let userListings=await findUserListings(req.user.id)
    userListings=userListings.filter((listing)=>{
        
         return listing.id.slice(listing.id.length-5,listing.id.length)!=='admin'
    })
    if(!userListings.length){
        req.flash("noitems","You currently haven't listed any items.")
    }
    
    res.render("myItems",{logged:true,userListings,user})



})

//DB DONE
app.get("/items/new",checkAuthenticated,async(req,res)=>{
    const user=findUserByIdDb(req.user.id)
    const categories=await Category.find()
    res.render("newListing",{logged:true,user,categories})

    
})
//DB DONE NOT TESTED
app.post("/items",checkAuthenticated,async(req,res)=>{
    let newListing=req.body.details
    try{
        if(newListing){
            newListing.userId=req.user.id
            const objToAdd=new Listing(newListing);
            await objToAdd.save();
        }
        req.flash("success","Your listing is pending approval from an admin.")
    }catch(err){
        console.log(err);
    }
        res.redirect("/items")


})

app.get("/items/:id",checkAuthenticated,async (req,res)=>{
    const user=await findUserByIdDb(req.user.id)
    const listing=await findListingInDbById(req.params.id)
    res.render("listing",{logged:true,listing,user})

})
//DB DONE NOT TESTED
app.patch("/items/:id/edit",checkAuthenticated,async (req,res)=>{
    

    const oldListing=await findListingInDbById(req.params.id)
    let newListing;
    if(req.body.newLooksFor===""){
          newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:"",free:true,category:oldListing.category,id:oldListing.id,userId:oldListing.userId}
     }else{
         newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:req.body.newLooksFor,free:false,category:oldListing.category,id:oldListing.id,userId:oldListing.userId}
     }
     
     await Listing.findOneAndUpdate({id:req.params.id},newListing);
     

    res.redirect("/items")
    
    
})
//DB DONE NOT TESTED
app.delete("/items/:id",checkAuthenticated,async (req,res)=>{
    try{
        await Listing.findOneAndDelete({id:req.params.id})
        req.flash("success","Item deleted successfully!")
        
    }catch{
    }
    res.redirect("/items")
})

//db done not tested
app.get("/trades",checkAuthenticated,async(req,res)=>{
    let requests=await findUsersIncomingRequests(req.user.id)
    let pendingRequests=requests.filter(request=>request.completed===false);
    let allRequests= await TradeRequest.find()

    
    
    let completed=allRequests.filter(request=>request.completed===true);

    
    res.render("requests",{logged:true,user:req.user,requests:pendingRequests,completed})
})
//db done not tested
app.post("/trades",checkAuthenticated,async (req,res)=>{
    
    let tradeReq=await TradeRequest.findOne({id:req.body.accept});
    tradeReq.completed=true;
    tradeReq._id=mongoose.Types.ObjectId()
    tradeReq.isNew=true

    
    
    
    if(tradeReq!==null){
        try{ 
            await Listing.findOneAndDelete({id:tradeReq.itemWanted.id})
            await Listing.findOneAndDelete({id:tradeReq.itemProvided.id})

            
            let updated=new TradeRequest(tradeReq)
            await TradeRequest.deleteOne({id:req.body.accept})
            await updated.save()
        }catch(err){console.log(err)}
    }else{
        console.log("tradeRequest to be completed not found");
    }



    res.redirect("/trades")
})

//db done not tested
app.delete("/trades",checkAuthenticated,async(req,res)=>{
    
    try{
        TradeRequest.findOneAndDelete({id:req.body.decline}, function (err, docs) {
            if (err){
                console.log("Error deleting the declined request")
            }
           
        });
    }catch(err){console.log("Error with findOneAndDelete for trade request on trade decline");}
    res.redirect("/trades")
})


app.get("/manage",checkAuthenticated,async (req,res)=>{
    //TODO gimme all categories that exist in categories array
    res.render("admin",{content:"adminAddCategory",data:await Category.find()})
})



app.get("/manage/remove",checkAuthenticated,async (req,res)=>{
    //TODO gimme all categories that exist in categories array
    res.render("admin",{content:"adminRemoveCategory",data:await Category.find()})
})

//db done
app.get("/manage/approve",checkAuthenticated,async (req,res)=>{
    let approve=await findListingsForApproval();
    res.render("admin",{content:"adminApprove",data:approve})
})



app.get("/manage/users",checkAuthenticated,async (req,res)=>{
    //send all users profiles
    res.render("admin",{content:"adminUsers",data:await User.find()})
})

app.get("/manage/carousel",checkAuthenticated,async (req,res)=>{
    //send all listings and carousel array
    res.render("admin",{content:"adminCarousel",data:{listings:await Listing.find(),carousel:await findListingsForCarousel()}})
})

app.post("/manage",checkAuthenticated,async (req,res)=>{
    //TODO add new category to db (category=req.body.ctgName)
    let cat=new Category({ctgName:req.body.ctgName})
    await cat.save()
    res.redirect("/manage")
})
//DB DONE NOT TESTED DONT KNOW IF SPLICE WORKS
app.post("/manage/approve",checkAuthenticated,async(req,res)=>{
    
   let queryString=req.body.id;
   let approved=await findListingInDbById(queryString)
   
   approved.id=approved.id.slice(0,approved.id.length-5);
   await Listing.findOneAndUpdate({id:req.body.id},approved)
    res.redirect("/manage/approve")
})

app.delete("/manage/approve",checkAuthenticated,async (req,res)=>{
    
    await Listing.findOneAndDelete({id:req.body.id})
    res.redirect("/manage/approve")
})


app.delete("/manage",checkAuthenticated,async (req,res)=>{
    
    try{
        await Category.findOneAndDelete({catgName:req.body.ctgName})
    }catch(e){
        console.log(e);
    }
    res.redirect("/manage/remove")
})



app.post("/manage/carousel",checkAuthenticated,async (req,res)=>{
    //replace listing with (title=req.body.replace) with (title=req.body.for) in carousel array
    // carousel.splice(carousel.indexOf(carousel.find((listing)=>listing.title===req.body.replace)),1) 
    //get listing with title=req.body.for from db and push it in carousel array
    // carousel.push(listings.find((listing)=>listing.title===req.body.for))
    let carouselListings=await findListingsForCarousel()
    // let listingToRemove=carouselListings.find((listing)=>{listing.id===req.body.replace})
    await Listing.findOneAndDelete({id:req.body.replace})
    

    console.log(req.body.for);
    let newId=await Listing.findOne({id:req.body.for})
    console.log("NEWID",newId);
    newId.id=`${newId.id}carousel`
    newId._id=mongoose.Types.ObjectId()
    newId.userId="null"
    newId.isNew=true
    let addition=new Listing(newId)
    console.log(req.body.for);
    await addition.save()
    res.redirect("/manage/carousel")
})


app.get("/about",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("about",{logged:true,user:req.user})
    }else{
        res.render("about",{logged:false})
    }


})


app.get("/mission",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("mission",{logged:true,user:req.user})
    }else{
        res.render("mission",{logged:false})
    }


})


app.get("/vision",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("vision",{logged:true,user:req.user})
    }else{
        res.render("vision",{logged:false})
    }


})









app.listen(3000)