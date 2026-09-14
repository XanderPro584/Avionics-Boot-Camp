import { skillTree } from "./data/skillTree";
import type { Category } from "./types";
import "./App.css";

const categoryLabels: Record<Category, string> = {
  foundations: "Foundations",
  "pcb-design": "Track 1: PCB Design & Layout",
  firmware: "Track 2: Firmware & MCU",
  sensors: "Track 3: Sensors & Signal Processing",
};

function App() {
  const categories = Object.keys(categoryLabels) as Category[];

  return (
    <main>
      <h1>Avionics Boot Camp</h1>
      {categories.map((category) => (
        <section key={category}>
          <h2>{categoryLabels[category]}</h2>
          <ul className="skill-list">
            {skillTree
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <li key={skill.id}>
                  <strong>{skill.title}</strong>
                  <p>{skill.description}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

export default App;
