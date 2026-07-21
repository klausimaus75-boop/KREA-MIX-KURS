import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  CloudUpload,
  Folder,
  Grid2X2,
  HelpCircle,
  Image,
  Layout,
  Lightbulb,
  Lock,
  Menu,
  MessageCircle,
  Palette,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const productionItems = [
  ["buchplanung", "Buchplanung", Lightbulb],
  ["figuren", "Figuren entwickeln", Users],
  ["kapitel", "Kapitel schreiben", Sparkles],
  ["illustrationen", "Illustrationen", Image],
  ["cover", "Cover gestalten", Palette],
  ["innenlayout", "Innenlayout", Layout],
  ["export", "Export & Prüfung", CloudUpload],
  ["kdp", "KDP Veröffentlichung", CloudUpload],
  ["marketing", "Marketing & Analyse", BarChart3],
];

function DashboardShell({ children, userName = "AutorMaster", activeStage = "dashboard", unlockedStages = [], onStageOpen }) {
  return (
    <main className="author-shell" aria-label="KREA-MIX AutorMaster Dashboard">
      <aside className="author-sidebar">
        <button className="author-logo" aria-label="Dashboard öffnen">
          <span className="author-logo-mark"><BookOpen size={32} /></span>
          <span><strong>KREA-MIX</strong><small>Dein Weg zum Bestseller.</small></span>
        </button>
        <nav className="author-nav" aria-label="AutorMaster Navigation">
          <button className={activeStage === "dashboard" ? "active" : ""}><Grid2X2 size={20} />Dashboard</button>
          <span>Projekte</span>
          <button><Folder size={20} />Projekte</button>
          <button><BookOpen size={20} />Bibliothek</button>
          <span>Produktionsstrasse</span>
          {productionItems.map(([stage, label, Icon]) => {
            const unlocked = unlockedStages.includes(stage);
            return (
              <button
                className={`${activeStage === stage ? "active-stage" : ""} ${unlocked ? "unlocked" : "locked"}`}
                disabled={!unlocked}
                key={stage}
                onClick={() => unlocked && onStageOpen?.(stage)}
              >
                <Icon size={19} />
                {label}
                {!unlocked && <Lock className="author-lock" size={14} />}
              </button>
            );
          })}
        </nav>
        <div className="author-sidebar-footer">
          <div className="author-user">
            <div className="author-avatar">A</div>
            <strong>{userName}</strong>
            <em>Pro</em>
          </div>
          <button><Settings size={19} />Einstellungen</button>
          <button><HelpCircle size={19} />Hilfe & Support</button>
          <button className="author-collapse"><Menu size={17} />Menü einklappen</button>
        </div>
      </aside>
      <section className="author-main">
        <header className="author-topbar">
          <label className="author-search">
            <Search size={21} />
            <input placeholder="Suche in KREA-MIX..." aria-label="Suche in KREA-MIX" />
          </label>
          <div className="author-top-actions">
            <button aria-label="Benachrichtigungen"><Bell size={22} /><i>3</i></button>
            <button aria-label="Nachrichten"><MessageCircle size={21} /></button>
            <button className="author-profile" aria-label="Profil öffnen"><span>A</span><ChevronRight size={18} /></button>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}

function Journey({ percent = 0 }) {
  const steps = ["Projekt erstellen", "Planung", "Kapitel", "Cover", "Veröffentlichung"];
  return (
    <section className="author-card author-journey-card">
      <div className="author-card-head">
        <h2>Deine Reise zum fertigen Buch</h2>
        <strong>{percent} %</strong>
      </div>
      <div className="author-journey" style={{ "--journey": `${percent}%` }}>
        {steps.map((step, index) => (
          <div className={index === 0 ? "active" : ""} key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectList({ projects, onOpenProject, onNewProject }) {
  if (!projects.length) {
    return (
      <section className="author-card author-empty-card">
        <div className="author-empty-icon"><Folder size={36} /></div>
        <h3>Noch keine Projekte vorhanden</h3>
        <p>Erstelle dein erstes Buchprojekt und beginne deine Reise.</p>
        <button className="author-primary" onClick={onNewProject}>Erstes Projekt erstellen</button>
      </section>
    );
  }

  return (
    <div className="author-project-grid">
      {projects.map((project) => (
        <article className="author-project-card" key={project.id}>
          <div>
            <span>{project.bookType || "Buchprojekt"}</span>
            <h3>{project.projectName}</h3>
            <p>{project.targetAudience || "Zielgruppe wird noch festgelegt"}</p>
          </div>
          <div className="author-project-meta">
            <small>Status</small><strong>{project.status}</strong>
            <small>Fortschritt</small><strong>{project.progress || 0}%</strong>
          </div>
          <div className="author-project-actions">
            <button onClick={() => onOpenProject(project.id)}>Öffnen</button>
            <button className="author-primary" onClick={() => onOpenProject(project.id)}>Weiterarbeiten</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AuthorDashboard({ projects, onNewProject, onOpenProject, onOpenClassroom, userName }) {
  const hasProjects = projects.length > 0;
  return (
    <DashboardShell userName={userName}>
      <div className="author-dashboard">
        <section className="author-content">
          <div className="author-welcome">
            <h1>Willkommen bei KREA-MIX, AutorMaster! 👋</h1>
            <p>Erstelle großartige Bücher Schritt für Schritt. Wir begleiten dich auf deinem Weg von der ersten Idee bis zur Veröffentlichung.</p>
          </div>
          <Journey percent={hasProjects ? 12 : 0} />
          <section className="author-start-banner">
            <div className="author-plus"><Plus size={34} /></div>
            <div>
              <h2>Starte dein erstes Buchprojekt</h2>
              <p>Verwandle deine Idee in ein fertiges Buch - wir führen dich Schritt für Schritt.</p>
            </div>
            <button onClick={onNewProject}><Plus size={20} />Neues Projekt erstellen</button>
          </section>
          <section>
            <h2 className="author-section-title">Meine Projekte</h2>
            <ProjectList projects={projects} onOpenProject={onOpenProject} onNewProject={onNewProject} />
          </section>
          <section>
            <h2 className="author-section-title">Zuletzt geöffnet</h2>
            <div className="author-card author-empty-card compact">
              <div className="author-empty-icon muted"><Bell size={32} /></div>
              <h3>{hasProjects ? projects[0].projectName : "Noch keine Projekte geöffnet"}</h3>
              <p>{hasProjects ? "Zuletzt bearbeitet: gerade eben." : "Hier erscheinen deine zuletzt geöffneten Projekte."}</p>
            </div>
          </section>
        </section>

        <aside className="author-rail">
          <section className="author-help-card">
            <div className="author-help-icon"><Sparkles size={22} /></div>
            <h2>So funktioniert KREA-MIX</h2>
            <p>KREA-MIX führt dich Schritt für Schritt durch den gesamten Bucherstellungsprozess. Jede Station wird freigeschaltet, sobald du die vorherige abgeschlossen oder ausreichend fortgeschritten hast.</p>
            <button onClick={onOpenClassroom}><span><ChevronRight size={17} /></span>Kurze Einführung ansehen</button>
          </section>
          <section className="author-card author-progress-card">
            <h2>Dein Fortschritt</h2>
            <p>Beginne dein erstes Projekt, um deinen Fortschritt zu sehen.</p>
            <div className="author-progress-row">
              <div className="author-progress-ring" style={{ "--progress": hasProjects ? "12%" : "0%" }}><strong>{hasProjects ? "12%" : "0%"}</strong></div>
              <dl>
                <div><dt className="done">Abgeschlossen</dt><dd>0</dd></div>
                <div><dt className="work">In Arbeit</dt><dd>{hasProjects ? 1 : 0}</dd></div>
                <div><dt>Noch offen</dt><dd>{hasProjects ? 8 : 9}</dd></div>
              </dl>
            </div>
            <button className="author-link" onClick={onOpenClassroom}>Alle Stationen ansehen <ChevronRight size={17} /></button>
          </section>
          <section className="author-card author-shortcuts">
            <h2>Schnellzugriffe</h2>
            {["Vorlagen entdecken", "Ideen sammeln", "Wissen & Guides", "Community & Support"].map((item) => (
              <button key={item} onClick={onOpenClassroom}><Grid2X2 size={17} />{item}<ChevronRight size={17} /></button>
            ))}
          </section>
        </aside>
      </div>
    </DashboardShell>
  );
}

export { DashboardShell };
