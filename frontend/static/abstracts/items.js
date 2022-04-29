
import user from "./user.js";

export default class extends user{
    constructor(params){
        const id=[...params.id].slice(0,-6).join("")
        super({id:id})
        
    }


    async getElement(){
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
    }

}