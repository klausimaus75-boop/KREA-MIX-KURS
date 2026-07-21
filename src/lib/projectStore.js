const PROJECT_STORAGE_KEY = "kreamix.projects.v1";
const PROJECT_DRAFT_KEY = "kreamix.projectDraft.v1";

const futureProjectFields = {
  coverFile: null,
  interiorFile: null,
  keywords: [],
  categories: [],
  bookDescription: "",
  price: "",
  kdpStatus: "Nicht gestartet",
  marketingStatus: "Nicht gestartet",
  ideaOneLiner: "",
  promise: "",
  audienceProblem: "",
  planningNotes: "",
};

export const emptyProjectDraft = {
  projectName: "",
  workingTitle: "",
  description: "",
  ideaStage: "",
  bookType: "",
  targetAudience: "",
  ageGroup: "",
  bookGoals: [],
  additionalAudienceNotes: "",
  format: "",
  publicationType: "",
  plannedPageCount: "",
};

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProjects(userId) {
  const projects = readJson(PROJECT_STORAGE_KEY, []);
  if (!userId) return projects;
  return projects.filter((project) => project.userId === userId);
}

export function getProjectById(projectId) {
  return readJson(PROJECT_STORAGE_KEY, []).find((project) => project.id === projectId) || null;
}

export function createProject(projectData, userId) {
  const now = new Date().toISOString();
  const id = `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const project = {
    id,
    userId: userId || "local-user",
    ...emptyProjectDraft,
    ...projectData,
    workingTitle: projectData.workingTitle || projectData.projectName,
    status: "In Vorbereitung",
    currentStage: "grundidee",
    progress: 0,
    createdAt: now,
    updatedAt: now,
    ...futureProjectFields,
  };
  const projects = readJson(PROJECT_STORAGE_KEY, []);
  writeJson(PROJECT_STORAGE_KEY, [project, ...projects]);
  return project;
}

export function updateProject(projectId, updates) {
  let updatedProject = null;
  const projects = readJson(PROJECT_STORAGE_KEY, []).map((project) => {
    if (project.id !== projectId) return project;
    updatedProject = {
      ...project,
      ...updates,
      workingTitle: updates.workingTitle || updates.projectName || project.workingTitle,
      updatedAt: new Date().toISOString(),
    };
    return updatedProject;
  });
  writeJson(PROJECT_STORAGE_KEY, projects);
  return updatedProject;
}

export function deleteProject(projectId) {
  const projects = readJson(PROJECT_STORAGE_KEY, []).filter((project) => project.id !== projectId);
  writeJson(PROJECT_STORAGE_KEY, projects);
}

export function readProjectDraft() {
  return {
    ...emptyProjectDraft,
    ...readJson(PROJECT_DRAFT_KEY, {}),
  };
}

export function saveProjectDraft(draft) {
  writeJson(PROJECT_DRAFT_KEY, { ...emptyProjectDraft, ...draft });
}

export function clearProjectDraft() {
  window.localStorage.removeItem(PROJECT_DRAFT_KEY);
}
