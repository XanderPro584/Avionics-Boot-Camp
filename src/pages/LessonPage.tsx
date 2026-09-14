import { Link, useParams } from "react-router-dom";
import { lessonsBySkillId } from "../data/lessons";

export function LessonPage() {
  // useParams reads the dynamic part of the URL — for a route defined as
  // "/lesson/:skillId", visiting "/lesson/circuit-fundamentals" makes
  // skillId equal "circuit-fundamentals" here.
  const { skillId } = useParams<{ skillId: string }>();
  const lesson = skillId ? lessonsBySkillId[skillId] : undefined;

  if (!lesson) {
    return (
      <main>
        <p>No lesson found for "{skillId}".</p>
        <Link to="/">← Back to skill tree</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/">← Back to skill tree</Link>
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>
    </main>
  );
}
