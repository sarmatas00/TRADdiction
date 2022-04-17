
import abstract from "./abstracts/abstract.js"
import navControl from "./abstracts/navControl.js"
import carouselControl from "./abstracts/carouselControl.js"
import addControl from "./abstracts/addControl.js"
import search from "./abstracts/search.js"
import category from "./abstracts/category.js"
import login from "./abstracts/login.js"




const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};




const router = async ()=>{
    const routes=[
        {path:"/",view:abstract},
        {path:"/login/:id",view:login},
        {path:"/login",view:login}
        // {path:"/login",view:},
        // {path:"/about",view:},
        // {path:"/mission",view:},
        // {path:"/vision",view:},
        // {path:"/social",view:}
    ];

    const potentialMatches= routes.map(route=>{
        return{
            route:route,
            result:location.pathname.match(pathToRegex(route.path))
        }
    })

    let match=potentialMatches.find(potentialMatch=> potentialMatch.result!==null)

    if(!match){
        match={
            route:routes[0],
            result:[location.pathname]
        }
    }

    
    console.log(match);
    console.log(getParams(match));
    const view = new match.route.view(getParams(match));
    const newElement=await view.getElement()
    if(newElement!==null){
        document.querySelector("header").insertAdjacentElement("afterend",newElement)
    }

}


window.addEventListener("popstate",router)


//when all elements on the page have loaded

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    // history.pushState(null,null,"/")
    // router()

    document.body.addEventListener("click",function(e){
        if(e.target.matches("[data-link]")) {
            e.preventDefault()
            history.pushState(null, null, e.target.getAttribute("href"))
            router()
        }
        else if(e.target.parentElement.matches("[data-link]")) {
            e.preventDefault()
            history.pushState(null, null, e.target.parentElement.getAttribute("href"))
            router()
        }
    });

    
    
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

    router()
    
});
















