import type { SkillNode } from "../types";

// Just the Foundations category for now — the three tracks come later,
// once we've proven data flows correctly from here to the screen.
export const skillTree: SkillNode[] = [
  {
    id: "circuit-fundamentals",
    title: "Circuit Fundamentals",
    description:
      "Ohm's/Kirchhoff's laws, power rails & decoupling, pull-up/pull-down resistors.",
    prerequisiteIds: [],
  },
  {
    id: "component-literacy",
    title: "Component Literacy",
    description:
      "Reading datasheets, abs. max ratings/pinouts, passives/diodes/ICs.",
    prerequisiteIds: [],
  },
  {
    id: "test-equipment-basics",
    title: "Test Equipment Basics",
    description:
      "Multimeter voltage, continuity checks, bench power supply use.",
    prerequisiteIds: [],
  },
  {
    id: "soldering-skills",
    title: "Soldering Skills",
    description: "Through-hole, SMD with iron, hot air/reflow rework.",
    prerequisiteIds: [],
  },
];
