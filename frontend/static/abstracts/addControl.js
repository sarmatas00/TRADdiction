import abstract from "./abstract.js";

//module that helps with creating new adds with the data we get from the server.
export default class extends abstract {
    constructor({src,title,text,looksFor,free}) {
        let params={src,title,text,looksFor,free}
        super(params)

    }

    create() {
        let src,title,text,looksFor,free
        ({src,title,text,looksFor,free}=this.params)
        const newEl= document.createElement("div")
        newEl.classList.add("col-3")
        newEl.classList.add("item")
        if (free) {
            newEl.innerHTML=`
            <div id="display_image" style='width:100px;height:100px; background-size: cover; background-image: url("${src}")'></div>
            <h6>${title}</h6>
            <p id="caption">${text}</p>
            <p id="looksFor">Freebie <span id="items"></span></p>
            <button class="btn btn-info"><a href="/adds" data-link>View!</a></button>
            
            `  
        }
        else{
        newEl.innerHTML=`
            
            <div id="display_image" style='width:100px;height:100px; background-size: cover; background-image: url("${src}")'></div>
            <h6>${title}</h6>
            <p id="caption">${text} </p>
            <p id="looksFor">Looking for: <span id="items">${looksFor}</span></p>
            <button class="btn btn-info"><a href="/adds" data-link>View!</a></button>
            
        `
    }
        return newEl
    }



    

    
}