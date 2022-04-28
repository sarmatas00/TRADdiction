import abstract from "./abstract.js";

//module that is called every time a user posts a new item
//3 last items posted on the site are desplayed on the carousel.

export default class extends abstract{
    constructor(params){
        super(params)

    }

    addPhoto(){
        this.params.allPhotos[0].innerHTML= `
          <img
            src="${this.params.src}"
            class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        `
    }

    
}