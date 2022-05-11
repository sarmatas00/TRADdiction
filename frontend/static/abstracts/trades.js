import abstract from "./abstract.js";
import addControl from "./addControl.js";
import  {newListing}  from "./newListing.js";
import {user} from "./user.js"
class trades extends user{
    constructor(params){
        super(params);
        this.id=params.id;
        let data=params.data;
        this.setUserOptions();
        document.querySelector("main").classList.add("d-none");
        }
    static requests=[{itemProvided:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    userId:1111
    },itemWanted:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    userId:1233
    }},{itemProvided:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    userId:1233
    },itemWanted:{src:"https://imgprd19.hobbylobby.com/2/4f/57/24f57e245a879cb2543edd1df4e090bfebf24a45/700Wx700H-1013689-0320.jpg",
    title:"Irish Green T-Shirt L",
    text:"I don't like green",
    looksFor:"",
    free:true,
    userId:1231
    }}];


    static completedTrades=[];


    static tradeRequest(itemProvided,itemWanted){
      const listings=newListing.getListing("");
      let foundListing="";
      if(itemWanted.userId===itemProvided.userId){return false}
      this.requests.push({itemProvided,itemWanted})
      return true

    }



    async getElement() {
    
    if (
      document.querySelector("header").nextElementSibling.nodeName !== "MAIN"
    ) {
      document.querySelector("header").nextElementSibling.remove();
    }
    const newElement = document.createElement("div");
    newElement.classList.add("container");
    newElement.setAttribute("id", "trades");
    let s1 = 
    `
    
     <h1>Trades</h1> 
     <div>
     <div id="leftbox">
     <h2>Trade History</h2>
     <ul id="tradeHistory" class="TradeHistoryLi">
    `
    if(trades.completedTrades.length!=0){
        for(let trade of trades.completedTrades){
          s1=s1.concat(`<li class="tradeHistoryLi">Traded with: ${trade.requesterId}</li>`);
        }
      }
    
    s1=s1.concat(`
     </ul>
     </div>
     <div id="rightbox">
     <h2>Trade Requests</h2>
     <ul>
     `);
     let ctr="0";
     let s2="";
     let no=0;
     for(let request of trades.requests){
       no=request.itemProvided.userId;

       console.log(`id${no}li`);
       s1=s1.concat(`<li id="id${no}li" class="tradeReqLi">
       <div class="container" >
        <div class="row inTradeLi">
        <div class="col-3"></div>
        <div class="col-3"></div>
      </div>
      </div>
       Trade Request by: ${request.itemProvided.userId} <button action="click" id="id${no}yesButton" class="tradeBtn">Accept</button><button action="click" id="id${no}noButton" class="tradeBtn">Decline</button></li>`)

     }
     s1=s1.concat(`
     
     </ul>
     
     </div>

    
     </div>
       
    `)

    
   newElement.innerHTML=s1;
  return newElement;
}

buttonInit(){
  let btn1="";
  let btn2="";
  let no="";
    for(let request of trades.requests){
      no=request.itemProvided.userId;
      btn1=document.querySelector(`#id${no}yesButton`);
      btn2=document.querySelector(`#id${no}noButton`);
      btn1.addEventListener('click',()=>{
        console.log(btn1.id);
        for(let i=trades.requests.length-1;i>=0;i--){
          if(btn1.id===`id${trades.requests[i].itemProvided.userId}yesButton`){
            trades.completedTrades.push(trades.requests[i]);
            let li=document.createElement('li');
            li.classList.add('tempLi');
            li.innerHTML=`Traded with: ${trades.requests[i].itemProvided.userId}`;
            document.querySelector("#tradeHistory").append(li)
            trades.requests.splice(i,1);
            document.querySelector(`#id${no}li`).remove();
            this.buttonInit();
            
          }
        }
      })
      btn2.addEventListener('click',()=>{
        console.log(btn2.id);
        for(let i=trades.requests.length-1;i>=0;i--){
          if(btn2.id===`id${trades.requests[i].itemProvided.userId}noButton`){
            trades.requests.splice(i,1);
            document.querySelector(`#id${no}li`).remove();
            this.buttonInit();
          }
        }
      })
    }
}

displayRequestAdds(){
  let s1=""
  const allRequests=document.querySelectorAll(".inTradeLi")
  let i=0
  for(let request of trades.requests){
    allRequests[i].children[0].innerHTML=new addControl(request.itemProvided).create().innerHTML;
    
    allRequests[i].children[1].innerHTML=new addControl(request.itemWanted).create().innerHTML;

    ++i;
  }
}


callOtherMethods(){
  this.displayRequestAdds()
  this.buttonInit();
}
}

export {trades}