export function parseCourseHash(hash) {
  if (hash === "#admin") return { type: "admin" };

  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (!path) return null;
  if (path === "classroom") return { type: "catalog" };

  const lessonMatch = /^classroom\/module\/(\d+)\/lesson\/(\d+)$/.exec(path);
  if (lessonMatch) {
    return {
      type: "lesson",
      moduleIndex: Number(lessonMatch[1]) - 1,
      lessonIndex: Number(lessonMatch[2]) - 1,
    };
  }

  const moduleMatch = /^classroom\/module\/(\d+)$/.exec(path);
  if (moduleMatch) {
    return {
      type: "module",
      moduleIndex: Number(moduleMatch[1]) - 1,
      lessonIndex: 0,
    };
  }

  return null;
}
export function classroomHash() {
  return "#/classroom";
}

export function moduleHash(moduleNumber) {
  return `#/classroom/module/${moduleNumber}`;
}

export function lessonHash(moduleNumber, lessonNumber) {
  return `#/classroom/module/${moduleNumber}/lesson/${lessonNumber}`;
}
