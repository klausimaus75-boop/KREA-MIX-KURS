import { Check } from "lucide-react";
import { getModuleProgress } from "../../lib/courseProgress";
import { ModulePhoto } from "./ModulePhoto";

export function ModuleCard({ module, moduleIndex, phaseNumber, completedLessons, selected, onClick }) {
  const progress = getModuleProgress(moduleIndex, completedLessons);
  const cta = progress.percent === 100
    ? "Modul abgeschlossen"
    : progress.completed > 0
      ? "Weiterlernen"
      : "Modul starten";

  return (
    <button className={`module-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <ModulePhoto module={module} />
      <span className="module-eyebrow">PHASE {phaseNumber} · MODUL {module.number}</span>
      <strong>{module.title}</strong>
      {module.subtitle ? <em>{module.subtitle}</em> : null}
      <p>{module.result}</p>
      <small>
        <span>{progress.completed} von {progress.total} Lektionen</span>
        <b>{progress.percent}%</b>
      </small>
      <div className="bar"><i style={{ width: `${progress.percent}%` }} /></div>
      <span className={`module-cta ${progress.percent === 100 ? "complete" : ""}`}>
        {progress.percent === 100 ? <Check size={14} /> : null}
        {cta}
      </span>
    </button>
  );
}

