import abstract from "./abstract.js";
import addControl from "./addControl.js";

export default class extends abstract{
    constructor(params) {
        super(params)
        
    }

    async searchByCategory(){
        
        const items= await axios.post("/search",{ category: this.params.category, text: this.params.text })
        let r=[]
        items.data.forEach(async (item)=>{
            const tmp=await (new addControl(item).create())
            r.push(tmp)
        })
        return r

    }


    async searchByText(){
        const items= await axios.post("/search",{ category: this.params.category, text: this.params.text })
        const r=await (new addControl(items.data).create())
        return r
    }
}