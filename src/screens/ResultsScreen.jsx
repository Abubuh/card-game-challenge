import { useLocation } from "react-router-dom";

const ResultsScreen = () => {
  const { state } = useLocation();

  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center">
      <p className="text-4xl font-bold">
        {state?.win ? "you did it" : "oops you didn't find them all"}
      </p>
      {state?.win && (
        <p className="text-3xl ">Time remaining: {state?.time}s</p>
      )}
    </div>
  );
};

export default ResultsScreen;
