import type { ProgressStatus, SkillNode } from "../types";

/** A node is locked until every prerequisite skill is marked complete. */
export function isUnlocked(
  node: SkillNode,
  getStatus: (skillNodeId: string) => ProgressStatus,
): boolean {
  return node.prerequisiteIds.every((id) => getStatus(id) === "complete");
}
