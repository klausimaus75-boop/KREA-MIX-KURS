import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Lightbulb, Save, Sparkles, Target } from "lucide-react";
import { updateProject } from "../../lib/projectStore";
import { DashboardShell } from "./AuthorDashboard";

function PlanningField({ label, value, onChange, placeholder }) {
  return (
    <label className="planning-field">
      <span>{label}</span>
      <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function ProjectPlanningPage({ project, userName, onBack, onProject, onSaved, onStageOpen }) {
  const [draft, setDraft] = useState(() => ({
    ideaOneLiner: project?.ideaOneLiner || project?.description || "",
    promise: project?.promise || "",
    audienceProblem: project?.audienceProblem || "",
    planningNotes: project?.planningNotes || "",
  }));

  function patch(value) {
    setDraft((current) => ({ ...current, ...value }));
  }

  function savePlanning() {
    const saved = updateProject(project.id, {
      ...draft,
      currentStage: "buchplanung",
      progress: 14,
    });
    onSaved?.(saved);
  }

  if (!project) {
    return (
      <DashboardShell userName={userName}>
        <section className="project-planning-page">
          <button className="project-back" onClick={onBack}><ArrowLeft size={18} /> Zurück zum Dashboard</button>
          <div className="project-missing">
            <Lightbulb size={42} />
            <h1>Projekt nicht gefunden</h1>
            <p>Öffne zuerst ein Projekt, um mit der Buchplanung weiterzuarbeiten.</p>
          </div>
        </section>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      userName={userName}
      activeStage="buchplanung"
      unlockedStages={["buchplanung"]}
      onStageOpen={onStageOpen}
    >
      <section className="project-planning-page">
        <button className="project-back" onClick={onProject}><ArrowLeft size={18} /> Zurück zum Projekt</button>
        <header className="planning-hero">
          <div>
            <span>Buchplanung freigeschaltet</span>
            <h1>Buchidee ausarbeiten</h1>
            <p>Jetzt wird aus deiner ersten Idee ein klarer Plan: Was verspricht dein Buch, für wen ist es gedacht und warum soll jemand es haben wollen?</p>
          </div>
          <button className="author-primary" onClick={savePlanning}><Save size={18} /> Planung speichern</button>
        </header>

        <div className="planning-grid">
          <section className="planning-main-card">
            <div className="planning-step-heading">
              <Lightbulb size={24} />
              <div>
                <h2>1. Buchidee schärfen</h2>
                <p>Formuliere die Idee so einfach, dass du sie jederzeit in einem Satz erklären kannst.</p>
              </div>
            </div>
            <PlanningField
              label="Deine Buchidee in einem Satz"
              value={draft.ideaOneLiner}
              onChange={(ideaOneLiner) => patch({ ideaOneLiner })}
              placeholder="Ein fantasievolles Malbuch über ein Mädchen, das verlorene Sterne wiederfindet."
            />
            <PlanningField
              label="Was bekommt die Leserin oder der Leser durch dieses Buch?"
              value={draft.promise}
              onChange={(promise) => patch({ promise })}
              placeholder="Ruhe, Kreativität, kleine Erfolgserlebnisse und eine liebevolle Geschichte zum Ausmalen."
            />
            <PlanningField
              label="Welches Bedürfnis oder Problem löst dein Buch?"
              value={draft.audienceProblem}
              onChange={(audienceProblem) => patch({ audienceProblem })}
              placeholder="Eltern suchen eine ruhige, sinnvolle Beschäftigung, die nicht nach Bildschirmzeit aussieht."
            />
            <PlanningField
              label="Notizen für die nächste Ausarbeitung"
              value={draft.planningNotes}
              onChange={(planningNotes) => patch({ planningNotes })}
              placeholder="Ideen für Motive, Kapitel, Figuren, Wiederholungen, Stil oder Umfang."
            />
          </section>

          <aside className="planning-side">
            <section className="author-card">
              <Sparkles size={24} />
              <h2>Nächste sinnvolle Schritte</h2>
              <ul className="planning-checklist">
                <li><CheckCircle2 size={18} /> Kernidee in einem Satz festlegen</li>
                <li><CheckCircle2 size={18} /> Nutzen für die Zielgruppe prüfen</li>
                <li><CheckCircle2 size={18} /> Erste Motiv- oder Kapitelrichtung notieren</li>
              </ul>
            </section>
            <section className="author-card">
              <Target size={24} />
              <h2>Aktuelle Projektdaten</h2>
              <dl className="planning-facts">
                <div><dt>Buchart</dt><dd>{project.bookType || "Noch offen"}</dd></div>
                <div><dt>Zielgruppe</dt><dd>{project.targetAudience || "Noch offen"}</dd></div>
                <div><dt>Format</dt><dd>{project.format || "Noch offen"}</dd></div>
              </dl>
            </section>
            <button className="planning-next" onClick={savePlanning}>
              Speichern und weiter vorbereiten <ChevronRight size={18} />
            </button>
          </aside>
        </div>
      </section>
    </DashboardShell>
  );
}
