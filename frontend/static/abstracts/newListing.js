import {myItems} from "./myItems.js";
import user from "./user.js"

class newListing extends user{
    //Πίνακας με όλα τα listings 
    static listings=[
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good sho",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good sh",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good s",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good shoefgh",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good shoedfgdfg",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very goofghd shoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good sdfsfdghoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good shhgjdfgoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is dfga very good shoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this iss a very good fghdfshoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a dvery goofd sshoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this zis a very gofod sdhoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":tszdfhis is a very good shoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very good shoddde",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":thifffs is a very good shoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":thidfs isdf a verydf good shdfoe",
      looksFor:"guns",
      free:false
      },
      {src:"https://pyxis.nymag.com/v1/imgs/f5e/cb1/3be2f873678308dc656756a9899aa1d25a-kids-converse.rhorizontal.w600.jpg",
      title:"Some title",
      text:":this is a very gzsdfszdfzsdfood shoe",
      looksFor:"guns",
      free:false
      }
  
  ]
    constructor(params){
        super(params);
        this.id=params.id;
        //Ενημέρωση της αρχικής σελίδας
        this.setUserOptions()
        document.querySelector("main").classList.add("d-none");

   }
   static getListing(src){
     if(src=""){return this.listings;}
     for(let listing of this.listings){
       if(listing.src===src){
         return listing;
       }
     }
     return null;
   }
  
    async getElement() {
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "listings");
    //Δημιουργία της σελίδας και ενημέρωση της (αλλάζει το body της html και παραμένουν το header και το nav)
    newElement.innerHTML = 
    `
    <div class="row">
      <div class="form-group col-md-6">
        <label for="src">Upload Image</label>
        <input type="file"
       id="src" name="src"
       accept="image/png, image/jpeg">
      </div>
      
        
    </div>
    <div class="row">
    <div class="form-group col-md-6">
      <label for="title">Listing Title</label>
      <input type="text" class="form-control" id="title" placeholder="Listing Title">
      </div>
      </div>

      <div class=row>
      <div class="form-group col-md-6">
    <label for="text">Item Description</label>
    <input type="text" class="form-control" id="text" placeholder="Shoes, Watch etc.">
    </div>
    </div>

      </div>
    
  </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="looksFor">Looking For</label>
        <input type="text" class="form-control" id="looksFor" placeholder="Shoes">
      </div>
     
    </div>
    <div class="row">
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="free">
        <label class="form-check-label" for="free">
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

    
    return newElement;
}


//When database is conected we need to save the img and pass that url to the object!
//Αυτή η μέθοδος αντλεί τα δεδομένα από την html φόρμα για την δημιουργεία νέας αγγελίας.
extract() {
  let details={src: undefined,
  title: undefined,
  text: undefined,
  looksFor: undefined,
  free:undefined
};
  const forms = document.getElementById("listings");
  console.log("done");
  const img=document.querySelector('#src');
    img.addEventListener('change',function(e){
      const url=URL.createObjectURL(e.target.files[0]);
      const input=document.createElement('img');
      input.src=url;
      details.src=input;
    })
  forms.children[5].addEventListener("click", async (event) => {
    
    let details = {
      src: document.querySelector("#src").value,
      title: document.querySelector("#title").value,
      text: document.querySelector("#text").value,
      looksFor: document.querySelector("#looksFor").value,
      free:document.querySelector("#free").checked
    };
    if(this.validate(details)){
      newListing.listings.push(details);
      this.alertUser("Listing added succesfully","success")
    }else{
      this.alertUser("Please fill out all the fields!","danger");
    }
    //document.querySelector("#inputImg").parentElement.classList.add("invalid
  });
}



/*
let details={inputImg: undefined,
  inputTitle: undefined,
  inputText: undefined,
  inputLooksFor: undefined,
  inputChecked:undefined
*/
//Έλεγχος εγκυρότητας στοιχείων επί του παρόντος ελέγχεται μόνο αν δεν έχουν μείνει κενά τα πεδία.
validate(details){
  for (let d in details) {
    if (details[d] === "" ) {
      document.querySelector(`#${d}`).parentElement.classList.add("invalid");
      this.alertUser("Please complete all forms!","danger");
      return false;
  }
}
  return true;

}


callOtherMethods(){
  this.extract()
}
    

    
}

export {newListing}