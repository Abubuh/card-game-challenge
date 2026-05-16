import { useEffect, useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import useMemoryGame from "../hooks/useMemoryGame";
import useGameTimer from "../hooks/useGameTimer";
import useGameSounds from "../hooks/useGameSounds";
import { CircularTimer } from "../components/CircularTimer";
import soundOn from "../assets/images/sound--on.svg";
import soundOff from "../assets/images/sound--off.svg";
import { MODAL_DURATION } from "../constants/gameConstants";

const GameScreen = () => {
  const [modal, setModal] = useState(null);
  const {
    playCorrect,
    playIncorrect,
    isMuted,
    toggleMute,
    volume,
    handleVolume,
    playTicking,
  } = useGameSounds();

  const { cards, flipped, matched, handleClick } = useMemoryGame({
    onMatch: () => {
      playCorrect();
      setModal("match");
      setTimeout(() => setModal(null), MODAL_DURATION);
    },
    onNoMatch: () => {
      playIncorrect();
      setModal("nomatch");
      setTimeout(() => setModal(null), MODAL_DURATION);
    },
  });


  const { timer } = useGameTimer({ matched, cards });

  useEffect(() => {
    if (timer <= 10 && timer > 0) {
      playTicking();
    }
  }, [timer]);

  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center gap-2 lg:gap-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button onClick={toggleMute} className="text-2xl" aria-pressed={isMuted}>
          {isMuted ? (
            <img
              src={soundOff}
              alt="Mute background music"
              className="w-6 h-6"
            />
          ) : (
            <img
              src={soundOn}
              alt="Unmute background music"
              className="w-6 h-6"
            />
          )}
        </button>
        {!isMuted && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="w-20 accent-blue-500"
            aria-label="Background music volume control"
          />
        )}
      </div>
      {modal && (
        <Modal
          message={
            modal === "match"
              ? "nice! it's a match"
              : "sorry, but this is not a match"
          }
        />
      )}
      <CircularTimer timer={timer} />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            type={card.type}
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
