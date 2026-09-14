import { ReactFlow, Background, Controls } from "@xyflow/react";
import type { Edge, Node, NodeMouseHandler } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router-dom";
import { skillTree } from "../data/skillTree";
import { SkillTreeNode } from "./SkillTreeNode";
import type { SkillTreeNodeData } from "./SkillTreeNode";
import "./SkillTree.css";

// react-flow needs custom node types registered under a name, then we
// reference that name on each node below.
const nodeTypes = { skillNode: SkillTreeNode };

// Foundations stack in one left-hand column; each track runs left-to-right
// in its own row, starting one column after the foundations.
const CATEGORY_ROW: Record<string, number> = {
  foundations: 0,
  "pcb-design": 1,
  firmware: 2,
  sensors: 3,
};

const lastColumnByCategory: Record<string, number> = {};

const nodes: Node[] = skillTree.map((skill) => {
  const isFoundation = skill.category === "foundations";
  const column = isFoundation
    ? 0
    : 1 + (lastColumnByCategory[skill.category] ?? 0);
  if (!isFoundation) {
    lastColumnByCategory[skill.category] = column;
  }

  const data: SkillTreeNodeData = {
    title: skill.title,
    category: skill.category,
  };

  return {
    id: skill.id,
    type: "skillNode",
    position: { x: column * 220, y: CATEGORY_ROW[skill.category] * 140 },
    data,
  };
});

// One edge per prerequisite relationship: an arrow from the prerequisite
// to the skill it unlocks.
const edges: Edge[] = skillTree.flatMap((skill) =>
  skill.prerequisiteIds.map((prereqId) => ({
    id: `${prereqId}->${skill.id}`,
    source: prereqId,
    target: skill.id,
  })),
);

export function SkillTree() {
  const navigate = useNavigate();

  // react-flow calls this with the click event and the node that was
  // clicked — we only care about the node's id, which is the skill's id.
  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    navigate(`/lesson/${node.id}`);
  };

  return (
    <div className="skill-tree">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={handleNodeClick}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
