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
    blockHeight,
    xPosition,
    yPosition,
    rotation,
    pieceArray,
    nextPiece,
    gameBoard;


function initGame() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    drawGameArea();
    drawTopData();
    // Create an array to represent the game board
    gameBoard = new Array()
    for (r=0; r<20; r++) {
        gameBoard[r] = new Array(14);
        for (c=0; c<14; c++) {
            gameBoard[r][c] = 0;

        }
    }
}

function drawGameArea() {
    ctx.clearRect(0, 20, canvas.width, 480);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw area next piece panel
    ctx.fillRect(0, 20, 150, 150);
    // Draw Main game area
    ctx.fillRect(150, 20, 400, 500);
    // Draw Main game area vertical grid
    for (i=150; i<550; i+=25) {
        ctx.beginPath();
        ctx.moveTo(i,20);
        ctx.lineTo(i,520);
        ctx.stroke();
    }

    // Draw Main game area horizontal grid
    for (i=20; i<520; i+=25) {
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

function drawIBlock() {
    if (rotation == 4)
        rotation = 0;
    switch (rotation) {
        case 0:
        case 2:
            blockWidth = 25;
            blockHeight = 100;
            pieceArray = 
                [   
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]
            ];
            break;
        case 1:
        case 3:
            blockWidth = 100;
            blockHeight = 25;
            pieceArray = 
                [   
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    } 
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawOBlock() {
    if (rotation == 4)
        rotation = 0;
    switch (rotation) {
        case 0 :
        case 1 :
        case 2 :
        case 3 :
            blockWidth = 50;
            blockHeight = 50;
            pieceArray = 
                [   
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    } 
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawLBlock() {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#FFA500";
    switch (rotation) {
        case 0 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [3, 0, 0, 0],
                [3, 0, 0, 0],
                [3, 3, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [3, 3, 3, 0],
                [3, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [3, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [0, 0, 3, 0],
                [3, 3, 3, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawJBlock() {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#0000FF";
    switch (rotation) {
        case 0 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [4, 4, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [4, 0, 0, 0],
                [4, 4, 4, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [4, 4, 0, 0],
                [4, 0, 0, 0],
                [4, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [4, 4, 4, 0],
                [0, 0, 4, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawSBlock() {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#00FF00";
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [0, 5, 5, 0],
                [5, 5, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
        case 3 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [5, 0, 0, 0],
                [5, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawZBlock() {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#ff0000";
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [6, 6, 0, 0],
                [0, 6, 6, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
        case 3 :
            blockWidth = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [0, 6, 0, 0],
                [6, 6, 0, 0],
                [6, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function drawTBlock() {
    if (rotation == 4)
        rotation = 0;
    ctx.fillStyle = "#b600b6";
    switch (rotation) {
        case 0 :
            blockWidth  = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [0, 7, 0, 0],
                [7, 7, 7, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth  = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [7, 0, 0, 0],
                [7, 7, 0, 0],
                [7, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth  = 75;
            blockHeight = 50;
            pieceArray = 
                [   
                [7, 7, 7, 0],
                [0, 7, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth  = 50;
            blockHeight = 75;
            pieceArray = 
                [   
                [0, 7, 0, 0],
                [7, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function xGridRefToCoordinate (xGridRef) {
    xCoordinate = 150 + (xGridRef * 25);
    return xCoordinate;
}

function yGridRefToCoordinate (yGridRef) {
    yCoordinate = 20 + (yGridRef * 25);
    return yCoordinate;
}

function copyPieceToBoard(){
    for (i=0; i<4; i++){
        for (j=0; j<4; j++) {
            if (pieceArray[i][j] != 0)
                gameBoard[yPosition+i][xPosition+j] = pieceArray[i][j];

        }
    }
}

function drawTetrominosOnBoard() {
    for (i=0; i<20; i++){
        for (j=0; j<14; j++) {
            if (gameBoard[i][j] != 0) {
                switch (gameBoard[i][j]){
                    case 1: // Cyan (I Block)
                        ctx.fillStyle = "#00FFFF";
                        break;
                    case 2: // Yellow (O Block)
                        ctx.fillStyle = "#FFFF00";
                        break;
                    case 3: // Orange (L Block)
                        ctx.fillStyle = "#FFA500";
                        break;
                    case 4: // Blue (J Block)
                        ctx.fillStyle = "#0000FF";
                        break;
                    case 5: // Green (S Block)
                        ctx.fillStyle = "#00FF00";
                        break;
                    case 6: // Red (Z Block)
                        ctx.fillStyle = "#ff0000";
                        break;
                    case 7: // Pink (T Block)
                        ctx.fillStyle = "#b600b6";
                        break;

                }
                ctx.fillRect(xGridRefToCoordinate(j), yGridRefToCoordinate(i), 25, 25);
            }
        }
    }
}


