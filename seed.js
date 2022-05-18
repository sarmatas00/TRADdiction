const mongoose=require('mongoose')
const Listing=require('./models/listing.js')
const bcrypt=require("bcrypt");
const User = require('./models/user.js');
const Category = require('./models/category.js');
let listings=[
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"White converse",
    text:"They are in great condition",
    looksFor:"Headphones",
    free:false,
    category:"Shoes",
    id:1234,
    userId:1235
    },
    {src:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1604528705-41qPLTVYudL.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
    title:"Adjustable barbell",
    text:"Settings are 5,10,15,20 kg, bought 3 months ago",
    looksFor:"Clothes",
    free:false,
    category:"Shoes",
    id:1235,
    userId:1232
    },
    {src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzAc1YNXAm6gMJwGTWoQDGBv5aYNJ9sSp2XxgTlUHgFSKMazX9tUdupGlbd5R4kbgvz0&usqp=CAU",
    title:"Apple iPhone 12 5G 4GB/64GB",
    text:"It has a dead battery, but everything alse works",
    looksFor:"Phone",
    free:false,
    category:"cell",
    id:1236,
    userId:1232
    },
    {src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    category:"cell",
    id:1237,
    userId:1233
    },
    {src:"https://www.thespruce.com/thmb/gbhzpTNcuXz7eh9oK-hyEwYtYec=/900x0/filters:no_upscale():max_bytes(150000):strip_icc()/AminaRoundAccentMirror-8936df5a69af4d6fbcd082898998c43e.jpg",
    title:"Round Bathroom Mirror",
    text:"It's a very stylish bathroom mirror, really aesthetic",
    looksFor:"Peanut Butter",
    free:false,
    category:"shit",
    id:1238,
    userId:1235
    },
    {src:"https://www.ubuy.com.gr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFVeGZYVFV5dkwuX0FDX1NMMTUwMF8uanBn.jpg",
    title:"Logitech G203",
    text:"I've had it for a few months and it works great",
    looksFor:"Chair",
    free:false,
    category:"shit",
    id:1239,
    userId:1235
    }
]

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


let carousel=[{src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
title:"White converse",
text:"They are in great condition",
looksFor:"Headphones",
free:false,
category:"Shoes",
id:`1234carousel`,
userId:1235
},
{src:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1604528705-41qPLTVYudL.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
title:"Adjustable barbell",
text:"Settings are 5,10,15,20 kg, bought 3 months ago",
looksFor:"Clothes",
free:false,
category:"Shoes",
id:`1235carousel`,
userId:1232
},
{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzAc1YNXAm6gMJwGTWoQDGBv5aYNJ9sSp2XxgTlUHgFSKMazX9tUdupGlbd5R4kbgvz0&usqp=CAU",
title:"Apple iPhone 12 5G 4GB/64GB",
text:"It has a dead battery, but everything alse works",
looksFor:"Phone",
free:false,
category:"cell",
id:`1236carousel`,
userId:1232
}]

const tmpPass=async ()=>{
    
    bcrypt.hash("12345",10).then(async (pass)=>{
        let user={id:1234,email:"admin",password:pass,firstName:"Bobby"}
        let actualUser={id:1111,email:"geo",password:pass,firstName:"Dicks"}
        let actualUser2={id:1111,email:"geo",password:pass,firstName:"Dicks"}
        user.type="admin"
        actualUser.type="user"
        actualUser2.type="user"
        
        let user1=new User(user);
        let user2=new User(actualUser);
        let user3=new User(actualUser2);
        await user1.save();
        await user2.save();
        await user3.save();

        
    })
    
    
    
}



mongoose.connect('mongodb://localhost:27017/TRADdiction',{useNewUrlParser:true, useUnifiedTopology: true})
.then(async()=>{
    await tmpPass()

    console.log("DB Connection succesful");
    await Listing.deleteMany({});
    await Listing.insertMany(listings)
    await Listing.insertMany(carousel)
    await User.deleteMany({});
    await Category.deleteMany({});
    await Category.insertMany(categories)
    
    
})
.then(res=>{
    
})
.catch(err=>{
    console.log(err);
})
    
