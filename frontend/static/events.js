// import category from "./abstracts/category.js"
import { search } from "./abstracts/search.js";

const queryItemsForm=document.querySelectorAll(".queryItemsForm")
const categoryBtns=document.querySelectorAll(".category-btn")
const imgSrc=document.querySelector("#src")
const newListingForm=document.querySelector("#newListingForm")
const signupForm=document.querySelector("#signup form")



if(queryItemsForm.length!==0 && categoryBtns.length!==0){
queryItemsForm.forEach((form)=>{form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const queryText = new FormData(evt.target).get("queryText");
  let i = 0;
  const listingsOnPage = document.querySelectorAll(".item");
  if (queryText !== "") {
    for (let listing of listingsOnPage) {
      if (!search.searchByText(listing.children[1].innerText,listing.children[2].innerText,queryText)) {
        listing.classList.add("activeCat")
      }else{
        listing.classList.remove("activeCat")
      }
    }
  }else{
    for (let listing of listingsOnPage) {
      listing.classList.remove("activeCat")
      
    }
  }
  window.scrollTo(0, document.body.scrollHeight);

})
})



categoryBtns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const listingsOnPage = document.querySelectorAll(".item");
    for(let listing of listingsOnPage){
      listing.classList.remove("activeText")
    }
    
    if (evt.target.style.backgroundColor !== "blueviolet") {
      evt.target.style.backgroundColor = "blueviolet"
      const restButtons=document.querySelectorAll(".category-btn")
      for(let btn of restButtons){
        if (btn!==evt.target){
          btn.style.backgroundColor="rgb(71,225,12)"
        }
      }
      for(let listing of listingsOnPage){
        if(!(listing.children[5].innerText===evt.target.innerText)){
          listing.classList.add("activeText");
          
        }
      }
    }else{
      evt.target.style.backgroundColor = "rgb(71,225,12)"
      
      
    } 

    
  });
});
}

// //enable infinite scrolling
window.addEventListener("scroll", loadMore, false);

//infinite scrolling helper function
function loadMore() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    const rows = document.querySelectorAll(".results");

    Array.from(rows)
      .find((row) => {
        return !row.classList.contains("active");
      })
      .classList.add("active");
  }
}



if(imgSrc!==null){
let uploaded_image = "";
imgSrc.addEventListener("change", function (e) {
  const read = new FileReader();
  read.addEventListener("load", () => {
    uploaded_image = read.result;
  

  });
  read.readAsDataURL(this.files[0]);

});




newListingForm.addEventListener("submit", (evt) => {
  let details = {
    src: uploaded_image,
    title: document.querySelector("#title").value,
    text: document.querySelector("#text").value,
    looksFor: document.querySelector("#looksFor").value,
    free: document.querySelector("#free").checked,
  };
  const alert=document.querySelector("#listings .alert")
  if(details.src===""){
    alert.classList.remove("d-none")
    alert.innerText="Please provide a photo for your listing"
    setTimeout(()=>{alert.classList.add("d-none")},3000)
    evt.preventDefault()
  }else if(details.title===""){
    alert.classList.remove("d-none")
    alert.innerText="Please provide a title"
    setTimeout(()=>{alert.classList.add("d-none")},3000)
    evt.preventDefault()
  }else if(details.text===""){
    alert.classList.remove("d-none")
    alert.innerText="Please provide a description"
    setTimeout(()=>{alert.classList.add("d-none")},3000)
    evt.preventDefault()
  }else{
    fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details }),
    });

  }
  
});
}


if(signupForm!==null){

  signupForm.addEventListener("submit",(evt)=>{
    const email = new FormData(evt.target).get("email");
    const details={
      email:new FormData(evt.target).get("email"),
      password:new FormData(evt.target).get("password"),
      firstName:new FormData(evt.target).get("firstName"),
      lastName:new FormData(evt.target).get("lastName"),
      number:new FormData(evt.target).get("number"),
      city:new FormData(evt.target).get("city"),
      state:new FormData(evt.target).get("state"),
      zip:new FormData(evt.target).get("zip"),
      terms:new FormData(evt.target).get("terms")
    }
    const alert=evt.target.nextElementSibling
    if(search.checkInput(details)!=="authenticated"){
      alert.innerText=search.checkInput(details)
      alert.classList.remove("d-none")
      setTimeout(()=>{alert.classList.add("d-none")},3000)
      evt.preventDefault()
    }else{
      fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details }),
      });
    }

  })
}
