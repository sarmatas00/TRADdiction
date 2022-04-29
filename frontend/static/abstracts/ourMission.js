import abstract from "./abstract.js";
import {router,getParams,pathToRegex} from "../app.js"

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("Our Mission")
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
        <h1>Our Mission</h1>
        <p style="font-size:22px">&emsp;&emsp;The latest studies have shown how big of a problem waste has really become.
        A lot of valuable items end up in landfills only to be destroyed and that is the favorable scenario since sea pollution
        is also a huge problem that only worsens with waste. <b>Our mission</b> is to make a serious effort to reduce this problem.
        To achieve this we found a way to use the internet and give people the option to trade their items instead of throwing them
        away. Many people lose interest in the things they own and choose to throw them away. This isn't ideal since a lot of valuable things
        end up wasted. We hope that our website can reach many people and show them that they can exchange what they don't need with something alse
        that will be really useful to them and in the end reduce waste and increase satisfaction.
        </p>
        <div>
        <img src="https://images.theconversation.com/files/223729/original/file-20180619-126566-1jxjod2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop" height="50%" ">
        </div>
       
      
        `;
        return newElement
  }
}


