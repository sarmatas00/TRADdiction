import abstract from "./abstract.js";
import {router,getParams,pathToRegex} from "../app.js"

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("Our Vision")
        document.querySelector("main").classList.add("d-none")

    }

    async getElement(){
      if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
        document.querySelector("header").nextElementSibling.remove()
    }
        const newElement=document.createElement("div")
        newElement.classList.add("container")
        newElement.setAttribute("id","login")
        newElement.innerHTML=
        `
        <h1>Our Vision</h1>
        <p style="font-size:22px">&emsp;&emsp;We want to see a better version of our world where waste and polution don't cause
        all of this problems to our natural environment. A world without poluted air and seas filled with natural beauty, where
        mother nature can run it's course and restore it's healthy state. We are only four people but with the support of the community
        we can reach more people, reduce waste even further and expand our efforts to more ways of helping the restoration of the environment
        as well as helping people.
        </p>
        <div>
        <img src="https://cosmosmagazine.com/wp-content/uploads/2020/02/191010_nature.jpg">
        </div>
        
      
        `;
        return newElement
  }
}
