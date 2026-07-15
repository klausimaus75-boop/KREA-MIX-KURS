export function LessonOverview({ module, lesson, moduleProgress }) {
  return (
    <section className="lesson-overview">
      <span>Diese Lektion</span>
      <h2>{lesson.title}</h2>
      <div className="lesson-overview-grid">
        <div>
          <strong>Was machen wir?</strong>
          <p>{lesson.whatWeDo}</p>
        </div>
        <div>
          <strong>Am Ende hast du:</strong>
          <p>{lesson.result}</p>
        </div>
      </div>
      <small>
        Modul {module.number} · Lektion {lesson.number} · {moduleProgress.completed} von {moduleProgress.total} Lektionen abgeschlossen
      </small>
    </section>
  );
}

