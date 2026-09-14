import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router-dom";
import { skillTree } from "../data/skillTree";
import { isUnlocked } from "../data/prerequisites";
import { useProgress } from "../data/progressStore";
import { SkillTreeNode, type SkillTreeNodeData } from "./SkillTreeNode";
import { categoryLabels } from "../data/skillTree";
import "./SkillTree.css";

const nodeTypes = { skillNode: SkillTreeNode };

export function SkillTree() {
  const navigate = useNavigate();
  const { getStatus } = useProgress();

  const nodes: Node[] = useMemo(
    () =>
      skillTree.map((skill) => {
        const locked = !isUnlocked(skill, getStatus);
        const data: SkillTreeNodeData = {
          title: skill.title,
          category: skill.category,
          status: getStatus(skill.id),
          locked,
          onOpen: () => navigate(`/lesson/${skill.id}`),
        };
        return {
          id: skill.id,
          type: "skillNode",
          position: skill.position,
          data,
        };
      }),
    [getStatus, navigate],
  );

  const edges: Edge[] = useMemo(
    () =>
      skillTree.flatMap((skill) =>
        skill.prerequisiteIds.map((prereqId) => ({
          id: `${prereqId}->${skill.id}`,
          source: prereqId,
          target: skill.id,
          animated: getStatus(prereqId) !== "complete",
        })),
      ),
    [getStatus],
  );

  return (
    <div className="skill-tree">
      <Legend />
      <div className="skill-tree__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background />
          <Controls showInteractive={false} />
          <MiniMap
            pannable
            zoomable
            style={{ background: "#1c1c24" }}
            maskColor="rgba(11, 11, 15, 0.75)"
            nodeColor="#3a3a45"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="skill-tree__legend">
      {Object.entries(categoryLabels).map(([category, label]) => (
        <span key={category} className={`legend__swatch legend__swatch--${category}`}>
          {label}
        </span>
      ))}
    </div>
  );
}
