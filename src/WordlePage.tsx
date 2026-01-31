import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./WordlePage.css";

import tree1 from "./assets/Tree1.png";
import tree2 from "./assets/Tree3.png";
import bush1 from "./assets/Bush_1.png";
import bush2 from "./assets/Bush_2.png";
import mask1 from "./assets/Mask_recharge_1.png";
import mask2 from "./assets/Mask_recharge_2.png";
import mask3 from "./assets/Mask_recharge_3.png";
import mask4 from "./assets/Mask_recharge_4.png";
import mask5 from "./assets/Mask_recharge_5.png";

const maskFrames = [mask1, mask2, mask3, mask4, mask5];
const SECRET_WORD = "HELLO";
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

type LetterState = "correct" | "present" | "absent" | "empty";

interface TileData {
    letter: string;
    state: LetterState;
}

function WordlePage() {
    const navigate = useNavigate();
    const [guesses, setGuesses] = useState<TileData[][]>(
        Array(MAX_GUESSES)
            .fill(null)
            .map(() =>
                Array(WORD_LENGTH)
                    .fill(null)
                    .map(() => ({ letter: "", state: "empty" as LetterState })),
            ),
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [keyboardColors, setKeyboardColors] = useState<
        Record<string, LetterState>
    >({});
    const [maskFrame, setMaskFrame] = useState(0);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMaskFrame((prev) => (prev + 1) % maskFrames.length);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    const evaluateGuess = useCallback((guess: string): LetterState[] => {
        const result: LetterState[] = Array(WORD_LENGTH).fill("absent");
        const secretLetters = SECRET_WORD.split("");
        const guessLetters = guess.split("");

        guessLetters.forEach((letter, i) => {
            if (letter === secretLetters[i]) {
                result[i] = "correct";
                secretLetters[i] = "";
            }
        });

        guessLetters.forEach((letter, i) => {
            if (result[i] !== "correct") {
                const index = secretLetters.indexOf(letter);
                if (index !== -1) {
                    result[i] = "present";
                    secretLetters[index] = "";
                }
            }
        });

        return result;
    }, []);

    const submitGuess = useCallback(() => {
        const currentGuess = guesses[currentRow].map((t) => t.letter).join("");
        if (currentGuess.length !== WORD_LENGTH) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        const evaluation = evaluateGuess(currentGuess);
        const newGuesses = [...guesses];
        const newKeyboardColors = { ...keyboardColors };

        newGuesses[currentRow] = guesses[currentRow].map((tile, i) => ({
            letter: tile.letter,
            state: evaluation[i],
        }));

        currentGuess.split("").forEach((letter, i) => {
            const newState = evaluation[i];
            const currentState = newKeyboardColors[letter];
            if (
                newState === "correct" ||
                (newState === "present" && currentState !== "correct") ||
                (newState === "absent" && !currentState)
            ) {
                newKeyboardColors[letter] = newState;
            }
        });

        setGuesses(newGuesses);
        setKeyboardColors(newKeyboardColors);

        if (currentGuess === SECRET_WORD) {
            setWon(true);
            setGameOver(true);
        } else if (currentRow === MAX_GUESSES - 1) {
            setGameOver(true);
        } else {
            setCurrentRow(currentRow + 1);
            setCurrentCol(0);
        }
    }, [currentRow, guesses, keyboardColors, evaluateGuess]);

    const handleKeyPress = useCallback(
        (key: string) => {
            if (gameOver) return;

            if (key === "ENTER") {
                submitGuess();
            } else if (key === "⌫" || key === "BACKSPACE") {
                if (currentCol > 0) {
                    const newGuesses = [...guesses];
                    newGuesses[currentRow][currentCol - 1] = {
                        letter: "",
                        state: "empty",
                    };
                    setGuesses(newGuesses);
                    setCurrentCol(currentCol - 1);
                }
            } else if (/^[A-Z]$/.test(key) && currentCol < WORD_LENGTH) {
                const newGuesses = [...guesses];
                newGuesses[currentRow][currentCol] = { letter: key, state: "empty" };
                setGuesses(newGuesses);
                setCurrentCol(currentCol + 1);
            }
        },
        [gameOver, currentRow, currentCol, guesses, submitGuess],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
                handleKeyPress(key);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyPress]);

    const handleBack = () => {
        navigate("/");
    };

    const resetGame = () => {
        setGuesses(
            Array(MAX_GUESSES)
                .fill(null)
                .map(() =>
                    Array(WORD_LENGTH)
                        .fill(null)
                        .map(() => ({ letter: "", state: "empty" as LetterState })),
                ),
        );
        setCurrentRow(0);
        setCurrentCol(0);
        setGameOver(false);
        setWon(false);
        setKeyboardColors({});
    };

    return (
        <div className="wordle-page">
            <div className="decorative-elements">
                <img src={tree1} alt="" className="decorative-element tree-1" />
                <img src={tree2} alt="" className="decorative-element tree-2" />
                <img src={bush1} alt="" className="decorative-element bush-1" />
                <img src={bush2} alt="" className="decorative-element bush-2" />
            </div>

            <div className="wordle-content">
                <h1 className="wordle-title">Maskle</h1>

                <div className="mask-character-wordle">
                    <img src={maskFrames[maskFrame]} alt="Mask character" />
                </div>

                <div className="game-area">
                    <div className="grid-section">
                        <div className={`game-grid ${shake ? "shake" : ""}`}>
                            {guesses.map((row, rowIndex) => (
                                <div key={rowIndex} className="grid-row">
                                    {row.map((tile, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={`tile ${tile.state} ${rowIndex === currentRow && colIndex === currentCol
                                                ? "current"
                                                : ""
                                                }`}
                                        >
                                            {tile.letter}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {gameOver && (
                            <div className="game-message">
                                {won ? (
                                    <p className="win-message">🎉 You got it!</p>
                                ) : (
                                    <p className="lose-message">
                                        The word was: <span className="secret-word">{SECRET_WORD}</span>
                                    </p>
                                )}
                                <button className="play-again-button" onClick={resetGame}>
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="keyboard">
                        {KEYBOARD_ROWS.map((row, rowIndex) => (
                            <div key={rowIndex} className="keyboard-row">
                                {row.map((key) => (
                                    <button
                                        key={key}
                                        className={`key ${keyboardColors[key] || ""} ${key === "ENTER" || key === "⌫" ? "wide-key" : ""
                                            }`}
                                        onClick={() => handleKeyPress(key)}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        ))}
                        <button className="back-button" onClick={handleBack}>
                            ← Back to Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordlePage;
