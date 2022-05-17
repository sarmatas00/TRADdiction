

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


const {search}=require("./frontend/static/abstracts/search.js")
const TradeRequest = require("./models/trade_request.js")


const app= express()
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use("/static",express.static(path.join(__dirname,"/frontend","/static")))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(session({
    secret:"poutsa",
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
    
    
}

tmpPass()
let users=[]
let categories=[{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false},
{ctgName:"condition",selected:false}];
let listings=[
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"White converse",
    text:"They are in great condition",
    looksFor:"Headphones",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1604528705-41qPLTVYudL.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
    title:"Adjustable barbell",
    text:"Settings are 5,10,15,20 kg, bought 3 months ago",
    looksFor:"Clothes",
    free:false,
    id:Date.now().toString(),
    userId:1232
    },
    {src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzAc1YNXAm6gMJwGTWoQDGBv5aYNJ9sSp2XxgTlUHgFSKMazX9tUdupGlbd5R4kbgvz0&usqp=CAU",
    title:"Apple iPhone 12 5G 4GB/64GB",
    text:"It has a dead battery, but everything alse works",
    looksFor:"Phone",
    free:false,
    id:Date.now().toString(),
    userId:1232
    },
    {src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    id:Date.now().toString(),
    userId:1233
    },
    {src:"https://www.thespruce.com/thmb/gbhzpTNcuXz7eh9oK-hyEwYtYec=/900x0/filters:no_upscale():max_bytes(150000):strip_icc()/AminaRoundAccentMirror-8936df5a69af4d6fbcd082898998c43e.jpg",
    title:"Round Bathroom Mirror",
    text:"It's a very stylish bathroom mirror, really aesthetic",
    looksFor:"Peanut Butter",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://www.ubuy.com.gr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFVeGZYVFV5dkwuX0FDX1NMMTUwMF8uanBn.jpg",
    title:"Logitech G203",
    text:"I've had it for a few months and it works great",
    looksFor:"Chair",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg",
    title:"2014 Laptop",
    text:"It can handle browsing very well, works great!",
    looksFor:"GPU",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://media.gamestop.com/i/gamestop/11116261/Pokemon-Coffee-Maker-with-Poke-Ball-Mug",
    title:"Coffee machine",
    text:"I don't like the coffee it makes, maybe you will",
    looksFor:"",
    free:true,
    id:Date.now().toString(),
    userId:1233
    },
    {src:"data:image/jpeg;base64,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",
    title:"Air fryer",
    text:"Works great, it's in brand new condition!",
    looksFor:"Rice cooker",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://letstalkscience.ca/sites/default/files/2019-08/how-can-i-make-my-own-weighing-scale.jpg",
    title:"Decorative scale",
    text:"I'm moving, it looks nice!",
    looksFor:"",
    free:true,
    id:Date.now().toString(),
    userId:1233
    },
    {src:"https://m.media-amazon.com/images/I/61Oi8E1n-nL.jpg",
    title:"Optimum Nutrition Micronized Creatine",
    text:"It hasn't been opened my mom says it will destroy my liver",
    looksFor:"Tren Acetate",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://cdn.vox-cdn.com/thumbor/Eu5ze2W1RmZQjxX2GqhIxWgvm4g=/0x0:2000x1284/1200x0/filters:focal(0x0:2000x1284):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8834801/pizza_shoe12.jpg",
    title:"Pizza shoes!!",
    text:"I'm cutting I can't look at this",
    looksFor:"",
    free:true,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://m.media-amazon.com/images/I/81nC4u9eYfL._UY445_.jpg",
    title:"Timewear Analog Watch",
    text:"This watch is very aesthetic and of great quality",
    looksFor:"Sunglasses",
    free:false,
    id:Date.now().toString(),
    userId:1232
    },
    {src:"https://media.wired.com/photos/5dae0207c96358000859e5a9/1:1/w_903,h_903,c_limit/Gear-Google-Pixel-4-Front-and-Back-SOURCE-Google.jpg",
    title:"Google Pixel 4",
    text:"Bought 3 months ago with receipt proof and 2 year warranty",
    looksFor:"IPhone 12",
    free:false,
    id:Date.now().toString(),
    userId:1233
    },
    {src:"https://c.scdn.gr/images/sku_main_images/016419/16419687/20200930121320_xiaomi_mi_true_wireless_earbuds_basic_mayro.jpeg",
    title:"Xiaomi Earbuds",
    text:"They are in good condition and have great sound",
    looksFor:"Computer mouse",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://www.thespruce.com/thmb/KUpUkVPGdrySHTlPe5AHT0h08kk=/3360x1890/smart/filters:no_upscale()/signs-to-replace-your-couch-4165258-hero-5266fa7b788c41f6a02f24224a5de29b.jpg",
    title:"Couch",
    text:"A beautiful couch in great condition",
    looksFor:"Oven",
    free:false,
    id:Date.now().toString(),
    userId:1235
    },
    {src:"https://de.farnell.com/productimages/large/en_GB/2886381-40.jpg",
    title:"Kern precision scale",
    text:"Gram precision food scale",
    looksFor:"Kitchenware",
    free:false,
    id:Date.now().toString(),
    userId:1235
    }
]
let filteredListings=[]
let textFilteredListings=[]
let approve=[]

app.get("/",(req,res)=>{
    //if a category is still on
    if(filteredListings.length!==0){       
        res.redirect("/search")
    }
    if(req.isAuthenticated()){
        //TODO gimme all categories from db like categories=[{ctgID,ctgName},...]
        res.render("main",{categories,listings,logged:true,user:req.user})
    }else{
        res.render("main",{categories,listings,logged:false})
    }


})


//invoked when searching by category
app.post("/search",(req,res)=>{
    //TODO i need all the listings for searching in array listings
    
    if(Object.keys(req.body).length!==0){
    
        
        
        //final array of listings after filtering to add to the page
        if(filteredListings.length===0){
            filteredListings=search.searchByCategory(listings,req.body.ctgName)
        }else{
            filteredListings=search.searchByCategory(filteredListings,req.body.ctgName)
        }

        //if that is true, it means that a selected category got unselected
        //TODO go in categories db, find selected cateogry and turn selected=false
        if(!req.body.selected){
            filteredListings=[]
        }
        
        //TODO go in categories db, find selected category and turn selected=true
        categories[0].selected=req.body.selected
            
        
        res.end()
    }
    
    


})

//invoked when searching by text
app.get("/search",(req,res)=>{
    if(Object.keys(req.query).length===0){
        if(textFilteredListings.length===0){
            if(filteredListings.length!==0){
                res.render("main",{categories,listings:filteredListings,logged:req.isAuthenticated()})
            }else{
                res.render("main",{categories,listings,logged:req.isAuthenticated()})
            }
            
        }else{
            
            res.render("main",{categories,listings:textFilteredListings,logged:req.isAuthenticated()})
        }
        
    }else if(req.query.queryText!==""){
        
        if(filteredListings.length===0){
            textFilteredListings=search.searchByText(listings,req.query.queryText)
        }else{
            textFilteredListings=search.searchByText(filteredListings,req.query.queryText)
            
        }
        
        res.render("main",{categories,listings:textFilteredListings,logged:req.isAuthenticated()})
    }else if(req.query.queryText==="" && filteredListings.length!==0){
        textFilteredListings=[]
        res.render("main",{categories,listings:filteredListings,logged:req.isAuthenticated()})
    }
    else{
        
            textFilteredListings=[]
            res.redirect("/")
        
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
        const {email,password,firstName,lastName,number,city,state,zip,terms}=req.body
        const hashedPass= await bcrypt.hash(password,10)
        
        const details={email,password,firstName,lastName,number,city,state,zip,terms}
        
        const emailExists=User.find({email:email})
        if(emailExists!==undefined){console.log("email found");}
        
        if(search.checkInput(details)!=="authenticated"){
            req.flash("error",search.checkInput(details))
            res.redirect("/signup")
        }else if(emailExists){
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


app.delete("/manage",checkAuthenticated,(req,res)=>{
    //TODO find cateogry with name: req.body.ctgName and delete it
    categories.splice(categories.indexOf(categories.find((cat)=>cat.ctgName===req.body.ctgName)),1)
    res.redirect("/manage/remove")
})






app.listen(3000)