var canvas,
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
    gameBoard,
    score,
    dropDelay,
    gameOverState;

// Detect Key Presses
$( document ).keydown(function(event) {
    switch (event.which) {
        case 37: // Left Arrow Key
            console.log("Left Arrow");
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            if (checkLeftCollision() == false) {
                return;
            }
            xPosition--;
            clearPiece();
            arrayOfBlockFunctions[blockRef]();
            copyPieceToBoard();
            drawTetrominosOnBoard();
            break;
        case 38: // Up Arrow Key
            console.log("Up Arrow");
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            clearPiece();
            checkRotationCollision();
            clearPiece();
            arrayOfBlockFunctions[blockRef]();
            copyPieceToBoard();
            drawTetrominosOnBoard();
            break;
        case 39: // Right Arrow Key
            console.log("Right Arrow");
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            if (checkRightCollision() == false) {
                return;
            }
            xPosition++;
            clearPiece();
            arrayOfBlockFunctions[blockRef]();
            copyPieceToBoard();
            drawTetrominosOnBoard();

            break;
        case 32: // Space bar Key
            if (gameOverState == true) {
                initGame();
                return;
            }
        case 40: // Down Arrow Key
            console.log("Down Arrow Or SpaceBar");
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            if (checkYCollision() == false) {
                clearInterval(mainInterval);
                testAnimate();
                return;
            }
            yPosition++;
            clearPiece();
            arrayOfBlockFunctions[blockRef]();
            copyPieceToBoard();
            drawTetrominosOnBoard();
            break;
    }
});


function initGame() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score = 0;
    gameOverState = false;
    dropDelay = 500;
    drawTopData();
    // Create an array to represent the game board
    gameBoard = new Array()
    for (var r=0; r<20; r++) {
        gameBoard[r] = new Array(14);
        for (var c=0; c<14; c++) {
            gameBoard[r][c] = 0;

        }
    }
    drawGameArea();
    testAnimate();
}

function drawGameArea() {
    ctx.clearRect(0, 20, canvas.width, 480);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw area next piece panel
    ctx.fillRect(0, 20, 150, 150);
    // Draw Main game area
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    //    copyPieceToBoard();
    //    drawTetrominosOnBoard();
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
    for (var i=0; i<pieceArray.length; i++){
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0)
                gameBoard[yPosition+i][xPosition+j] = pieceArray[i][j];

        }
    }
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
                ctx.fillRect(xGridRefToCoordinate(j), yGridRefToCoordinate(i), 25, 25);
                ctx.strokeRect(xGridRefToCoordinate(j),yGridRefToCoordinate(i),25,25);
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

    blockRef = Math.floor(Math.random()*arrayOfBlockFunctions.length);
    arrayOfBlockFunctions[blockRef]();
    copyPieceToBoard();
}

function testAnimate() {
    xPosition = 7;
    yPosition = 0;
    rotation = 0;
    clearFullLines();
    generateRandomBlock();

    mainInterval =  setInterval(testLoop, dropDelay);
}

function testLoop() {
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
        testAnimate();
        return;
    }

    yPosition++;
    clearPiece();
    arrayOfBlockFunctions[blockRef]();
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
            console.log("Side of Board");
            return false;
        }
        else if (gameBoard[leftEdges[i][0]][leftEdges[i][1] - 1 ] != 0) { // Another tile
            console.log("Another Tile");
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
            console.log("Side of Board");
            return false;
        }
        else if (gameBoard[rightEdges[i][0]][rightEdges[i][1] + 1 ] != 0) { // Another tile
            console.log("Another Tile");
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
    arrayOfBlockFunctions[blockRef]();
    if (xPosition + blockWidth > 14) {
        console.log("Rotation Collision with side");
        rotation--;
        return;
    }
    
    if (yPosition + blockHeight > 20) {
        console.log("Rotation Collision with bottom");
        rotation--;
        return;
    }
    
    
    for (var i=0; i<pieceArray.length; i++){
        for (var j=0; j<pieceArray.length; j++) {
            if (pieceArray[i][j] != 0) {
                if (gameBoard[yPosition+i][xPosition+j] != 0) {
                    console.log("Rotation Collision with tile");
                    rotation--;
                    return;
                }
            }
        }
    }
}


function clearFullLines() {
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
            dropDelay -= 10;
            drawTopData();
        }
    }
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


