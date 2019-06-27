var wins = 0;
var losses = 0;
var maxErrors = 5;
var validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


var wordElement = document.getElementById("word-display-letters");
var usedKeysElement = document.getElementById("guessed-letters");
var errorElement = document.getElementById("error-count");
var winElement = document.getElementById("win-count");
var lossElement = document.getElementById("loss-count");

var gamestate = new hangman();

//onKeyUp handling
document.onkeyup = function(event)
{
    var userGuess = event.key;

    if(!gamestate.gameover)
    {
        if(validGuesses.includes(userGuess) && !gamestate.usedKeys.includes(userGuess))
        {
            gamestate.checkGuess(userGuess);
        }
        else
        {
            gamestate = new hangman();
            gamestate.updatePageData();
        }
    }
}
//Main Game settings
function hangman()
{
    this.wordList = ["test", "testing"];
    this.word = this.wordList[Math.floor(Math.random()* this.wordList.length)];
    this.errors = 0;
    this.usedKeys = [];
    this.correctLetters = [];
    this.gameOver = false;
    for(var i = 0; i < this.word.length; i++);
    {
        this.correctLetters[i] = (false);
    }
}

//Function to check if inputted key matches the word
hangman.prototype.checkGuess = function(char)
{
    this.usedKeys.push(char);

    var inWord = false;
    for(var i = 0; i < this.word.length; i++)
    {
        if(this.word.charAt(i) === char)
        {
            inWord = true;
            this.correctLetters[i] = true;
        }
    }
    if(!inWord)
    {
        errors++;
    }
    if(this.errors >= maxErrors)
    {
        losses++;
        this.gameOver = true;
    }
    if (!this.correctLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	}
    gamestate.updatePageData();
}

//function to update the page data
hangman.prototype.updatePageData = function()
{
    var tempString = "";
    for(var i = 0; i < this.correctLetters.length; i++)
   {
       console.log(this.correctLetters.length);
       tempString += ((this.correctLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
       if(i < (this.correctLetters.length - 1))
       {
        tempString += " ";
       }   
   } 
   wordElement.textContent = tempString;
   console.log(tempString);

   tempString = "";
   for(var i = 0; i < this.usedKeys.length;i++)
   {
       tempString += (this.usedKeys[i].toUpperCase());
       if(i < (this.usedKeys.length - 1)) tempString += " ";
   }
   for(var i = tempString.length; i < 51; i++)
   {
       tempString += " ";
   }
   usedKeysElement.textContent = tempString;
   tempString = this.errors + " / " + maxErrors;
   for(var i = tempString.length; i < 32; i++)
   {
       tempString += " ";
   }
   errorElement.textContent = tempString;
   tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winElement.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
    lossElement.textContent = tempString;
}
gamestate.updatePageData();