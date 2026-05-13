import { Route, Routes } from "react-router-dom";
import GameScreen from "./screens/GameScreen";
import ResultsScreen from "./screens/ResultsScreen";
import StartScreen from "./screens/StartScreen";

function App() {
  return (
    <div className="bg-linear-to-br from-blue-100 to-purple-200 min-h-screen">
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
