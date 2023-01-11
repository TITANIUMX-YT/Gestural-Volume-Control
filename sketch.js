let video;
let poseNet;
let wristlX=0;
let wristlY=0;

let wristrX=0;
let wristrY=0;

var slider;

let song;

let vol=0;


function preload(){
  song = loadSound("file.mp3")
}


function setup() {
  createCanvas(640, 480);
  video=createCapture(VIDEO);
  video.hide();
  
  //console.log(ml5);
  
  
  poseNet=ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  
  
  slider = createSlider(0, 1, 0.2, 0, 0.01);
  slider.position(15,10);
  slider.style('width', '600px');
  
  
  song.play();
  song.setVolume(0.2);
}

function gotPoses(poses){
  console.log(poses);
  if(poses.length>0){
  let wlX=poses[0].pose.keypoints[9].position.x;
  let wlY=poses[0].pose.keypoints[9].position.y;
   
  let wrX=poses[0].pose.keypoints[10].position.x;
  let wrY=poses[0].pose.keypoints[10].position.y;
    
   /*
   
   prevY=wrY-wristlY;
    
   
    wristlX=lerp(wristlX,wlX,0.5);
    wristlY=lerp(wristlY,wlY,0.5);
   
    wristrX=lerp(wristrX,wrX,0.5);
    wristrY=lerp(wristrY,wrY,0.5);
    
    */
    
    wristlX=wlX;
    wristlY=wlY;
    
    wristrX=wrX;
    wristrY=wrY;
    
    
    
  }
}

function modelReady(){
  //console.log('model ready');
}

function draw() {
  //background(220);
  image(video,0,0);
  
  let d=(wristlX,wristlY);
  
  //console.log(wristrY+"right hand pos");
 
  fill(255,0,0);
 
  ellipse(wristlX,wristlY,20);
  ellipse(wristrX,wristrY,20);
  
 
  console.log(d+"distance");
  
  let val = slider.value();
  //background(val);
  
  song.setVolume (slider.value());
  
  if (d < 150){
    
    val += 0.01;
    slider.value(val);
    
  }
  else if (d < 300){
    
    val -= 0.01;
    slider.value(val);
    
  }
  
  else{
    
    val = 0.2;
    slider.value(val);
    
  }
  
  /*if(wristrY>200){
    //console.log("high");
  }
  else{
    console.log("low");
  }*/
}