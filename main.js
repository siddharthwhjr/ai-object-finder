status = "";
input = "";
object = [];
function setup(){
    canvas = createCanvas(480, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
     image(video, 0, 0, 480, 340);
     if(status != ""){
        objectdetector.detect(video, gotresults);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object.label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == input){
                document.getElementById("object_detection").innerHTML = "Object Found";
            }
            else{
                document.getElementById("object_detection").innerHTML = "Object Not Found";
            }
        }
     }
}
function start(){
    objectdetector = ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("object").value;
}
function modeloaded(){
    console.log("model loaded");
    status = true;
}
function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}