const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pickWord = function() {
    const words = [
        'bear',
        'wolf',
        'tiger',
        'monkey',
        'panther',
        'snake',
        'jackal',
    ];
    return words[Math.floor(Math.random() * words.length)];
};

const setupAnswerArray = function(word) {
    const answerArray = [];
    for (let i = 0; i < word.length; i++) {
        answerArray[i] = '_';
    }

    return answerArray;
};

const showPlayerProgress = function(answerArray) {
    alert(answerArray.join('  '));
};

const getGuess = function(answerArray) {
    return prompt('Guess the letter or click "Cancel" to exit the game.\n' +
        answerArray.join('  '));
};

const updateGameState = function(guess, word, answerArray) {
    guess = guess.toLowerCase();
    let appearances = 0;
    for (let j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] === '_') {
            answerArray[j] = guess;
            appearances++;
            showPlayerProgress(answerArray);
            drawCorrectGuess(guess, j);
        }
    }
    return appearances;
};

const greetings = function(answerArray, word) {
    while (true) {
        const name = prompt('Hello!\n\nWhat is your name?');
        if (name === null) {
            alert('hmm... okay');
            alert('\nThe hidden word - an animal from the book "Mowgli":\n' +
                answerArray.join('  ') + ' (' + word.length + ' letters)');
            break;
        } else if (name.length < 1) {
            alert('Try again, please.');
        } else {
            alert('\nNice to meet you, ' + name +
                '! I\'m Jimmy..  Jimmy Gallows ☺\n\nLet\'s play the game!');
            alert('\nThe hidden word - an animal from the book "Mowgli":\n' +
                answerArray.join('  ') + ' (' + word.length + ' letters)');
            break;
        }
    }
};

const drawMan = function(numberOfMistakes) {
    if (numberOfMistakes === 4) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'Black';
        ctx.beginPath();
        ctx.arc(200, 50, 20, 0, Math.PI * 2, false);
        ctx.stroke();
    } else if (numberOfMistakes === 3) {
        ctx.strokeStyle = 'Black';
        ctx.beginPath();
        ctx.moveTo(200, 70);
        ctx.lineTo(200, 150);
        ctx.lineTo(170, 190);
        ctx.moveTo(200, 150);
        ctx.lineTo(230, 190);
        ctx.stroke();
    } else if (numberOfMistakes === 2) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'Black';
        ctx.beginPath();
        ctx.lineTo(200, 150);
        ctx.lineTo(170, 190);
        ctx.moveTo(200, 150);
        ctx.lineTo(230, 190);
        ctx.stroke();
    } else if (numberOfMistakes === 1) {
        ctx.strokeStyle = 'Black';
        ctx.beginPath();
        ctx.moveTo(200, 100);
        ctx.lineTo(170, 80);
        ctx.moveTo(200, 100);
        ctx.lineTo(230, 80);
        ctx.stroke();
    } else if (numberOfMistakes === 0) {
        ctx.strokeStyle = 'Black';
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(200, 170);
        ctx.stroke();
    }
};

const drawUnderscores = function(howMany) {
    ctx.lineWidth = 4;
    ctx.beginPath();

    for (let i = 0; i < howMany; i++) {
        ctx.moveTo(261 + (i * 30) + 10, 182);
        ctx.lineTo(261 + (i * 30) + 30, 182);
    }
    ctx.stroke();
};

const drawCorrectGuess = function(guess, index) {
    ctx.font = '20px Comic Sans MS';
    ctx.fillText(guess.toUpperCase(), 265 + (index * 30) + 10, 175);
};

const drawIncorrectGuess = function(guess, index) {
    ctx.font = '20px Comic Sans Ms';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'Red';
    ctx.fillText(guess.toUpperCase(), 385, 200 + (index * 20) + 40);
    ctx.beginPath();
    ctx.moveTo(380, 200 + (index * 20) + 30);
    ctx.lineTo(400, 200 + (index * 20) + 30);
    ctx.stroke();
};

const leftMistakes = function(numberOfMistakes) {
    alert('Nope.');
    alert(numberOfMistakes + ' attempts left');
};


const lastAttempt = function() {
    alert('\nYou\'re attempts are over.\n\nBye bye.');
};

const showCongratsAndShowAnswer = function(word) {
    alert('Congratulates!\nThe right word is ' + word.toUpperCase());
};


const word = pickWord();
const answerArray = setupAnswerArray(word);
let remainingLetters = word.length;
let numberOfMistakes = 5;

greetings(answerArray, word);

drawUnderscores(word.length);

while (remainingLetters > 0) {
    const guess = getGuess(answerArray);
    if (guess === null) {
        alert('Bye bye.');
        break;
    } else if (guess.length !== 1) {
        alert('Input just one letter, please.');
    } else {
        const correctGuesses = updateGameState(guess, word, answerArray);
        remainingLetters -= correctGuesses;
        if (correctGuesses === 0) {
            numberOfMistakes--;
            drawMan(numberOfMistakes);
            drawIncorrectGuess(guess, numberOfMistakes);
            leftMistakes(numberOfMistakes);
        }
        if (numberOfMistakes === 0) {
            lastAttempt();
            break;
        }
    }
}

if (remainingLetters === 0) {
    showCongratsAndShowAnswer(word);
}