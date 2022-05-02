import abstract from "./abstract.js";
import {user} from "./user.js"
class trades extends user{
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
    newElement.setAttribute("id", "trades");
    
    newElement.innerHTML = 
    `
     <h1 style="color:white">Trades</h1> 
     <div>
     <div style="display:inline-block;color:white;">
     <h2 style="color:white">Trade History</h2>
     <ul>
     <li>Traded:102 On:Monday</li>
     <li>Traded:102 On:Monda</li>
     </ul>
     </div>
     <div style="color:white;">
     <h2 style="color:white">Trade Requests</h2>

     
     </div>

    
     </div>
       
    `

    /* when i have acces to users adds i process them and add them
    for(d of data){
        newElement.innerHTML+=`<li class="col-3 mx-5">${d}</li>`
    }
    */
    return newElement;
}

    
}

export {trades}