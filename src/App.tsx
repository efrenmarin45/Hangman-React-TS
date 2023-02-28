import { useState } from "react";
import {Container} from "./container";
import Drawing from "./Drawing";
import { foods } from "./foods";
import Keyboard, { KeyboardParent } from "./Keyboard";
import TopMessage from "./winLose"
import WordDisplay from "./WordDisplay";

function App() {
  const [favFood, setFavFood] =  useState(() => {
    return foods[Math.floor(Math.random() * foods.length)]
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectAnswers = guessedLetters.filter(
    letter => !favFood.includes(letter)
  );
  
  return (
    <div>
      <Container>
        <TopMessage />
        <Drawing userGuesses={incorrectAnswers.length} />
        <WordDisplay guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
        <KeyboardParent>
          <Keyboard />
        </KeyboardParent>
      </Container>
    </div>
  )
}

export default App