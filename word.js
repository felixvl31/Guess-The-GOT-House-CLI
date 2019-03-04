var Letter = require("./letter.js");

class Word {
  constructor(word) {
    this.letters = Array.from(word);
    this.word = word;
    this.lettersDisplay = [];
    this.CurrentDisplay = "";
    this.Guessed = false;
    this.currentTry = false;
    this.wordGuessed = function() {
      this.Guessed = true;
      for (var i = 0; i < this.letters.length; i++) {
        this.Guessed = this.Guessed && this.lettersDisplay[i].guessed;
      }
    };
    this.currentGuess = function() {
      this.currentTry = false;
      for (var i = 0; i < this.letters.length; i++) {
        this.currentTry =
          this.currentTry || this.lettersDisplay[i].currentGuess;
      }
    };
    this.createLetters = function() {
      for (var i = 0; i < this.letters.length; i++) {
        if (this.letters[i] == " ") {
          this.lettersDisplay[i] = new Letter(" ");
        } else {
          this.lettersDisplay[i] = new Letter(this.letters[i]);
        }
      }
    };
    this.DisplayWord = function() {
      this.CurrentDisplay = "";
      for (var i = 0; i < this.letters.length; i++) {
        var Show = this.lettersDisplay[i].Display();
        this.CurrentDisplay += Show + " ";
      }
      console.log(this.CurrentDisplay);
      this.wordGuessed();
      this.currentGuess();
    };
    this.TakeAGuess = function(guess) {
      for (var i = 0; i < this.letters.length; i++) {
        this.lettersDisplay[i].TakeGuess(guess);
      }
    };
    this.createLetters();
  }
}
module.exports = Word;
