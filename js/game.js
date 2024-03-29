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
    gameOverState,
    sidebarLogo;


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
            // Delete the current block from the gameBoard array and then clear/redraw the playing area background
            clearPiece();
            // get the block variables to the current block
            arrayOfBlockFunctions[currentPiece]();
            // copy the block (in its new position) to the gameBoard array
            copyPieceToBoard();
            // Draw all of the blocks onto the canvas grid based on the gameBoard array
            drawTetrominosOnBoard();
            break;
        case 87: // 'W' Key
        case 38: // Up Arrow Key
            // If the 'W' Key or Up arrow key are pressed, see if the game is paused or in the gameover state, if it is then ignore the keypress and return.
            if (paused == true || gameOverState == true)
                return;
            // Otherwise store all of the current block's properties to variables, so that they can be cleared later.
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            // Clear the existing piece from the gameBoard array (so that the new rotation can be tested)
            clearPiece();
            // Check whether the piece would be valid if rotated 90 degrees to the right (if so then rotate, otherwise leave as if)
            checkRotationCollision();
            //            clearPiece();
            // get the block variables to the current block in its correct rotation (whether new or existing)
            arrayOfBlockFunctions[currentPiece]();
            // copy the block (in it's new position) to the gameBoard array
            copyPieceToBoard();
            // Draw all of the blocks onto the canvas grid based on the gameBoard array
            drawTetrominosOnBoard();
            break;
        case 68: // 'D' Key
        case 39: // Right Arrow Key
            // If the 'D' Key or Right arrow key are pressed, see if the game is paused or in the gameover state, if it is then ignore the keypress and return.
            if (paused == true || gameOverState == true)
                return;
            // Otherwise store all of the current block's properties to variables, so that they can be cleared later.
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            // Check to see whether the users requested move is valid (will the block collide with the side of the board or another block?), if it isn't then return.
            if (checkRightCollision() == false) {
                return;
            }
            // At this point, we know that the move is valid. We therefore increase the xPosition by 1 (moving the block 1 unit to the right)
            xPosition++;
            // Delete the current block from the gameBoard array and then clear/redraw the playing area background
            clearPiece();
            // get the block variables to the current block
            arrayOfBlockFunctions[currentPiece]();
            // copy the block (in its new position) to the gameBoard array
            copyPieceToBoard();
            // Draw all of the blocks onto the canvas grid based on the gameBoard array
            drawTetrominosOnBoard();

            break;
        case 32: // Space bar Key
            // if the game is in the game over state and the user presses the space bar, then start a new game and return
            if (gameOverState == true) {
                initGame();
                return;
            }
        case 83: // 'S' Key
        case 40: // Down Arrow Key
            // If the 'S' Key, down arrow key, or space bar (when not in game over state) are pressed, see if the game is paused or in the gameover state, if it is then ignore the keypress and return.
            if (paused == true || gameOverState == true)
                return;
            // Otherwise store all of the current block's properties to variables, so that they can be cleared later.
            prevXPosition = xPosition;
            prevYPosition = yPosition;
            prevPieceArray = pieceArray;
            prevRotation = rotation;
            // Check to see whether the users requested move is valid (has the block already landed on the bottom of the board or on another block?), if it isn't then return
            if (checkYCollision() == false) {
                clearInterval(mainInterval);
                newBlock();
                return;
            }
            // At this point, we know that the move is valid. We therefore increase the yPosition by 1 (moving the block 1 unit down)
            yPosition++;
            // Delete the current block from the gameBoard array and then clear/redraw the playing area background
            clearPiece();
            // get the block variables to the current block
            arrayOfBlockFunctions[currentPiece]();
            // copy the block (in its new position) to the gameBoard array
            copyPieceToBoard();
            // Draw all of the blocks onto the canvas grid based on the gameBoard array
            drawTetrominosOnBoard();
            break;
        case 27: // Escape Key
            // If the 'ESC' Key is pressed, check to see if it is currently game over, if it is then return
            if (gameOverState == true)
                return;
            // Check to see whether the game is paused. if it isn't, then pause the game, otherwise resume it
            if (paused == false) 
                pause();
            else 
                resume();
            break;
    }
});

