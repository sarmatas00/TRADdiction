import abstract from "./abstract.js"

//controls the navbar content, depending on if someone is logged in their account

export default class extends abstract{
    constructor(params){
        super(params)
    }

    async getHtml(){
        return `
        
        <li><a class="dropdown-item" href="/" data-link>Start a new trade</a></li>
        <li><a class="dropdown-item" href="/" data-link>View Trades</a></li>
        <li><a class="dropdown-item" href="/" data-link>Sign-Out</a></li>
      
        `
    }

}

