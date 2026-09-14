import { skillTree } from "./data/skillTree";
import "./App.css";

function App() {
  return (
    <main>
      <h1>Avionics Boot Camp</h1>
      <h2>Foundations</h2>
      <ul className="skill-list">
        {skillTree.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.title}</strong>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
