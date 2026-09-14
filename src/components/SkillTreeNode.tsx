import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { Category } from "../types";

// react-flow calls this once per node, passing back whatever we put in
// that node's `data` field when we built the nodes array.
export interface SkillTreeNodeData {
  title: string;
  category: Category;
  [key: string]: unknown;
}

export function SkillTreeNode({ data }: NodeProps) {
  const { title, category } = data as SkillTreeNodeData;

  return (
    <div className={`skill-node skill-node--${category}`}>
      {/* Handles are the little connector dots edges attach to */}
      <Handle type="target" position={Position.Left} />
      <div className="skill-node__title">{title}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
