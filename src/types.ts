export type Category =
  | "foundations"
  | "pcb-design"
  | "firmware"
  | "sensors";

export interface SkillNode {
  id: string;
  title: string;
  category: Category;
  description: string;
  /** IDs of SkillNodes that must be completed before this one unlocks */
  prerequisiteIds: string[];
  /** ID of the Lesson that teaches this skill */
  lessonId: string;
  /** Position hint for laying out the tree */
  position: { x: number; y: number };
}

export interface Lesson {
  id: string;
  skillNodeId: string;
  title: string;
  /** Markdown content for the lesson body */
  content: string;
  /** Optional ordered checklist items a trainee should complete/verify */
  checklist?: string[];
  videoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "trainee" | "lead" | "admin";
}

export type ProgressStatus = "not-started" | "in-progress" | "complete";

export interface Progress {
  userId: string;
  skillNodeId: string;
  status: ProgressStatus;
  updatedAt: string;
  /** Optional lead/mentor sign-off for skills that require verification */
  signedOffBy?: string;
}
