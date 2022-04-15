import search from "./abstracts/search.js"
import category from "./abstracts/category.js"


const categoryBtn = document.querySelectorAll(".category-btn")
const queryForm = document.querySelector(".queryItemsForm")


queryForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const text = evt.target.children[0].value
    let searched = false
    if (text !== "") {
        categoryBtn.forEach((btn) => {
            if (btn.style.backgroundColor === "aqua") {
                let item = new search({ category: btn.innerText, text: text })
                item.loadItems()
                searched = true
                btn.style.backgroundColor = ""
            }
        })
        if (!searched) {
            let item = new search({ category: "", text: text })
            item.loadItems()
        }
    }


})

