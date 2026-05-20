import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_DURATION } from "../constants/gameConstants";

const useGameTimer = ({ matched, cards, gameId, onWin }) => {
  const [timer, setTimer] = useState(GAME_DURATION);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
      navigate("/results", { state: { win: false }, replace: true });
    }
  }, [timer, navigate]);

  useEffect(() => {
    if (matched.size === cards.length) {
      clearInterval(timerRef.current);
      onWin?.(timer);
      navigate("/results", {
        state: { win: true, time: timer, gameId },
        replace: true,
      });
    }
  }, [matched, navigate, cards.length, timer]);

  return { timer, timerRef };
};

export default useGameTimer;
