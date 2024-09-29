let numPlayers;
let currentPlayerIndex = 0;
let players = [];
let dice = [0, 0, 0, 0, 0];
let roundScores = [];

document.getElementById("startGame").onclick = function() {
    numPlayers = parseInt(document.getElementById("numPlayers").value);
    if (numPlayers < 1 || numPlayers > 4) {
        alert("Please enter a number between 1 and 4");
        return;
    }

    players = Array.from({length: numPlayers}, (_, i) => ({
        name: `Player ${i + 1}`,
        totalScore: 0,
        roundScore: 0
    }));

    roundScores = Array(numPlayers).fill(0);
    document.getElementById("playerSetup").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    updateCurrentPlayer();
};

document.getElementById("rollDice").onclick = function() {
    for (let i = 0; i < dice.length; i++) {
        dice[i] = Math.floor(Math.random() * 6) + 1; // Roll dice (1-6)
    }
    displayDice();
};

document.getElementById("nextPlayer").onclick = function() {
    recordScore();
    currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
    updateCurrentPlayer();
};

document.getElementById("finishGame").onclick = function() {
    recordScore();
    let winner = players.reduce((prev, curr) => (prev.totalScore > curr.totalScore) ? prev : curr);
    displayFinalScores();
    alert(`The winner is ${winner.name} with a total score of ${winner.totalScore}!`);
    resetGame();
};

document.getElementById("resetGame").onclick = function() {
    resetGame();
};

function displayDice() {
    const diceContainer = document.getElementById("diceContainer");
    diceContainer.innerHTML = "";
    dice.forEach(value => {
        const diceElement = document.createElement("div");
        diceElement.className = "dice";
        diceElement.textContent = value;
        diceContainer.appendChild(diceElement);
    });
}

function recordScore() {
    let roundScore = dice.reduce((a, b) => a + b, 0);
    players[currentPlayerIndex].roundScore = roundScore;
    players[currentPlayerIndex].totalScore += roundScore;
    roundScores[currentPlayerIndex] = roundScore;

    document.getElementById("scoreBoard").innerHTML = players.map(player => 
        `${player.name}: Total - ${player.totalScore}, Round - ${player.roundScore}`
    ).join("<br>");
}

function updateCurrentPlayer() {
    document.getElementById("currentPlayer").textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    document.getElementById("nextPlayer").style.display = currentPlayerIndex < numPlayers - 1 ? "block" : "none";
    document.getElementById("finishGame").style.display = currentPlayerIndex === numPlayers - 1 ? "block" : "none";
    document.getElementById("resetGame").style.display = "block";
}

function displayFinalScores() {
    let finalScores = players.map(player => 
        `${player.name}: Total Score - ${player.totalScore}`
    ).join("\n");
    alert(`Final Scores:\n${finalScores}`);
}

function resetGame() {
    document.getElementById("playerSetup").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
    currentPlayerIndex = 0;
    players = [];
    dice = [0, 0, 0, 0, 0];
    roundScores = [];
}
