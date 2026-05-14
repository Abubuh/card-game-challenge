import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { CARDS } from "../constants/cards";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const GameScreen = () => {
  const [cards] = useState(() => shuffle(CARDS));
  const [flipped, setFlipped] = useState(new Set());
  const [matched, setMatched] = useState(new Set());
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(null);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer === 0) {
      navigate("/results", { state: { win: false } });
      return;
    }
  }, [timer]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (matched.size === cards.length) {
      clearInterval(timerRef.current);
      navigate("/results", { state: { win: true, time: timer } });
    }
  }, [matched]);

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
          setModal("match");
        } else {
          setModal("nomatch");
        }
        setFlipped(new Set());
        setDisabled(false);
        setTimeout(() => setModal(null), 1200);
      }, 500);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      {modal && (
        <Modal
          message={
            modal === "match"
              ? "nice! it's a match"
              : "sorry, but this is not a match"
          }
        />
      )}
      <p className="text-4xl font-bold">{timer}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            isFlipped={flipped.has(card.id) || matched.has(card.id)}
            onClick={() => handleClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
