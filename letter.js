class Letter {
  constructor(letter) {
    this.letter = letter;
    this.display = "_";
    this.guessed = false;
    this.currentGuess = false;
    this.Display = function() {
      if (this.letter == " ") {
        return " ";
      } else {
        if (this.guessed) {
          return this.letter;
        } else {
          return this.display;
        }
      }
    };
    this.TakeGuess = function(compared) {
      if (this.letter == compared) {
        this.guessed = true;
        this.currentGuess = true;
        this.display = this.letter;
      } else {
        this.currentGuess = false;
      }
    };
    this.Space = function() {
      if (this.letter == " ") {
        this.guessed = true;
      }
    };
    this.Space();
  }
}

module.exports = Letter;
