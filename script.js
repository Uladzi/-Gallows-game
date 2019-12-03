const words = [
    'bear',
    'wolf',
    'tiger',
    'monkey',
    'panther',
    'snake',
    'jackal',
];

const word = words[Math.floor(Math.random() * words.length)];

const answerArray = [];
for (let i = 0; i < word.length; i++) {
    answerArray[i] = '_';
}

let remainingLetters = word.length;
let numberOfMistakes = 3;

let name = prompt('Hello!\n\nWhat is your name?')
alert('\nNice to meet you, ' + name + '! I\'m Vova ☺\n\nLet\'s play the game!');
alert('\nHidden word - the kind of animal from the book/film "Mowgli":\n' +
    answerArray.join('  ') + ' (' + word.length + ' letters)');

while (remainingLetters > 0) {
    let guess = prompt('Guess the letter or click "Cancel" to exit the game.\n' + answerArray.join('  '));
    if (guess === null) {
        alert('Bye bye.');
        break;
    } else if (guess.length !== 1) {
        alert('Input just the one letter, please.');
    } else {
        guess = guess.toLowerCase();
        let matchCounter = 0;
        for (let j = 0; j < word.length; j++) {
            if (word[j] === guess && answerArray[j] === '_') {
                answerArray[j] = guess;
                remainingLetters--;
                matchCounter++;
                alert(answerArray.join('  '));
            }
        }
        if (matchCounter === 0) {
            alert('Nope.');
            numberOfMistakes--;
            alert(numberOfMistakes + ' attempts left');
        }
        if (numberOfMistakes === 0) {
            alert('\nYou\'re attempts are over.\n\nBye bye.');
            break;
        }
    }
}

if (remainingLetters === 0) {
    alert('Great! The word was - ' + word.toUpperCase());
}