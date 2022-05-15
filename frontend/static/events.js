
// import category from "./abstracts/category.js"


// const categoryBtn = document.querySelectorAll(".category-btn")
// const queryForm = document.querySelector(".queryItemsForm")

// //enable infinite scrolling
window.addEventListener('scroll', loadMore, false);

//infinite scrolling helper function
function loadMore() {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {

        const rows=document.querySelectorAll(".results")
        
        Array.from(rows).find((row)=>{
            return !row.classList.contains("active")
        }).classList.add("active")
        

    }
}

// //"search for items" form control
// //here we prevent refreshing the page, we disable infinite scrolling and then the input data
// //is sent to the database to get results. if there is a category selected, we take that into consideration as well
// queryForm.addEventListener("submit", (evt) => {
//     evt.preventDefault()
//     console.log(true);
//     window.removeEventListener("scroll", loadMore)
//     const text = evt.target.children[0].value
//     let searched = false
//     if (text !== "") {
//         categoryBtn.forEach((btn) => {
//             if (btn.style.backgroundColor === "aqua") {                 //check if user has also selected a category
//                 let item = new search({ category: btn.innerText, text: text, numberOfItems: -1 })
//                 item.loadItems()
//                 searched = true
//                 btn.style.backgroundColor = ""
//             }
//         })
//         if (!searched) {
//             let item = new search({ category: "", text: text, numberOfItems: -1 })
//             item.loadItems()
//         }
//     }
//     else {                                                              //if the input form is empty, enable scrolling for more adds again
//         window.addEventListener('scroll', loadMore, true);
//     }

// });

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", async (evt) => {
      if(evt.target.style.backgroundColor!=="aqua"){
          fetch("/search",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({ctgName:evt.target.innerText,selected:true})
          }).then(()=>{window.location.href="/search"})
          
      }else{
        fetch("/search",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ctgName:"",selected:false})
        }).then(()=>{window.location.href="/search"})
      }
        
    // evt.preventDefault();
  });
});



let uploaded_image="";
document.querySelector('#src').addEventListener('change',function(e){
    const read=new FileReader();
    read.addEventListener('load',()=>{
      uploaded_image=read.result;
    })
    read.readAsDataURL(this.files[0]);
  })

document.querySelector("#newListingForm").addEventListener("submit",(evt)=>{
    let details = {
        src: uploaded_image,
        title: document.querySelector("#title").value,
        text: document.querySelector("#text").value,
        looksFor: document.querySelector("#looksFor").value,
        free:document.querySelector("#free").checked
      };
    fetch("/items",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({details})
    })
    
})


  

