

//βοηθητικη κλαση με στατικες μεθοδους που χρησιμοποιουνται κυριως στα events. Βοηθαει στο να 
//ειναι πιο οργανωμενος ο κωδικας και με περισσοτερη συνοχη
class search extends null{

  //η πρωτη μεθοδος χρησιμοποιειται στο searching και συγκρινει το κειμενο που εχει πληκτρολογησει ο χρηστης
  //με τον τιτλο και την περιγραφη μιας συγκεκριμενης αγγελιας ωστε να βρεθει εαν υπαρχει καποιο word match
  //και συνεπως να εμφανιστει η αγγελια στον χρηστη
    static searchByText(title,text,query){
        
      if(query.toLowerCase().split(" ").some((word)=>{return text.toLowerCase().includes(word)}) || query.toLowerCase().split(" ").some((word)=>{return title.toLowerCase().includes(word)})){
          return true
      }
      return false
    }

    //αυτη η μεθοδος παιρνει ως ορισμα ενα object με τα στοιχεια που εχει εισαγει καποιος χρηστης κατα το sign up
    //και ο ρολος της ειναι να ελεγξει το αν συγκεκριμενα πεδια ειναι εντος οριων, με τη χρηση κανονικων εκφρασεων
    static checkInput(details) {
        const reNum = /^69[0-9]{8}$/;     //το κινητο τηλεφωνο πρεπει να ξεκινα με 69 και να ειναι 10 ακριβως ψηφια
        const reZip = /^[0-9]{5}$/;       //ο ταχυδρομικος κωδικας πρεπει να ειναι 5 ψηφια
        const reMail = /^\S+@\S+\.\S+$/;    //το email πρεπει να περιεχει @ και μετα .
        const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;      //ο κωδικος πρεπει να ειναι τουλαχιστον 8 χαρακτηρες και να περιεχει αριθμο, πεζο και κεφαλαιο γραμμα
        
    
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

