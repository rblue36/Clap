let video;
let poseNet;
let pose;

var canvas;
var img;

let wristleftX = 0;
let wristleftY = 0;
let wristrightX = 0;
let wristrightY = 0;
let eyeleftX = 0;
let eyeleftY = 0;
let eyerightX = 0;
let eyerightY = 0;
var webcam;
var shiffman;

var leftwristellipse;
var rightwristellipse;
var trackbutton;
var trackbutton2;

function preload() {
    shiffman = createImg('https://pbs.twimg.com/profile_images/913100879204556800/Ou9CxY1c_400x400.jpg');
}

function setup() {
    shiffman.hide();
    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    canvas.position(0, 100)
    //  video.position();
    shiffman.position(700, 140);
    console.log(ml5);
    let poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    trackbutton = createButton('Toggle tracking circles');
    trackbutton.mousePressed(toggletrack);
    trackbutton.position(350, 40);

    trackbutton2 = createButton('Toggle tracking circles');
    trackbutton2.mousePressed(toggletrack2);
    trackbutton2.position(350, 40);

    trackbutton2.hide();


}

function gotPoses(poses) {
    if (poses.length > 0) {

        let leftnewx = poses[0].pose.keypoints[9].position.x;
        let leftnewy = poses[0].pose.keypoints[9].position.y;
        let rightnewx = poses[0].pose.keypoints[10].position.x;
        let rightnewy = poses[0].pose.keypoints[10].position.y;

        let eyeleftnewX = poses[0].pose.keypoints[1].position.x;
        let eyeleftnewY = poses[0].pose.keypoints[1].position.y;
        let eyerightnewX = poses[0].pose.keypoints[2].position.x;
        let eyerightnewY = poses[0].pose.keypoints[2].position.y;

        wristleftX = lerp(wristleftX, leftnewx, 0.5);
        wristleftY = lerp(wristleftY, leftnewy, 0.5);
        wristrightX = lerp(wristrightX, rightnewx, 0.5);
        wristrightY = lerp(wristrightY, rightnewy, 0.5);

        eyeleftX = lerp(eyeleftX, eyeleftnewX, 0.5);
        eyeleftY = lerp(eyeleftY, eyeleftnewY, 0.5);
        eyerightX = lerp(eyerightX, eyerightnewX, 0.5);
        eyerightY = lerp(eyerightY, eyerightnewY, 0.5);

    }
}

function modelReady() {
    console.log('model loaded');
}

function draw() {


    webcam = image(video, 0, 0);

    let eyedistance = dist(eyeleftX, eyeleftY, eyerightX, eyerightY);
    let wristdistance = dist(wristleftX, wristleftY, wristrightX, wristrightY);
    console.log("Eye Distance:" + eyedistance);
    console.log("Wrist Distance" + wristdistance);
    leftwristellipse = ellipse(wristleftX, wristleftY, 0.5 * eyedistance);
    rightwristellipse = ellipse(wristrightX, wristrightY, 0.5 * eyedistance);


    if (eyedistance > 0.1 && eyedistance < 30) {
        if (wristdistance < 80) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 30 && eyedistance < 35) {
        if (wristdistance < 95) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 30 && eyedistance < 35) {
        if (wristdistance < 100) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 40 && eyedistance < 45) {
        if (wristdistance < 108) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 45 && eyedistance < 50) {
        if (wristdistance < 115) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 50 && eyedistance < 55) {
        if (wristdistance < 125) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 55 && eyedistance < 60) {
        if (wristdistance < 135) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 60 && eyedistance < 70) {
        if (wristdistance < 145) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 70 && eyedistance < 80) {
        if (wristdistance < 160) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 80 && eyedistance < 84) {
        if (wristdistance < 175) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 80 && eyedistance < 89) {
        if (wristdistance < 220) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    if (eyedistance > 90) {
        if (wristdistance < 300) {
            filterit();
        } else {
            hideshiffman();
        }
    }

    function filterit() {
        shiffman.show();

        //filter(GRAY);
        // image(shiffman, 0, 0);

        // webcam.hide();

    }

}

function hideshiffman() {
    shiffman.hide();

}

function toggletrack() {
    noFill();
    noStroke();
    trackbutton2.show();
    trackbutton.hide();

}

function toggletrack2() {
    fill(255);
    stroke(0);
    trackbutton2.hide();
    trackbutton.show();

}

