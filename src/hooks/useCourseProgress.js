import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { modules } from "../data/courseData";
import { lessonKey, normalizeStoredProgress } from "../lib/courseProgress";
import { supabase } from "../lib/supabaseClient";

const ANONYMOUS_PROGRESS_KEY = "kreaLessonProgress";
const validLessonIds = new Set(modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)));

function storageKey(userId) {
  return userId ? `${ANONYMOUS_PROGRESS_KEY}:${userId}` : ANONYMOUS_PROGRESS_KEY;
}

function readProgress(userId) {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey(userId)) || "[]");
    return new Set([...normalizeStoredProgress(Array.isArray(value) ? value : [])].filter((id) => validLessonIds.has(id)));
  } catch {
    return new Set();
  }
}

function persistProgress(progress, userId) {
  sessionStorage.setItem(storageKey(userId), JSON.stringify([...progress]));
}

export function useCourseProgress(user) {
  const userId = user?.id || null;
  const [completedLessons, setCompletedLessons] = useState(() => readProgress(null));
  const [syncStatus, setSyncStatus] = useState("local");
  const [syncError, setSyncError] = useState("");
  const activeUserId = useRef(userId);

  useEffect(() => {
    activeUserId.current = userId;
    if (!supabase || !userId) {
      const localProgress = readProgress(null);
      setCompletedLessons(localProgress);
      setSyncStatus("local");
      setSyncError("");
      return undefined;
    }

    let active = true;
    let channel;

    async function connectProgress() {
      setSyncStatus("loading");
      setSyncError("");

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", userId);
      if (error) throw error;

      const remoteProgress = new Set((data || []).map((row) => row.lesson_id).filter((id) => validLessonIds.has(id)));
      const accountBackup = readProgress(userId);
      const migrationKey = `kreaProgressMigrated:${userId}`;
      const shouldMigrateAnonymous = sessionStorage.getItem(migrationKey) !== "true";
      const anonymousProgress = shouldMigrateAnonymous ? readProgress(null) : new Set();
      const mergedProgress = new Set([...remoteProgress, ...accountBackup, ...anonymousProgress]);
      const missingRemote = [...mergedProgress].filter((id) => !remoteProgress.has(id));

      if (missingRemote.length > 0) {
        const timestamp = new Date().toISOString();
        const { error: upsertError } = await supabase.from("lesson_progress").upsert(
          missingRemote.map((lessonId) => ({
            user_id: userId,
            lesson_id: lessonId,
            completed_at: timestamp,
            updated_at: timestamp,
          })),
          { onConflict: "user_id,lesson_id" }
        );
        if (upsertError) throw upsertError;
      }

      if (!active) return;
      setCompletedLessons(mergedProgress);
      persistProgress(mergedProgress, userId);
      sessionStorage.setItem(migrationKey, "true");
      if (shouldMigrateAnonymous) sessionStorage.removeItem(ANONYMOUS_PROGRESS_KEY);

      channel = supabase
        .channel(`lesson-progress:${userId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "lesson_progress", filter: `user_id=eq.${userId}` },
          (payload) => {
            const row = payload.eventType === "DELETE" ? payload.old : payload.new;
            if (!row?.lesson_id || !validLessonIds.has(row.lesson_id)) return;
            setCompletedLessons((current) => {
              const next = new Set(current);
              if (payload.eventType === "DELETE") next.delete(row.lesson_id);
              else next.add(row.lesson_id);
              persistProgress(next, userId);
              return next;
            });
          }
        )
        .subscribe((status) => {
          if (!active) return;
          if (status === "SUBSCRIBED") setSyncStatus("synced");
          if (["CHANNEL_ERROR", "TIMED_OUT"].includes(status)) setSyncStatus("error");
        });

      setSyncStatus("synced");
    }

    connectProgress().catch((error) => {
      if (!active) return;
      setCompletedLessons(readProgress(userId));
      setSyncStatus("error");
      setSyncError(error.message || "Der Fortschritt konnte nicht synchronisiert werden.");
    });

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [userId]);

  const completeLesson = useCallback(async (moduleIndex, lessonIndex) => {
    const id = lessonKey(moduleIndex, lessonIndex);
    if (!validLessonIds.has(id)) return { error: "Diese Lektion wurde nicht gefunden." };

    let wasCompleted = false;
    setCompletedLessons((current) => {
      wasCompleted = current.has(id);
      const next = new Set(current);
      next.add(id);
      persistProgress(next, activeUserId.current);
      return next;
    });

    if (!supabase || !activeUserId.current || wasCompleted) return { error: "" };

    setSyncStatus("syncing");
    const timestamp = new Date().toISOString();
    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: activeUserId.current,
        lesson_id: id,
        completed_at: timestamp,
        updated_at: timestamp,
      },
      { onConflict: "user_id,lesson_id" }
    );

    if (error) {
      setCompletedLessons((current) => {
        const next = new Set(current);
        next.delete(id);
        persistProgress(next, activeUserId.current);
        return next;
      });
      setSyncStatus("error");
      setSyncError(error.message);
      return { error: "Der Fortschritt konnte nicht gespeichert werden." };
    }

    setSyncStatus("synced");
    setSyncError("");
    return { error: "" };
  }, []);

  return useMemo(
    () => ({ completedLessons, completeLesson, syncStatus, syncError }),
    [completedLessons, completeLesson, syncStatus, syncError]
  );
}
