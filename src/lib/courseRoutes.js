export function parseCourseHash(hash) {
  if (hash === "#admin") return { type: "admin" };

  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (!path) return null;
  if (path === "dashboard") return { type: "dashboard" };
  if (path === "classroom") return { type: "catalog" };

  const projectNewMatch = /^projects\/new(?:\/step-(\d+))?$/.exec(path);
  if (projectNewMatch) {
    return {
      type: "project-new",
      stepIndex: Math.max(0, Number(projectNewMatch[1] || 1) - 1),
    };
  }

  const projectEditMatch = /^projects\/([^/]+)\/edit(?:\/step-(\d+))?$/.exec(path);
  if (projectEditMatch) {
    return {
      type: "project-edit",
      projectId: projectEditMatch[1],
      stepIndex: Math.max(0, Number(projectEditMatch[2] || 1) - 1),
    };
  }

  const projectMatch = /^projects\/([^/]+)$/.exec(path);
  if (projectMatch) {
    return {
      type: "project",
      projectId: projectMatch[1],
    };
  }

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

export function dashboardHash() {
  return "#/dashboard";
}

export function projectNewHash(stepIndex = 0) {
  return `#/projects/new/step-${stepIndex + 1}`;
}

export function projectHash(projectId) {
  return `#/projects/${projectId}`;
}

export function projectEditHash(projectId, stepIndex = 0) {
  return `#/projects/${projectId}/edit/step-${stepIndex + 1}`;
}

export function moduleHash(moduleNumber) {
  return `#/classroom/module/${moduleNumber}`;
}

export function lessonHash(moduleNumber, lessonNumber) {
  return `#/classroom/module/${moduleNumber}/lesson/${lessonNumber}`;
}
