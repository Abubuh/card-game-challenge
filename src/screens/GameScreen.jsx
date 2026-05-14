import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import useMemoryGame from "../hooks/useMemoryGame";
import useGameTimer from "../hooks/useGameTimer";
import useGameSounds from "../hooks/useGameSounds";
import { CircularTimer } from "../components/CircularTimer";

const GameScreen = () => {
  const [modal, setModal] = useState(null);
  const { cards, flipped, matched, handleClick } = useMemoryGame({
    onMatch: () => {
      playCorrect();
      setModal("match");
      setTimeout(() => setModal(null), 1200);
    },
    onNoMatch: () => {
      playIncorrect();
      setModal("nomatch");
      setTimeout(() => setModal(null), 1200);
    },
  });
  const { timer } = useGameTimer({ matched, cards });
  const { playCorrect, playIncorrect, isMuted, toggleMute } = useGameSounds({
    timer,
  });

  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center gap-2 lg:gap-8">
      <button onClick={toggleMute} className="absolute top-4 right-4 text-2xl">
        {isMuted ? "🔇" : "🔊"}
      </button>
      {modal && (
        <Modal
          message={
            modal === "match"
              ? "nice! it's a match"
              : "sorry, but this is not a match"
          }
        />
      )}
      <CircularTimer timer={timer}/>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
