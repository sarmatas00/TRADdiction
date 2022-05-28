// import category from "./abstracts/category.js"
import { search } from "./search.js";

const rows = document.querySelectorAll(".row");
const queryItemsForm=document.querySelectorAll(".queryItemsForm")
const categoryBtns=document.querySelectorAll(".category-btn")
const imgSrc=document.querySelector("#src")
const newListingForm=document.querySelector("#newListingForm")
const signupForm=document.querySelector("#signup form")
const navInput = document.querySelector("#nav-input");
const nav=document.querySelector("nav")
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownButton = document.querySelector("#dropdown-btn");
const toggler = document.querySelector(".toggler");
const toggler2 = document.querySelector(".toggler2");
const toggler3 = document.querySelector(".toggler3");
const navCollapse2=document.querySelector(".nav-collapse2")
const dropdownItem=document.querySelectorAll(".dropdown-item")
const admin=document.querySelector(".admin")
const rightbox=document.querySelector("#rightbox ul")
const leftbox=document.querySelector("#leftbox ul")
const contactBtn=document.querySelector("#contact .submit-div")
let widthMatch = window.matchMedia("(max-width: 768px)");


//γινεται αλλαγη του border και μεγεθους της μπαρας αναζητησης στο navbar, οταν ο χρηστης παταει για να πληκτρολογησει
//επισης μπαινει ενα blur effect σε ολη την υπολοιπη σελιδα. Οταν γινεται τελικα η αναζητηση, ή ο χρηστης πατησει καπου αλλου αυτες οι τροποποιησεις φευγουν
if(navInput!==null){
  navInput.addEventListener("click",function(evt){
    this.classList.add("enableNavInput")
    Array.from(rows)
      .slice(1)
      .forEach((row) => {
        row.classList.add("blurScreenOnSearch");
      });

  })

  navInput.addEventListener("blur", function (evt) {
    this.classList.remove("enableNavInput")

    Array.from(rows)
      .slice(1)
      .forEach((row) => {
        row.classList.remove("blurScreenOnSearch");
      });
  });
}


//για καθε μια απο τις 2 φορμες αναζητησης της σελιδας γινεται φιλτραρισμα των αγγελιων αναλογα με το κειμενο που εχει
//πληκτρολογησει ο χρηστης και μενουν μονο οι αγγελίες που κανουν match καποια λεξη στον τιτλο η στην περιγραφη τους
//οι αγγελιες που δεν κανουν καποιο match κρυβονται απο την οθονη
//οταν εχουμε μικρη οθονη, στο πρωτο πατημα του κουμπιου για αναζητηση εμφανιζεται το input στον χρηστη
//τελος γινεται αυτοματο scroll στο τελος της σελιδας, οπου εμφανιζονται και οι αγγελιες
if(queryItemsForm.length!==0){
queryItemsForm.forEach((form)=>{form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if(form.parentElement.getAttribute("class").includes("1") && widthMatch.matches && !nav.classList.contains("toggleInput")){
    const event=new Event("click")
    if(toggler.classList.contains("toggle")){
      toggler.dispatchEvent(event)
    }
    nav.classList.add("toggleInput")
  }else{
    
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
  
  nav.classList.remove("toggleInput")
  window.scrollTo(0, document.body.scrollHeight);
}

})
})


//για καθε πατημα button που αντιπροσωπευει μια κατηγορια στην οθονη, γινεται ελεγχος για το χρωμα του, δηλαδη αν ειναι ηδη επιλεγμενο η οχι
//και μετα αναλογα γινεται φιλτραρισμα στις αγγελιες. Το χρωμα αλλαζει καθε φορα αναλογα. Οι αγγελιες που δεν περιεχουν την συγκεκριμενη
//κατηγορια στα πεδια τους κρυβονται απο την οθονη
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

// ενεργοποιηση infinite scroll
if(window.location.pathname=="/"){
  window.addEventListener("scroll", loadMore, false);
}

//προσωμοιωση infinite scrolling αγγελιων, οι οποιες ειναι ηδη φορτωμενες στην σελιδα, αλλα ειναι κρυμμενες
//απο τον χρηστη και εμφανιζονται σιγα σιγα καθως αυτος κανει scroll στο τελος της σελιδας
function loadMore() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    const rows = document.querySelectorAll(".results");
    
    const foundRow=Array.from(rows)
      .find((row) => {
        return !row.classList.contains("active");
      })
      if(foundRow!==undefined){
      foundRow.classList.add("active");}
  }
}


