import { ArrowLeft, Check, ChevronRight, Clock3 } from "lucide-react";
import { getModuleProgress } from "../../lib/courseProgress";
import { CourseVideo } from "./CourseVideo";
import { ModulePhoto } from "./ModulePhoto";

export function ModuleDetailPage({
  module,
  moduleIndex,
  phase,
  completedLessons,
  onBack,
  onLesson,
  onOpenModule,
}) {
  const progress = getModuleProgress(moduleIndex, completedLessons);
  const firstOpenLesson = module.lessons.findIndex((lesson) => !completedLessons.has(lesson.id));
  const continueIndex = firstOpenLesson >= 0 ? firstOpenLesson : module.lessons.length - 1;
  const cta = progress.percent === 100 ? "Modul noch einmal ansehen" : progress.completed ? "Weiterlernen" : "Modul starten";

  return (
    <div className="page module-detail-page">
      <nav className="course-breadcrumb" aria-label="Brotkrumen-Navigation">
        <button onClick={onBack}>Classroom</button>
        <ChevronRight size={14} />
        <span>Phase {phase.number}</span>
        <ChevronRight size={14} />
        <strong>Modul {module.number}</strong>
      </nav>

      <button className="course-back" onClick={onBack}><ArrowLeft size={16} /> Zur Modulübersicht</button>

      <header className="module-detail-hero">
        <ModulePhoto module={module} />
        <div>
          <span>PHASE {phase.number} · MODUL {module.number}</span>
          <h1>{module.fullTitle || module.title}</h1>
          <strong>{module.subtitle}</strong>
          <p>{module.introduction}</p>
        </div>
      </header>

      <div className="module-detail-grid">
        <section className="module-introduction">
          <div className="content-heading">
            <span>MODUL-EINFÜHRUNG</span>
            <h2>Dein Start in dieses Modul</h2>
          </div>
          <CourseVideo
            module={module}
            video={module.introductionVideo}
            title={`Einführung zu ${module.title}`}
            introduction
          />
        </section>

        <aside className="module-outcome">
          <span>AM ENDE DIESES MODULS HAST DU</span>
          <h2>{module.result}</h2>
          <ul>
            {module.resultItems.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
          </ul>
        </aside>
      </div>

      <section className="module-progress-panel" aria-label="Modulfortschritt">
        <div>
          <span>DEIN FORTSCHRITT</span>
          <strong>{progress.completed} von {progress.total} Lektionen abgeschlossen</strong>
        </div>
        <b>{progress.percent}%</b>
        <div className="bar"><i style={{ width: `${progress.percent}%` }} /></div>
      </section>

      <section className="module-lesson-section">
        <div className="content-heading">
          <span>DEINE LEKTIONEN</span>
          <h2>Schritt für Schritt zum Ergebnis</h2>
        </div>
        <div className="module-lesson-list">
          {module.lessons.map((lesson, lessonIndex) => {
            const complete = completedLessons.has(lesson.id);
            const isCurrent = !complete && lessonIndex === continueIndex;
            return (
              <button key={lesson.id} onClick={() => onLesson(lessonIndex)}>
                <span>{String(lesson.number).padStart(2, "0")}</span>
                <div>
                  <strong>{lesson.title}</strong>
                  <p>{lesson.shortDescription}</p>
                  <small><Clock3 size={13} /> {lesson.estimatedDuration} · {lesson.videoType}</small>
                </div>
                <em className={complete ? "complete" : isCurrent ? "current" : ""}>
                  {complete ? <><Check size={14} /> Abgeschlossen</> : isCurrent ? "In Bearbeitung" : "Offen"}
                </em>
                <ChevronRight size={17} />
              </button>
            );
          })}
        </div>
      </section>

      {progress.percent === 100 && module.completionMessage ? (
        <section className="module-completion">
          <Check size={22} />
          <div>
            <span>MODUL ABGESCHLOSSEN</span>
            <h2>Modul 1 abgeschlossen</h2>
            <p>{module.completionMessage}</p>
            {module.completionChecklist?.length ? (
              <ul>
                {module.completionChecklist.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
              </ul>
            ) : null}
            {module.nextModuleNumber ? (
              <button className="primary" onClick={() => onOpenModule?.(module.nextModuleNumber - 1)}>
                Weiter zu Modul {module.nextModuleNumber}
              </button>
            ) : (
              <button className="primary" disabled>Modul 2 folgt</button>
            )}
          </div>
        </section>
      ) : null}

      <div className="module-primary-action">
        <button className="primary" onClick={() => onLesson(continueIndex)}>{cta} <ChevronRight size={17} /></button>
      </div>
    </div>
  );
}
