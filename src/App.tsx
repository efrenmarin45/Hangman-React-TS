import { useCallback, useEffect, useState } from "react";
import { Container } from "./container";
import { mysteryWord } from "./Words";
import Drawing from "./Drawing";
import Keyboard, { KeyboardParent } from "./Keyboard";
import WordDisplay from "./WordDisplay";
import styled from "styled-components";
import Modal from "./Modal";

//* Calls on bank of words
function getWord() {
	return mysteryWord[Math.floor(Math.random() * mysteryWord.length)];
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(getWord);
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const incorrectAnswers = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	//* Win Conditions
	const userWon = wordToGuess
		.split("")
		.every((letter) => guessedLetters.includes(letter));
	const userLost = incorrectAnswers.length >= 6;

	//* Keeps track of users guesses
	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || userWon || userLost) return;

			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, userWon, userLost]
	);

	//* Keeping track of users keyboard actions
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (!key.match(/^[a-z]$/)) return;

			e.preventDefault();
			addGuessedLetter(key);
		};
		document.addEventListener("keypress", handler);
		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters]);

	//* Tracks when user presses 'Enter'
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (key != "Enter") return;

			e.preventDefault();
			setGuessedLetters([]);
			setWordToGuess(getWord());
		};
		document.addEventListener("keypress", handler);
		return () => {
			document.removeEventListener("keypress", handler);
		};
	});

	//* Styled component for the win/lose message
	const WinLose = styled.h1`
		font-family: "Shantell Sans", cursive;
		font-size: "2rem";
		text-align: center;
		margin: 0;
	`;

	const TopMessage = () => {
		return (
			<WinLose>
				{userWon && "✨You Found a Missing Fruit✨"}
				{userLost && "Better Luck Next Time 😔"}
			</WinLose>
		);
	};

	return (
		<div>
			<Modal />
			<Container>
				<TopMessage />
				<Drawing userGuesses={incorrectAnswers.length} />
				<WordDisplay
					guessedLetters={guessedLetters}
					wordToGuess={wordToGuess}
					reveal={userLost}
				/>
				<KeyboardParent>
					<Keyboard
						userLetter={guessedLetters.filter((letter) =>
							wordToGuess.includes(letter)
						)}
						inactiveLetters={incorrectAnswers}
						addGuessedLetter={addGuessedLetter}
						disabled={userWon || userLost}
					/>
				</KeyboardParent>
			</Container>
		</div>
	);
}

export default App;