// The 'initGame' function is used to set default variables, and prepare/start a new game
function initGame() {
    // If the previous game loop is still defined (and therefore running) then stop it
    if (typeof mainInterval !== 'undefined') {
        clearInterval(mainInterval);
    }
    // Create a variable to communicate with the HTML canvas
    canvas = document.getElementById("mainCanvas");
    // Create a variable to access the 2D drawing methods/properties
    ctx = canvas.getContext("2d");
    // Load the sidebar logo image (so that it can be drawn to the canvas)
    sidebarLogo = new Image();
    sidebarLogo.onload = function () {}
    sidebarLogo.src = "img/sidebarLogo.png";
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Set default variables
    score = 0;
    gameOverState = false;
    paused = false;
    dropDelay = 500;
    // Draw the Top Data (name/score)
    drawTopData();
    // Create an array to represent the game board
    gameBoard = new Array();
    // Create 20 elements in the gameBoard array (to represent rows) and within each element, create an array with 14 elements (to represent columns) and then initialise them all to 0
    for (var r=0; r<20; r++) {
        gameBoard[r] = new Array();
        for (var c=0; c<14; c++) {
            gameBoard[r][c] = 0;

        }
    }
    // Create an array to represent the next piece preview area of the game
    nextPieceBoard = new Array();
    // Create 4 elements in the nextPieceBoard array (to represent rows) and within each element, create an array with 4 elements (to represent columns) and initialise them all to 0
    for (var r=0; r<4; r++) {
        nextPieceBoard[r] = new Array();
        for (var c=0; c<4; c++) {
            nextPieceBoard[r][c] = 0;

        }
    }
    // Draw the game area (main game board and next block area) on to the canvas
    drawGameArea();
    // Generate a random block to be the first 'next block'
    generateRandomBlock();
    // use the initial 'next block' as the first actual block and randomly generate a new 'next block'
    newBlock();
}

// The 'drawGameArea' function clears the game area and redraws it.
function drawGameArea() {
    // Clear the canvas below the 'Top Data Bar'
    ctx.clearRect(0, 20, canvas.width, 480);
    // Set the fill colour to black with 50% ocpacity
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw a rectangle for the next piece area
    ctx.fillRect(0, 20, 150, 170);
    // Set the font for text
    ctx.font="15px Arial";
    // set the colour of the text to pure black
    ctx.fillStyle = "rgb(0,0,0)";
    // Draw the text 'Next Piece' in the next piece box 
    ctx.fillText("Next Piece:", 5, 35);
    // Set the fill colour to black with 50% ocpacity
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Draw a rectangle for the main game area
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

    // Draw Sidebar Logo
    ctx.drawImage(sidebarLogo, 0, 190);

    // draw any blocks that exist on to the main game area
    drawTetrominosOnBoard();

}
// The 'drawTopData' function is used to draw the data bar (name/score etc.) at the top of the canvas
function drawTopData(){
    // Clear the data bar
    ctx.clearRect(0, 0, canvas.width, 20);
    // Set the font
    ctx.font="15px Arial";
    // Set the text colour to black
    ctx.fillStyle = "rgb(0,0,0)";
    // If the user is signed in, display their name/personal highscore/current score. Otherwise tell the user their score won't be saved and display their score.
    if (sessionStorage.signedIn == 'true')
        ctx.fillText("Name: "+sessionStorage.currentFirstName+" "+sessionStorage.currentLastName+"  Your High Score: "+sessionStorage.highScore+"      Score: "+score,5,15);
    else
        ctx.fillText("Please Sign In to save your scores.      Score: "+score,5,15);

}

