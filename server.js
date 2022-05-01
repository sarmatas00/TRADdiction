const exp = require("constants")
const express = require("express")
const path = require("path")




const app= express()

const aggelies=[
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good sho",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good sh",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good s",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good shoefgh",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good shoedfgdfg",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very goofghd shoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good sdfsfdghoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good shhgjdfgoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is dfga very good shoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this iss a very good fghdfshoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a dvery goofd sshoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this zis a very gofod sdhoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":tszdfhis is a very good shoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good shoddde",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":thifffs is a very good shoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":thidfs isdf a verydf good shdfoe",
    looksFor:"guns",
    free:false
    },
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very gzsdfszdfzsdfood shoe",
    looksFor:"guns",
    free:false
    }

]

app.use("/static",express.static(path.join(__dirname,"/frontend","/static")))
app.use(express.json())

let i=0
let finish=true

app.post("/search",(req,res)=>{
    if(req.body.numberOfItems!=10 && !req.body.finish){
        finish=false
        res.send(JSON.stringify(aggelies.slice(0,4)))
        

    }else if(req.body.numberOfItems==10 && finish){
        
        res.send(JSON.stringify(aggelies.slice(i,i+=2)))
        if(i>=aggelies.length){i=0}
    }else if(req.body.numberOfItems!=10 && req.body.finish){
        finish=true
        res.send(JSON.stringify(aggelies.slice(0,4)))
    }
})


app.post("/signup",(req,res)=>{
    //TODO 
    // search the db for similarities in email and return true if signup is successful
    res.send(JSON.stringify(true))
})

app.post("/login",(req,res)=>{
    //TODO 
    // search the db for similarities in email and return true if signup is successful
    const response={
        userID:"90076i",
        wrongPass:false,
        wrongEmail:true
    }
    res.send(JSON.stringify(response))
    
})

app.get("*",(req,res)=>{
    
    
    res.sendFile(path.resolve(__dirname,"frontend","index.html"))
})

app.listen(3000)