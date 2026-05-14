import { useEffect, useRef, useState } from "react";
import backgroundSound from "../assets/sounds/background.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.mp3";
import tickingSound from "../assets/sounds/ticking.mp3";

const useGameSounds = ({ timer }) => {
  const [isMuted, setIsMuted] = useState(true);
  const backgroundRef = useRef(new Audio(backgroundSound));
  const correctRef = useRef(new Audio(correctSound));
  const incorrectRef = useRef(new Audio(incorrectSound));
  const tickingRef = useRef(new Audio(tickingSound));

  useEffect(() => {
    if (timer === 10) {
      tickingRef.current.play().catch(() => {});
    }
  }, [timer]);

  useEffect(() => {
    correctRef.current.load();
    incorrectRef.current.load();
    tickingRef.current.load();
  }, []);

  useEffect(() => {
    return () => {
      backgroundRef.current.pause();
      backgroundRef.current.currentTime = 0;
      correctRef.current.pause();
      correctRef.current.currentTime = 0;
      incorrectRef.current.pause();
      incorrectRef.current.currentTime = 0;
      tickingRef.current.pause();
      tickingRef.current.currentTime = 0;
    };
  }, []);

  const toggleMute = () => {
    if (isMuted) {
      backgroundRef.current.loop = true;
      backgroundRef.current.play();
    } else {
      backgroundRef.current.pause();
    }
    setIsMuted((prev) => !prev);
  };

  const playCorrect = () => {
    correctRef.current.currentTime = 0;
    correctRef.current.play();
  };

  const playIncorrect = () => {
    incorrectRef.current.currentTime = 0;
    incorrectRef.current.play();
  };

  return { playCorrect, playIncorrect, isMuted, toggleMute };
};

export default useGameSounds;
