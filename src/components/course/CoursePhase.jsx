import { moduleIndexById, modulesById } from "../../data/courseData";
import { ModuleCard } from "./ModuleCard";

export function CoursePhase({ phase, activeModule, completedLessons, onOpen }) {
  return (
    <section className="course-phase" data-phase={phase.number}>
      <div className="phase-heading">
        <span>PHASE {phase.number}</span>
        <h2>{phase.title}</h2>
        <p>{phase.description}</p>
      </div>
      <div className="module-grid small">
        {phase.moduleIds.map((moduleId) => {
          const module = modulesById.get(moduleId);
          const moduleIndex = moduleIndexById.get(moduleId);
          return (
            <ModuleCard
              key={moduleId}
              module={module}
              moduleIndex={moduleIndex}
              phaseNumber={phase.number}
              completedLessons={completedLessons}
              selected={moduleIndex === activeModule}
              onClick={() => onOpen(moduleIndex)}
            />
          );
        })}
      </div>
    </section>
  );
}

