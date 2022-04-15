import abstract from "./abstract.js";
import search from "./search.js";

//this module handles the category section. 

export default class extends abstract{
    constructor(params){
        super(params)
    }

    
    //clone the existing category on the html file and put in it all the new data we have for the new category.
    //if a same category is found on the page, apppend it there. If no space is left, make a new row and append it there.
    //if the category is new, put it at the end of the category list and then append the element
    createCategory(){
        let {ctgType,ctgName}=this.params
        let found=false
        const categoryBtnDiv = document.querySelector(".category .col-2").cloneNode(true)
        categoryBtnDiv.classList.remove("d-none")
        categoryBtnDiv.children[0].innerHTML=ctgName
        const categoryDiv=document.querySelector(".category").cloneNode(false)
        const newCategory=document.querySelector(".category .col-3").cloneNode(true)
        newCategory.classList.remove("d-none")
        newCategory.children[0].innerHTML=ctgType
        categoryDiv.appendChild(newCategory)
        categoryDiv.appendChild(categoryBtnDiv)
        Array.from(document.querySelectorAll(".category")).forEach((cat)=>{
            if(ctgType===cat.children[1].children[0].innerHTML || (cat.children[0].nodeName!=="H2" && ctgType===cat.children[0].children[0].innerHTML)){
                
                if(cat.childElementCount<5 || (cat.childElementCount<=5 && cat.children[0].nodeName=="H2")){
                    cat.appendChild(categoryBtnDiv)
                }
                else{
                    if(cat.nextElementSibling.childElementCount===0 || cat.nextElementSibling.children[0].children[0].innerHTML!==ctgType){
                        cat.insertAdjacentElement("afterend",categoryDiv)
                    }
                    
                }
                found=true
            }
        })
    
        if(!found){
            const categories=document.querySelectorAll(".category")
            categories[categories.length-1].insertAdjacentElement("afterend",categoryDiv)
        }

        this.addEvents(categoryBtnDiv);
    
    
    }

    //find the category element and remove it from the page
    removeCategory(){
        let {ctgType,ctgName}=this.params
        Array.from(document.querySelectorAll(".category")).forEach((cat)=>{
            if(ctgType===cat.children[1].children[0].innerHTML || (cat.children[0].nodeName!=="H2" && ctgType===cat.children[0].children[0].innerHTML)){
                console.log(cat.childElementCount);
                for(let i=0;i<cat.childElementCount;i++){
                    if(cat.children[i].nodeName!=="H2" && cat.children[i].children[0].innerHTML===ctgName){
                        
                        cat.children[i].remove()
                    }
                }  
            }
        })

    }

    //this function adds an event every time a new button/category is made by the admin, so as every button
    //on the page serves the same functionality. every time the user presses a button, it changes color and a request
    //to search module begins for new items.
    addEvents(categoryBtnDiv){
        categoryBtnDiv.children[0].addEventListener("click", (evt) => {
            console.log(categoryBtnDiv.children[0].innerText);
            let item = new search({ category: categoryBtnDiv.children[0].innerText, text: "" })
    
            if (categoryBtnDiv.children[0].style.backgroundColor !== "aqua") {
                item.setFinishSearch("aqua")
                item.loadItems()
                categoryBtnDiv.children[0].style.backgroundColor = "aqua"
            }
            else {
                item.setFinishSearch()
                item.removeItems()
                categoryBtnDiv.children[0].style.backgroundColor = ""
            }
            evt.preventDefault()
        })
    }


    

}