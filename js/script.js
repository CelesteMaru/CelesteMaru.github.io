document.getElementById("bgp").style.height = 100 + "vh"
document.body.onresize = function resize() {
  document.getElementById("bgp").style.height = 100 + "vh"
}

'use strict';

const textWriter = (() => {

  const intro = document.querySelector('.intro');

  let arr = [];
  let value = intro.firstChild.nodeValue;
  let current = 0;
  let intervalTime = 0;
  let ttour = 0;
  intro.firstChild.nodeValue = '';
  document.querySelector('.intro2').firstChild.nodeValue = '';

  const text = () => {
    for (let i = 0, len = value.length; i < len; i++) {
      arr.push(value.charAt(i));
    }



    const textWriter = () => {
      if (ttour == 0) {
        intro.firstChild.nodeValue += arr[current];
      } else {
        document.querySelector('.intro2').firstChild.nodeValue += arr[current];
      }

      current++;
      if (current === arr.length) {

        if (ttour == 0) {
          ttour = 1;
          current = 0;
          arr = [];
          value = "Pierre Maruejol";
          for (let i = 0, len = value.length; i < len; i++) {
            arr.push(value.charAt(i));
          }
        } else {
          clearInterval(duration);
        }

      }

    };

    const duration = setInterval(textWriter, intervalTime);
  };

  const loadFunction = (callback) => {
    if (addEventListener) {
      window.addEventListener('load', callback, false);
    }
  };

  return {
    init: (time, tour) => {
      intervalTime = time;

      loadFunction(text);
    }
  };

})();

textWriter.init(100, 0);
$('#boop').on("click", function(e) {
  $(".centerBox").css({
    "display": "none"
  });
  $(".ca3-scroll-down-link").css({
    "display": "block"
  });
  $("#imageG").css({
    "position": "absolute"
  });
  $("#imageD").css({
    "position": "absolute"
  });

  $("#imageG").animate({
    "right": "0vw"
  });
  $("#imageD").animate({
    "left": "0vw"
  });
  setTimeout(() => {
    $("body").css({
      "overflow": "auto"
    });
  }, 2000);

});