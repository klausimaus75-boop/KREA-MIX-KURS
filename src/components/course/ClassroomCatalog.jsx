import { ChevronRight } from "lucide-react";
import { CoursePhase } from "./CoursePhase";

export function ClassroomCatalog({
  phases,
  activeModule,
  completedLessons,
  foundationProgress,
  nextLesson,
  onModule,
  onContinue,
}) {
  return (
    <div className="page classroom classroom-catalog">
      <header className="catalog-header">
        <div>
          <span>DEIN KREAMIX-KURS</span>
          <h1>Classroom</h1>
          <p>Arbeite die Phasen in deinem Tempo durch und speichere nach jeder Lektion ein echtes Ergebnis.</p>
        </div>
        <button className="primary" onClick={onContinue}>Weiterlernen <ChevronRight size={16} /></button>
      </header>

      <section className="foundation-progress-panel">
        <div>
          <span>ABSCHNITT 1 · DEIN FUNDAMENT</span>
          <h2>{foundationProgress.completed} von {foundationProgress.total} Lektionen abgeschlossen</h2>
          <p>Als Nächstes: Modul {nextLesson.module.number} · {nextLesson.lesson.title}</p>
        </div>
        <strong>{foundationProgress.percent}%</strong>
        <div className="bar"><i style={{ width: `${foundationProgress.percent}%` }} /></div>
      </section>

      <div className="phase-stack" id="course-phases">
        {phases.map((phase) => (
          <CoursePhase
            key={phase.id}
            phase={phase}
            activeModule={activeModule}
            completedLessons={completedLessons}
            onOpen={onModule}
          />
        ))}
      </div>
    </div>
  );
}
