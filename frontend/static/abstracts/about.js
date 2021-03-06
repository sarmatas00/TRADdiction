import abstract from "./abstract.js";
import {router} from "../app.js"

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("About")
        document.querySelector("main").classList.add("d-none")

    }

    async getElement(){
      if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
        document.querySelector("header").nextElementSibling.remove()
    }
        const newElement=document.createElement("div")
        newElement.classList.add("container")
        newElement.setAttribute("id","about")
        newElement.innerHTML=
        `
        <h1>About us</h1>
        <p style="font-size:22px">&emsp;&emsp;Traddiction is a group effort started in 2022 by a group of 4 students from Thessaloniki. What started
        as a web-development assignment is now a continuing effort to find a way to give back to the community. Tradiction
        is and will be totally non-profit. We would love to colaborate with other organisations and efforts that match our 
        vision.
        For volunteering, questions and inquiries we would love to hear you at:
        <br>
        <b>
            sample@email.com
            </b>
        </p>
        <div>
        <img src="https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2020/02/28151102/web-developers.jpg">
        </div>
        
      
        `;
        return newElement
  }
}
