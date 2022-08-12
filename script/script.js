const newGame = document.querySelector(".new"),
    section1 = document.querySelector(".left"),
    section2 = document.querySelector(".right"),
    diceRoll = document.querySelector(".roll"),
    hold = document.querySelector(".hold"),
    total_1 = document.querySelector(".total-player-1"),
    total_2 = document.querySelector(".total-player-2"),
    current_1 = document.querySelector(".current-player-1"),
    current_2 = document.querySelector(".current-player-2"),
    player_1 = document.querySelector(".player-1"),
    player_2 = document.querySelector(".player-2"),
    diceImg = document.querySelector("img"),
    winnerSound = new Audio("../assets/Windows_98_Tada.mp3");

let totalCounterOne = 0,
    totalCounterTwo = 0,
    currentCounter = 0,
    gameEnd = false,
    playerOnePrompt = prompt("Enter First Player Name...", "Okba"),
    playerTwoPrompt = prompt("Enter Second Player Name...", "Youcef");

winnerSound.volume = 1;

diceImg.style.display = "none";

function checkPrompt() {
    if ((playerOnePrompt) && (playerTwoPrompt)) {
        player_1.textContent = playerOnePrompt;
        player_2.textContent = playerTwoPrompt;
    } else {
        player_1.textContent = "PLAYER 1";
        player_2.textContent = "PLAYER 2";
    }
}

function getRandomValue() {
    let randomValue = Math.floor(Math.random() * 6 + 1);
    return randomValue;
};

function toggleActivePlayer() {
    section1.classList.toggle("active");
    section2.classList.toggle("active");
};

function removeWinner() {
    section1.classList.remove("winner");
    section2.classList.remove("winner");
};

function restartGame() {
    diceImg.style.display = "none";
    section1.classList.add("active");
    section2.classList.remove("active");
    removeWinner();
    playerOnePrompt = prompt("Enter First Player Name...", "Okba");
    playerTwoPrompt = prompt("Enter Second Player Name...", "Youcef");
    checkPrompt();
    totalCounterOne = totalCounterTwo = currentCounter = current_1.textContent = current_2.textContent = total_1.textContent = total_2.textContent = 0;
    gameEnd = false;
}

checkPrompt();

diceRoll.addEventListener("click", () => {
    if (gameEnd) {
        restartGame()
    };
    let randomValue = getRandomValue();
    diceImg.style.display = "flex";
    diceImg.setAttribute("src", `images/dice-${randomValue}.png`);
    currentCounter += randomValue;
    if (randomValue == 1) {
        currentCounter = 0;
        current_1.textContent = current_2.textContent = currentCounter;
        if (section1.classList.contains("active")) {
            toggleActivePlayer();
        } else {
            toggleActivePlayer();
        }
    }
    if (section1.classList.contains("active")) {
        current_1.textContent = currentCounter;
    } else {
        current_2.textContent = currentCounter;
    }
});

hold.addEventListener("click", () => {
    if (gameEnd) {
        restartGame()
    };
    if (section1.classList.contains("active")) {
        totalCounterOne += currentCounter;
        total_1.textContent = totalCounterOne;
    } else {
        totalCounterTwo += currentCounter;
        total_2.textContent = totalCounterTwo;
    };
    if (totalCounterOne >= 100) {
        section1.classList.add("winner");
        gameEnd = true;
        winnerSound.play();
    };
    if (totalCounterTwo >= 100) {
        section2.classList.add("winner");
        gameEnd = true;
        winnerSound.play();
    };
    toggleActivePlayer();
    current_1.textContent = current_2.textContent = currentCounter = 0;
});


newGame.addEventListener("click", restartGame);
