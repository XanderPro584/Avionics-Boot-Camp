import { Route, Routes } from "react-router-dom";
import { SkillTree } from "./components/SkillTree";
import { LessonPage } from "./pages/LessonPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Blue Horizon Rocketry — Avionics Boot Camp</h1>
        <p>Click a skill to open its lesson. Locked skills need their prerequisites first.</p>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<SkillTree />} />
          <Route path="/lesson/:skillId" element={<LessonPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
