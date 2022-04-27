//abstract class to set the page title and keep other modules parameter in the same pattern


export default class{
    constructor(params){
        this.params=params
        this.setTitle("TRADdiction")
    }

    setTitle(title){
        document.title=title
    }

    async getElement(){
        
      document.body.children[2].classList.remove("collapseToTheSide");
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
        document.querySelector("main").classList.remove("d-none")
        return null
    }

    alertUser(message,state){
        const alert=document.querySelector('.alert')
        alert.innerHTML=message
        alert.classList.replace("alert-danger",`alert-${state}`)
        alert.classList.remove("d-none");
        setTimeout(() => {
          alert.classList.add("d-none");
        }, 10000);
      }

    callOtherMethods(){
        
    }

    
}