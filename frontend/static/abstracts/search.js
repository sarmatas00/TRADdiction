

//that module takes care of making requests to the database for adds, load them on the page, or remove them
//depending on search and category conditions

class search extends null{
    


   


    static searchByText(title,text,query){
        
      if(query.toLowerCase().split(" ").some((word)=>{return text.toLowerCase().includes(word)}) || query.toLowerCase().split(" ").some((word)=>{return title.toLowerCase().includes(word)})){
          return true
      }
      return false
    }

    //returns error message if some input is incorrect, else returns true
    static checkInput(details) {
        const reNum = /^69[0-9]{8}$/;
        const reZip = /^[0-9]{5}$/;
        const reMail = /^\S+@\S+\.\S+$/;
        const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        
    
        for (let d in details) {
          if (details[d] === "" || details[d]==="Choose...") {
            return "Please complete all forms!"
          } else {
            if (d === "number") {
              if (details[d].match(reNum) === null) {
                return "Please provide a valid phone number!"
              }
            } else if (d === "zip") {
              if (details[d].match(reZip) === null) {
                return "Please provide a valid zip code!"
              }
            } else if (d === "email") {
              if (details[d].match(reMail) === null) {
                return "Please provide a valid email address!"
              }
            } else if (d === "password") {
              if (details[d].match(rePass) === null) {
                return "Password must meet the above spesification!"
            }} else if(d==="terms"){
                if(details[d]!=="on"){
                    return "You have to agree to the terms of service!"
                }
            }
          }
        }
        return "authenticated";
        
      }
     

    






    
}
export {search}

