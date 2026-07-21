import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  FileUp,
  FolderOpen,
  Lock,
  Pencil,
  Play,
} from "lucide-react";
import { DashboardShell } from "./AuthorDashboard";

const journey = ["Grundidee", "Buchplanung", "Inhalte", "Gestaltung", "Prüfung", "Veröffentlichung", "Marketing"];

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "Gerade eben";
  }
}

export function ProjectOverviewPage({ project, onBack, onEdit, onPrepared, onStageOpen, userName }) {
  if (!project) {
    return (
      <DashboardShell userName={userName}>
        <section className="project-overview-page">
          <button className="project-back" onClick={onBack}><ArrowLeft size={18} /> Zurück zum Dashboard</button>
          <div className="project-missing">
            <FolderOpen size={40} />
            <h1>Projekt nicht gefunden</h1>
            <p>Dieses Projekt ist lokal nicht vorhanden oder wurde gelöscht.</p>
            <button className="author-primary" onClick={onBack}>Dashboard öffnen</button>
          </div>
        </section>
      </DashboardShell>
    );
  }

  const subtitle = `${project.bookType || "Buchprojekt"}${project.targetAudience ? ` für ${project.targetAudience}` : ""}`;
  const planningUnlocked = project.currentStage === "buchplanung" || (project.progress || 0) >= 14;

  return (
    <DashboardShell
      userName={userName}
      activeStage={planningUnlocked ? "buchplanung" : "dashboard"}
      unlockedStages={planningUnlocked ? ["buchplanung"] : []}
      onStageOpen={onStageOpen}
      bookType={project.bookType}
    >
      <section className="project-overview-page">
        <button className="project-back" onClick={onBack}><ArrowLeft size={18} /> Zurück zum Dashboard</button>
        <header className="project-overview-head">
          <div>
            <span>{project.status}</span>
            <h1>{project.projectName}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="project-overview-actions">
            <button onClick={onEdit}><Pencil size={18} />Projekt bearbeiten</button>
            <button className="author-primary" onClick={onPrepared}><Play size={18} />Weiterarbeiten</button>
          </div>
        </header>

        <div className="project-overview-grid">
          <section className="project-overview-main">
            <div className="author-card project-road-card">
              <h2>Projektfortschritt</h2>
              <div className="project-road">
                {journey.map((step, index) => (
                  <div className={index === 0 ? "done" : planningUnlocked && index === 1 ? "active" : ""} key={step}>
                    <span>{index === 0 ? <CheckCircle2 size={18} /> : index + 1}</span>
                    <strong>{step}</strong>
                    {index === 0 && <em>erledigt</em>}
                    {planningUnlocked && index === 1 && <em>freigeschaltet</em>}
                    {(!planningUnlocked && index > 0) && <em><Lock size={13} /> vorbereitet</em>}
                    {(planningUnlocked && index > 1) && <em><Lock size={13} /> vorbereitet</em>}
                  </div>
                ))}
              </div>
            </div>

            <section className="project-next-card">
              <span>Dein nächster Schritt</span>
              <h2>Buchidee genauer festlegen</h2>
              <p>Du hast bereits eine erste Richtung festgelegt. Jetzt prüfen wir, ob die Idee klar, machbar und passend für deine Zielgruppe ist.</p>
              <button className="author-primary" onClick={onPrepared}>Buchidee ausarbeiten <ChevronRight size={18} /></button>
            </section>
          </section>

          <aside className="project-side">
            <section className="author-card project-info-card">
              <h2>Projektinformationen</h2>
              <dl>
                <div><dt>Buchart</dt><dd>{project.bookType || "Noch offen"}</dd></div>
                <div><dt>Zielgruppe</dt><dd>{project.targetAudience || "Noch offen"}</dd></div>
                <div><dt>Format</dt><dd>{project.format || "Noch offen"}</dd></div>
                <div><dt>Ausgabe</dt><dd>{project.publicationType || "Noch offen"}</dd></div>
                <div><dt>Umfang</dt><dd>{project.plannedPageCount || "Noch offen"}</dd></div>
              </dl>
            </section>

            <section className="author-card project-files-card">
              <h2>Projektdateien</h2>
              <div>
                <FileUp size={28} />
                <strong>Noch keine Dateien vorhanden</strong>
                <p>Upload ist vorbereitet und wird später mit dem Backend verbunden.</p>
              </div>
              <button onClick={onPrepared}>Datei hochladen</button>
            </section>

            <section className="author-card project-activity-card">
              <h2>Letzte Aktivität</h2>
              <div>
                <CalendarClock size={20} />
                <p><strong>Projekt erstellt</strong><span>{formatDate(project.createdAt)}</span></p>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </DashboardShell>
  );
}
