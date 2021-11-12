function getComputerSelection() {

    const choices = ['rock', 'paper', 'scissors'];
    let computerChoice = Math.floor(Math.random() * 3); /*get a random number from 0, 1, 2*/

    return (choices[computerChoice]);
}


function playRound(playerSelection, computerSelection) {
    // returns a array with result as text, players score & computers score

    if (playerSelection === computerSelection) {
        return ['You just tied with computer', 0, 0];
    }
    else if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
        (playerSelection == 'paper' && computerSelection == 'rock') ||
        (playerSelection == 'scissors' && computerSelection == 'paper')) {
        return ['You won this round', 1, 0];
    }
    else {
        return ['Computer won this round', 0, 1];
    }
}


function playGame(e) {

    if (playerScore < maxScore && computerScore < maxScore) {
        let computerSelection = getComputerSelection();
        let playerSelection = e.target.alt;

        let result = playRound(playerSelection, computerSelection);
        playerScore += result[1];
        computerScore += result[2];
        roundNumber += 1;
        showRoundNumber();
        greetplayer();
        showChoiceAndRoundWinner(playerSelection, computerSelection, result[0]);
    }

    if (computerScore == 5 || playerScore == 5) {
        disableGame();
        setTimeout(showResults, 500);
        showPlayAgainButton();
    }
}


function setGameStage() {

    const playerName = (() => {
        // immediatly invoked function expression
        const playNameInput = document.querySelector('#playerName');
        return playNameInput.value;
    })();


    showRoundNumber();

    greetplayer(playerName);

    const startScreen = document.querySelector('.player-info');
    startScreen.remove();

    const main = document.querySelector('.main');
    main.classList.add('game-screen-main');

    const gameArea = document.querySelector('.game-area');
    gameArea.style.display = 'flex';
}


function showRoundNumber() {

    const mainHeading = document.querySelector('.game-heading');
    mainHeading.textContent = `Round ${roundNumber}`;
    mainHeading.style.color = 'rgb(215 184 136)';
}


function greetplayer(playerName = '') {

    const greetingPTag = document.querySelector('.player-text').querySelectorAll('p')[0];

    if (roundNumber === 1) {
        greetingPTag.textContent = `time to make your choice ${playerName}!!`;
        document.querySelector('.player-text').querySelectorAll('p')[1].textContent = '';
        document.querySelector('.player-text').querySelectorAll('p')[2].textContent = '';
    }

    else {
        let playerTextDiv = document.querySelector('.player-text');
        greetingPTag.textContent = `your score:${playerScore} \n computer score:${computerScore}`
    }

}

function showResults() {
    playerScore == maxScore ? alert('You won the GAME!!') : alert('You failed! Computer won!');
}


function showChoiceAndRoundWinner(playerChoice, computerChoice, resultText) {

    const choicesPTag = document.querySelector('.player-text').querySelectorAll('p')[1];
    choicesPTag.textContent = `your chose ${playerChoice} & computer chose ${computerChoice}`;

    const roundWinnerPTag = document.querySelector('.player-text').querySelectorAll('p')[2];
    roundWinnerPTag.textContent = resultText;
}


function disableGame() {
    gameChoices.forEach(element => {
        element.removeEventListener('click', playGame);
        element.style.backgroundColor = '#d3c7c7';
    });
}

function showPlayAgainButton() {

    const playAgainDiv = document.querySelector('.play-again');
    playAgainDiv.style.visibility = 'visible';

    const playAgainButton = playAgainDiv.querySelector('button');
    playAgainButton.addEventListener('click', resetGame);
}


function resetGame() {

    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    maxScore = 5;

    showRoundNumber();
    greetplayer();
    enableGame();
}


function enableGame() {

    gameChoices.forEach(element => {
        element.addEventListener('click', playGame);
        element.style.backgroundColor = 'chartreuse'
    });
}

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
let maxScore = 5;

const playGameButton = document.querySelector('#startGameButton');
playGameButton.addEventListener('click', setGameStage);

const gameChoices = Array.from(document.getElementsByClassName('player-area')[0].querySelectorAll('img'));
enableGame();
