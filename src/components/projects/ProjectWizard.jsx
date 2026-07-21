import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FileText,
  Heart,
  LayoutTemplate,
  Lightbulb,
  NotebookPen,
  Palette,
  Puzzle,
  Sparkles,
  Users,
} from "lucide-react";
import {
  clearProjectDraft,
  createProject,
  emptyProjectDraft,
  readProjectDraft,
  saveProjectDraft,
  updateProject,
} from "../../lib/projectStore";
import { DashboardShell } from "./AuthorDashboard";

const steps = ["Grundidee", "Buchart", "Zielgruppe", "Format", "Zusammenfassung"];

const ideaStages = [
  "Ich habe nur eine grobe Idee",
  "Ich weiß schon ungefähr, was ich machen will",
  "Ich habe bereits Inhalte oder Notizen",
  "Ich möchte mich noch inspirieren lassen",
];

const bookTypes = [
  ["Malbuch", Palette, "Ein Buch mit Ausmalmotiven für Kinder oder Erwachsene."],
  ["Rätselbuch", Puzzle, "Unterhaltsame Aufgaben, Spiele und kleine Denkimpulse."],
  ["Journal", NotebookPen, "Geführte Reflexion, Routinen oder persönliche Notizen."],
  ["Workbook", FileText, "Arbeitsblätter und Übungen mit klarer Struktur."],
  ["Planer", LayoutTemplate, "Organisation, Ziele, Termine und wiederkehrende Abläufe."],
  ["Kinderbuch", Heart, "Geschichten oder kreative Inhalte für Kinder."],
  ["Ratgeber", Lightbulb, "Hilfreiches Wissen für ein konkretes Thema."],
  ["Sachbuch", BookOpen, "Fundierte Inhalte mit klarer Wissensvermittlung."],
  ["Rezeptbuch", Sparkles, "Rezepte, Sammlungen und praktische Anleitungen."],
  ["Andere Buchart", Edit3, "Ein eigenes Format, das wir später genauer ausarbeiten."],
];

const ageGroups = ["0 bis 3", "4 bis 6", "7 bis 9", "10 bis 12", "Jugendliche", "Erwachsene", "Keine feste Altersgruppe"];
const goals = ["unterhalten", "beschäftigen", "Wissen vermitteln", "ein Problem lösen", "beim Lernen helfen", "beim Planen helfen", "entspannen"];
const formats = ["6 × 9 Zoll", "8,5 × 11 Zoll", "A4", "quadratisch", "noch nicht festgelegt"];
const publicationTypes = ["Taschenbuch", "Hardcover", "E-Book", "mehrere Formate", "noch nicht entschieden"];
const pageCounts = ["unter 50", "50 bis 100", "100 bis 150", "mehr als 150", "noch nicht festgelegt"];

