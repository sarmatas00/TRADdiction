
import abstract from "./abstracts/abstract.js"
import navControl from "./abstracts/navControl.js"
import carouselControl from "./abstracts/carouselControl.js"
import addControl from "./abstracts/addControl.js"

import category from "./abstracts/category.js"
import login from "./abstracts/login.js"
import {signup} from "./abstracts/signup.js"
import {user} from "./abstracts/user.js"
import {myItems} from "./abstracts/myItems.js"
import {trades} from "./abstracts/trades.js"
import {newListing} from "./abstracts/newListing.js"
import about from "./abstracts/about.js"
import ourVision from "./abstracts/ourVision.js"
import ourMission from "./abstracts/ourMission.js"
import add from "./abstracts/add.js"








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
        {path:"/add/:id",view:add},
        {path:"/user/items/:id",view:myItems},
        {path:"/user/trades/:id",view:trades},
        {path:"/user/newListing/:id",view:newListing},
        {path:"/user/:id",view:user}
        
        
        
    
        
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
    
    if(newElement!==null && newElement!==false){
        
        document.querySelector("header").insertAdjacentElement("afterend",newElement)
        
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
            let path=e.target.getAttribute("href")
            let state=null

            if(path.includes("/add")){
                if(location.pathname==="/"){
                    path="/login"
                }else{
                    state={'src':Array.from(path).slice(5).join("")}
                    path="/add/"
                    path+=Array.from(location.pathname).slice(-4).join("")
                }
            }

            history.pushState(state, null, path)
            router()

        }
        else if(e.target.parentElement.matches("[data-link]")) {
            e.preventDefault()
            history.pushState(null, null, e.target.parentElement.getAttribute("href"))
            router()
        }

        if(e.target.classList.contains("signout")){
            user.signOut()
        }

    });

    
    
    (new category({ctgName:"Shoes"})).createCategory();
    (new category({ctgName:"Jeans"})).createCategory();
    (new category({ctgName:"T-shirts"})).createCategory();
    (new category({ctgName:"Apparel"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    (new category({ctgName:"Shirts"})).createCategory();
    
    
    
    router()
    
});

export {router}
















