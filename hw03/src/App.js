import './App.css';
import {generateNumber, printMap} from './game';
import { useState } from 'react';

function App() {
  const [secretNumber, setSecretNumber] = useState(generateNumber());
  const [guessNumber, setGuessNumber] = useState("");
  const [guesses, setGuesses] = useState(new Map());

  function evaluateGuess() {
    let matchNumbers = 0;
    let matchPlaces = 0;
    if (guessNumber.length == 4 && !(guesses.has(guessNumber))) {
      //only evaluate guesses that have four characters, 
      // and haven't been guessed already.
      // all other error checking is performed on the input's onChange.
      for (let i = 0; i < guessNumber.length; i++) {
        if (secretNumber.includes(guessNumber[i])) {
          if (guessNumber[i] == secretNumber[i]) {
            matchPlaces++;
          } else {
            matchNumbers++;
          }
        }
      }
      setGuesses(guesses.set(guessNumber, "A" + matchPlaces + "B" + matchNumbers));
      setGuessNumber("");
    }
  }

  function updateText(ev) {
    let text = ev.target.value;
    if (text.length > 4 ||//prevent text from being >four characters
        text == "0" ||//prevent a zero from being the first number
        /(.).*\1|[^\d]/.test(text)) {//prevent any repeated or nondigit characters from being guessed
        text = text.substring(0, text.length - 1);      
    }
    setGuessNumber(text);
  }

  function keyPress(ev) {
    if (ev.key == "Enter") {
      evaluateGuess();
    }
  }

  function resetGame() {
    setSecretNumber(generateNumber());
    setGuessNumber("");
    setGuesses(new Map());
  }

  if (guesses.has(secretNumber)) {
    return (
      <header className="App-header">
        <h1>You win!</h1>
        <button onClick={resetGame}>Play Again?</button>
      </header>
    );
  } else if (guesses.size == 8) {
    return (
      <header className="App-header">
        <h1>You lose! The number was {secretNumber}...</h1>
        <button onClick={resetGame}>Play Again?</button>
      </header>
    );
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input type="text" 
            value={guessNumber} 
            onChange={updateText} 
            onKeyPress={keyPress}></input>
          <button onClick={evaluateGuess}>Guess!</button>
          <button onClick={resetGame}>Reset</button>
        </p>
        <p>{printMap(guesses)}</p>
      </header>
    </div>
  );
}

export default App;