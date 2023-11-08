const folders = ["inktober2022"];
const file = [["1Gargoyle.png", "2Scurry.png", "3Bat.png"]];
const imageDiv = document.getElementById("images");

folders.forEach(folder => {
    file.forEach(filesinFolder => {
        filesinFolder.forEach(image => {
            let imageNode = document.createElement("img");
            imageNode.src= "./portfolio/ressources/"+folder+"/"+image;
            imageNode.width="500";
            imageDiv.appendChild(imageNode);
        });
    });
});