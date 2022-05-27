
require("dotenv").config()
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
const Message = require("./models/messages.js")


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


mongoose.connect(process.env.DATABASE,{useNewUrlParser:true, useUnifiedTopology: true})
.then(async res=>{
    
    
    // seed.connect()
})
.catch(err=>{
    console.log(err);
})

// search στη βαση για αγγελια με συγκεκριμενο id
async function findListingInDbById(id){
    try{
         const ans=await Listing.findOne({id:id});
         return ans;
    }catch(err){
        return (err);
    }
}

// search στη βαση για χρηστη με συγκεκριμενο email
async function findUserByEmailDb(email){
    try{
        const ans=await User.findOne({email:email})
        return ans;
    }catch(err){
        console.log("Error finding user by email");
        return null;
    }
}

// search στη βαση για χρηστη με συγκεκριμενο id
async function findUserByIdDb(id){
    try{
        const ans=await User.findOne({id:id});
        return ans;
    }catch(err){
        console.log("Error finding user by ID");
        return null;
    }
}

// search στη βαση για ολες τις αγγελιες που εχει καταχωρισει ενας χρηστης
async function findUserListings(userID){
    try{
        const ans=await Listing.find({userId:userID});
        return ans;
    }catch(err){
        console.log("Error finding listings of user");
        return null;
    }
}
// search στη βαση τις αγγελιες που εχουν καταχωρηθει απο χρηστες αλλα δεν εχουν λαβει ακομα εγκριση απο admin
async function findListingsForApproval(){
    try{
        let ans=Listing.find({id:{$regex:/admin/,$options:'i'}})
        
        return ans;
    }catch(err){console.log("Error findListingsForApproval");return null;}
}
// search στη βαση για trade requests ενος χρηστη στα οποια εμπλεκεται ενα listing του
async function findUsersIncomingRequests(userID){
    try{
        tradeReqs=await TradeRequest.find({'itemWanted.userId':userID})
        return tradeReqs;
    }catch(err){
        console.log("DBErrorFindingUsersIncomingRequest");
        return null;
    }
}

//search στη βαση για τις αγγελιες που εχουν επιλεχθει απο τον admin να γινονται display στο carousel 
async function findListingsForCarousel(){
    try{
        let ans=Listing.find({id:{$regex:/carousel/,$options:'i'}})
        
        return ans;
    }catch(err){console.log("Error findListingsForCarousel");return null;}
}

// search στη βαση για το αν ενας χρηστης προσπαθει να κανει το ιδιο trade request πανω απο μια φορα
async function checkForSameRequest(provided,wanted){
    const allRequests=await TradeRequest.find({})
    
    for(let req of allRequests){
        if(req.itemProvided.title===provided && req.itemWanted.title===wanted){
            return true
        }
    }
    return false

}


//εναρξη της βιβλιοθηκης passport για την αυθεντικοποιηση χρηστη
initializePassport(passport,findUserByEmailDb,findUserByIdDb)

// ελεγχος για το αν υπαρχει συνδεδεμενος χρηστης
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




// request που προβαλλει την αρχικη σελιδα. Αναλογα με το αν υπαρχει συνδεδεμενος χρηστης η οχι, στελνονται τα αναλογα
// δεδομενα για την παρουσιαση του αναλογου navbar/menu
app.get("/",async (req,res)=>{
    
    if(req.isAuthenticated()){
        
        res.render("main",{categories:await Category.find(),listings:(await Listing.find()).filter((listing)=>!listing.id.includes("carousel")),logged:true,user:req.user,carousel:await findListingsForCarousel()})
    }else{
        res.render("main",{categories:await Category.find(),listings:(await Listing.find()).filter((listing)=>!listing.id.includes("carousel")),logged:false,carousel:await findListingsForCarousel()})
    }


})



//προβολη της login σελιδας
app.get("/login",checkNotAuthenticated,(req,res)=>{
    
    res.render("login")
})

// οταν ο χρηστης βαλει τα στοιχεια του και πατησει login, ενεργοποιειται το passport και γινεται
// η ταυτοποιηση. Αν ειναι επιτυχης αναλογα με τον τυπο χρηστη φορτωνει η αναλογη σελιδα, αλλιως ξαναοδηγειται στο login page
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

// προβολη της signup σελιδας
app.get("/signup",checkNotAuthenticated,(req,res)=>{
    res.render("signup")
})

//post request που ενεργοποιειται απο την σελιδα των events, οταν ο χρηστης εχει συμπληρωσει σωστα ολα τα απαραιτητα στοιχεια για signup

