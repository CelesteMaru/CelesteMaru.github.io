displayCard = (foldername, image, imageIndex)=>{

    /*
    <div class="col-md-12 col-lg-3 h-100 card-container hoverable">
        <div class="card h100">
            <div class="row w-100 h-100 margin0">
                <img src="./portfolio/ressources/${foldername}/${image}" onclick="goToSlide(${imageIndex})" alt="${image}" class="card-img"> + spoiler si nécessaire
                <div class="row align-items-end h-100 w-100">
                    <div class="position-absolute overlay">
                        <h4 class="card-title">${image}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    */
    // If image is NSFW
    const nsfw = image.includes("19Plump.png")

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-12", "col-lg-3", "h-100", "card-container", "hoverable");
    cardContainer.id=imageIndex;

    const card = document.createElement("div");
    card.classList.add("card", "h100");
    card.onclick = ()=>{
        goToSlide(imageIndex);
    };

    const cardRow = document.createElement("div");
    cardRow.classList.add("row", "h100", "w100", "margin0");

    let img = document.createElement("img");
    img.src= `/portfolio/ressources/${foldername}/${image}`;
    img.alt = image;
    img.classList.add("card-img");
    
    if (nsfw){
        // Add a spoiler filter
        img.classList.add("card-image-spoiler", "margin0");
        const tempDiv = document.createElement("div");
        tempDiv.classList.add("overflow0")
        tempDiv.append(img);
        img = tempDiv;

        const spoilerRadialBackground = document.createElement("div");
        spoilerRadialBackground.classList.add("spoiler-radial-background")
        spoilerRadialBackground.innerHTML= "NSFW"
        img.append(spoilerRadialBackground)
    }

    const titleContainerDiv = document.createElement("div");
    titleContainerDiv.classList.add("row", "align-items-end", "h100", "w-100");

    const titlePositioningDiv = document.createElement("div");
    titlePositioningDiv.classList.add("position-absolute", "overlay");
    titlePositioningDiv.innerHTML = `<h4 class="card-title">${image}</h4>`

    titleContainerDiv.appendChild(titlePositioningDiv);

    cardRow.appendChild(img);

    cardRow.appendChild(titleContainerDiv);

    card.appendChild(cardRow);

    cardContainer.append(card);

    return cardContainer;
}
createCarouselSlide = (foldername,image)=>{
    const nsfw = image.includes("19Plump.png");
    const item = document.createElement("div");
    item.classList.add("carousel-item");


    const img = document.createElement("img");
    img.src = `./portfolio/ressources/${foldername}/${image}`;
    img.alt = image;
    img.classList.add("d-block", "carousel-image");

    // If image is NSFW
    if (nsfw){
        img.classList.add("carousel-image-spoiler", "margin0");

        const tempDiv = document.createElement("div");
        tempDiv.classList.add("overflow0")
        tempDiv.append(img);
        item.appendChild(tempDiv);

        //Show button;
        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "SHOW";
        button.classList.add("btn", "text-light", "show-button");
        button.onclick= ()=>{
            img.classList.remove("carousel-image-spoiler");
            button.style.display="none"
        }
        item.appendChild(button);
    }
    else{
        item.appendChild(img);
    }

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



