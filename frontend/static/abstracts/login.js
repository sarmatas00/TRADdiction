import abstract from "./abstract.js";
import {router} from "../app.js"

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("User LogIn")
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
        <form>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="text" class="form-control" id="email" placeholder="Enter your email">
            
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <small id="passHelp" class="form-text text-muted">Forgot password? Click <a href="/signup" data-link>here</a></small>
          
          <button type="submit" class="btn btn-primary">Log In</button>
        </form>
        <div class="alert alert-danger mt-2 d-none" role="alert">
        </div>
      
        `;
        return newElement
  }


  validate(){
    const forms = document.getElementById("login");
    const elements=Object.values(forms.children[0])
    elements[2].addEventListener("click",(evt)=>{
      evt.preventDefault()
      const details={
        email:elements[0].value,
        password:elements[1].value
      }
      this.authenticate(details)
      

    })

  }

  async authenticate(details){
    
    const authenticate=await axios.post("/login",details)
    console.log(authenticate.data);
    if(authenticate.data.userID!==""){
      // window.location.href=`/user/${authenticate.data.userID}`
      history.pushState(null, null, "/user/1285")
      router()
    }
    else if(authenticate.data.wrongEmail){
      this.alertUser("There is no registered account with that email,please sign up!","danger")
    }
    else{
      this.alertUser("Wrong Password, please try again!","danger")
    }
  }


  callOtherMethods(){
   this.validate()
  }
}