import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { skillTreeById } from "../data/skillTree";
import { lessonsBySkillNodeId } from "../data/lessons";
import { isUnlocked } from "../data/prerequisites";
import { useProgress } from "../data/progressStore";
import type { ProgressStatus } from "../types";
import "./LessonPage.css";

const STATUS_CYCLE: ProgressStatus[] = ["not-started", "in-progress", "complete"];

export function LessonPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const { getStatus, setStatus } = useProgress();

  const skill = skillId ? skillTreeById[skillId] : undefined;
  const lesson = skillId ? lessonsBySkillNodeId[skillId] : undefined;

  if (!skill || !lesson) {
    return <Navigate to="/" replace />;
  }

  const locked = !isUnlocked(skill, getStatus);
  const status = getStatus(skill.id);
  const prereqs = skill.prerequisiteIds.map((id) => skillTreeById[id]);

  return (
    <div className="lesson-page">
      <Link to="/" className="lesson-page__back">
        ← Back to skill tree
      </Link>

      <h1>{lesson.title}</h1>

      {locked ? (
        <div className="lesson-page__locked-banner">
          🔒 This skill is locked. Complete the following prerequisites first:
          <ul>
            {prereqs.map((p) => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="lesson-page__content">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>

          {lesson.checklist && (
            <div className="lesson-page__checklist">
              <h2>Checklist</h2>
              <ul>
                {lesson.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="lesson-page__status">
            <span>Your progress:</span>
            {STATUS_CYCLE.map((s) => (
              <button
                key={s}
                className={`status-button status-button--${s} ${
                  status === s ? "status-button--active" : ""
                }`}
                onClick={() => setStatus(skill.id, s)}
              >
                {s.replace("-", " ")}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
