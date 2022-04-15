import abstract from "./abstract.js";
import addControl from "./addControl.js";

export default class extends abstract {
    constructor(params) {
        super(params)

    }

    async search() {
        
        const items = await axios.post("/search", { category: this.params.category, text: this.params.text })
        let r = []
        items.data.forEach(async (item) => {
            const tmp = await (new addControl(item).create())
            r.push(tmp)
        })
        return r

    }

    async loadItems() {
        let item = await this.search()

        item = item.map((res) => {

            let elementsOnPage = document.querySelectorAll(".results .item")
            if (!Array.from(elementsOnPage).slice(1).some((element) => {

                return element.children[2].innerHTML === res.children[2].innerHTML
            })) {
                return res
            }
        })

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


    





}