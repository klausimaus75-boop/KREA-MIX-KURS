import { coursePhases, modules, totalLessons } from "../data/courseData";

export function lessonKey(moduleIndex, lessonIndex) {
  return modules[moduleIndex]?.lessons[lessonIndex]?.id || `${moduleIndex}:${lessonIndex}`;
}

export function normalizeStoredProgress(storedKeys) {
  return new Set(
    storedKeys
      .map((key) => {
        const legacyMatch = /^(\d+):(\d+)$/.exec(key);
        if (!legacyMatch) return key;
        return lessonKey(Number(legacyMatch[1]), Number(legacyMatch[2]));
      })
      .filter(Boolean)
  );
}

export function countCompletedForModule(completedLessons, moduleIndex) {
  return modules[moduleIndex].lessons.reduce(
    (sum, _lesson, lessonIndex) => sum + (completedLessons.has(lessonKey(moduleIndex, lessonIndex)) ? 1 : 0),
    0
  );
}

export function getProgressSummary(completedLessons) {
  const completed = modules.reduce(
    (sum, _module, moduleIndex) => sum + countCompletedForModule(completedLessons, moduleIndex),
    0
  );
  return {
    completed,
    total: totalLessons,
    percent: totalLessons ? Math.round((completed / totalLessons) * 100) : 0,
  };
}

export function getModuleProgress(moduleIndex, completedLessons) {
  const total = modules[moduleIndex].lessons.length;
  const completed = countCompletedForModule(completedLessons, moduleIndex);
  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function getPhaseProgress(phaseId, completedLessons) {
  const phase = coursePhases.find((item) => item.id === phaseId);
  const moduleIndexes = phase
    ? phase.moduleIds.map((moduleId) => modules.findIndex((module) => module.id === moduleId)).filter((index) => index >= 0)
    : [];
  const total = moduleIndexes.reduce((sum, moduleIndex) => sum + modules[moduleIndex].lessons.length, 0);
  const completed = moduleIndexes.reduce(
    (sum, moduleIndex) => sum + countCompletedForModule(completedLessons, moduleIndex),
    0
  );
  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function getAdjacentLesson(moduleIndex, lessonIndex, direction) {
  const flatLessons = modules.flatMap((module, currentModuleIndex) =>
    module.lessons.map((lesson, currentLessonIndex) => ({
      module,
      lesson,
      moduleIndex: currentModuleIndex,
      lessonIndex: currentLessonIndex,
    }))
  );
  const currentIndex = flatLessons.findIndex(
    (item) => item.moduleIndex === moduleIndex && item.lessonIndex === lessonIndex
  );
  return flatLessons[currentIndex + direction] || null;
}

export function getNextLesson(completedLessons) {
  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
    for (let lessonIndex = 0; lessonIndex < modules[moduleIndex].lessons.length; lessonIndex += 1) {
      if (!completedLessons.has(lessonKey(moduleIndex, lessonIndex))) {
        return {
          moduleIndex,
          lessonIndex,
          module: modules[moduleIndex],
          lesson: modules[moduleIndex].lessons[lessonIndex],
          courseComplete: false,
        };
      }
    }
  }

  const moduleIndex = modules.length - 1;
  const lessonIndex = modules[moduleIndex].lessons.length - 1;
  return {
    moduleIndex,
    lessonIndex,
    module: modules[moduleIndex],
    lesson: modules[moduleIndex].lessons[lessonIndex],
    courseComplete: true,
  };
}
