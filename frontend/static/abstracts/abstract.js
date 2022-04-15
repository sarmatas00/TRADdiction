//abstract class to set the page title and keep other modules parameter in the same pattern


export default class{
    constructor(params){
        this.params=params
    }

    setTitle(title){
        document.title=title
    }

    
}