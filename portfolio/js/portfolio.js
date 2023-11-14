const folders = ["inktober2022","inktober2023"];
const imageDiv = document.getElementById("images");

displayCard = (foldername, image, imageIndex)=>{
    return `<div class="col-sm-12 col-md-6 col-lg-3 h-100 card-container hoverable">
                <div class="card h100">
                    <div class="row w-100 h-100" style="margin:0;">
                        <img src="./portfolio/ressources/${foldername}/${image}" onclick="goToSlide(${imageIndex})" alt="${image}" class="card-img">
                        <div class="row align-items-end h-100 w-100">
                            <div class="position-absolute overlay">
                                <h4 class="card-title">${image}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
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
        imageDiv.innerHTML+= displayCard(sourceFolder,image,imageIndex);
        imageIndex++;

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
    carouselDOM.style.display="flex";
    bootstrapCarousel.to(index);
}

// Code to close the carousel
closeCarousel = ()=>{
    carouselDOM.style.display="none";
}


const carouselDOM = document.getElementById("carousel-drawings");
const carouselInner = document.getElementById("carousel-drawings-inner");
const bootstrapCarousel = new bootstrap.Carousel("#carousel-drawings");

let imageIndex = 0;
folders.forEach(folder => {
    fetch(`portfolio/ressources/${folder}/file.txt`)
    .then((res) => res.text())
    .then((text) => {
        renderPhoto(folder,text.split("\n"));
    })
    .catch((e) => console.error(e));
});



