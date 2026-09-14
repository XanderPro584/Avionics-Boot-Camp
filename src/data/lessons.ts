import type { Lesson } from "../types";
import { skillTree } from "./skillTree";

// Placeholder lesson content, one per skill node. Real content (write-ups,
// videos, checklists) gets filled in during the "Content + polish" pass —
// this exists to validate navigation and the reading experience.
export const lessons: Lesson[] = skillTree.map((node) => ({
  id: node.lessonId,
  skillNodeId: node.id,
  title: node.title,
  content: `${node.description}\n\n_Lesson content coming soon. This placeholder confirms the tree correctly links to a lesson page for this skill._`,
  checklist: [
    `Understand the core concepts behind ${node.title.toLowerCase()}`,
    "Complete the hands-on exercise",
    "Get sign-off from a team lead (if required)",
  ],
}));

export const lessonsBySkillNodeId: Record<string, Lesson> = Object.fromEntries(
  lessons.map((lesson) => [lesson.skillNodeId, lesson]),
);
