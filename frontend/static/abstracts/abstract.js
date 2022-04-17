//abstract class to set the page title and keep other modules parameter in the same pattern


export default class{
    constructor(params){
        this.params=params
    }

    setTitle(title){
        document.title=title
    }

    async getElement(){
        if(document.querySelector("header").nextElementSibling.nodeName!=="MAIN"){
            document.querySelector("header").nextElementSibling.remove()
        }
        document.querySelector("main").classList.remove("d-none")
        return null
    }

    
}