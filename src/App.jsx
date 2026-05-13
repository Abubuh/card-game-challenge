import { Route, Routes } from "react-router-dom";
import GameScreen from "./screens/GameScreen";
import ResultsScreen from "./screens/ResultsScreen";
import StartScreen from "./screens/StartScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </>
  );
}

export default App;
