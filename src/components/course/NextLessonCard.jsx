import { ChevronRight } from "lucide-react";
import { ProgressSummary } from "./ProgressSummary";

export function NextLessonCard({ progressSummary, nextLesson, onContinue }) {
  return (
    <section className="next-step-card">
      <span>Dein nächster Schritt</span>
      <ProgressSummary progress={progressSummary} />
      <div className="next-step-module">
        <small>Modul {nextLesson.module.number} · Lektion {nextLesson.lesson.number}</small>
        <h2>{nextLesson.module.title}</h2>
        <p>{nextLesson.lesson.title}</p>
      </div>
      <button className="primary" onClick={onContinue}>
        <ChevronRight size={16} />
        {nextLesson.courseComplete ? "Kurs ansehen" : "Weiterlernen"}
      </button>
    </section>
  );
}

