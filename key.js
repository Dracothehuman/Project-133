img="";
status="";
object=[];

function preload(){
    img = loadImage("keychain.jpg");
}

function setup(){ 
    canvas = createCanvas(780, 540);
    canvas.center()
    objectDetector=ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML ="Status:Detecting Image";
}

function draw(){
    image(img , 0 , 0, 780, 540);
    if(status != ""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="The Keychain in the image has been detected.";
            
            fill("PPCUM9");
            percent=floor(object[i].confidence*100);
            text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
            
            noFill();
            stroke("#PPCUM9");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function back(){
    window.location="index.html";
}
function modalLoaded(){
    console.log("Modal has loaded");
    status= true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
    
}