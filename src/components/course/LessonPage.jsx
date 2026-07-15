import { ArrowLeft, Check, ChevronLeft, ChevronRight, Clock3, Download, FileText } from "lucide-react";
import { getModuleProgress } from "../../lib/courseProgress";
import { CourseVideo } from "./CourseVideo";

export function LessonPage({
  module,
  moduleIndex,
  lesson,
  lessonIndex,
  phase,
  completedLessons,
  previousLesson,
  nextLesson,
  onModule,
  onNavigate,
  onComplete,
  onDownload,
}) {
  const complete = completedLessons.has(lesson.id);
  const progress = getModuleProgress(moduleIndex, completedLessons);

  return (
    <div className="page course-lesson-page">
      <nav className="course-breadcrumb" aria-label="Brotkrumen-Navigation">
        <button onClick={onModule}>Phase {phase.number}</button>
        <ChevronRight size={14} />
        <button onClick={onModule}>Modul {module.number}</button>
        <ChevronRight size={14} />
        <strong>Lektion {lesson.number}</strong>
      </nav>

      <button className="course-back" onClick={onModule}><ArrowLeft size={16} /> Zurück zu {module.title}</button>

      <header className="lesson-page-header">
        <div>
          <span>PHASE {phase.number} · MODUL {module.number} · LEKTION {lesson.number}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.shortDescription}</p>
        </div>
        <dl>
          <div><dt><Clock3 size={15} /> Dauer</dt><dd>{lesson.estimatedDuration}</dd></div>
          <div><dt><FileText size={15} /> Videoart</dt><dd>{lesson.videoType}</dd></div>
        </dl>
      </header>

      <div className="lesson-page-grid">
        <article className="lesson-article">
          <CourseVideo module={module} video={{ type: lesson.videoType, url: lesson.videoUrl }} title={lesson.title} />

          <div className="lesson-foundation-grid">
            <section>
              <span>DAS MACHEN WIR</span>
              <p>{lesson.whatWeDo}</p>
            </section>
            <section>
              <span>WARUM DAS WICHTIG IST</span>
              <p>{lesson.whyItMatters}</p>
            </section>
          </div>

          <section className="lesson-section-list">
            <div className="content-heading">
              <span>SCHRITT FÜR SCHRITT</span>
              <h2>Jetzt setzen wir es um</h2>
            </div>
            {lesson.sections.map((section, index) => (
              <section className="lesson-content-section" key={`${section.title}-${index}`}>
                <div className="lesson-section-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{section.title}</h3>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items?.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </div>
              </section>
            ))}
          </section>

          {lesson.examples.length ? (
            <section className="lesson-examples">
              <div className="content-heading"><span>BEISPIEL</span><h2>So kann das aussehen</h2></div>
              {lesson.examples.map((example) => (
                <div key={example.title}>
                  <strong>{example.title}</strong>
                  {example.text ? <p>{example.text}</p> : null}
                  {example.items?.length ? <ul>{example.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </div>
              ))}
            </section>
          ) : null}

          {lesson.tips.length ? (
            <aside className="lesson-tip">
              <span>KREAMIX-TIPP</span>
              {lesson.tips.map((tip) => <p key={tip}>{tip}</p>)}
            </aside>
          ) : null}

          <section className="lesson-task">
            <span>DEINE AUFGABE</span>
            <h2>{lesson.task.title}</h2>
            <p>{lesson.task.description}</p>
            <ol>{lesson.task.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </section>

          {lesson.checklist.length ? (
            <section className="lesson-checklist">
              <div className="content-heading"><span>CHECKLISTE</span><h2>Bevor du weitergehst</h2></div>
              <ul>{lesson.checklist.map((item) => <li key={item}><Check size={16} /> {item}</li>)}</ul>
            </section>
          ) : null}

          <section className="lesson-result">
            <Check size={22} />
            <div><span>AM ENDE HAST DU</span><p>{lesson.result}</p></div>
          </section>

          {lesson.downloads.length ? (
            <section className="lesson-downloads">
              <div className="content-heading"><span>DOWNLOADS</span><h2>Vorlagen für diesen Schritt</h2></div>
              <div>
                {lesson.downloads.map((download) => (
                  <button key={download.id} onClick={() => onDownload(download)}>
                    <Download size={18} />
                    <span><strong>{download.title}</strong><small>{download.description}</small></span>
                    <em>{download.url ? download.type : "Wird vorbereitet"}</em>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="lesson-side-rail">
          <span>MODULFORTSCHRITT</span>
          <strong>{progress.percent}%</strong>
          <p>{progress.completed} von {progress.total} Lektionen abgeschlossen</p>
          <div className="bar"><i style={{ width: `${progress.percent}%` }} /></div>
          <ol>
            {module.lessons.map((item, index) => (
              <li className={index === lessonIndex ? "active" : ""} key={item.id}>
                <button onClick={() => onNavigate({ moduleIndex, lessonIndex: index })}>
                  <span>{module.number}.{item.number}</span>
                  {item.title}
                  {completedLessons.has(item.id) ? <Check size={14} /> : null}
                </button>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <footer className="lesson-footer-nav">
        <button className={`outline ${complete ? "complete" : ""}`} onClick={onComplete} disabled={complete}>
          <Check size={16} /> {complete ? "Lektion erledigt" : "Als erledigt markieren"}
        </button>
        <div>
          <button className="outline" disabled={!previousLesson} onClick={() => previousLesson && onNavigate(previousLesson)}><ChevronLeft size={16} /> Vorherige Lektion</button>
          <button className="primary" disabled={!nextLesson} onClick={() => nextLesson && onNavigate(nextLesson)}>Nächste Lektion <ChevronRight size={16} /></button>
        </div>
      </footer>
    </div>
  );
}
