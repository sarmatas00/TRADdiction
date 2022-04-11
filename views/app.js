




//load html templates with jquery
$(function () {
    $("#navBar").load("navbar.html")
})
$(function () {
    $("#footer").load("footer.html")
})

//clone category rows and buttons to dynamically add buttons
const categoryBtnDiv = document.querySelector("#category .col-2")






for (let i = 1; i < 4; i++) {
    document.querySelector("#category .col-2").insertAdjacentElement("afterend", categoryBtnDiv.cloneNode(true))
}

const categoryRow = document.querySelector("#category").cloneNode(true)
categoryRow.removeChild(categoryRow.children[0])

for (let j = 1; j < 3; j++) {
    document.querySelector("#category").insertAdjacentElement("afterend", categoryRow.cloneNode(true))
}



//results

const categoryResult = document.querySelector(".results #prototype")


class createAdd {
    constructor({src,title,text,looksFor="",free}) {
        this.src = src
        this.title = title
        this.text = text
        this.looksFor = looksFor
        this.free = free
    }

    create() {
        let add = categoryResult.cloneNode(true)
        add.setAttribute("id", "")
        add.children[0].setAttribute("src", this.src)
        add.children[1].innerText = this.title
        add.children[2].innerText = this.text
        if (this.free) {
            add.children[3].innerText = "Freebie"
            add.children[3].children[0].innerText = ""
        }
        else {
            add.children[3].children[0].innerText="looksFor"
        }
        return add
    }
}

class Search {
    constructor(category = "", text = "") {
        this.category = category
        this.text = text
    }

    async loadItems() {
        const items = await fetch("/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: this.category, text: this.text })
        })
        items.json().then(resp => {
            let resultPage=document.querySelectorAll(".results")
            const r=(new createAdd(resp).create())
            if(resultPage[resultPage.length-1].childElementCount<3){
                resultPage[resultPage.length-1].appendChild(r)
            }else{
                resultPage[resultPage.length-1].insertAdjacentElement("afterend",resultPage[resultPage.length-1].cloneNode(false))
                resultPage=document.querySelectorAll(".results")
                resultPage[resultPage.length-1].appendChild(r)
            }
        })
        await fetch("/search")
    }




}



categoryBtn = document.querySelectorAll(".category-btn")
categoryBtn.forEach(btn => {

    btn.addEventListener("click", (evt) => {
        let item = new Search(evt.target.innerText)
        item.loadItems()
        evt.preventDefault()
    })
})