var Word = require("./word.js");
var inquirer = require("inquirer");

var game = {
  options: ["stark","arryn","lannister","targaryen","greyjoy","baratheon","martell","tully",
    "tyrell","mormont","karstark","swyft","westerling","allyrion","hornwood","crakehall",
    "cerwyn","mallister","frey","clegane","selmy","dondarrion","seaworth"],
  current: {},
  Points: 10,
  score: 0,
  limit: 0,
  guessedLetters: [],
  isLetter : new RegExp(/^[a-zA-Z]$/)
};

function randomRemove() {
  var index = Math.floor(Math.random() * game.options.length);
  game.current = new Word(game.options[index]);
  game.options.splice(index, 1);
}
function InitNewWord() {
  randomRemove();
  game.Points = 10;
  game.guessedLetters = [];
  console.log("New word: ");
  game.current.DisplayWord();
}
function NewWord() {
  if (game.options.length > game.limit) {
    InitNewWord();
  } else {
    console.log("Game is over");
    console.log("Final score: " + game.score);
    randomRemove();
  }
}

function main() {
  inquirer
    .prompt([
      { name: "letter",
        message: "Take a guess:[a-z]",
        validate: function(value) {
          if (game.isLetter.test(value) && game.guessedLetters.indexOf(value.toLowerCase()) < 0) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answers) {
      game.guessedLetters.push(answers.letter.toLowerCase());
      game.current.TakeAGuess(answers.letter.toLowerCase());
      game.current.DisplayWord();
      if (!game.current.currentTry) {
        game.Points--;
      }
      if (game.Points === 0) {
        console.log("Wrong, the correct word was: " + game.current.word);
        NewWord();
      }
      if (game.current.Guessed) {
        game.score++;
        console.log("Words Guessed: " + game.score);
        NewWord();
      }
      if (game.options.length >= game.limit) {
        console.log("Remaining tries: " + game.Points);
        main();
      }
    });
}

inquirer
  .prompt([
    {
      name: "number",
      message: "How many words you want?[1-22]",
      validate: function(value) {
        if (
          isNaN(value) === false &&
          parseInt(value) > 0 &&
          parseInt(value) <= 22
        ) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answers) {
    game.limit = game.options.length - parseInt(answers.number);
    randomRemove();
    console.log("New word: ");
    game.current.DisplayWord();
    main();
  });
