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

function playGame(maxScore) {

    let playerScore = 0;
    let computerScore = 0;

    while (playerScore < maxScore && computerScore < maxScore) {

        // let playerSelection = prompt('rock, paper or scissors?');
        let computerSelection = getComputerSelection();

        let result = playRound(playerSelection, computerSelection);
        console.log(result[0]);

        playerScore += result[1];
        computerScore += result[2];
    }

    playerScore == maxScore ? console.log('You won the GAME!!') : console.log('You failed! Computer won!');
}

playGame(3);