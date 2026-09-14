import { Route, Routes } from "react-router-dom";
import { SkillTree } from "./components/SkillTree";
import { LessonPage } from "./pages/LessonPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SkillTree />} />
      <Route path="/lesson/:skillId" element={<LessonPage />} />
    </Routes>
  );
}

export default App;