function ChoiceCard({ selected, children, onClick, className = "" }) {
  return (
    <button
      type="button"
      className={`wizard-choice ${selected ? "selected" : ""} ${className}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

function WizardProgress({ step, onStep }) {
  return (
    <div className="project-wizard-progress" aria-label="Projektfortschritt">
      {steps.map((label, index) => (
        <button
          type="button"
          className={index < step ? "done" : index === step ? "active" : ""}
          key={label}
          onClick={() => index <= step && onStep(index)}
          disabled={index > step}
        >
          <span>{index < step ? <Check size={15} /> : index + 1}</span>
          {label}
        </button>
      ))}
    </div>
  );
}

function FieldError({ children }) {
  return children ? <p className="wizard-error">{children}</p> : null;
}

function TextField({ label, value, onChange, placeholder, error, textarea }) {
  const Control = textarea ? "textarea" : "input";
  return (
    <label className="wizard-field">
      <span>{label}</span>
      <Control value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={textarea ? 700 : 140} />
      <FieldError>{error}</FieldError>
    </label>
  );
}

export function ProjectWizard({ mode = "create", project, stepIndex = 0, userId, onBack, onStepChange, onFinished, userName }) {
  const [draft, setDraft] = useState(() => mode === "edit" ? { ...emptyProjectDraft, ...project } : readProjectDraft());
  const [step, setStep] = useState(Math.min(Math.max(stepIndex, 0), steps.length - 1));
  const [touched, setTouched] = useState(false);
  const errors = useMemo(() => {
    const next = {};
    if (!draft.projectName.trim()) next.projectName = "Bitte gib deinem Projekt einen Namen.";
    if (draft.description.length > 650) next.description = "Bitte kürze deine Beschreibung etwas.";
    return next;
  }, [draft.description.length, draft.projectName]);

  useEffect(() => {
    if (mode === "create") saveProjectDraft(draft);
  }, [draft, mode]);

  useEffect(() => {
    setStep(Math.min(Math.max(stepIndex, 0), steps.length - 1));
  }, [stepIndex]);

  function patch(value) {
    setDraft((current) => ({ ...current, ...value }));
  }

  function toggleGoal(goal) {
    patch({
      bookGoals: draft.bookGoals.includes(goal)
        ? draft.bookGoals.filter((item) => item !== goal)
        : [...draft.bookGoals, goal],
    });
  }

  function canContinue() {
    if (step === 0) return !errors.projectName && !errors.description;
    if (step === 1) return Boolean(draft.bookType);
    return true;
  }

  function go(nextStep) {
    setTouched(false);
    setStep(nextStep);
    onStepChange?.(nextStep);
    window.scrollTo({ top: 0, left: 0 });
  }

  function next() {
    setTouched(true);
    if (!canContinue()) return;
    go(Math.min(step + 1, steps.length - 1));
  }

  function finish() {
    setTouched(true);
    if (!draft.projectName.trim()) return;
    const saved = mode === "edit" ? updateProject(project.id, draft) : createProject(draft, userId);
    if (mode === "create") clearProjectDraft();
    onFinished(saved);
  }

  return (
    <DashboardShell userName={userName}>
      <section className="project-wizard-page">
        <button className="project-back" onClick={onBack}><ArrowLeft size={18} /> Zurück zum Dashboard</button>
        <div className="project-wizard-head">
          <div>
            <h1>{mode === "edit" ? "Projekt bearbeiten" : "Neues Buchprojekt erstellen"}</h1>
            <p>Wir richten dein Projekt gemeinsam ein. Du kannst alle Angaben später ändern.</p>
          </div>
        </div>
        <WizardProgress step={step} onStep={go} />
        <section className="project-wizard-card">
          {step === 0 && (
            <div className="wizard-step">
              <h2>Wie soll dein Projekt heißen?</h2>
              <TextField
                label="Projektname"
                value={draft.projectName}
                onChange={(projectName) => patch({ projectName })}
                placeholder="Dinosaurier-Malbuch"
                error={touched ? errors.projectName : ""}
              />
              <p className="wizard-hint">Dieser Name ist zunächst nur für deine Projektübersicht. Er muss noch nicht der spätere Buchtitel sein.</p>
              <TextField
                textarea
                label="Was möchtest du ungefähr erstellen?"
                value={draft.description}
                onChange={(description) => patch({ description })}
                placeholder="Ein einfaches Dinosaurier-Malbuch für Kinder von 5 bis 7 Jahren."
                error={touched ? errors.description : ""}
              />
              <h3>Wie weit bist du mit deiner Idee?</h3>
              <div className="wizard-grid two">
                {ideaStages.map((item) => (
                  <ChoiceCard key={item} selected={draft.ideaStage === item} onClick={() => patch({ ideaStage: item })}>
                    <Lightbulb size={20} /><span>{item}</span>
                  </ChoiceCard>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="wizard-step">
              <h2>Welche Art Buch möchtest du erstellen?</h2>
              <div className="wizard-grid book-types">
                {bookTypes.map(([title, Icon, text]) => (
                  <ChoiceCard key={title} selected={draft.bookType === title} onClick={() => patch({ bookType: title })}>
                    <Icon size={24} />
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </ChoiceCard>
                ))}
              </div>
              {touched && !draft.bookType && <FieldError>Bitte wähle eine Buchart aus.</FieldError>}
              <p className="wizard-hint">Noch unsicher? Das ist kein Problem. Du kannst die Buchart später ändern.</p>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step">
              <h2>Für wen ist dein Buch gedacht?</h2>
              <TextField label="Zielgruppe" value={draft.targetAudience} onChange={(targetAudience) => patch({ targetAudience })} placeholder="Kinder, Eltern, Anfänger, Senioren, Lehrer" />
              <h3>Alter</h3>
              <div className="wizard-chip-grid">
                {ageGroups.map((item) => <ChoiceCard key={item} selected={draft.ageGroup === item} onClick={() => patch({ ageGroup: item })}>{item}</ChoiceCard>)}
              </div>
              <h3>Was soll dein Buch für diese Person tun?</h3>
              <div className="wizard-chip-grid">
                {goals.map((item) => <ChoiceCard key={item} selected={draft.bookGoals.includes(item)} onClick={() => toggleGoal(item)}>{item}</ChoiceCard>)}
              </div>
              <TextField textarea label="Weitere Beschreibung der Zielgruppe" value={draft.additionalAudienceNotes} onChange={(additionalAudienceNotes) => patch({ additionalAudienceNotes })} placeholder="Optional: Was ist dieser Zielgruppe besonders wichtig?" />
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step">
              <h2>Wie soll dein Buch ungefähr aussehen?</h2>
              <h3>Format</h3>
              <div className="wizard-chip-grid">
                {formats.map((item) => <ChoiceCard key={item} selected={draft.format === item} onClick={() => patch({ format: item })}>{item}</ChoiceCard>)}
              </div>
              <h3>Welche Ausgabe planst du?</h3>
              <div className="wizard-chip-grid">
                {publicationTypes.map((item) => <ChoiceCard key={item} selected={draft.publicationType === item} onClick={() => patch({ publicationType: item })}>{item}</ChoiceCard>)}
              </div>
              <h3>Wie viele Seiten planst du ungefähr?</h3>
              <div className="wizard-chip-grid">
                {pageCounts.map((item) => <ChoiceCard key={item} selected={draft.plannedPageCount === item} onClick={() => patch({ plannedPageCount: item })}>{item}</ChoiceCard>)}
              </div>
              <p className="wizard-note">Diese Angaben sind noch nicht endgültig. Die technischen KDP-Einstellungen werden später genauer festgelegt.</p>
            </div>
          )}

          {step === 4 && (
            <div className="wizard-step">
              <h2>Dein neues Buchprojekt</h2>
              <div className="summary-grid">
                {[
                  ["Projektname", draft.projectName, 0],
                  ["Buchidee", draft.description || "Noch offen", 0],
                  ["Buchart", draft.bookType || "Noch offen", 1],
                  ["Zielgruppe", `${draft.targetAudience || "Noch offen"}${draft.ageGroup ? ` · ${draft.ageGroup}` : ""}`, 2],
                  ["Ziel", draft.bookGoals.join(", ") || "Noch offen", 2],
                  ["Format", draft.format || "Noch offen", 3],
                  ["Ausgabe", draft.publicationType || "Noch offen", 3],
                  ["Geplanter Umfang", draft.plannedPageCount || "Noch offen", 3],
                ].map(([label, value, targetStep]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <button onClick={() => go(targetStep)}>Bearbeiten</button>
                  </div>
                ))}
              </div>
              <p className="wizard-note">Keine Sorge: Du kannst alle Angaben später jederzeit ändern.</p>
            </div>
          )}
        </section>
        <div className="project-wizard-actions">
          <button onClick={step === 0 ? onBack : () => go(step - 1)}><ChevronLeft size={18} />{step === 0 ? "Abbrechen" : "Zurück"}</button>
          {step < steps.length - 1 ? (
            <button className="author-primary" disabled={!canContinue()} onClick={next}>Weiter <ChevronRight size={18} /></button>
          ) : (
            <button className="author-primary" onClick={finish}>{mode === "edit" ? "Änderungen speichern" : "Projekt erstellen"} <Check size={18} /></button>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}
