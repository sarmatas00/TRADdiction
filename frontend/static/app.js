
import abstract from "./abstracts/abstract.js"
import navControl from "./abstracts/navControl.js"
import carouselControl from "./abstracts/carouselControl.js"
import addControl from "./abstracts/addControl.js"
import search from "./abstracts/search.js"

const categoryBtnDiv = document.querySelector("#category .col-2")


for (let i = 1; i < 4; i++) {
    document.querySelector("#category .col-2").insertAdjacentElement("afterend", categoryBtnDiv.cloneNode(true))
}

const categoryRow = document.querySelector("#category").cloneNode(true)
categoryRow.removeChild(categoryRow.children[0])

for (let j = 1; j < 3; j++) {
    document.querySelector("#category").insertAdjacentElement("afterend", categoryRow.cloneNode(true))
}







    async function loadItems(item) {
        
        item.then((r) => {
            console.log(r);
            r=r.map((res)=>{
                
                let elementsOnPage=document.querySelectorAll(".results .item")
                if(!Array.from(elementsOnPage).slice(1).some((element)=>{
                    
                    return element.children[2].innerHTML===res.children[2].innerHTML
                })){
                    return res
                }
            })
            console.log(r);
            

            r.forEach((res)=>{
                if(res!==undefined){
                let resultPage=document.querySelectorAll(".results")
                
                if(resultPage[resultPage.length-1].childElementCount<3){
                    resultPage[resultPage.length-1].appendChild(res)
                }else{
                    resultPage[resultPage.length-1].insertAdjacentElement("afterend",resultPage[resultPage.length-1].cloneNode(false))
                    resultPage=document.querySelectorAll(".results")
                    resultPage[resultPage.length-1].appendChild(res)
                }
            }

            })
        })
        
    }




const categoryBtn = document.querySelectorAll(".category-btn")
categoryBtn.forEach(btn => {

    btn.addEventListener("click", (evt) => {
        
        if(evt.target.style.backgroundColor!=="aqua"){

        
        let item = new search({category:evt.target.innerText,text:""})
        
        loadItems(item.searchByCategory())
        evt.target.style.backgroundColor="aqua"
        }
        
        evt.preventDefault()
    })

    
})

const queryForm= document.querySelector(".queryItemsForm")
const queryItems= document.querySelector("#queryItems")

queryForm.addEventListener("submit",(evt)=>{
    evt.preventDefault()
    const text= evt.target.children[0].value
    let searched=false
    categoryBtn.forEach((btn)=>{
        if(btn.style.backgroundColor==="aqua"){
            let item = new search({category:btn.innerText,text:text})
            loadItems(item.searchByCategory())
            searched=true
            btn.style.backgroundColor=""
        }
    })
    if(!searched){
        let item = new search({category:"",text:text})
        loadItems(item.searchByCategory())
    }

    
})

//event function for stopping page refresh on anchors
const evt = e =>{
    if(e.target.matches("[data-link]")){   
        history.pushState(null,null,e.target.getAttribute("href"))
        e.preventDefault()
    }
    else if(e.target.parentElement.matches("[data-link]")){
        history.pushState(null,null,e.target.parentElement.getAttribute("href"))
        e.preventDefault()
    }
}

//when all elements are there, listen for user clicking on links

document.addEventListener("DOMContentLoaded",()=>{
    
    document.body.addEventListener("click",evt)
})






function f(){
    const params={
        src:"https://m.media-amazon.com/images/I/71D9ImsvEtL._UY500_.jpg",
        allPhotos: document.querySelectorAll(".carousel-item")
    }
    new carouselControl(params).addPhoto()
}

