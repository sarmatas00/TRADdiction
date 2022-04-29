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
    <div class="row">
      <div class="form-group col-md-6">
        <label for="inputImg">Image URL</label>
        <input type="text" class="form-control" id="inputName" placeholder="img url">
      </div>
      
        
    </div>
    <div class="row">
    <div class="form-group col-md-6">
      <label for="inputTitle">Listing Title</label>
      <input type="text" class="form-control" id="inputTitle" placeholder="Listing Title">
      <div class="form-group col-md-6">
    <label for="inputText">Item Description</label>
    <input type="text" class="form-control" id="inputText" placeholder="Shoes, Watch etc.">
    </div>
      </div>
    
  </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="inputLooksFor">Looking For</label>
        <input type="text" class="form-control" id="inputLooksFor" placeholder="Shoes">
      </div>
     
    </div>
    <div class="row">
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="inputCheck">
        <label class="form-check-label" for="inputCheck">
          Free
        </label>
      </div>
    </div>
    </div>
    
    <button type="submit" class="btn btn-primary">Upload Listing</button>
    
    <div class="alert alert-danger mt-2 d-none" role="alert">
    </div>
    
  </div>


      
        `;

    /* when i have acces to users adds i process them and add them
    for(d of data){
        newElement.innerHTML+=`<li class="col-3 mx-5">${d}</li>`
    }
    */
    return newElement;
}
validate() {
  const forms = document.getElementById("signup");

  forms.children[5].addEventListener("click", async (event) => {
    let details = {
      inputImg: document.querySelector("#inputImg").value,
      inputTitle: document.querySelector("#inputTitle").value,
      inputText: document.querySelector("#inputText").value,
      inputLooksFor: document.querySelector("#inputLooksFor").value,
    };
    
    //this.register(details)
    console.log(details);
    
  });
}
async getData(id){
    this.userData=await axios.get(`/user/${id}`)
}
    
}