import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { Category, ProgressStatus } from "../types";

export interface SkillTreeNodeData {
  title: string;
  category: Category;
  status: ProgressStatus;
  locked: boolean;
  onOpen: () => void;
  [key: string]: unknown;
}

const statusLabels: Record<ProgressStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
};

export function SkillTreeNode({ data }: NodeProps) {
  const { title, category, status, locked, onOpen } = data as SkillTreeNodeData;

  return (
    <div
      className={`skill-node nodrag nopan skill-node--${category} skill-node--${status} ${
        locked ? "skill-node--locked" : ""
      }`}
      onClick={() => !locked && onOpen()}
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-disabled={locked}
      onKeyDown={(e) => {
        if (!locked && (e.key === "Enter" || e.key === " ")) onOpen();
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div className="skill-node__title">{title}</div>
      <div className="skill-node__status">
        {locked ? "Locked" : statusLabels[status]}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
