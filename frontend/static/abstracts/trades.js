import abstract from "./abstract.js";

export default class extends abstract{
    constructor(params){
        super(params);
        this.id=params.id;
        let data=params.data;
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
    
    newElement.innerHTML = 
    `
     <h1>DICKS</h1> 
     <div class="results row">

    
     </div>
       
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
    
}