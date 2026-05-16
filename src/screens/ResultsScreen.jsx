import { useLocation } from "react-router-dom";
import Button from "../components/Button";

const ResultsScreen = () => {
  const { state } = useLocation();

  return (
    <div className="h-dvh w-dvw flex flex-col gap-4 items-center text-center justify-center">
      <p className="text-4xl font-bold" role="status" aria-live="polite">
        {state?.win ? "you did it" : "oops you didn't find them all"}
      </p>
      {state?.win && (
        <p className="text-3xl" aria-label={`Time remaining: ${state?.time} seconds`}>Time remaining: {state?.time}s</p>
      )}
      <Button route="/game">Play Again</Button>
    </div>
  );
};

export default ResultsScreen;