app.post("/signup",checkNotAuthenticated,async (req,res)=>{
    try{
        const details=req.body          //το object με τα στοιχεια του νεου χρηστη
        const hashedPass= await bcrypt.hash(details.password,10)        //κρυπτογραφηση του κωδικου που εχει δωσει ο χρηστης με την βοηθεια βιβλιοθηκης
        
        
        
        const emailExists=await User.findOne({email:details.email})         //ελεγχος για υπαρξη account με ιδιο email
        
        
        if(emailExists){
            req.flash("error","This email has already been registered!")
            res.redirect("/signup")                                         //ανακατευθυνση σε περιπτωση ιδιου email

        }else{
            details.password=hashedPass
            
            const newUser=new User({id:Date.now().toString(),...details,type:"user"});      
            newUser.save();                                                 //αποθηκευση νεου χρηστη στη βαση
            res.redirect("/login")

        }

        
        
    }catch(e){
        console.log(e);

        res.redirect("/signup")
    }
    
})

//delete request που ενεργοποιειται οταν πατησει ο χρηστης το κουμπι logout και ενεργοποιει την logout μεθοδο του passport
app.delete("/logout",(req,res)=>{
    req.logout()
    res.redirect("/")
})

//σελιδα για επαναφορα κωδικου χρηστη
app.get("/recover",checkNotAuthenticated,(req,res)=>{
    res.render("forgetPass")
})


app.post("/recover",checkNotAuthenticated,async (req,res)=>{
    try{
        let dbFound=await findUserByEmailDb(req.body.emailRec);             //ελεγχος για υπαρξη αυτου του account με αυτο το email
        let mail=dbFound.email;
        if(mail){                           //προβολη αναλογου μηνυματος αναλογα με την υπαρξη του account και ανακτευθυνση
            req.flash("exists","Please check your email, in order to recover your password!")
        }else{
            req.flash("exists","No account with that email has been registered!")
        }
        res.redirect("/recover")
    }catch{
        res.redirect("/login")
    }
    

})
//προβολη μαις συκεκριμενης αγγελιας οταν υπαρχει συνδεδεμενος χρηστης και πατησει "View" σε καποια αγγελια της αρχικης σελιδας
app.get("/listing/:id",checkAuthenticated,async(req,res)=>{
    const myListings=await findUserListings(req.user.id)        
    
    let isHisListing=false
    for(let listing of myListings){                 //ελεγχος για το αν η αγγελια που θελει να δει ειναι δικη του καταχωρηση
        if(listing.id===req.params.id)
            isHisListing=true;
    }
    try{
        if(isHisListing){                   //ο χρηστης δεν μπορει να κανει ανταλλαγη με τον ευατο του =>μηνυμα λαθους
            req.flash("error","You can't make a trade with yourself!")
        }
        res.render("trade",{logged:true,user:req.user,listing:await findListingInDbById(req.params.id),myListings})
    }catch{
        res.redirect("/")
    }
})


