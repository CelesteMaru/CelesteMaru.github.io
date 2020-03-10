document.getElementById("bgp").style.height = 1080 * (window.innerWidth / 1920) - 5 + "px";

document.body.onresize = function resize() {
  document.getElementById("bgp").style.height = 1080 * (window.innerWidth / 1920) - 5 + "px";
}

