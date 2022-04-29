import {router,getParams,pathToRegex} from "../app.js"
import abstract from "./abstract.js";
import addControl from"./addControl.js";


export default class extends abstract{
  
    // static listings[{
      
    // },{

    // }]

    addToListings(listing){
      this.listing.push(listing)
    }

    constructor(params){
        super(params);
        this.id=params.id;
        let data=params.data;
        this.aggelies=[
          {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
          title:"Some title",
          text:":this is a very good sho",
          looksFor:"guns",
          free:true
          },
          {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
          title:"Some title",
          text:":this is a very good sh",
          looksFor:"guns",
          free:false
          }];
        }



    async getElement() {
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "items");
    const d1=await (new addControl(this.aggelies[0]).create());
    const dd1=d1.innerHTML;
    const d2=await (new addControl(this.aggelies[1]).create());
    const dd2=d2.innerHTML;
    console.log(dd1);
    newElement.innerHTML = 
    `
     <h1>DICKS</h1> 
     <ul>
     <div class="results row">
     <li class="col-3 mx-5">${dd1}</li>
     <li class="col-3 mx-5">${dd2}</li>
     </div>
     </ul>
     <p><button id="newAdd" style=height:5vh;width:10vw;cursor:default;background-color:aqua;color:black;font-weight:600;> Create Listing</button></p>
     
       
    `

    /* when i have acces to users adds i process them and add them
    for(d of data){
        newElement.innerHTML+=`<li class="col-3 mx-5">${d}</li>`
    }
    */
    return newElement;
}
async getData(id){
    this.userData=await axios.get(`/user/${id}`)
}

callOtherMethods(){
  const btn=document.querySelector('#newAdd');
  btn.addEventListener('click',()=>{
    history.pushState(null,null,`/user/newListing/${this.params.id}`);
    router();

  })
}
}