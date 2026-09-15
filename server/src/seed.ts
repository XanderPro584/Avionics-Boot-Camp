// One-time script: reads our existing hardcoded frontend data and
// inserts it as real database rows. Run manually with `npm run seed`,
// not on every server start — this is the handoff point where the
// database becomes the real source of truth instead of these files.
import db from "./db.js";
import { skillTree } from "../../src/data/skillTree.js";
import { lessons } from "../../src/data/lessons.js";

// Clear existing rows first so re-running this script doesn't insert
// duplicates — makes the script safe to run more than once.
db.exec("DELETE FROM skill_prerequisites");
db.exec("DELETE FROM lessons");
db.exec("DELETE FROM skill_nodes");

// .prepare() compiles the SQL once; the "?" placeholders get filled in
// per call to .run(), instead of building a new string of SQL every
// time (which is also how you avoid SQL-injection bugs).
const insertSkill = db.prepare(
  "INSERT INTO skill_nodes (id, title, category, description) VALUES (?, ?, ?, ?)",
);
const insertPrerequisite = db.prepare(
  "INSERT INTO skill_prerequisites (skill_id, prerequisite_id) VALUES (?, ?)",
);

for (const skill of skillTree) {
  insertSkill.run(skill.id, skill.title, skill.category, skill.description);
  for (const prerequisiteId of skill.prerequisiteIds) {
    insertPrerequisite.run(skill.id, prerequisiteId);
  }
}

const insertLesson = db.prepare(
  "INSERT INTO lessons (id, skill_node_id, title, content) VALUES (?, ?, ?, ?)",
);
for (const lesson of lessons) {
  insertLesson.run(lesson.id, lesson.skillNodeId, lesson.title, lesson.content);
}

console.log(`Seeded ${skillTree.length} skills and ${lessons.length} lessons.`);
