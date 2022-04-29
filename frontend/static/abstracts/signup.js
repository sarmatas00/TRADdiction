import abstract from "./abstract.js";

export default class extends abstract {
  constructor(params) {
    super(params);
    this.setTitle("User SignUp");
    document.querySelector("main").classList.add("d-none");
  }

  async getElement() {
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "signup");
    newElement.innerHTML = `
    
    
    <div class="row">
      <div class="form-group col-md-6">
        <label for="inputEmail">Email</label>
        <input type="email" class="form-control" id="inputEmail" placeholder="example@outlook.com">
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        <small id="passHelp" class="form-text text-muted">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.</small>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="inputName">First Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="John">
      </div>
      <div class="form-group col-md-6">
        <label for="inputLast">Last Name</label>
        <input type="text" class="form-control" id="inputLast" placeholder="Smith">
      </div>
    </div>
    <div class="row">
    <div class="form-group col-md-6">
    <label for="inputNumber">Phone number</label>
    <input type="number" class="form-control" id="inputNumber" placeholder="6909090909">
    </div>
  </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="inputCity">City</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Thessaloniki">
      </div>
      <div class="form-group col-md-4">
        <label for="inputState">State</label>
        <select id="inputState" class="form-control">
          <option selected>Choose...</option>
          <option>Makedonia</option>
          <option>Attiki</option>
          <option>Kappa keepo</option>

        </select>
      </div>
      <div class="row">
      <div class="form-group col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" id="inputZip" placeholder="31100">
      </div>
    </div>
    </div>
    <div class="row">
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="inputCheck">
        <label class="form-check-label" for="inputCheck">
          Agree to the terms of usage
        </label>
      </div>
    </div>
    </div>
    
    <button type="submit" class="btn btn-primary">Sign up</button>
    
    <div class="alert alert-danger mt-2 d-none" role="alert">
    </div>
    
  </div>


      
        `;

    return newElement;
  }

  

  checkInput(details) {
    const reNum = /^69[0-9]{8}$/;
    const reZip = /^[0-9]{5}$/;
    const reMail = /^\S+@\S+\.\S+$/;
    const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    for (let d in details) {
      if (details[d] === "" || details[d] === "Choose...") {
        document.querySelector(`#${d}`).parentElement.classList.add("invalid");
        this.alertUser("Please complete all forms!","danger")
      } else {
        if (d === "inputNumber") {
          if (details[d].match(reNum) !== null) {
            document
              .querySelector(`#${d}`)
              .parentElement.classList.remove("invalid");
          } else {
            this.alertUser("Please provide a valid phone number!","danger")
            document
              .querySelector(`#${d}`)
              .parentElement.classList.add("invalid");
          }
        } else if (d === "inputZip") {
          if (details[d].match(reZip) !== null) {
            document
              .querySelector(`#${d}`)
              .parentElement.classList.remove("invalid");
          } else {
            this.alertUser("Please provide a valid zip code!","danger")
            document
              .querySelector(`#${d}`)
              .parentElement.classList.add("invalid");
          }
        } else if (d === "inputEmail") {
          if (details[d].match(reMail) !== null) {
            document
              .querySelector(`#${d}`)
              .parentElement.classList.remove("invalid");
          } else {
            this.alertUser("Please provide a valid email address!","danger")
            document
              .querySelector(`#${d}`)
              .parentElement.classList.add("invalid");
          }
        } else if (d === "inputPassword") {
          if (details[d].match(rePass) !== null) {
            document
              .querySelector(`#${d}`)
              .parentElement.classList.remove("invalid");
          } else {
            this.alertUser("Password must meet the above spesification!","danger")
            document
              .querySelector(`#${d}`)
              .parentElement.classList.add("invalid");
          }
        } else {
          document
            .querySelector(`#${d}`)
            .parentElement.classList.remove("invalid");
        }
      }
    }
    const authenticated = false;
    if (document.querySelector("#inputCheck").checked) {
      return Object.keys(details).every((input) => {
        return !document
          .querySelector(`#${input}`)
          .parentElement.classList.contains("invalid");
      });
    } else {
      return false;
    }
  }

  validate() {
    const forms = document.getElementById("signup");

    forms.children[5].addEventListener("click", async (event) => {
      let details = {
        inputName: document.querySelector("#inputName").value,
        inputLast: document.querySelector("#inputLast").value,
        inputEmail: document.querySelector("#inputEmail").value,
        inputPassword: document.querySelector("#inputPassword").value,
        inputNumber: document.querySelector("#inputNumber").value,
        inputCity: document.querySelector("#inputCity").value,
        inputState: document.querySelector("#inputState").value,
        inputZip: document.querySelector("#inputZip").value,
      };
      
      this.register(details)
      
    });
  }

  async register(details){
    if (this.checkInput(details)) {
      const profile = await axios.post("/signup", details);
      //if email has not been already registered
      if (profile.data) {
        this.alertUser("Your registration has been completed!","success")
      }else{
        this.alertUser("This email address is already in use. Please login!","danger")
      }
    }
  }

  callOtherMethods(){
    this.validate()
  }
}
