import abstract from "./abstract.js";

export default class extends abstract{
    constructor(params){
        super(params)
        this.userData={}
        this.getData(params.id)
    }

    //make ajax call and get an object with user data
    async getData(id){
        this.userData=await axios.get(`/user/${id}`)
    }

    async getElement(){
        document.querySelector('#dropdown-btn').innerHTML=`My Account
        <i class="arrow-down"></i>`
        document.querySelector('.dropdown-menu').innerHTML=
        `
        <li>Hey there, Spiros</li>
        <br/>
        <li>
          <a class="dropdown-item" href="/signup" data-link>My items</a>
        </li>
        <li>
          <a class="dropdown-item" href="/" data-link>Trades</a>
        </li>
        <li>
          <a class="dropdown-item" href="/login" data-link>Sign Out</a>
        </li>
        `
        return super.getElement()
    }

    

    callOtherMethods(){

    }
}