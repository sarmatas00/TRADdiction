import abstract from "./abstract.js";
import { router } from "../app.js";
import { signup } from "./signup.js";

export default class extends abstract{
  
    constructor(params){
        
        super(params)
        this.id=params.id;
        // this.userData={}
        // this.getData(params.id)
    }

    //make ajax call and get an object with user data
    // async getData(id){
        // this.userData=await axios.get(`/user/${id}`)
    // }

    async getElement(){
      
        if(!signup.validateById(this.id)){
          history.pushState(null,null,"/login")
          router()
          return 
        }

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
          <a class="dropdown-item signout" href="/" >Sign Out</a>
        </li>
        `
        return super.getElement()
    }

    signOutEvent(){
      document.querySelector('.dropdown-menu .signout').addEventListener("click",(evt)=>{
        evt.preventDefault()
        evt.stopImmediatePropagation()
  
        document.querySelector('#dropdown-btn').innerHTML=`Log-in/Sign-up
        <i class="arrow-down"></i>`
        console.log(document.querySelector('.dropdown-menu').innerHTML);
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
      this.signOutEvent()

    }
}