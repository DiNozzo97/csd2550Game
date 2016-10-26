var canvas,
    ctx,
    xPosition = 150,
    yPosition = 0;


function initGame() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, 150, 150);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(150, 0, 400, 500);
//    return setInterval(draw, 10);
}

//function moveDown {
//    
//}


//function draw() {
    //    var canvas = document.getElementById("mainCanvas");
    //    if (canvas.getContext) {
    //        var ctx = canvas.getContext("2d");
    //
    //        ctx.fillStyle = "rgb(255,255,255)";
    //        ctx.fillRect(0, 0, 150, 150);
    //
    //        ctx.fillStyle = "rgb(255,255,255)";
    //        ctx.fillRect(150, 0, 400, 500);
    //
    //    }
//}