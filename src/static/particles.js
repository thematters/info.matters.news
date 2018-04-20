var cvs = document.createElement("canvas"),
    context = cvs.getContext("2d");
	document.body.appendChild(cvs);
	cvs.id = "circle";
	
var parent = cvs.parentNode;
var cvswrapper = document.getElementById("particles");
	parent.replaceChild(cvswrapper, cvs);
	cvswrapper.appendChild(cvs);

var numDots = 100,
    n = numDots,
    currDot,
    maxRad = 300,
    minRad = 100,
    radDiff = maxRad-minRad,
    dots = [],
    pairs = [];
    PI = Math.PI,
    centerPt = {x:0, y:0};

resizeHandler();
window.onresize = resizeHandler;

// create dots
n = numDots
while(n--){
  currDot = {};
  currDot.x = currDot.y = 0;
  currDot.radius = minRad+Math.random()*radDiff;
  currDot.radiusV = 10+Math.random()*50,
  currDot.radiusVS = (1-Math.random()*2)*0.015,
  currDot.radiusVP = Math.random()*PI,
  currDot.ang = (1-Math.random()*2)*PI;
  currDot.speed = (1-Math.random()*2);
  //currDot.speed = 1-Math.round(Math.random())*2;
  //currDot.speed = 1;
  currDot.intensity = Math.round(Math.random()*255);
  currDot.fillColor = "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";
  dots.push(currDot);
}

//create all pairs

n = numDots
while(n--){
  ni = n;
  while(ni--){
    pairs.push([n, ni]);
  }
}

function drawPoints(){
  n = numDots;
  var _centerPt = centerPt,
      _context = context,
      dX = 0,
      dY = 0;

  _context.clearRect(0, 0, cvs.width, cvs.height);

  var radDiff;
  //move dots
  n = numDots;
  while(n--){
    currDot = dots[n];
    currDot.radiusVP += currDot.radiusVS;
    radDiff = currDot.radius+Math.sin(currDot.radiusVP)*currDot.radiusV;
    currDot.x = _centerPt.x+Math.sin(currDot.ang)*radDiff;
    currDot.y = _centerPt.y+Math.cos(currDot.ang)*radDiff;

    //currDot.ang += currDot.speed;
    currDot.ang += currDot.speed*radDiff/51200;

  } 

  var pair, dot0, dot1, dist, bright,
      maxDist = Math.pow(100, 2);
  //draw lines
  n = pairs.length;
  while(n--){
    pair = pairs[n];
    dot0 = dots[pair[0]];
    dot1 = dots[pair[1]];
    dist = Math.pow((dot1.x-dot0.x), 2)+Math.pow((dot1.y-dot0.y), 2);
    if(dist<maxDist){
      bright = Math.round(50*(maxDist-dist)/maxDist);
      _context.beginPath();
      _context.moveTo(dot0.x, dot0.y);
      _context.lineTo(dot1.x, dot1.y);
      _context.lineWidth = 1;
      //_context.strokeStyle = "rgb("+bright+","+bright+","+bright+")";
	  _context.strokeStyle = "rgba(255,255,255,0.1)";
      _context.stroke();
    }
  }

  //draw dots
  n = numDots;
  while(n--){    
    //console.log(currDot);
    _context.fillStyle= dots[n].fillColor;
    _context.fillRect(dots[n].x, dots[n].y, 1, 1);
  }
  window.requestAnimationFrame(drawPoints);
}

function resizeHandler(){
  var box = cvs.getBoundingClientRect();
  var w = box.width;
  var h = box.height;
  cvs.width = w;
  cvs.height = h;
  centerPt.x = Math.round(w/2);
  centerPt.y = Math.round(h/2);
}

// retina pixel ratio detection
var ratio = window.devicePixelRatio || 1;
var canvas  = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width  *= ratio;
canvas.height *= ratio;	
context.scale(ratio, ratio);

drawPoints();