const exp = require("constants")
const express = require("express")
const path = require("path")

const app= express()

const aggelies=[
    {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
    title:"Some title",
    text:":this is a very good shoe",
    looksFor:"guns",
    free:false
    }

]


app.use(express.static(path.join(__dirname,"/views")))
app.use(express.json())

app.get("/search",(req,res)=>{
    
    res.redirect("/")
})

app.post("/search",(req,res)=>{
    console.log(req.body);
    res.send(JSON.stringify(aggelies[0]))
})


app.listen(3000)