//υποστηριξη εικονων κατα την εισαγωγη νεας αγγελιας απο τον χρηστη. Η εικονα που προστιθεται μετατρεπεται
//σε καταλληλο uri και αποθηκευεται αυτο σε μια μεταβλητη για την χρηση του μαζι με τα αλλα πεδια της νεας αγγελιας
if(imgSrc!==null){
let uploaded_image = "";
imgSrc.addEventListener("change", function (e) {
  const read = new FileReader();
  read.addEventListener("load", () => {
    uploaded_image = read.result;
  

  });
  read.readAsDataURL(this.files[0]);

});



//κατα την εισαγωγη νεας αγγελιας φτιαχνουμε ενα νεο object με ολα τα πεδια που εχει εισαγει ο χρηστης, καθως και το uri της εικονας που εχουμε παρει απο πανω
//επειτα γινεται ελεγχος ωστε τα 3 βασικα πεδια της αγγελιας να εχουν καποια τιμη και στο τελος κανουμε
//ενα post request στον σερβερ με τα τελικα στοιχεια της αγγελιας, ωστε αυτη να αποθηκευτει στην βαση
newListingForm.addEventListener("submit", (evt) => {
  let details = {
    src: uploaded_image,
    title: document.querySelector("#title").value,
    text: document.querySelector("#text").value,
    looksFor: document.querySelector("#looksFor").value,
    free: document.querySelector("#free").checked,
    ctgName:document.querySelector("#category").value,
    id:`${Date.now().toString()}admin`,
    userId:""
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
  }else if(details.ctgName==="Select"){
    alert.classList.remove("d-none")
    alert.innerText="Please select a category"
    setTimeout(()=>{alert.classList.add("d-none")},3000)
    evt.preventDefault()
  }else{
    fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {details} ),
    })
  }
  
});
}

//κατα την εγγραφη νεου χρηστη, σταματαμε την αυτοματη αποστολη δεδομενων στον σερβερ, ωστε πρωτα να κανουμε
//τους απαραιτητους ελεγχους για τα πεδια, εμφανιζοντας παραλληλα καταλληλα μηνυματα λαθους στον χρηστη.
//αν ολα τα πεδια εχουν εισαχθει σωστα, γινεται ενα post request στον σερβερ ωστε να αποθηκευτει στην βαση ο νεος χρηστης

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



//το dropdown πανω δεξια εμφανιζεται οταν ο χρησης πατησει πανω του
if(dropdownButton!==null){
dropdownButton.addEventListener("click", function (evt) {
  this.nextElementSibling.classList.toggle("menu-1");

  document.body.children[1].classList.toggle("collapseToTheSide");
});
}



//το dropdown πανω δεξια με τις επιλογες του χρηση που εμφανιζεται με το πατημα του κουμπιου
//κλεινει αυτοματα αν ο χρηστης χασει το focus απο αυτο
if(dropdownMenu!==null){

  dropdownMenu.addEventListener("mouseleave", function (evt) {
    setTimeout(() => {
      dropdownMenu.classList.remove("menu-1");
      document.body.children[1].classList.remove("collapseToTheSide");
    }, 2500);
  });

}


//το toggler που εμφανιζεται αριστερα στις μικρες συσκευες ειναι αντικαταστατης του button για να εχει προσβαση
//ο χρηστης στις διαφορες επιλογες.
if(toggler!==null && widthMatch.matches){
toggler.addEventListener("click", function () {
  this.classList.toggle("toggle");
  if(navCollapse2!==null){
    if(nav.classList.contains("toggleInput")){
      nav.classList.remove("toggleInput")
    }
    navCollapse2.classList.toggle("toggler-active");


  //καθε option που υπαρχει μεσα στο dropdown εμφανιζεται σε διαφορετικο χρονο μετα την ενεργοποιηση
  //του toggler, με την βοηθεια ενος custom animation
  dropdownItem.forEach((item, index) => {
    if (item.style.animation) {
      item.style.animation = "";
    } else {
      item.style.animation = `dropdownItemsAnimation 0.5s ease forwards ${
        index / 7 + 1
      }s`;
    }
  });
  document.body.children[1].classList.toggle("collapseToTheBottom");
}else{
  
  admin.classList.toggle("adminActive")
}
});
}


//τα togglers αυτα αφορουν μικρες συσκευες και συγκεκριμενα την σελιδα των trades, οπου αναλογα
//το πατημα του χρηστη, πρεπει να λειτουργουν παραλληλα τα 2 "παραθυρα" των requests
if(toggler2!==null && toggler3!==null){
  toggler2.addEventListener("click",function(){
    toggler2.classList.toggle("noToggler2")
    if(rightbox.classList.contains("toggler3-active")){
      rightbox.classList.remove("toggler3-active")
      toggler3.classList.toggle("noToggler3")
    }
    leftbox.classList.toggle("toggler2-active")

    
  })

  toggler3.addEventListener("click",function(){
    toggler3.classList.toggle("noToggler3")
    if(leftbox.classList.contains("toggler2-active")){
      leftbox.classList.remove("toggler2-active")
      toggler2.classList.toggle("noToggler2")
    }
    rightbox.classList.toggle("toggler3-active")
  })



}

//στην συμπληρωση της φορμας επικοινωνιας κανουμε ελεγχο για το αν καποιο πεδιο εχει μεινει κενο
//αν ολα ειναι συμπληρωμενα συνεχιζουμε με το request
if(contactBtn!==null){
contactBtn.addEventListener("click",(evt)=>{
    const form=document.getElementById('contact-form')
    const message={
      name:new FormData(form).get("name"),
      email:new FormData(form).get("email"),
      subject:new FormData(form).get("subject"),
      message:new FormData(form).get("message")
    }
    const alert=document.querySelector("#contact .alert-danger")
    for(let i in message){
      if(message[i]===""){
        alert.innerText="Please fill all data"
        alert.classList.remove("d-none")
        setTimeout(()=>{alert.classList.add("d-none")},3000)
        return;
      }
    }
    form.submit()
})
}








