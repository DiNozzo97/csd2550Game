// Detect Key Presses
$( document ).keydown(function(event) {
    switch (event.which) {
        case 37: // Left Arrow Key
            console.log("Left Arrow");
            break;
        case 38: // Up Arrow Key
            console.log("Up Arrow");
            break;
        case 39: // Right Arrow Key
            console.log("Right Arrow");
            break;
        case 40: // Down Arrow Key
        case 32: // Space bar Key
            console.log("Down Arrow Or SpaceBar");
            break;
    }
});

var canvas,
    ctx,
    blockWidth,
    blockHeight;


function initGame() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    drawGameArea();
    drawTopData();

}

function drawGameArea() {
    ctx.clearRect(0, 20, canvas.width, 480);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw area next piece panel
    ctx.fillRect(0, 20, 150, 150);
    // Draw Main game area
    ctx.fillRect(150, 20, 400, 480);
    // Draw Main game area vertical grid
    for (i=150; i<550; i+=25) {
        ctx.beginPath();
        ctx.moveTo(i,20);
        ctx.lineTo(i,500);
        ctx.stroke();
    }

    // Draw Main game area horizontal grid
    for (i=20; i<500; i+=25) {
        ctx.beginPath();
        ctx.moveTo(150,i);
        ctx.lineTo(550,i);
        ctx.stroke();
    }

}

function drawTopData(){
    ctx.clearRect(0, 0, canvas.width, 20);
    ctx.font="15px Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Name: "+sessionStorage.currentFirstName+" "+sessionStorage.currentLastName+"  Your High Score: "+sessionStorage.highScore,5,15);
}

function drawIBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#00FFFF";
    switch (rotation) {
        case 0:
        case 2:
            blockWidth = 25;
            blockHeight = 100;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            ctx.fillRect(xPosition, yPosition + 75, 25, 25);
            break;
        case 1:
        case 3:
            blockWidth = 100;
            blockHeight = 25;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            ctx.fillRect(xPosition + 75, yPosition, 25, 25);
            break;
    } 
}

function drawOBlock(rotation, xPosition, yPosition) {
    if (rotation == 1)
        rotation = 0;
    ctx.fillStyle = "#FFFF00";
    switch (rotation) {
        case 0 :
            blockWidth = 50;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            break;
    } 
}

function drawLBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#FFA500";
    switch (rotation) {
        case 0 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 50, 25, 25);
            break;
        case 1 :
            blockWidth = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            break;
        case 2 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 50, 25, 25);
            break;
        case 3 :
            blockWidth = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            break;
    }
}

function drawJBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#0000FF";
    switch (rotation) {
        case 0 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 50, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            break;
        case 1 :
            blockWidth = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition + 25, 25, 25);
            break;
        case 2 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            break;
        case 3 :
            blockWidth = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition + 25, 25, 25);
            break;
    }
}

function drawSBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#00FF00";
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            break;
        case 1 :
        case 3 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 50, 25, 25);
            break;
    }
}

function drawZBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#ff0000";
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition + 25, 25, 25);
            break;
        case 1 :
        case 3 :
            blockWidth = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            break;
    }
}

function drawTBlock(rotation, xPosition, yPosition) {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#b600b6";
    switch (rotation) {
        case 0 :
            blockWidth  = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition + 25, 25, 25);
            break;
        case 1 :
            blockWidth  = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition, yPosition + 50, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            break;
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            ctx.fillRect(xPosition, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 50, yPosition, 25, 25);
            break;
        case 3 :
            blockWidth  = 50;
            blockHeight = 75;
            ctx.fillRect(xPosition, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 25, 25, 25);
            ctx.fillRect(xPosition + 25, yPosition + 50, 25, 25);
            break;
    }
}
