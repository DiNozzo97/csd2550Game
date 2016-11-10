// Initialise Global Variables
var canvas,
    paused,
    ctx,
    blockWidth,
    blockHeight,
    prevXPosition,
    prevYPosition,
    prevPieceArray,
    prevRotation,
    xPosition,
    yPosition,
    rotation,
    pieceArray,
    nextPiece,
    currentPiece,
    gameBoard,
    score,
    dropDelay,
    gameOverState;


// Detect Key Presses
$( document ).keydown(function(event) {
    switch (event.which) {
        case 65: // 'A' Key
        case 37: // Left Arrow Key
            // If the 'A' Key or left arrow key are pressed, see if the game is paused or in the gameover state, if it is then ignore the keypress and return.
            if (paused == true || gameOverState == true)
                return;
            // Otherwise store all of the current block's properties to variables, so that they can be cleared later.
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            // Check to see whether the users requested move is valid (will the block collide with the side of the board or another block?), if it isn't then return.
            if (checkLeftCollision() == false) {
                return;
            }
            // At this point, we know that the move is valid. We therefore decrease the xPosition by 1 (moving the block 1 unit to the left)
            xPosition--;
            // Delete the current block from the gameBoard array and then clear/redraw the glaying area background
            clearPiece();
            // set the block variables to the current block
            arrayOfBlockFunctions[currentPiece]();
            // copy the block (in it's new position) to the gameBoard array
            copyPieceToBoard();
            // Draw all of the blocks onto the canvas grid based on the gameBoard array
            drawTetrominosOnBoard();
            break;
        case 87: // 'W' Key
        case 38: // Up Arrow Key
            if (paused == true || gameOverState == true)
                return;
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            clearPiece();
            checkRotationCollision();
            clearPiece();
            arrayOfBlockFunctions[currentPiece]();
            copyPieceToBoard();
            drawTetrominosOnBoard();
            break;
        case 68: // 'D' Key
        case 39: // Right Arrow Key
            if (paused == true || gameOverState == true)
                return;
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            if (checkRightCollision() == false) {
                return;
            }
            xPosition++;
            clearPiece();
            arrayOfBlockFunctions[currentPiece]();
            copyPieceToBoard();
            drawTetrominosOnBoard();

            break;
        case 32: // Space bar Key
            if (gameOverState == true) {
                initGame();
                return;
            }
        case 83: // 'S' Key
        case 40: // Down Arrow Key
            if (paused == true || gameOverState == true)
                return;
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            if (checkYCollision() == false) {
                clearInterval(mainInterval);
                newBlock();
                return;
            }
            yPosition++;
            clearPiece();
            arrayOfBlockFunctions[currentPiece]();
            copyPieceToBoard();
            drawTetrominosOnBoard();
            break;
        case 80: // 'P' Key
        case 27: // Escape Key
            if (gameOverState == true)
                return;
            if (paused == false) 
                pause();
            else 
                resume();
            break;
    }
});


function initGame() {
    if (typeof mainInterval !== 'undefined') {
        clearInterval(mainInterval);
    }
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score = 0;
    gameOverState = false;
    paused = false;
    dropDelay = 500;
    drawTopData();
    // Create an array to represent the game board
    gameBoard = new Array();
    for (var r=0; r<20; r++) {
        gameBoard[r] = new Array();
        for (var c=0; c<14; c++) {
            gameBoard[r][c] = 0;

        }
    }

    nextPieceBoard = new Array();
    for (var r=0; r<4; r++) {
        nextPieceBoard[r] = new Array();
        for (var c=0; c<4; c++) {
            nextPieceBoard[r][c] = 0;

        }
    }

    drawGameArea();
    generateRandomBlock();
    newBlock();
}

function drawGameArea() {
    ctx.clearRect(0, 20, canvas.width, 480);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw area next piece panel
    ctx.fillRect(0, 20, 150, 170);
    ctx.font="15px Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Next Piece:", 5, 35);
    // Draw Main game area
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(150, 20, 400, 500);
    // Draw Main game area vertical grid
    for (var i=150; i<550; i+=25) {
        ctx.beginPath();
        ctx.moveTo(i,20);
        ctx.lineTo(i,520);
        ctx.stroke();
    }

    // Draw Main game area horizontal grid
    for (var i=20; i<520; i+=25) {
        ctx.beginPath();
        ctx.moveTo(150,i);
        ctx.lineTo(550,i);
        ctx.stroke();
    }

    drawTetrominosOnBoard();

}

function drawTopData(){
    ctx.clearRect(0, 0, canvas.width, 20);
    ctx.font="15px Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    if (sessionStorage.signedIn == 'true')
        ctx.fillText("Name: "+sessionStorage.currentFirstName+" "+sessionStorage.currentLastName+"  Your High Score: "+sessionStorage.highScore+"      Score: "+score,5,15);
    else
        ctx.fillText("Please Sign In to save your scores.      Score: "+score,5,15);

}

