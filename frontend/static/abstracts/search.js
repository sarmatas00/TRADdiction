import abstract from "./abstract.js";
import addControl from "./addControl.js";
import {newListing} from "./newListing.js"

//that module takes care of making requests to the database for adds, load them on the page, or remove them
//depending on search and category conditions

class search extends abstract {
    constructor(params) {
        super(params)
        this.i=0
        this.aggelies=newListing.getListing("")
        console.log(this.aggelies);
    }

    static i=0;
    static finishSearch=true;


    

    //make a post request for adds and put the results in an array. With the help of addControl
    //create a new add for every object of information we get and then direct it to be loaded or removed from the page respectively
    search() {
        const {category,text,numberOfItems}=this.params
        
        // const items = await axios.post("/search", { category: this.params.category, text: this.params.text,numberOfItems:this.params.numberOfItems,finish:this.finishSearch })
        let items=[]
        if(numberOfItems!==10 && !search.finishSearch){
        
            search.finishSearch=false
            items=this.aggelies.slice(0,4)
        }else if(numberOfItems==10 && search.finishSearch){
            items=this.aggelies.slice(search.i,search.i+=2)
            if(search.i>=this.aggelies.length){search.i=0}
        }else if(numberOfItems!==10 && search.finishSearch){
            search.finishSearch=true
            items=this.aggelies.slice(4,8)
        }
        let r = []
        items.forEach(async (item) => {
            const tmp = (new addControl(item).create())
            r.push(tmp)
        })
        return r

    }

     loadItems() {
        let item =  this.search()
        
        //compare every new element we got from the server with the preexisting ones in the page and keep
        //only the new ones
        item = item.map((res) => {

            let elementsOnPage = document.querySelectorAll(".results .item")
            if (!Array.from(elementsOnPage).slice(1).some((element) => {

                return element.children[2].innerHTML === res.children[2].innerHTML
            })) {
                
                return res
            }
        })
        
        //if after filtering the elements, we still got some new ones, put them on the page where
        //space exists. Make new rows if there is no space left
        item.forEach((res) => {
            if (res !== undefined) {
                let resultPage = document.querySelectorAll(".results")

                if ((resultPage[resultPage.length - 1].childElementCount < 3) || (resultPage.length === 1 && resultPage[resultPage.length - 1].childElementCount <= 3)) {
                    resultPage[resultPage.length - 1].appendChild(res)
                } else {
                    resultPage[resultPage.length - 1].insertAdjacentElement("afterend", resultPage[resultPage.length - 1].cloneNode(false))
                    resultPage = document.querySelectorAll(".results")
                    resultPage[resultPage.length - 1].appendChild(res)
                }
            }

        })


    }

    //for each item we want to remove from the page, go and find it and then remove

     removeItems() {
        let item =  this.search()

        item.forEach((res) => {

            let elementsOnPage = document.querySelectorAll(".results .item")
            !Array.from(elementsOnPage).slice(1).forEach((element) => {

                if (element.children[2].innerHTML === res.children[2].innerHTML) {
                    element.remove()

                }
            })
        })




    }



    static setFinishSearch(color=""){
        if(color=="aqua"){
            this.finishSearch=false
        }else{
            this.finishSearch=true
        }
        
        
    }



    
}
export {search}
