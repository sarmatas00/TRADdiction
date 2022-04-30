
import abstract from "./abstracts/abstract.js"
import navControl from "./abstracts/navControl.js"
import carouselControl from "./abstracts/carouselControl.js"
import addControl from "./abstracts/addControl.js"
import search from "./abstracts/search.js"
import category from "./abstracts/category.js"
import login from "./abstracts/login.js"
import {signup} from "./abstracts/signup.js"
import user from "./abstracts/user.js"
import myItems from "./abstracts/myItems.js"
import trades from "./abstracts/trades.js"
import newListing from "./abstracts/newListing.js"
import about from "./abstracts/about.js"
import ourVision from "./abstracts/ourVision.js"
import ourMission from "./abstracts/ourMission.js"







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
        {path:"/login",view:login},
        {path:"/signup",view:signup},
        {path:"/about",view:about},
        {path:"/ourmission",view:ourMission},
        {path:"/ourvision",view:ourVision},
        {path:"/user/items/:id",view:myItems},
        {path:"/user/trades/:id",view:trades},
        {path:"/user/newListing/:id",view:newListing},
        {path:"/user/:id",view:user}
        
        
        
    
        //{path:"/about",view:},
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

    
    
    const view = new match.route.view(getParams(match));
    const newElement=await view.getElement()
    
    if(newElement!==null){
        document.querySelector("header").insertAdjacentElement("afterend",newElement)
        signup.getUsers({email:"spiros",password:"dimos"})
        view.callOtherMethods()
    }
    

}


window.addEventListener("popstate",router)


//when all elements on the page have loaded

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    

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

    
    
    (new category({ctgName:"Nikos"})).createCategory();
    (new category({ctgName:"Spiros"})).createCategory();
    (new category({ctgName:"Tasos"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    (new category({ctgName:"Pena"})).createCategory();
    
    
    
    router()
    
});

export {router}
















