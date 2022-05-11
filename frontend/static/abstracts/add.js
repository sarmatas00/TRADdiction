import abstract from "./abstract.js";
import { newListing } from "./newListing.js";
import { trades } from "./trades.js";

//H κλάση αυτή είναι υπεύθηνη για την σελίδα που εμφανίζεται όταν ο χρήστης πατήσει view σε μία αγγελία και από εκεί μπορεί
//να δει περισσοτερες πληροφορίες σχετικά με το αντικείμενο και να κάνει request  για ανταλαγή
export default class extends abstract{
    constructor(params){
        super(params)
        this.listing={}
        this.setTitle("Add")
        document.querySelector("main").classList.add("d-none")
        
        
    }

    //Επιστρέφει τον κώδικα html της σελίδας
    async getElement(){
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
        //newListing.getListing(src)
        const newElement = document.createElement("div");
        newElement.classList.add("container");
        newElement.setAttribute("id", "addDisplay");
        // const {src,title,text,looksFor,free}=
        const src=window.history.state['src'];
        this.listing=newListing.getListing(src);
        //this.listing= await axios.get('/listingBySrc',req,res)=>{

        


        let s1=`
            <div class="img" style='background-image: url("${src}")'></div>
            <h2>Title: ${this.listing.title}</h2>
            <p>${this.listing.text}</p>
            `
            if(!this.listing.free){
                s1=s1.concat(`<small>Looking for: ${this.listing.looksFor} <span></span></small>`)
            }else{s1=s1.concat("<small>Freebie<span></span></small>")}
            s1=s1.concat(
            `
            <select class="form-select" id="tradeFor">
            <option selected>My items</option>
                `)
            const user_listings=newListing.getListing("").map((listing)=>{
                if( listing.userId.toString()=== this.params.id){
                    return listing.title
                }
            })
            for(let l of user_listings){
                if(l!==undefined){

                    s1=s1.concat(
                        `
                        <option value=${l}>${l}</option>
                        `
                        )
                        
                }
            }
           s1=s1.concat( `
            
            </select>
            <button class="btn btn-primary">Request trade</button>
            
        `)
            
            newElement.innerHTML=s1;
            return newElement
    }

    //Κάθε φορά που ανοίγει η σελίδα βάζει listener στο κουμπί
    addRequestEvent(){
        document.querySelector("#addDisplay button").addEventListener("click",(evt)=>{
            // trades.tradeRequest()
            const provided=document.querySelector("#tradeFor").value
            
            if(provided!=="My items"){
                const objectListing=newListing.getListing("").filter((listing)=>{
                    if(listing.title.includes(provided)){
                        return listing
                    }
                })
                
                trades.tradeRequest(objectListing[0],this.listing)

            }

            

        })
    }



    callOtherMethods(){
        this.addRequestEvent()
    }

}

