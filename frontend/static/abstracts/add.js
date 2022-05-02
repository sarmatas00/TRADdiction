import abstract from "./abstract.js";
import { newListing } from "./newListing.js";

export default class extends abstract{
    constructor(params){
        super(params)
        this.setTitle("Add")
        document.querySelector("main").classList.add("d-none")
        
        
    }

    async getElement(){
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
        //newListing.getListing(src)
        const newElement = document.createElement("div");
        newElement.classList.add("container");
        newElement.setAttribute("id", "addDisplay");
        // const {src,title,text,looksFor,free}=
        const src=window.history.state['src']
        newElement.innerHTML=`
            <div class="img" style='width:100px;height:100px;background-image: url("${src}")'></div>
            <h2></h2>
            <p></p>
            <small>Looking for: <span></span></small>
            <button class="btn btn-primary">Request trade</button>
            <button class="btn btn-primary">Request trade</button>
        `

        return newElement
    }

}

// static requests=[{requesterId:155,itemProvided:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
//     title:"Irish Green T-Shirt L",
//     text:"I don't like green",
//     looksFor:"",
//     free:true,
//     userId:132
//     },itemWanted:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
//     title:"Irish Green T-Shirt L",
//     text:"I don't like green",
//     looksFor:"",
//     free:true,
//     userId:132
//     }}];
//     static tradeRequest(id,itemProvided,itemWanted){
//       const listings=newListing.getListing("");
//       let foundListing="";
//       for(listing of listings){
//         if(listing.id===this.id){
//           this.requests.push({requesterId:id,listing});
//           return true;
//         }
//       }
//       return false;
//     }