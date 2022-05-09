import {search} from "./abstracts/search.js"
import category from "./abstracts/category.js"



const categoryBtn = document.querySelectorAll(".category-btn")
const queryForm = document.querySelector(".queryItemsForm")

//enable infinite scrolling
window.addEventListener('scroll', loadMore, false);


//infinite scrolling helper function
function loadMore() {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {

        let items = new search({ category: "", text: "", numberOfItems: 10 })
        items.loadItems()

    }
}

//"search for items" form control
//here we prevent refreshing the page, we disable infinite scrolling and then the input data 
//is sent to the database to get results. if there is a category selected, we take that into consideration as well
queryForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log(true);
    window.removeEventListener("scroll", loadMore)
    const text = evt.target.children[0].value
    let searched = false
    if (text !== "") {
        categoryBtn.forEach((btn) => {
            if (btn.style.backgroundColor === "aqua") {                 //check if user has also selected a category
                let item = new search({ category: btn.innerText, text: text, numberOfItems: -1 })
                item.loadItems()
                searched = true
                btn.style.backgroundColor = ""
            }
        })
        if (!searched) {
            let item = new search({ category: "", text: text, numberOfItems: -1 })
            item.loadItems()
        }
    }
    else {                                                              //if the input form is empty, enable scrolling for more adds again
        window.addEventListener('scroll', loadMore, true);
    }


});











