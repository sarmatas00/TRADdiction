import abstract from "./abstract.js";

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("User LogIn")
        document.querySelector("main").classList.add("d-none")

    }

    async getElement(){
        const newElement=document.createElement("div")
        newElement.classList.add("container")
        newElement.setAttribute("id","login")
        newElement.innerHTML=
        `
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Enter username">
            
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          
          <button type="submit" class="btn btn-primary">Log In</button>
        </form>
      
        `;
        return newElement
    }
}