

const express = require("express")
const path = require("path")
const mongoose=require("mongoose")
const Listing=require('./models/listing.js')
const bcrypt=require("bcrypt")
const initializePassport=require("./passport-config")
const passport=require("passport")
const flash=require("express-flash")
const session=require("express-session")
const methodOverride=require("method-override")


// const {search}=require("./frontend/static/abstracts/search.js").default



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

//find user by email to use on login
//TODO search for user in db insted of users array
initializePassport(passport,
    email=>{
    return users.find(user=>user.email===email)},
    id=>{return users.find(user=>user.id===id)}
)

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







mongoose.connect('mongodb://localhost:27017/TRADdiction',{useNewUrlParser:true, useUnifiedTopology: true})
.then(res=>{
    //console.log(res);
})
.catch(err=>{
    console.log(err,"errorrrmen");
})

const tmpPass=()=>{
    
    bcrypt.hash("12345",10).then((pass)=>{
        let user={id:1234,email:"admin",password:pass,firstName:"Bobby"}
        user.type="admin"
        users.push(user)
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

app.post("/signup",checkNotAuthenticated,async (req,res)=>{
    //TODO delete temp users array and push new user to db
    try{
        const details=req.body
        const hashedPass= await bcrypt.hash(details.password,10)
        
        
        
        //TODO also search if email already exists in db
        const emailExists=users.find((user)=>user.email===details.email)!==undefined
        
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

app.post("/recover",checkNotAuthenticated,(req,res)=>{
    //TODO find if account with that email=req.body.emailRec exists
    try{
        if(users.find((user)=>{
            return user.email===req.body.emailRec
        })){
            req.flash("exists","Please check your email, in order to recover your password!")
        }else{
            req.flash("exists","No account with that email has been registered!")
        }
        res.redirect("/recover")
    }catch{
        res.redirect("/login")
    }
    

})

app.get("/listing/:id",checkAuthenticated,(req,res)=>{
    //TODO find listing with id=req.params.id and pass it on => this is the listing he is interested in
    //also we need an array with user's listings => userId=req.user.id . Put the listings in myListings array
    const myListings=listings.slice(4,8)
    
    //also check if the selected listing is one of his listings =>error message
    const isHisListing=false
    try{
        if(isHisListing){
            req.flash("error","You can't make a trade with yourself!")
        }
        res.render("trade",{logged:true,user:req.user,listing:listings[0],myListings})
    }catch{
        res.redirect("/")
    }
})

app.post("/listing/:id",checkAuthenticated,(req,res)=>{
    //TODO go and register new trade request 
    //user with userId=req.user.id wants to trade his listing with id=req.body.tradeFor for listing with id=req.params.id
    try{
        req.flash("success","Request has been made, awaiting approval!")
        res.redirect(`/listing/${req.params.id}`)
    }catch{
        res.redirect("/")
    }
    
})




app.get('/items',checkAuthenticated,(req,res)=>{
    //TODO find user in db with user id = req.user.id
    
    const user=users.find((user)=>{return user.id===req.user.id})
    //TODO then find all listings for that user id
    const userListings=listings.slice(-4)
    res.render("myItems",{logged:true,userListings,user})


})

//create a new listing
app.get("/items/new",checkAuthenticated,(req,res)=>{
    const user=users.find((user)=>{return user.id===req.user.id})
    res.render("newListing",{logged:true,user})
    
})

app.post("/items",checkAuthenticated,(req,res)=>{
    try{
    const userId=users.find((user)=>{return user.id===req.user.id}).id
    //TODO go and save the new listing in admin's listings remaining approval
    const newListing={...req.body.details,category:"Shoes",id:Date.now().toString(),userId}
    approve.push(newListing)
        req.flash("success","Your listing is pending approval from an admin.")
    }catch{
        
    }
    res.redirect("/items")


})

app.get("/items/:id",checkAuthenticated,(req,res)=>{
    const user=users.find((user)=>{return user.id===req.user.id})
    //TODO listing item with id=req.params.id in db 
    const listing=listings[0]
    res.render("listing",{logged:true,listing,user:req.user})

})

app.patch("/items/:id/edit",checkAuthenticated,(req,res)=>{
    //TODO find listing with id=req.params.id and update it with new data
    
    const oldListing=listings[0]

    // if(req.body.newLooksFor===""){
        
    //     const newListing={oldListing.src,req.body.newTitle,req.body.newText,"",true,oldListing.id,oldListing.userId}
    // }else{
    //     const newListing={oldListing.src,req.body.newTitle,req.body.newText,req.body.newLooksFor,false,oldListing.id,oldListing.userId}
    // }

    res.redirect("/items")
    
    
})

app.delete("/items/:id",checkAuthenticated,(req,res)=>{
    //TODO find listing with id=req.params.id and remove it from db
    try{
        req.flash("success","Item deleted successfully!")
        
    }catch{
    }
    res.redirect("/items")
})



app.get("/trades",checkAuthenticated,(req,res)=>{
    //TODO get all incoming trade requests for user=req.user and put them in requests array
    const requests=[{id:1234,itemProvided:listings[1],itemWanted:listings[2]}]

    

    //TODO also retrieve completed requests for that user in an array
    const completed=[{itemProvided:listings[3],itemWanted:listings[4]}]
    res.render("requests",{logged:true,user:req.user,requests,completed})
})

app.post("/trades",checkAuthenticated,(req,res)=>{
    //this is called on trade request acceptance
    //TODO take the accepted trade id (req.body.accept), find the trade and store it in completed trades
    //also remove the trade from user's (req.user) trade requests
    


    res.redirect("/trades")
})


app.delete("/trades",checkAuthenticated,(req,res)=>{
    //this is called on trade decline
    //TODO take the declined trade it (req.body.decline), find the trade and remove it from user's (req.user) trade requests
    
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


app.get("/manage/approve",checkAuthenticated,(req,res)=>{
    
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
app.post("/manage/approve",checkAuthenticated,(req,res)=>{
    //TODO find listing with id=req.body.id in admin's approve table, remove it and put it in listings table
    
    const approved=approve.find((listing)=>{
        return listing.id===req.body.id
    })
    approve.splice(approve.indexOf(approved),1)
    listings.push(approved)
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