//request οταν ο χρηστης κανει trade request για μια συγκεκριμενη αγγελια με :id
app.post("/listing/:id",checkAuthenticated,async (req,res)=>{
    
    try{
        
        if(req.body.tradeFor!==undefined){          //πρεπει να εχει επιλεξει καποιο αντικειμενο να δωσει
        let itemWanted=await findListingInDbById(req.params.id);
        const request={id:Date.now().toString(),itemProvided:await findListingInDbById(req.body.tradeFor),itemWanted:itemWanted}
        let tradeRequest=new TradeRequest(request)      //κατασκευη νεου request και αποθηκευση στην βαση, εαν δεν εχει ξαναγινει το ιδιο request
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



//προβολη της σελιδας "my items"
app.get('/items',checkAuthenticated,async(req,res)=>{
    const user=await findUserByIdDb(req.user.id)
    let userListings=await findUserListings(req.user.id)
    userListings=userListings.filter((listing)=>{               //φερνουμε ολες τις αγγελιες του συγκεκριμενου χρηστη
        
         return listing.id.slice(listing.id.length-5,listing.id.length)!=='admin'       //οχι τις αγγελιες που δεν εχουν λαβει εγκριση ακομα απο admin
    })
    if(!userListings.length){                   //μηνυμα λαθους αν ο χρηστης δεν εχει καταχωρισει καποια αγγελια
        req.flash("noitems","You currently haven't listed any items.")
    }
    
    res.render("myItems",{logged:true,userListings,user})



})

//προβολη σελιδας "new Listing" για καταχωρηση νεας αγγελιας
app.get("/items/new",checkAuthenticated,async(req,res)=>{
    const user=findUserByIdDb(req.user.id)
    const categories=await Category.find()
    res.render("newListing",{logged:true,user,categories})

    
})
//παιρνουμε τα στοιχεια της νεας αγγελιας 
app.post("/items",checkAuthenticated,async(req,res)=>{
    let newListing=req.body.details
    try{
        if(newListing){             //αποθηκευουμε την νεα αγγελια στην βαση
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

//προβολη σελιδας "Edit listing" για αλλαγη data μιας αγγελιας που εχει ηδη καταχωρησει ο χρηστης
app.get("/items/:id",checkAuthenticated,async (req,res)=>{
    const user=await findUserByIdDb(req.user.id)
    const listing=await findListingInDbById(req.params.id)
    res.render("listing",{logged:true,listing,user})

})
//patch request για edit μιας αγγελιας με τα νεα στοιχεια 
app.patch("/items/:id/edit",checkAuthenticated,async (req,res)=>{
    

    const oldListing=await findListingInDbById(req.params.id)
    let newListing;
    if(req.body.newLooksFor===""){          //κατασκευη αντικειμενου νεας αγγελιας με τα νεα δεδομενα
          newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:"",free:true,category:oldListing.category,id:oldListing.id,userId:oldListing.userId}
     }else{
         newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:req.body.newLooksFor,free:false,category:oldListing.category,id:oldListing.id,userId:oldListing.userId}
     }
     
     await Listing.findOneAndUpdate({id:req.params.id},newListing);         //update της αγγελιας στη βαση
     

    res.redirect("/items")
    
    
})
//διαγραφη αγγελιας απο την βαση
app.delete("/items/:id",checkAuthenticated,async (req,res)=>{
    try{
        await Listing.findOneAndDelete({id:req.params.id})
        req.flash("success","Item deleted successfully!")
        
    }catch{
    }
    res.redirect("/items")
})

//προβολη σελιδας "Trades"
app.get("/trades",checkAuthenticated,async(req,res)=>{
    let requests=await findUsersIncomingRequests(req.user.id)
    let pendingRequests=requests.filter(request=>request.completed===false);
    let allRequests= await TradeRequest.find()

    
    
    let completed=allRequests.filter(request=>request.completed===true);

    //στελνουμε για render ολα τα completed και pending requests για εναν συγκεκριμενο χρηστη
    res.render("requests",{logged:true,user:req.user,requests:pendingRequests,completed})
})

//αποδοχη ανταλλαγης απο χρηστη
app.post("/trades",checkAuthenticated,async (req,res)=>{
    
    let tradeReq=await TradeRequest.findOne({id:req.body.accept});      //βρισκουμε το request που θελει να αποδεχτει
    tradeReq.completed=true;                                            
    tradeReq._id=mongoose.Types.ObjectId()
    tradeReq.isNew=true

    
    
    
    if(tradeReq!==null){
        try{ 
            //διαγραφη των listing που εμπλεκονται στο request απο την σελιδα αφου πλεον δεν ειναι διαθεσιμα
            await Listing.findOneAndDelete({id:tradeReq.itemWanted.id})
            await Listing.findOneAndDelete({id:tradeReq.itemProvided.id})

            //διαγραφη του παλιου request και αποθηκευση του νεου με completed=true
            let updated=new TradeRequest(tradeReq)
            await TradeRequest.deleteOne({id:req.body.accept})              
            await updated.save()
        }catch(err){console.log(err)}
    }else{
        console.log("tradeRequest to be completed not found");
    }



    res.redirect("/trades")
})

//απορριψη request απο χρηστη
app.delete("/trades",checkAuthenticated,async(req,res)=>{
    
    try{
        // βρισκουμε το συγκεκριμενο request και το διαγραφουμε 
        TradeRequest.findOneAndDelete({id:req.body.decline}, function (err, docs) {
            if (err){
                console.log("Error deleting the declined request")
            }
           
        });
    }catch(err){console.log("Error with findOneAndDelete for trade request on trade decline");}
    res.redirect("/trades")
})

// προβολη κεντρικης σελιδας admin 
app.get("/manage",checkAuthenticated,async (req,res)=>{
    //το default view που εμφανιζεται ειναι αυτο της προσθηκης νεας κατηγοριας
    res.render("admin",{content:"adminAddCategory",data:await Category.find()})     
})


//προβολη σελιδας admin για διαγραφη μιας κατηγοριας
app.get("/manage/remove",checkAuthenticated,async (req,res)=>{
    res.render("admin",{content:"adminRemoveCategory",data:await Category.find()})
})

//προβολη σελιδας admin για approval νεων αγγελιων
app.get("/manage/approve",checkAuthenticated,async (req,res)=>{
    let approve=await findListingsForApproval();            
    res.render("admin",{content:"adminApprove",data:approve})
})


//σελιδα admin που προβαλλονται ολοι οι εγγεγραμμενοι χρηστες της εφαρμογης
app.get("/manage/users",checkAuthenticated,async (req,res)=>{
    res.render("admin",{content:"adminUsers",data:await User.find()})
})

//σελιδα admin για ελεγχο των αγγελιων που βρισκονται στο carousel της αρχικης σελιδας
app.get("/manage/carousel",checkAuthenticated,async (req,res)=>{
    res.render("admin",{content:"adminCarousel",data:{listings:await Listing.find(),carousel:await findListingsForCarousel()}})
})

// σελιδα admin για προβολη ολων των μηνυματων που εχουν ληφθει απο την φορμα επικοινωνιας
app.get("/manage/contact",checkAuthenticated,async (req,res)=>{
    res.render("admin",{content:"adminContact",data:await Message.find()})
})

//request για προσθηκη νεας κατηγοριας
app.post("/manage",checkAuthenticated,async (req,res)=>{
    //παιρνουμε το ονομα της νεας κατηγοριας και την αποθηκευουμε στην βαση
    let cat=new Category({ctgName:req.body.ctgName})
    await cat.save()
    res.redirect("/manage")
})

//request για αποδοχη νεας αγγελιας
app.post("/manage/approve",checkAuthenticated,async(req,res)=>{
    
   let queryString=req.body.id;                             //id αγγελιας
   let approved=await findListingInDbById(queryString)          //ευρεση αγγελιας
   
   approved.id=approved.id.slice(0,approved.id.length-5);       //αφαιρουμε απο το id της αγγελιας την λεξη "admin" στο τελος που σηματοδοτει οτι εχει εγκριθει
   await Listing.findOneAndUpdate({id:req.body.id},approved)        //update της αγγελιας με το ανανεωμενο id στην βαση
    res.redirect("/manage/approve")
})

//απορριψη νεας αγγελιας απο admin
app.delete("/manage/approve",checkAuthenticated,async (req,res)=>{
    
    await Listing.findOneAndDelete({id:req.body.id})        //διαγραφουμε τελειως την νεα αγγελια
    res.redirect("/manage/approve")
})

//request για διαγραφη υπαρχουσας κατηγοριας με συγκεκριμενο ονομα απο την βαση
app.delete("/manage",checkAuthenticated,async (req,res)=>{
    
    try{
        await Category.findOneAndDelete({catgName:req.body.ctgName})
    }catch(e){
        console.log(e);
    }
    res.redirect("/manage/remove")
})


//edit των αγγελιων που γινονται display στο carousel
app.post("/manage/carousel",checkAuthenticated,async (req,res)=>{
    
    let carouselListings=await findListingsForCarousel()
    //διαγραφουμε την αγγελια που υπαρχει ηδη στο carousel και θελουμε να αντικαταστησουμε
    //δεν διαγραφουμε την πραγματικη αγγελια, αλλα ενα διπλοτυπο της με την λεξη "carousel" στο id
    await Listing.findOneAndDelete({id:req.body.replace})       
    

    // προσθετουμε την νεα αγγελια με την λεξη "carousel" στις αγγελιες / αυτη που εχει επιλεξει για αντικατασταση
    let newId=await Listing.findOne({id:req.body.for})
    console.log("NEWID",newId);
    newId.id=`${newId.id}carousel`
    newId._id=mongoose.Types.ObjectId()
    newId.userId="null"
    newId.isNew=true
    let addition=new Listing(newId)
    
    await addition.save()
    res.redirect("/manage/carousel")
})

// προβολη της σελιδας "About us"
app.get("/about",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("about",{logged:true,user:req.user})
    }else{
        res.render("about",{logged:false})
    }


})

// προβολη της σελιδας "Our mission"
app.get("/mission",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("mission",{logged:true,user:req.user})
    }else{
        res.render("mission",{logged:false})
    }


})

// προβολη της σελιδας "Our vision"
app.get("/vision",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("vision",{logged:true,user:req.user})
    }else{
        res.render("vision",{logged:false})
    }


})

// προβολη της σελιδας "Contact us"
app.get("/contact",(req,res)=>{
    if(req.isAuthenticated()){
        
        res.render("contact",{logged:true,user:req.user})
    }else{
        res.render("contact",{logged:false})
    }


})

//οταν καποιος στειλει ενα νεο μηνυμα επικοινωνιας, παιρνουμε τα δεδομενα του μηνυματος και το αποθηκευουμε στην βαση
//ωστε να προβληθει στην συνεχεια στην σελιδα του admin
app.post("/contact",async (req,res)=>{
    console.log(req.body);
    const newMessage=new Message({...req.body})
    await newMessage.save()
    try{
        req.flash("success","Your message has been sent, we will get back to you soon!")
    }catch(e){
        console.log(e);
    }
    res.redirect("/contact")

})








// χρηση του port 3000 για προβολη της εφαρμογης
app.listen(3000)