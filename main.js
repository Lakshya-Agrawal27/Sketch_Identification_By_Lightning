function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup()
{
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {

 //set stroke weight to 13
 strokeWeight(13);
 //Set Stroke Color To Black
 stroke(0);
 //if mouse is presses, draw a line between previous and current mouse position
 if (mouseIsPressed) {
     line(pmouseX, pmouseY, mouseX, mouseY);
 }
}

function clearCanvas()
{
    background("white");
}

function classifyCanvas() 
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
if (error){
    console.error(error);
}
console.log(results);
document.getElementById('label').innerHTML = 'Label:' + results[0].label;

document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}