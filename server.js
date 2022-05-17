

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



const TradeRequest = require("./models/trade_request.js")


const app= express()
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use("/static",express.static(path.join(__dirname,"/frontend","/static")))
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
.then(res=>{
    //console.log(res);
})
.catch(err=>{
    console.log(err,"errorrrmen");
})

async function findListingInDbById(id){
    try{
         const ans=await Listing.findOne({userId:id});
         return ans;
    }catch(err){
        return null;
    }
}
async function saveListingInDb(details){
    try{
        const list=new Listing(details);
        list.save();
        return true;
    }catch(err){
        console.log("Error saving listing in DB");
        return false;
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









const tmpPass=()=>{
    
    bcrypt.hash("12345",10).then(async(pass)=>{
        let user={id:1234,email:"admin",password:pass,firstName:"Bobby"}
        let actualUser={id:1111,email:"geo",password:pass,firstName:"Dicks"}
        user.type="admin"
        actualUser.type="user"
        users.push(user)
        users.push(actualUser)
        let user1=new User(user);
        let user2=new User(actualUser);
        await user1.save();
        await user2.save();
    })
    bcrypt.hash("12345",10).then((pass)=>{
        let user={id:1236,email:"user",password:pass,firstName:"Bobby"}
        user.type="user"
        users.push(user)
    })
    
    
}

tmpPass()



let users=[]
let categories=[{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"shit"},
{ctgName:"cell"},
{ctgName:"Shoes"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"},
{ctgName:"condition"}];
//TODO make listing format as below / need listing id as well 
let listings=[
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"White converse",
    text:"They are in great condition",
    looksFor:"Headphones",
    free:false,
    category:"Shoes",
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1604528705-41qPLTVYudL.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
    title:"Adjustable barbell",
    text:"Settings are 5,10,15,20 kg, bought 3 months ago",
    looksFor:"Clothes",
    free:false,
    category:"Shoes",
    id:Date.now().toString(),
    userId:1232
    },
    {src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzAc1YNXAm6gMJwGTWoQDGBv5aYNJ9sSp2XxgTlUHgFSKMazX9tUdupGlbd5R4kbgvz0&usqp=CAU",
    title:"Apple iPhone 12 5G 4GB/64GB",
    text:"It has a dead battery, but everything alse works",
    looksFor:"Phone",
    free:false,
    category:"cell",
    id:Date.now().toString(),
    userId:1232
    },
    {src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    category:"cell",
    id:Date.now().toString(),
    userId:1233
    },
    {src:"https://www.thespruce.com/thmb/gbhzpTNcuXz7eh9oK-hyEwYtYec=/900x0/filters:no_upscale():max_bytes(150000):strip_icc()/AminaRoundAccentMirror-8936df5a69af4d6fbcd082898998c43e.jpg",
    title:"Round Bathroom Mirror",
    text:"It's a very stylish bathroom mirror, really aesthetic",
    looksFor:"Peanut Butter",
    free:false,
    category:"shit",
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://www.ubuy.com.gr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFVeGZYVFV5dkwuX0FDX1NMMTUwMF8uanBn.jpg",
    title:"Logitech G203",
    text:"I've had it for a few months and it works great",
    looksFor:"Chair",
    free:false,
    category:"shit",
    id:Date.now().toString(),
    userId:1235
    }
]
let filteredListings=[]

let approve=[]

let carousel=listings.slice(0,3)


app.get("/",(req,res)=>{
    //if a category is still on
    if(filteredListings.length!==0){       
        res.redirect("/search")
    }
    if(req.isAuthenticated()){
        //TODO gimme all categories from db like categories=[{ctgID,ctgName},...]
        res.render("main",{categories,listings,logged:true,user:req.user,carousel})
    }else{
        res.render("main",{categories,listings,logged:false,carousel})
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
        const hashedPass= await bcrypt.hash(details.password,10)
        
        
        
        const emailExists=User.find({email:email})
        if(emailExists!==undefined){console.log("email found");}
        
        if(emailExists){
            req.flash("error","This email has already been registered!")
            res.redirect("/signup")

        }else{
            details.password=hashedPass
            users.push({
                id:Date.now().toString(),
                ...details,
                type:"user"
            })
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
    
    const isHisListing=false
    for(listing of myListings){
        if(listing.id===req.params.id)
            isHisListing=true;
    }
    try{
        if(isHisListing){
            req.flash("error","You can't make a trade with yourself!")
        }
        res.render("trade",{logged:true,user:req.user,listing:listings[0],myListings})
    }catch{
        res.redirect("/")
    }
})
//db done not tested
app.post("/listing/:id",checkAuthenticated,async (req,res)=>{
    
    try{
        let itemWanted=await findListingInDbById(req.params.id);
        const tradeRequest=new TradeRequest(Date.now.toString(),req.body.tradeFor,itemWanted)
        await tradeRequest.save();
        req.flash("success","Request has been made, awaiting approval!")
        res.redirect(`/listing/${req.params.id}`)
    }catch{
        res.redirect("/")
    }
    
})



//Done not tested?
app.get('/items',checkAuthenticated,async(req,res)=>{
    const user=await findUserByIdDb(req.user.id)
    let userListings=await findUserListings(req.user.id)
    userListings=userListings.filter(listing=>listing.id.slice(listing.id.length-5,listing.id.length)!=='admin')
    //const userListings=listings.slice(-4)
    console.log("ALL LISTINGS OF USER",userListings,"  user",user," id",req.user.id);
    res.render("myItems",{logged:true,userListings,user})


})

//DB DONE
app.get("/items/new",checkAuthenticated,async(req,res)=>{
    const user=findUserByIdDb(req.user.id)
    res.render("newListing",{logged:true,user})
    
})
//DB DONE NOT TESTED
app.post("/items",checkAuthenticated,async(req,res)=>{
    const newListing={...req.body.details,id:`${Date.now().toString()}admin`,userId:req.user.id}
    const objToAdd=new Listing(newListing);
    try{
        await objToAdd.save();
        req.flash("success","Your listing is pending approval from an admin.")
    }catch(err){
        console.log("ERRORNEWLISTING");
    }
        res.redirect("/items")


})

app.get("/items/:id",checkAuthenticated,async (req,res)=>{
    const user=users.find((user)=>{return user.id===req.user.id})
    const listing=await findListingInDbById(req.params.id)
    res.render("listing",{logged:true,listing,user:req.user})

})
//DB DONE NOT TESTED
app.patch("/items/:id/edit",checkAuthenticated,async (req,res)=>{
    

    const oldListing=await findListingInDbById(req.params.id)
    let newListing;
    if(req.body.newLooksFor===""){
          newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:"",free:true,id:oldListing.id,userId:oldListing.userId}
     }else{
         newListing={src:oldListing.src,title:req.body.newTitle,text:req.body.newText,looksFor:req.body.newLooksFor,free:false,id:oldListing.id,userId:oldListing.userId}
     }
     Listing.findOneAndUpdate({id:req.params.id},newListing);

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
    
    
    let completed=requests.filter(request=>request.completed===true);
    res.render("requests",{logged:true,user:req.user,pendingRequests,completed})
})
//db done not tested
app.post("/trades",checkAuthenticated,async (req,res)=>{
    
    let tradeReq=await TradeRequest.findOne({id:req.body.accept});
    tradeReq.completed=true;
    if(tradeReq!==null){
        try{
            await TradeRequest.findOneAndUpdate({id:req.body.accept},tradeReq)
        }catch(err){console.log("Error updating request to completed")}
    }else{
        console.log("tradeRequest to be completed not found");
    }


    res.redirect("/trades")
})

//db done not tested
app.delete("/trades",checkAuthenticated,async(req,res)=>{
    
    try{
        TradeRequest.findOneAndDelete({id: req.body.decline }, function (err, docs) {
            if (err){
                console.log("Error deleting the declined request")
            }
           
        });
    }catch(err){console.log("Error with findOneAndDelete for trade request on trade decline");}
    res.redirect("/trades")
})


app.get("/manage",checkAuthenticated,(req,res)=>{
    //TODO gimme all categories that exist in categories array
    res.render("admin",{content:"adminAddCategory",data:categories})
})



app.get("/manage/remove",checkAuthenticated,(req,res)=>{
    //TODO gimme all categories that exist in categories array
    res.render("admin",{content:"adminRemoveCategory",data:categories})
})

//db done
app.get("/manage/approve",checkAuthenticated,async (req,res)=>{
    let approve=await findListingsForApproval();
    res.render("admin",{content:"adminApprove",data:approve})
})


app.get("/manage/users",checkAuthenticated,(req,res)=>{
    //send all users profiles
    res.render("admin",{content:"adminUsers",data:users})
})

app.get("/manage/carousel",checkAuthenticated,(req,res)=>{
    //send all listings and carousel array
    res.render("admin",{content:"adminCarousel",data:{listings,carousel}})
})

app.post("/manage",checkAuthenticated,(req,res)=>{
    //TODO add new category to db (category=req.body.ctgName)
    categories.push({ctgName:req.body.ctgName,selected:false})
    res.redirect("/manage")
})
//DB DONE NOT TESTED DONT KNOW IF SPLICE WORKS
app.post("/manage/approve",checkAuthenticated,async(req,res)=>{
    
   let queryString=req.body.id;
   //queryString=queryString.concat('admin')
   let approved=await findListingInDbById(queryString)
   console.log("id before"+approved.id);
   approved.id=approved.id.slice(0,approved.id.length-5);
   console.log("id after approve"+approved.id);
   await Listing.findOneAndUpdate({id:req.body.id},approved)
    res.redirect("/manage/approve")
})

app.delete("/manage/approve",checkAuthenticated,(req,res)=>{
    //TODO remove listing with id=req.body.id from admin's approval table
    const approved=approve.find((listing)=>{
        return listing.id===req.body.id
    })
    approve.splice(approve.indexOf(approved),1)
    res.redirect("/manage/approve")
})


app.delete("/manage",checkAuthenticated,(req,res)=>{
    //TODO find cateogry with name: req.body.ctgName and delete it
    categories.splice(categories.indexOf(categories.find((cat)=>cat.ctgName===req.body.ctgName)),1)
    res.redirect("/manage/remove")
})

app.post("/manage/carousel",checkAuthenticated,(req,res)=>{
    //replace listing with (title=req.body.replace) with (title=req.body.for) in carousel array
    carousel.splice(carousel.indexOf(carousel.find((listing)=>listing.title===req.body.replace)),1) 
    //get listing with title=req.body.for from db and push it in carousel array
    carousel.push(listings.find((listing)=>listing.title===req.body.for))
    res.redirect("/manage/carousel")
})








app.listen(3000)