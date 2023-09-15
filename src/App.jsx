import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import GameOver from "./pages/Game over/GameOver";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-over" element={<GameOver />} />
      </Routes>
    </>
  );
}

export default App;
