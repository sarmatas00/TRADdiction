import abstract from "./abstract.js";
import addControl from "./addControl.js";

//that module takes care of making requests to the database for adds, load them on the page, or remove them
//depending on search and category conditions

class search extends abstract {
    constructor(params) {
        super(params)
        this.i=0
        //newListing.getListing("")
        this.aggelies=[
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

    }

    static i=0;
    static finishSearch=true;


    

    //make a post request for adds and put the results in an array. With the help of addControl
    //create a new add for every object of information we get and then direct it to be loaded or removed from the page respectively
    async search() {
        const {category,text,numberOfItems}=this.params
        
        // const items = await axios.post("/search", { category: this.params.category, text: this.params.text,numberOfItems:this.params.numberOfItems,finish:this.finishSearch })
        let items=[]
        if(numberOfItems!==10 && !search.finishSearch){
        
            search.finishSearch=false
            if(search.i>=this.aggelies.length){search.i=0}
            items=this.aggelies.slice(0,4)
        }else if(numberOfItems==10 && search.finishSearch){
            items=this.aggelies.slice(search.i,search.i+=2)
        }else if(numberOfItems!==10 && search.finishSearch){
            search.finishSearch=true
            items=this.aggelies.slice(4,8)
        }
        let r = []
        items.forEach(async (item) => {
            const tmp = await (new addControl(item).create())
            r.push(tmp)
        })
        return r

    }

    async loadItems() {
        let item = await this.search()
        
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

    async removeItems() {
        let item = await this.search()

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
