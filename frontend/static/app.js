
import abstract from "./abstracts/abstract.js"
import navControl from "./abstracts/navControl.js"
import carouselControl from "./abstracts/carouselControl.js"
import addControl from "./abstracts/addControl.js"
import search from "./abstracts/search.js"
import category from "./abstracts/category.js"











//when all elements on the page have loaded

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);

    document.body.addEventListener("click",function(e){
        if(e.target.matches("[data-link]")) {
            e.preventDefault()
            history.pushState(null, null, e.target.getAttribute("href"))
        }
        else if(e.target.parentElement.matches("[data-link]")) {
            e.preventDefault()
            history.pushState(null, null, e.target.parentElement.getAttribute("href"))
        }
    })

    
    
    (new category({ctgType:"NotDone",ctgName:"Nikos"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Spiros"})).createCategory();
    (new category({ctgType:"NotDone",ctgName:"Tasos"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    (new category({ctgType:"Done",ctgName:"Pena"})).createCategory();
    
});




//event function for stopping page refresh on anchors
















