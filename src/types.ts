export type Category = "foundations" | "pcb-design" | "firmware" | "sensors";

/**
 * One node in the skills tree, e.g. "Soldering Skills" or "PCB Layout".
 */
export interface SkillNode {
  id: string;
  title: string;
  category: Category;
  description: string;
  /** IDs of the SkillNodes that must be completed before this one unlocks */
  prerequisiteIds: string[];
}

/**
 * The teaching content for one SkillNode.
 */
export interface Lesson {
  id: string;
  /** Which SkillNode this lesson teaches */
  skillNodeId: string;
  title: string;
  content: string;
}

/**
 * A team member using the app.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "trainee" | "lead" | "admin";
}

export type ProgressStatus = "not-started" | "in-progress" | "complete";

/**
 * One user's progress on one skill. There's one of these per
 * (user, skill) pair — e.g. Alex's progress on "Soldering Skills".
 */
export interface Progress {
  userId: string;
  skillNodeId: string;
  status: ProgressStatus;
  updatedAt: string;
}
