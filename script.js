var rows = 5;
var columns = 5;
var currTile;
var otherTile;
var turns = 0;


const winSound = new Audio('./sounds/win.mp3');
const moveSound = new Audio('./sounds/move.mp3');
const startTime = new Date();


function createConfetti() {
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
        document.body.appendChild(confetti);
        

        setTimeout(() => confetti.remove(), 5000);
    }
}


function checkWin() {
    const board = document.getElementById('board');
    const pieces = Array.from(board.children);
    
    for (let i = 0; i < pieces.length; i++) {
        const currentPiece = pieces[i].src.split('/').pop();
        const correctPiece = `${i + 1}.jpg`;
        if (currentPiece !== correctPiece) {
            return false;
        }
    }
    return true;
}


function celebrateWin() {
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    

    winSound.play();
    

    const modal = document.createElement('div');
    modal.className = 'win-modal';
    modal.innerHTML = `
        <div class="win-content">
            <h1>🎉 Congratulations! 🎉</h1>
            <p>You solved the puzzle in ${turns} turns!</p>
            <p>Time taken: ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s</p>
            <button onclick="location.reload()">Play Again</button>
        </div>
    `;
    document.body.appendChild(modal);
    

    createConfetti();
}

window.onload = function() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";
            

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            
            document.getElementById("board").append(tile);
        }
    }


    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    

    pieces.sort(() => Math.random() - 0.5);

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";
        

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);
        
        document.getElementById("pieces").append(tile);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    

    moveSound.play();


    if (checkWin()) {
        setTimeout(celebrateWin, 500);
    }
}

console.log("Enhanced background with multiple shapes initialized!");

