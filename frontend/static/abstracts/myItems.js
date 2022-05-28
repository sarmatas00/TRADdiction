import {router} from "../app.js"
import abstract from "./abstract.js";
import {user} from "./user.js"
import addControl from"./addControl.js";
import { newListing } from "./newListing.js";


class myItems extends user{
    constructor(params){
        super(params);
        this.id=params.id;
        let data=params.data;
        this.setUserOptions();
        
          
        }



    async getElement() {
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "items");
    const newLi=newListing.getListing("");
    
    let s1=
    `
     <h1>DICKS</h1> 
     <div class="results row">
     <ul>
    `
     //Works but wont allow imges to be loaded needs backend
    if(newLi){
        for(let d of newLi){
          let d3=(new addControl(d).create());
          let dd3=d3.innerHTML;
          s1=s1.concat(`<li class="col-3 mx-5">${dd3}</li>`);
        }
      }
      
    s1=s1.concat(`</ul></div><p> <button id="newAdd" style=height:5vh;width:10vw;cursor:default;background-color:aqua;color:black;font-weight:600;> Create Listing</button></p>`);
    newElement.innerHTML=s1;
   

    
    return newElement;
}


callOtherMethods(){
  const btn=document.querySelector('#newAdd');
  btn.addEventListener('click',()=>{
    history.pushState(null,null,`/user/newListing/${this.params.id}`);
    router();
    
  })
}
  

    
}


export {myItems}