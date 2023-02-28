import { useCallback, useEffect, useState } from "react";
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

  const addGuessedLetter = useCallback(
    (letter: string) => {
    if(guessedLetters.includes(letter)) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, 
  [guessedLetters] 
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if(!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
   }
   document.addEventListener("keypress", handler)
   return () => {
    document.removeEventListener("keypress", handler)
   }
  }, [guessedLetters])
  
  return (
    <div>
      <Container>
        <TopMessage />
        <Drawing userGuesses={incorrectAnswers.length} />
        <WordDisplay guessedLetters={guessedLetters} favFood={favFood} />
        <KeyboardParent>
          <Keyboard />
        </KeyboardParent>
      </Container>
    </div>
  )
}

export default App