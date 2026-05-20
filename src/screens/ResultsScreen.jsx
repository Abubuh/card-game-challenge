import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import useLeaderboard from "../hooks/useLeaderboard";
import LeaderboardTable from "../components/LeaderboardTable";

const ResultsScreen = () => {
  const { state } = useLocation();
  const { data: scores, isLoading, submitScore, error } = useLeaderboard();
  const [name, setName] = useState(
    () => localStorage.getItem("playerName") || "",
  );
  const [submitted, setSubmitted] = useState(
    () => sessionStorage.getItem("submittedGameId") === state?.gameId,
  );
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    localStorage.setItem("playerName", name);
    const { error } = await submitScore(name, state?.gameId);
    if (!error) {
      sessionStorage.setItem("submittedGameId", state?.gameId);
      setSubmitted(true);
    } else {
      setSubmitError(
        error.message === "already_submitted"
          ? "Score already submitted for this game."
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center gap-6 px-4 py-8">
      <p className="text-4xl md:text-6xl font-bold text-center" role="status">
        {state?.win ? "you did it" : "oops you didn't find them all"}
      </p>

      {state?.win && <p className="text-xl">Time remaining: {state?.time}s</p>}

      {state?.win && !submitted && state?.gameId && (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            maxLength={10}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-blue-500 rounded px-4 py-2 text-center"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Submit Score
          </button>
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
        </div>
      )}

      {state?.win && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Could not load scores.</p>
          ) : (
            <LeaderboardTable scores={scores} />
          )}
        </div>
      )}

      <Button route="/game">Play Again</Button>
    </div>
  );
};

export default ResultsScreen;
