import Database from "better-sqlite3";

// One file on disk holds the whole database. better-sqlite3 creates it
// automatically the first time this runs.
const db = new Database("data.sqlite");

// SQLite doesn't enforce foreign keys unless you explicitly turn it on.
db.pragma("foreign_keys = ON");

// IF NOT EXISTS makes this safe to run every time the server starts —
// after the first run, these statements do nothing.
db.exec(`
  CREATE TABLE IF NOT EXISTS skill_nodes (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    category    TEXT NOT NULL,
    description TEXT NOT NULL
  );

  -- prerequisiteIds was a string[] in TypeScript. SQL has no array
  -- column, so each prerequisite relationship becomes its own row here
  -- instead — same "join table" idea as Progress, applied again.
  CREATE TABLE IF NOT EXISTS skill_prerequisites (
    skill_id        TEXT NOT NULL REFERENCES skill_nodes(id),
    prerequisite_id TEXT NOT NULL REFERENCES skill_nodes(id),
    PRIMARY KEY (skill_id, prerequisite_id)
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id            TEXT PRIMARY KEY,
    skill_node_id TEXT NOT NULL REFERENCES skill_nodes(id),
    title         TEXT NOT NULL,
    content       TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id    TEXT PRIMARY KEY,
    name  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role  TEXT NOT NULL CHECK (role IN ('trainee', 'lead', 'admin'))
  );

  -- One row per (user, skill) pair, same reasoning as the Progress type:
  -- completion status belongs to the relationship, not to either side
  -- alone, so the two IDs together are the primary key.
  CREATE TABLE IF NOT EXISTS progress (
    user_id       TEXT NOT NULL REFERENCES users(id),
    skill_node_id TEXT NOT NULL REFERENCES skill_nodes(id),
    status        TEXT NOT NULL CHECK (status IN ('not-started', 'in-progress', 'complete')),
    updated_at    TEXT NOT NULL,
    PRIMARY KEY (user_id, skill_node_id)
  );
`);

export default db;
