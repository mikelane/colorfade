var c = function() {
  return({
    log: function(msg) {
      consoleDiv = document.getElementById('console');
      para = document.createElement('p');
      text = document.createTextNode(msg);
      para.appendChild(text);
      consoleDiv.appendChild(para);
    }
  });
}();

function toRGB(H, S, V) {
  S /= 100;
  V /= 100;
  var C = V * S;
  H /= 60;
  var X = C * (1 - Math.abs((H % 2) - 1));
  var R = 0;
  var G = 0;
  var B = 0;
  if(0 <= H && H < 1) {
    R = C;
    G = X;
    B = 0;
  } else if(1 <= H && H < 2) {
    R = X;
    G = C;
    B = 0;
  } else if(2 <= H && H < 3) {
    R = 0;
    G = C;
    B = X;
  } else if(3 <= H && H < 4) {
    R = 0;
    G = X;
    B = C;
  } else if(4 <= H && H < 5) {
    R = X;
    G = 0;
    B = C;
  } else if(5 <= H && H < 6) {
    R = C;
    G = 0;
    B = X;
  } else {
    R = 0;
    G = 0;
    B = 0;
  }

  var m = V - C;
  R = Math.round(255 * (R + m)).toString(16);
  R.length < 2 ? R = "0" + R : R = "" + R;
  G = Math.round(255 * (G + m)).toString(16);
  G.length < 2 ? G = "0" + G : G = "" + G;
  B = Math.round(255 * (B + m)).toString(16);
  B.length < 2 ? B = "0" + B : B = "" + B;

  var RGB = "#" + R + G + B;
  return RGB;
}

function pulseColor() {
  //var H = Math.floor(Math.random() * 360);
  var H = 0;
  var i = setInterval(function() {
    if(H >= 360) {
      return;
    }

    fadeIn(H);
    c.log(H);
    H += 10
  }, 3100);
}

function fadeIn(H) {
  var colorbox = document.querySelector("#colorbox");

  var V = 0;

  var interval = setInterval(function() {
    if(V > 100) {
      clearInterval(interval);
      c.log(toRGB(H, 100, 100));
      setTimeout(function() {
        interval = setInterval(function() {
          if(V < 0) {
            clearInterval(interval);
            return;
          }

          colorbox.style.backgroundColor = toRGB(H, 100, V);
          colorbox.style.borderColor = toRGB(((H + 180) % 360), 100, V--);
        }, 10)
      }, 1000);
      return;
    }

    colorbox.style.backgroundColor = toRGB(H, 100, V);
    colorbox.style.borderColor = toRGB(((H + 180) % 360), 100, V++);
  }, 10);

}

function fadeOut(H) {
  var colorbox = document.querySelector("#colorbox");

  var V = 100;

  var interval = setInterval(function() {
    if(V < 0) {
      clearInterval(interval);
      return;
    }

    colorbox.style.backgroundColor = toRGB(H, 100, V);
    colorbox.style.borderColor = toRGB(((H + 180) % 361), 100, V--);
  }, 10);
}
