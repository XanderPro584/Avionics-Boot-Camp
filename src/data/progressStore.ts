import { useCallback, useEffect, useState } from "react";
import type { Progress, ProgressStatus } from "../types";

const STORAGE_KEY = "avionics-bootcamp:progress";
const FAKE_USER_ID = "current-user";

function readAll(): Record<string, Progress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(progress: Record<string, Progress>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private mode, etc.) — progress just won't persist
  }
}

/**
 * Stands in for the real Progress API/DB until the backend is wired up.
 * Tracks a single fake "current user" in localStorage.
 */
export function useProgress() {
  const [progress, setProgress] = useState<Record<string, Progress>>(readAll);

  useEffect(() => {
    writeAll(progress);
  }, [progress]);

  const setStatus = useCallback((skillNodeId: string, status: ProgressStatus) => {
    setProgress((prev) => ({
      ...prev,
      [skillNodeId]: {
        userId: FAKE_USER_ID,
        skillNodeId,
        status,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const getStatus = useCallback(
    (skillNodeId: string): ProgressStatus =>
      progress[skillNodeId]?.status ?? "not-started",
    [progress],
  );

  return { progress, setStatus, getStatus };
}
