import { useState } from "react";
import { CARDS } from "../constants/cards";

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  console.log(result);
  return result;
};

const useMemoryGame = ({ onMatch, onNoMatch }) => {
  const [cards] = useState(() => shuffle(CARDS));
  const [flipped, setFlipped] = useState(new Set());
  const [matched, setMatched] = useState(new Set());
  const [disabled, setDisabled] = useState(false);

  const handleClick = (card) => {
    if (disabled) return;
    if (matched.has(card.id)) return;
    if (flipped.has(card.id)) return;

    const newFlipped = new Set([...flipped, card.id]);
    setFlipped(newFlipped);

    if (newFlipped.size === 2) {
      setDisabled(true);

      const [firstId, secondId] = [...newFlipped];
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      setTimeout(() => {
        if (firstCard.type === secondCard.type) {
          setMatched((prev) => new Set([...prev, firstId, secondId]));
          onMatch?.();
        } else {
          onNoMatch?.();
        }
        setFlipped(new Set());
        setDisabled(false);
      }, 600);
    }
  };

  return { cards, flipped, matched, handleClick };
};

export default useMemoryGame;