function drawIBlock() {
    switch (rotation) {
        case 0:
        case 2:
            blockWidth = 1;
            blockHeight = 4;
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
            blockWidth = 4;
            blockHeight = 1;
            pieceArray = 
                [   
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    } 
}

function drawOBlock() {
    switch (rotation) {
        case 0 :
        case 1 :
        case 2 :
        case 3 :
            blockWidth = 2;
            blockHeight = 2;
            pieceArray = 
                [   
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    } 
}

function drawLBlock() {
    switch (rotation) {
        case 0 :
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [3, 0, 0, 0],
                [3, 0, 0, 0],
                [3, 3, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [3, 3, 3, 0],
                [3, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [3, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [0, 0, 3, 0],
                [3, 3, 3, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
}

function drawJBlock() {
    switch (rotation) {
        case 0 :
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [4, 4, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [4, 0, 0, 0],
                [4, 4, 4, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [4, 4, 0, 0],
                [4, 0, 0, 0],
                [4, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [4, 4, 4, 0],
                [0, 0, 4, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
}

function drawSBlock() {
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 3;
            blockHeight = 2;
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
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [5, 0, 0, 0],
                [5, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
}

function drawZBlock() {
    switch (rotation) {
        case 0 :
        case 2 :
            blockWidth  = 3;
            blockHeight = 2;
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
            blockWidth = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [0, 6, 0, 0],
                [6, 6, 0, 0],
                [6, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
}

function drawTBlock() {
    switch (rotation) {
        case 0 :
            blockWidth  = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [0, 7, 0, 0],
                [7, 7, 7, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 1 :
            blockWidth  = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [7, 0, 0, 0],
                [7, 7, 0, 0],
                [7, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 2 :
            blockWidth  = 3;
            blockHeight = 2;
            pieceArray = 
                [   
                [7, 7, 7, 0],
                [0, 7, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 3 :
            blockWidth  = 2;
            blockHeight = 3;
            pieceArray = 
                [   
                [0, 7, 0, 0],
                [7, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
    }
}

function xGridRefToGameBoardCoordinate (xGridRef) {
    xCoordinate = 150 + (xGridRef * 25);
    return xCoordinate;
}

function yGridRefToGameBoardCoordinate (yGridRef) {
    yCoordinate = 20 + (yGridRef * 25);
    return yCoordinate;
}

function xGridRefToNextPieceCoordinate (xGridRef) {
    xCoordinate = 35 + (xGridRef * 30);
    return xCoordinate;
}

function yGridRefToNextPieceCoordinate (yGridRef) {
    yCoordinate = 60 + (yGridRef * 30);
    return yCoordinate;
}

function copyPieceToBoard(){
    for (var i=0; i<pieceArray.length; i++){
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0)
                gameBoard[yPosition+i][xPosition+j] = pieceArray[i][j];

        }
    }
}

function copyPieceToNextPiece(){
    nextPieceBoard = pieceArray;
}


function drawTetrominosOnBoard() {
    for (var i=0; i<20; i++){
        for (var j=0; j<14; j++) {
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
                ctx.fillRect(xGridRefToGameBoardCoordinate(j), yGridRefToGameBoardCoordinate(i), 25, 25);
                ctx.strokeRect(xGridRefToGameBoardCoordinate(j),yGridRefToGameBoardCoordinate(i),25,25);
            }
        }
    }

    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++) {
            if (nextPieceBoard[i][j] != 0) {

                switch (nextPieceBoard[i][j]){
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
                ctx.fillRect(xGridRefToNextPieceCoordinate(j), yGridRefToNextPieceCoordinate(i), 30, 30);
                ctx.strokeRect(xGridRefToNextPieceCoordinate(j),yGridRefToNextPieceCoordinate(i),30,30);
            }

        }
    }
}

function clearPiece() {
    for (var i=0; i<prevPieceArray.length; i++){
        for (j=0; j<prevPieceArray.length; j++) {
            if (prevPieceArray[i][j] != 0)
                gameBoard[prevYPosition+i][prevXPosition+j] = 0;

        }
    }
    ctx.clearRect(150, 20, 400, 500);
    drawGameArea();
}

function generateRandomBlock() {
    arrayOfBlockFunctions = [
        drawIBlock,
        drawJBlock,
        drawLBlock,
        drawOBlock,
        drawSBlock,
        drawTBlock,
        drawZBlock,
    ];

    nextPiece = Math.floor(Math.random()*arrayOfBlockFunctions.length);
    arrayOfBlockFunctions[nextPiece]();
    copyPieceToNextPiece();
    //    drawNextPieceBoard();
}

function newBlock() {
    xPosition = 7;
    yPosition = 0;
    rotation = 0;
    clearFullLines();
    currentPiece = nextPiece;
    generateRandomBlock();
    arrayOfBlockFunctions[currentPiece]();

    mainInterval =  setInterval(mainLoop, dropDelay);
}

function mainLoop() {
    prevXPosition = xPosition;
    prevYPosition = yPosition;
    prevRotation = rotation;
    prevPieceArray = pieceArray
    if (checkYCollision() == false) {
        clearInterval(mainInterval);
        if (yPosition == 0) {
            gameOver();
            return;
        }
        newBlock();
        return;
    }

    yPosition++;
    clearPiece();
    arrayOfBlockFunctions[currentPiece]();
    copyPieceToBoard();
    drawTetrominosOnBoard();
}

function checkYCollision() {
    bottomEdges = [];
    var tempBottom = [];
    for (var i=0; i<pieceArray.length; i++) {
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[j][i] != 0){
                tempBottom = [yPosition+j,xPosition+i];
            }
        }
        if (bottomEdges[bottomEdges.length-1] != tempBottom)
            bottomEdges.push(tempBottom);
    }
    for (var i=0; i<bottomEdges.length; i++) { // Bottom of the board
        if (bottomEdges[i][0] + 1 > 19) {
            return false;
        }
        else if (gameBoard[bottomEdges[i][0] + 1][bottomEdges[i][1]] != 0) { // Another tile
            return false;
        }
    }
    return true;

}

function checkLeftCollision() {
    leftEdges = [];
    var tempLeft = [];
    for (var i=0; i<pieceArray.length; i++) {
        leftFound = false;
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0 && leftFound == false){
                tempLeft =  [yPosition+i,xPosition+j];
                leftFound = true;
            }
        }
        if (leftEdges[leftEdges.length-1] != tempLeft)
            leftEdges.push(tempLeft);
    }

    for (var i=0; i<leftEdges.length; i++) { // Side of the board
        if (leftEdges[i][1] - 1 < 0) {
            return false;
        }
        else if (gameBoard[leftEdges[i][0]][leftEdges[i][1] - 1 ] != 0) { // Another tile
            return false;
        }
    }
    return true;

}

function checkRightCollision() {
    rightEdges = [];
    var tempRight = [];
    for (var i=0; i<pieceArray.length; i++) {
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0){
                tempRight =  [yPosition+i,xPosition+j];
            }
        }
        if (rightEdges[rightEdges.length-1] != tempRight)
            rightEdges.push(tempRight);
    }

    for (var i=0; i<rightEdges.length; i++) { // Side of the board
        if (rightEdges[i][1] + 1 > 13) {
            return false;
        }
        else if (gameBoard[rightEdges[i][0]][rightEdges[i][1] + 1 ] != 0) { // Another tile
            return false;
        }
    }
    return true;

}

function checkRotationCollision() {
    rotation++;
    if (rotation == 4) {
        rotation = 0;
    }
    arrayOfBlockFunctions[currentPiece]();
    if (xPosition + blockWidth > 14) {
        rotation--;
        return;
    }

    if (yPosition + blockHeight > 20) {
        rotation--;
        return;
    }


    for (var i=0; i<pieceArray.length; i++){
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0) {
                if (gameBoard[yPosition+i][xPosition+j] != 0) {
                    rotation--;
                    return;
                }
            }
        }
    }
}


function clearFullLines() {
    var streakCount = 0;
    for (var i=0; i<gameBoard.length; i++) {
        lineNo = i;
        completeLine = true;
        for (var j=0; j<gameBoard[1].length; j++) {
            if (gameBoard[i][j] == 0){
                completeLine = false;
            }
        }
        if (completeLine == true) {
            tempGameBoard = gameBoard.slice(0);
            for (var k=1; k<=i; k++) {
                gameBoard[k] = tempGameBoard[k-1];
            }
            gameBoard[0] = [];
            for (var l=0; l <= 13; l++) {
                gameBoard[0].push(0);
            }
            drawTetrominosOnBoard();
            score += 10;
            streakCount++;
            dropDelay -= 10;
        }
    }   
    score += (streakCount * 5);
    drawTopData();
}

function gameOver() {
    if (sessionStorage.signedIn == "true") {
        if (sessionStorage.currentPostToScores == "true" && score > 0)
            saveScore(score);
        if (score > sessionStorage.highScore) {
            sessionStorage.highScore = score;
            usersObj = JSON.parse(localStorage.users)
            usersObj[sessionStorage.currentArrayPosition].highScore = score
        }
    }
    gameOverState = true;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font="75px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Game Over",50,canvas.height/2 -30);
    ctx.font="35px Arial";
    ctx.fillText("Score: "+score,190,canvas.height/2 + 10);
    ctx.font="20px Arial";
    ctx.fillText("Press the spacebar to play again",110,canvas.height/2 + 45);

}

function pause() {
    paused = true;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font="30px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Paused",200,canvas.height/2 -30);
    ctx.font="25px Arial";
    ctx.fillText("Press the 'esc' key to resume",90,canvas.height/2 + 10);
    clearInterval(mainInterval);
}

function resume() {
    paused = false;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawTopData();
    drawGameArea();
    drawTetrominosOnBoard();
    mainInterval = setInterval(mainLoop, dropDelay);
}


