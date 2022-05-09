import {router} from "../app.js"
import abstract from "./abstract.js";
import {user} from "./user.js"
import addControl from"./addControl.js";
import { newListing } from "./newListing.js";

/*
Η παρούσα κλάση συνδεέται με την επιλογή My Items που μπορεί να κάνει ένας χρήστης μόνον εφόσον έχει συνδεθεί στον λογαριασμό του πατώντας
My items στο drop-down menu το οποίο εμφανίζεται όταν πατήσει το κουμπί My Account. 
*/
class myItems extends user{
    constructor(params){
        super(params);
        //Παίρνουμε το id του χρήστη και τα δεδομένα του
        this.id=params.id;
        this.setUserOptions();
        document.querySelector("main").classList.add("d-none");
        }



    async getElement() {
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    //Χτίζουμε την σελίδα που θα προστεθεί στο body της κύριας σελίδας και την επιστρέφουμε από εκεί που κλήθηκε
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "items");
    //Λαμβάνουμε στην newLi όλες τις αγγελίες που έχουν καταχωρυθεί επί του παρόντος είναι 17 μαζί με όσες προσθέσει ο χρήστης
    let resp=await axios.get(`/user/addList/${this.id}`);
    console.log(`data for ${this.id}`,resp.data.data);
    let newLi=resp.data.data;
    
    let s1=
    `
     <h1 style="color:white">My items</h1> 
     <div class="results row">
     <ul >
    `
     //Αναζητούμε εάν υπάρχει αγγελία με id ίδιο με αυτό του παρόντος χρήστη ώστε να την εμφανίσουμε στην My Items
    let usableId1=0;
    let usableId2=0;
     if(newLi){
        for(let d of newLi){
            if(typeof this.id!==Number){usableId1=parseInt(this.id)}
            else{usableId1=this.id}
            if(typeof d.userId!==Number){usableId2=parseInt(d.userId)}
            else{usableId2=d.userId}
            //Εάν υπάρχουν αγγελίες αναρτημένες από τον χρήστη προσθέτουμε στην html σε ένα li την αγγελία η οποία αφού περαστεί στην
            //addControl μας επιστρέφει έτοιμο κώδικα Html ώστε να εμφανίζονται με συγκεκριμένο τρόπο οι αγγελίες όπως δηλαδή εμφανίζονται
            //και στην αρχική σελίδα. 
            if(usableId1===usableId2){  
              let d3=(new addControl(d).create());
              let dd3=d3.innerHTML;
              s1=s1.concat(`<li  class="col-3 mx-5" style="float:right">${dd3}</li>`);
            }
        }
      }
      //Δημιουργούμε το κουμπί Create Listing το οποίο όταν το πατήσει ο χρήστης μπορεί να αναρτήσει μία νέα αγγελία
    s1=s1.concat(`</ul></div><p> <button id="newAdd"> Create Listing</button></p>`);
    newElement.innerHTML=s1;
    return newElement;
}
//Αυτή η συνάρτηση καλείτε πάντοτε αφού κληθεί μία κλάση και τοποθετούμε σε αυτήν ότι κώδικα χρειάζεται να εκτελεστεί με το φόρτωμα της 
//σελίδας. Στην προκειμένη κλάση προστίθεται eventListener στο κουμπί ανάρτησης αγγελίας το οποίο καλεί τον αντίστοιχο κώδικα για την 
//σελίδα που θέλουμε να εμφανίσουμε
callOtherMethods(){
  const btn=document.querySelector('#newAdd');
  btn.addEventListener('click',()=>{
    history.pushState(null,null,`/user/newListing/${this.params.id}`);
    router();
    
  })
}
}
export {myItems}