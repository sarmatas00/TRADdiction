import abstract from "./abstract.js";

export default class extends abstract{
    constructor(params){    
        super(params)
        
    }

    async getElement(){
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
        
    }

}