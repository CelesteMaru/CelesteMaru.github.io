displayCard = (foldername, image, imageIndex)=>{
    const newDiv = document.createElement("div");
    newDiv.classList.add("col-md-12", "col-lg-3", "h-100", "card-container", "hoverable");
    newDiv.id=imageIndex;
    newDiv.innerHTML = `<div class="card h100">
                            <div class="row w-100 h-100" style="margin:0;">
                                <img src="./portfolio/ressources/${foldername}/${image}" onclick="goToSlide(${imageIndex})" alt="${image}" class="card-img">
                                <div class="row align-items-end h-100 w-100">
                                    <div class="position-absolute overlay">
                                        <h4 class="card-title">${image}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>`
    return newDiv;
}
createCarouselSlide = (foldername,image)=>{
    const item = document.createElement("div");
    item.classList.add("carousel-item");

    const img = document.createElement("img");
    img.src = `./portfolio/ressources/${foldername}/${image}`;
    img.alt = image;
    img.classList.add("d-block" ,"carousel-image");

    item.appendChild(img);
    return item;
}

renderPhoto = (sourceFolder,array)=>{
    array.forEach((image, index) => {
        // ---- Vignette Display ----
        const card = (displayCard(sourceFolder,image,nbrImage));
        imageDiv.appendChild(card);
        allCardDOM.push(card);
        allImageNames.push(image);
        currentSearch.push(nbrImage);
        nbrImage++;

        // ---- Carousel ----
        const carouselSlide = createCarouselSlide(sourceFolder,image);
        // Activate the first slide
        if (index === 0 && sourceFolder==folders[0]) {
            carouselSlide.classList.add("active");
        }
        carouselInner.appendChild(carouselSlide);
    });
}

// When we click on card we open the carousel on this image
goToSlide = (index)=>{
    currentIndex = index
    carouselDOM.style.display="flex";
    bootstrapCarousel.to(currentIndex);
    currentIndex=currentSearch.find(index);
}

// Code to close the carousel
closeCarousel = ()=>{
    carouselDOM.style.display="none";
}

prevSlideInCarousel = ()=>{
    currentIndex = currentIndex - 1 < 0 ? currentSearch.length : currentIndex - 1;
    bootstrapCarousel.to(currentSearch[currentIndex]);

}
nextSlideInCarousel = ()=>{
    currentIndex = (currentIndex+1) % currentSearch.length;
    bootstrapCarousel.to(currentSearch[currentIndex]);
}

updateSearch = (value)=>{
    currentSearch = new Array();
    const regex = new RegExp(value, "i");
    for (let i = 0; i < allImageNames.length; i++) {
        if(allImageNames[i].search(regex)!= -1){
            currentSearch.push(i);
            allCardDOM[i].style.display="block";
        }else{
            allCardDOM[i].style.display="none";
        }
        
    }
}

const folders = ["inktober2022","inktober2023"];
const imageDiv = document.getElementById("images");
const carouselDOM = document.getElementById("carousel-drawings");
const carouselInner = document.getElementById("carousel-drawings-inner");
const bootstrapCarousel = new bootstrap.Carousel("#carousel-drawings");
const searchInput = document.getElementById("image-search");
const allImageNames = new Array();
const allCardDOM = new Array();
let currentSearch = new Array();

let nbrImage = 0;
let currentIndex = 0;
folders.forEach((folder, index) => {
    fetch(`portfolio/ressources/${folder}/file.txt`)
    .then((res) => res.text())
    .then((text) => {
        renderPhoto(folder,text.split("\n"));
    })
    .catch((e) => console.error(e));
});



