var wins = 0;
var losses = 0;
var maxErrors = 10;
var validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


var wordElement = document.getElementById("letterDisplay");
var usedKeysElement = document.getElementById("guessedLetters");
var errorElement = document.getElementById("errorCount");
var winElement = document.getElementById("winCount");
var lossElement = document.getElementById("lossCount");

var gamestate = new hangman();

//onKeyUp handling
document.onkeyup = function(event)
{
    var userGuess = event.key;

    if(!gamestate.gameOver)
    {
        if(validGuesses.includes(userGuess) && !gamestate.usedKeys.includes(userGuess))
        {
            gamestate.checkGuess(userGuess);
        }
    }
    else
    {
        gamestate = new hangman();
        gamestate.updatePageData();
    }
}
//Main Game settings
function hangman()
{
    this.wordList = [
    "rescue",
    "explode",
    "seal",
    "calorie",
    "economy",
    "loan",
    "architecture",
    "cage",
    "fax",
    "blast",
    "throat",
    "strip",
    "primary",
    "area",
    "dough",
    "conception",
    "log",
    "speed",
    "psychology",
    "ring",
    "test", 
    "testing"
    ];
    this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.errors = 0;
    this.usedKeys = [];
    this.correctLetters = [];
    this.gameOver = false;
    document.getElementById("alert").innerHTML = "Press any key to start!";
    document.getElementById("alert2").innerHTML = " ";
    for(var i = 0; i < this.word.length; i++)
    {
        this.correctLetters[i] = (false);
    }
}

//Function to check if inputted key matches the word
hangman.prototype.checkGuess = function(char)
{
    this.usedKeys.push(char);
    
    document.getElementById("alert").innerHTML = " ";
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
        this.errors++;
    }
    if(this.errors >= maxErrors)
    {
        losses++;
        this.gameOver = true;
        document.getElementById("alert").innerHTML = "You Lose!"
        document.getElementById("alert2").innerHTML = "Press any key to play again."
    }
    if (!this.correctLetters.includes(false)) {
		wins++;
        this.gameOver = true;
        document.getElementById("alert").innerHTML = "You Win!"
        document.getElementById("alert2").innerHTML = "Press any key to play again."
	}
    gamestate.updatePageData();
}

//function to update the page data
hangman.prototype.updatePageData = function()
{
    var tempString = "";
    for(var i = 0; i < this.correctLetters.length; i++)
   {

       tempString += ((this.correctLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
       if(i < (this.correctLetters.length - 1))
       {
        tempString += " ";
       }   
   } 
   wordElement.textContent = tempString;

   tempString = "";
   for(var i = 0; i < this.usedKeys.length; i++)
   {
       tempString += (this.usedKeys[i].toUpperCase());
       if(i < (this.usedKeys.length - 1))
       {
        tempString += " ";
       }
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