// The 'get..Block' functions are used to get the properties such as layout (with each number denoting a color), width and height of a given block in a given rotation
function getIBlock() {
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

function getOBlock() {
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

function getLBlock() {
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

function getJBlock() {
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

function getSBlock() {
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

function getZBlock() {
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

function getTBlock() {
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

// The 'xGridRefToGameBoardCoordinate' function will take a main board area x grid reference and will return the corresponding canvas x co-ordinate
function xGridRefToGameBoardCoordinate (xGridRef) {
    xCoordinate = 150 + (xGridRef * 25);
    return xCoordinate;
}

// The 'yGridRefToGameBoardCoordinate' function will take a main board area y grid reference and will return the corresponding canvas y co-ordinate
function yGridRefToGameBoardCoordinate (yGridRef) {
    yCoordinate = 20 + (yGridRef * 25);
    return yCoordinate;
}

// The 'xGridRefToNextPieceCoordinate' function will take a next piece area x grid reference and will return the corresponding canvas x co-ordinate
function xGridRefToNextPieceCoordinate (xGridRef) {
    xCoordinate = 35 + (xGridRef * 30);
    return xCoordinate;
}

// The 'yGridRefToNextPieceCoordinate' function will take a next piece area y grid reference and will return the corresponding canvas y co-ordinate
function yGridRefToNextPieceCoordinate (yGridRef) {
    yCoordinate = 60 + (yGridRef * 30);
    return yCoordinate;
}

// The 'copyPieceToBoard' function copies every ocupied square of a block in to the 'gameBoard' array at the currently set X/Y Positions
function copyPieceToBoard(){
    for (var i=0; i<pieceArray.length; i++){
        for (var j=0; j<pieceArray[0].length; j++) {
            if (pieceArray[i][j] != 0)
                gameBoard[yPosition+i][xPosition+j] = pieceArray[i][j];

        }
    }
}

// The 'drawTetrominosOnBoard' function loops through the 'gameBoard' and 'nextPieceBoard' arrays and draws any non 0 values on to the relevant board in the form of squares, with black borders in the colour represented by the number in the array, on to the canvas
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

    for (var i=0; i<nextPieceBoard.length; i++){
        for (var j=0; j<nextPieceBoard[0].length; j++) {
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

// The 'clearPiece' function will delete the second most recently block from the 'gameBoard' array by substituting it's pattern with 0s, and then clears the canvas below the top data bar and draws a blank game area
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

// The 'generateRandomBlock' function selects a random block, stores its reference, gets its properties and sets the 'nextPieceBoard' to the selected block
function generateRandomBlock() {
    arrayOfBlockFunctions = [
        getIBlock,
        getJBlock,
        getLBlock,
        getOBlock,
        getSBlock,
        getTBlock,
        getZBlock,
    ];

    nextPiece = Math.floor(Math.random()*arrayOfBlockFunctions.length);
    arrayOfBlockFunctions[nextPiece]();
    nextPieceBoard = pieceArray;
}

// The 'newBlock' function resets the X/Y positions and rotation variables back to default, clears any full lines in the game, generates a new random next piece and gets the properties of the new current piece (previously the next piece). It then starts the main drop interval which occurs at an interval
function newBlock() {
    xPosition = 7;
    yPosition = 0;
    rotation = 0;
    clearFullLines();
    currentPiece = nextPiece;
    generateRandomBlock();
    arrayOfBlockFunctions[currentPiece]();

    mainInterval =  setInterval(dropBlock, dropDelay);
}

// The 'dropBlock' function is used to drop the block by 1 unit each time it is called, using an interval
function dropBlock() {
    // Store the current position/block settings
    prevXPosition = xPosition;
    prevYPosition = yPosition;
    prevRotation = rotation;
    prevPieceArray = pieceArray
    // Check to see if there would be a collision if the block moved down 1 unit
    if (checkYCollision() == false) {
        // if there is then stop the interval calls to 'dropBlock'
        clearInterval(mainInterval);
        // and check to see if the collision is at the top of the board then call 'gameOver' and return
        if (yPosition == 0) {
            gameOver();
            return;
        }
        // if there is a collision but not at the top of the board, then generate a 'newBlock'
        newBlock();
        return;
    }
    // if there is no collision, increment the Y position by 1
    yPosition++;
    // clear the block from its previous position in the 'gameBoard' array and clear the game area
    clearPiece();
    // get the properties of the current block
    arrayOfBlockFunctions[currentPiece]();
    // Copy the block to the 'gameBoard' array in its new position
    copyPieceToBoard();
    // draw all of the blocks on to the game area, acording to the 'gameBoard' array
    drawTetrominosOnBoard();
}

// The 'checkYCollision' function checks to see whether it is valid for the current block to move down on the board
function checkYCollision() {
    // Set variables
    var bottomEdges = [];
    var tempBottom = [];
    for (var i=0; i<pieceArray.length; i++) { // for each column
        for (var j=0; j<pieceArray.length; j++) { // for each row
            if (pieceArray[j][i] != 0){ // if the value is not a 0
                tempBottom = [yPosition+j,xPosition+i]; // set tempBottom to its current grid reference
            }
        } // after each column
        if (bottomEdges[bottomEdges.length-1] != tempBottom) // if the last grid reference hasn't already been added to bottomEdges
            bottomEdges.push(tempBottom); // then add it to the array
    }
    for (var i=0; i<bottomEdges.length; i++) { // For each bottom edge
        if (bottomEdges[i][0] + 1 > 19) { // if adding 1 to the y value brings it over 19 (the height of the board)
            return false; // then return false
        }
        else if (gameBoard[bottomEdges[i][0] + 1][bottomEdges[i][1]] != 0) { // Otherwise, if moving down collides with another block (non 0 value)
            return false; // then return false
        }
    }
    return true; // Otherwise, if the checks have all passed, then return true

}

// The 'checkLeftCollision' function checks to see whether it is valid for the current block to move left on the board
function checkLeftCollision() {
    // Set variables
    var leftEdges = [];
    var tempLeft;
    for (var i=0; i<pieceArray.length; i++) { // For each row of pieceArray
        var leftFound = false; // Set leftFound as false
        for (var j=0; j<pieceArray.length; j++) { // for each column
            if (pieceArray[i][j] != 0 && leftFound == false){ // if there is a non 0 value (a part of the block) and left hasn't been found
                tempLeft =  [yPosition+i,xPosition+j]; // Store the position as 'tempLeft'
                leftFound = true; // Set leftFound to true
            }
        } // After each row
        if (leftEdges[leftEdges.length-1] != tempLeft) // if the last grid reference hasn't already been added to leftEdges
            leftEdges.push(tempLeft); // add 'tempLeft' to 'leftEdges'
    }

    for (var i=0; i<leftEdges.length; i++) { // for each leftEdge
        if (leftEdges[i][1] - 1 < 0) { // if decreasing the x value by 1 makes it less than 0 (It will move off the board)
            return false; // then eturn false
        }
        else if (gameBoard[leftEdges[i][0]][leftEdges[i][1] - 1 ] != 0) { // Otherwise, if decreasing the x value by 1 is already occupied by another block
            // (non 0 number)
            return false; // then return false
        }
    }
    return true; // Otherwise, it has passed the check and returns true

}

// The 'checkRightCollision' function checks to see whether it is valid for the current block to move right on the board 
function checkRightCollision() {
    // Set variables
    var rightEdges = [];
    var tempRight = [];
    for (var i=0; i<pieceArray.length; i++) { // For each row of pieceArray
        for (var j=0; j<pieceArray.length; j++) { // for each column
            if (pieceArray[i][j] != 0){ // If there is a non 0 value
                tempRight =  [yPosition+i,xPosition+j]; // Svae it as the tempRight edge
            }
        }
        if (rightEdges[rightEdges.length-1] != tempRight) // If the right edge of the row hasn't already been added to 'rightEdges'
            rightEdges.push(tempRight); // then push the 'tempRight' (right most piece of a row) to rightEdges
    }

    for (var i=0; i<rightEdges.length; i++) { // for each position in 'rightEdges'
        if (rightEdges[i][1] + 1 > 13) { // check to see whether if we were to move each right most edge to the right by 1, it's xPosition is greater than 13 (edge of the board)
            return false; // If so, then return false
        }
        else if (gameBoard[rightEdges[i][0]][rightEdges[i][1] + 1 ] != 0) { // check to see whether if we were to move each right most edge to the right by 1, it would collide with any tiles (non 0 values) that already reside in the array
            return false; // If so, then return false
        }
    }
    return true; // Otherwise if the move is valid then return true

}

// The 'checkRotationCollision' function is used to test whether it would be a valid move for the current piece to rotate 90 degrees to the right
function checkRotationCollision() {
    rotation++; // Increase the rotation value by 1 (so it is now the value to be tested)
    if (rotation == 4) { // If the rotation value is 4 i.e. a 360 degree rotation of the original block
        rotation = 0; // Then set rotation to 0
    }
    arrayOfBlockFunctions[currentPiece](); // get the block properties of the new rotation
    if (xPosition + blockWidth > 14) { // if the current x position + the width of the block is more than 14 (off the bozrd)
        rotation--; // Then put the block back to it's original rotation
        return; // and return
    }

    if (yPosition + blockHeight > 20) { // if the block height + y position is greater than 20 (height of the board)
        rotation--; // Then put the block back to it's original rotation
        return; // and return
    }


    for (var i=0; i<pieceArray.length; i++){ // for each row in 'pieceArray'
        for (var j=0; j<pieceArray.length; j++) { // for each column
            if (pieceArray[i][j] != 0) { // if the value is a part of the block (non 0 element)
                if (gameBoard[yPosition+i][xPosition+j] != 0) { // If it would collide with an existing block when rotated
                    rotation--; // Revert the block to it's original rotation
                    return; // return
                }
            }
        }
    }

    if (checkYCollision() == false) { // If when the line moves down there will be a collision
        rotation--;  // Revert the block to it's original rotation
        return; // return
    }
}

// The 'clearFullLines' function is used to clear any complete lines from the board and increase score accordingly
function clearFullLines() {
    var streakCount = 0; // Variable used to store the streak (number of lines completed in 1 move)
    for (var i=0; i<gameBoard.length; i++) { // For each row of the 'gameBoard'
        completeLine = true; // default to complete line
        for (var j=0; j<gameBoard[1].length; j++) { // For each column
            if (gameBoard[i][j] == 0){ // if there is a 0
                completeLine = false; // Then is is not a complete line and completeLine is set to false
            }
        }
        if (completeLine == true) { // If the line is a complete line
            tempGameBoard = gameBoard.slice(0); // Copy the gameBoard to a new variable
            for (var k=1; k<=i; k++) { // For each row up to the completed line
                gameBoard[k] = tempGameBoard[k-1]; // Shift the line down by 1 row
            }
            gameBoard[0] = []; // prepare the new top line
            for (var l=0; l <= 13; l++) { // For each column
                gameBoard[0].push(0); // Fill with a 0
            }
            drawTetrominosOnBoard(); // Redraw the Blocks, in order to show the new block layout
            score += 10; // Add 10 to the users current score
            streakCount++; // Increment the 'streakCount'
            dropDelay -= 10; // Increase the speed of the blocks dropping, by 10 ms
        }
    }   
    if (streakCount > 1) // if the 'streakCount' is more than 1
        score += (streakCount * 5); // Add an additional bonus to the score of 5 times streakCount
    drawTopData(); // Redraw the top row data (In order to update the score displayed to the user)
}

// The function 'gameOver' is called when the user looses the game
function gameOver() {
    if (sessionStorage.signedIn == "true") { // If there is currently a user signed in
        if (sessionStorage.currentPostToScores == "true" && score > 0) // if the user has selected too post scores and there is a score greater than 0
            saveScore(score); // Save the users score to the HighScore table
        if (score > sessionStorage.highScore) { // If the user has set a new personal high score
            sessionStorage.highScore = score; // set the session variable: highScore to the new score
            usersObj = JSON.parse(localStorage.users); //Parse the 'users' JSON string into a Javascript Object
            usersObj[sessionStorage.currentArrayPosition].highScore = score; // Change the current users high score in tbe Javascript Object
            localStorage.users = JSON.stringify(usersObj); // Convert the Javascript object bsck to JSON and save in local storage
        }
    }
    gameOverState = true; // Set the gameOver state to true
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Set the colour (for the next item drawn) to black at 80% opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw a rectangle over the entire canvas

    ctx.font="75px Arial"; // Set the font
    ctx.fillStyle = "rgb(255,255,255)"; // Set the colour to white
    ctx.fillText("Game Over",50,canvas.height/2 -30); // Draw the words game over in the centre of the screen
    ctx.font="35px Arial"; // Set the font (smaller)
    ctx.fillText("Score: "+score,190,canvas.height/2 + 10); // Write the users score on the screen
    ctx.font="20px Arial";  // Set the font (smaller)
    ctx.fillText("Press the spacebar to play again",110,canvas.height/2 + 45); // Write the instructions for the user to use the spacebar to restart the game

}

// The 'pause' function is used to pause the game
function pause() {
    paused = true; // Set paused to true
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Set the colour to black at 80% opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw a rectanglw over the entire screen
    ctx.font="30px Arial"; // Set the font
    ctx.fillStyle = "rgb(255,255,255)"; // Set the colour to white
    ctx.fillText("Paused",200,canvas.height/2 -30); // Draw the word 'paused' to the canvas
    ctx.font="25px Arial"; // Set the font (smaller)
    ctx.fillText("Press the 'esc' key to resume",90,canvas.height/2 + 10); // Write the instructions for the user to use the 'esc' key to resume the game
    clearInterval(mainInterval); // Stop the main game loop from automatically dropping the block
}

// The 'resume' function is used to resume the game after it has been paused
function resume() {
    paused = false; // Set paused to true
    ctx.clearRect(0,0,canvas.width, canvas.height); // Clear the entire canvas
    drawTopData(); // Redraw the top data bar
    drawGameArea(); // Redraw the game board/blocks
    mainInterval = setInterval(dropBlock, dropDelay); // restart the main game loop, automatically dropping the block
}


