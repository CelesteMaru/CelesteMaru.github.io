const folders = ["inktober2022"];
//const file = [["1Gargoyle..png\n"+, "2Scurry..png\n"+", "3Bat..png\n"+"]];
const imageDiv = document.getElementById("images");

const testText = `1Gargoyle.png
2Scurry.png
3Bat.png
3BatSketch.png
4Scallop.png
6Bouquet.png
7Trip.png
8Match.png
9Nest.png
10Crabby.png
11Eagle.png
12Forget.png
13Kind.png
14Empty.png
15Armadillo.png
16Fowl.png
17Salty.png
18Scrape.png
19Ponytail.png
20Bluff.png
21BadDog.png
22Heist.png
23Booger.png
24Fairy.png
25Tempting.png
26Ego.png
27Snack.png
28Camping.png
29UH-OH.png
30Gear.png
31Farm.png`


displayCard = (foldername, image)=>{
    return `<div class="col-sm-12 col-md-6 col-lg-3 h-100" style="margin-bottom:1%;">
    <div class="card bg-dark h100" style="padding:0;">
    
        <div class="row w-100 h-100" style="margin:0;">
            <img src="./portfolio/ressources/${foldername}/${image}" alt="${image}" style="height:12.5rem; width:auto; padding:0; display:block; margin-left:auto;margin-right:auto;">
            <div class="row align-items-end h-100 w-100">
                <div class="position-absolute" style="background-color: rgba(0,0,0,0.5); height:20%; width:100%; padding:0;">
                    <h4 class="card-title" style="color: rgba(255,255,255,1); margin-left:2%">${image}</h5>
                </div>
            </div>
        </div>
    </div>
    </div>`
}
renderPhoto = (sourceFolder,array)=>{
    array.forEach(image => {
        imageDiv.innerHTML+= displayCard(sourceFolder,image);
    });
}

//renderPhoto(testText.split("\n"));

fetch("portfolio/ressources/inktober2022/file.txt")
.then((res) => res.text())
.then((text) => {
  renderPhoto("inktober2022",text.split("\n"));
 })
.catch((e) => console.error(e));



