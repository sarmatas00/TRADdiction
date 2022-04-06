let widthMatch = window.matchMedia("(max-width: 768px)")
const navButton = document.querySelector(".nav-btn")
const navInput= document.querySelector("#nav-input")
const rows = document.querySelectorAll(".row")
const dropdownButton= document.querySelector("#dropdown-btn")
const navCollapse2= document.querySelector(".nav-collapse2")
const dropdownMenu=document.querySelector(".dropdown-menu")
const toggler= document.querySelector(".toggler")
const dropdownItem=document.querySelectorAll(".dropdown-item")

if (widthMatch.matches) {
    
    //search form appears when clicking search icon on mobile screens
    navButton.addEventListener("click", (evt) => {
        console.log("OK");
        navInput.classList.toggle("toggle")
    })

    
}
else {
    //on form submit, undo style changes on the input
    navButton.addEventListener("click", (evt) => {
        navInput.style.width = "30vw"
        navInput.style.width = "10% 0 0 10%"
        navInput.setAttribute("placeholder", "Search items")
    })

    //style search input on click
    navInput.addEventListener("click", function (evt) {
        this.style.width = "35vw"
        this.style.borderRadius = "0"
        this.setAttribute("placeholder", "")


        evt.target.style.border = "1px solid blue"

        
        Array.from(rows).slice(1).forEach((row) => {
            row.classList.add("blurScreenOnSearch")
        })
    })

    //undo the blur effect when bluring from the search input
    navInput.addEventListener("blur", function (evt) {

        
        Array.from(rows).slice(1).forEach((row) => {
            row.classList.remove("blurScreenOnSearch")
        })

    })

    
}





//when mouse over the login button, make the list appear
dropdownButton.addEventListener("mouseover", function (evt) {

    this.nextElementSibling.classList.add("menu-1");
})

//remove the list from the screen when user loses focus
dropdownMenu.addEventListener("mouseover", function (evt) {
    setTimeout(() => {
        this.classList.add("menu-1");
    }, 1000)
})

//also the list should keep appearing when mouse over list items
navCollapse2.addEventListener("mouseout", function (evt) {

    setTimeout(() => {
        this.children[1].classList.remove("menu-1");

    }, 1000)
})

//toggler manipulation for mobile screens
toggler.addEventListener("click", function () {
    navCollapse2.classList.toggle("toggler-active")
    this.classList.toggle("toggle")

    dropdownItem.forEach((item,index)=>{
        if(item.style.animation){
            item.style.animation=""
        }else{
            item.style.animation=`dropdownItemsAnimation 0.5s ease forwards ${index/7 +1}s`
        }
    })


})



