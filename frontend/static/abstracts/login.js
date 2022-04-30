import abstract from "./abstract.js";
import {router} from "../app.js"
import {signup} from "./signup.js";

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
    
    // const authenticate=await axios.post("/login",details)
    
    const authenticate=signup.getUsers(details)
    if(authenticate!==null){
      document.querySelector('#dropdown-btn').innerHTML=`My Account
        <i class="arrow-down"></i>`
        document.querySelector('.dropdown-menu').innerHTML=
        `
        <li>Hey there, Spiros</li>
        <br/>
        <li>
          <a class="dropdown-item" href="/user/items/${this.id}" data-link>My items</a>
        </li>
        <li>
          <a class="dropdown-item" href="/user/trades/${this.id}" data-link>Trades</a>
        </li>
        <li>
          <a class="dropdown-item signout" href="/signout" data-link>Sign Out</a>
        </li>
        `
      this.signOutEvent()

      // history.pushState(null, null, `/user/${authenticate.userID}`)
      history.pushState(null, null, `/`)
      router()
      
    }else{
      this.alertUser("Wrong shit","danger")
    }
      
    // if(authenticate.data.userID!==""){
    // else if(authenticate.data.wrongEmail){
    //   this.alertUser("There is no registered account with that email,please sign up!","danger")
    // }
    // else{
    //   this.alertUser("Wrong Password, please try again!","danger")
    // }
  }

  signOutEvent(){
    document.querySelector('.dropdown-menu .signout').addEventListener("click",(evt)=>{
      evt.preventDefault()
      evt.stopImmediatePropagation()

      document.querySelector('#dropdown-btn').innerHTML=`Log-in/Sign-up
      <i class="arrow-down"></i>`
        document.querySelector('.dropdown-menu').innerHTML=
        `
        <li>
          <a class="dropdown-item" href="/signup" data-link>Sign-Up</a>
        </li>
        <br />
        <li>
          <a class="dropdown-item isDisabled" href=""
            >Already have an account?</a
          >
        </li>
        <br>
        <li>
          <a class="dropdown-item" href="/login" data-link>Log-In</a>
        </li>
        `

      history.pushState(null, null, `/`)
      router()
    })
  }


  callOtherMethods(){
   this.validate()
  }
}