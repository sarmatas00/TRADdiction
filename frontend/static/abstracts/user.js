import abstract from "./abstract.js";
import { router } from "../app.js";
import { signup } from "./signup.js";


class user extends abstract{
  
    constructor(params){
        super(params)
        this.id=params.id;
    }

   

    async getElement(){
        if(!signup.validateById(this.id)){ 
          history.pushState(null,null,"/login")
          router()
          return false
        }

        this.setUserOptions()
        return super.getElement()
    }

    static signOut(){
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
        
      document.querySelector(".title").href=`/`
        
      
    }

    setUserOptions(){
      document.querySelector(".title").href=`/user/${this.id}`
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
          <a class="dropdown-item signout" href="/" data-link>Sign Out</a>
        </li>
        `
    }
    

    callOtherMethods(){
      

    }
}

export {user}