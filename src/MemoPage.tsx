import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MemoPage.css";
import Dictionary from "./Dictionary";

import tree1 from "./assets/Tree1.png";
import tree2 from "./assets/Tree3.png";
import bush1 from "./assets/Bush_1.png";
import bush2 from "./assets/Bush_2.png";

import mask1 from "./assets/Mask_recharge_1.png";
import mask2 from "./assets/Mask_recharge_2.png";
import mask3 from "./assets/Mask_recharge_3.png";
import mask4 from "./assets/Mask_recharge_4.png";
import mask5 from "./assets/Mask_recharge_5.png";

import painting1 from "./assets/Painting3.png";
import painting2 from "./assets/Painting5.png";

const maskFrames = [mask1, mask2, mask3, mask4, mask5];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PAIRS_COUNT = 10;

interface Card {
  id: number;
  letter: string;
  isObfuscated: boolean;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateCards(): Card[] {
  const shuffledAlphabet = shuffleArray(ALPHABET.split(""));
  const selectedLetters = shuffledAlphabet.slice(0, PAIRS_COUNT);

  const cards: Card[] = [];
  let id = 0;

  selectedLetters.forEach((letter) => {
    cards.push({
      id: id++,
      letter,
      isObfuscated: false,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: id++,
      letter,
      isObfuscated: true,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleArray(cards);
}

function MemoPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [maskFrame, setMaskFrame] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaskFrame((prev) => (prev + 1) % maskFrames.length);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (matchedPairs === PAIRS_COUNT && PAIRS_COUNT > 0) {
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isLocked) return;

      const clickedCard = cards.find((c) => c.id === cardId);
      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched)
        return;

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      );

      const newFlipped = [...flippedCards, cardId];
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsLocked(true);

        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((c) => c.id === firstId)!;
        const secondCard = cards.find((c) => c.id === secondId)!;

        if (
          firstCard.letter === secondCard.letter &&
          firstCard.isObfuscated !== secondCard.isObfuscated
        ) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isMatched: true }
                  : c,
              ),
            );
            setMatchedPairs((p) => p + 1);
            setFlippedCards([]);
            setIsLocked(false);
          }, 500);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isFlipped: false }
                  : c,
              ),
            );
            setFlippedCards([]);
            setIsLocked(false);
          }, 1000);
        }
      }
    },
    [cards, flippedCards, isLocked],
  );

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setGameWon(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="memo-page">
      <Dictionary />

      <div className="memo-decorative-elements">
        <img
          src={tree1}
          alt=""
          className="memo-decorative-element memo-tree-1"
        />
        <img
          src={tree2}
          alt=""
          className="memo-decorative-element memo-tree-2"
        />
        <img
          src={bush1}
          alt=""
          className="memo-decorative-element memo-bush-1"
        />
        <img
          src={bush2}
          alt=""
          className="memo-decorative-element memo-bush-2"
        />
        <img
          src={painting1}
          alt=""
          className="decorative-element memo-painting-1"
        />
        <img
          src={painting2}
          alt=""
          className="decorative-element memo-painting-2"
        />
      </div>

      <div className="memo-content">
        <h1 className="memo-title">Mask Memo</h1>

        <div className="memo-mask-character">
          <img src={maskFrames[maskFrame]} alt="Mask character" />
        </div>

        <div className="memo-stats">
          <span className="memo-stat">Moves: {moves}</span>
          <span className="memo-stat">
            Pairs: {matchedPairs}/{PAIRS_COUNT}
          </span>
        </div>

        <div className="memo-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memo-card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="memo-card-inner">
                <div className="memo-card-back">?</div>
                <div
                  className={`memo-card-front ${card.isObfuscated ? "obfuscated" : "normal"}`}
                >
                  {card.letter}
                </div>
              </div>
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="memo-win-message">
            <p>You won in {moves} moves!</p>
            <button className="memo-play-again" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}

        <div className="memo-buttons">
          <button className="memo-reset-button" onClick={resetGame}>
            Reset Game
          </button>
          <button className="memo-back-button" onClick={handleBack}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoPage;
