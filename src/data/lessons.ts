import type { Lesson } from "../types.js";
import { skillTree } from "./skillTree.js";

// One placeholder Lesson per skill, generated from skillTree so we don't
// have to hand-write 17 near-identical entries. Real lesson content
// (write-ups, videos, checklists) replaces the placeholder text later —
// this just proves a skill can link to a lesson page.
export const lessons: Lesson[] = skillTree.map((skill) => ({
  id: skill.id,
  skillNodeId: skill.id,
  title: skill.title,
  content: `${skill.description}\n\nLesson content coming soon.`,
}));

export const lessonsBySkillId: Record<string, Lesson> = Object.fromEntries(
  lessons.map((lesson) => [lesson.skillNodeId, lesson]),
);
