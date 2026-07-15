import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  Home,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  UserCog,
  Users,
  X,
} from "lucide-react";
import "./styles.css";
import heroGenerated from "./assets/hero-generated-2k.png";
import referenceClassroom from "./assets/reference-classroom.png";
import referenceCommunity from "./assets/reference-community.png";
import referenceCalendar from "./assets/reference-calendar.png";
import referenceDashboard from "./assets/reference-dashboard.png";
import referenceHero from "./assets/reference-hero.png";
import referenceMembers from "./assets/reference-members.png";

import {
  coursePhases,
  demoBookProject,
  modules,
  totalLessons,
  totalPhases,
} from "./data/courseData";
import {
  getAdjacentLesson,
  getNextLesson,
  getPhaseProgress,
  getProgressSummary,
  lessonKey,
  normalizeStoredProgress,
} from "./lib/courseProgress";
import {
  classroomHash,
  lessonHash,
  moduleHash,
  parseCourseHash,
} from "./lib/courseRoutes";
import { BookProjectCard } from "./components/course/BookProjectCard";
import { ClassroomCatalog } from "./components/course/ClassroomCatalog";
import { LessonPage } from "./components/course/LessonPage";
import { ModuleCard } from "./components/course/ModuleCard";
import { ModuleDetailPage } from "./components/course/ModuleDetailPage";
import { ModulePhoto } from "./components/course/ModulePhoto";
import { NextLessonCard } from "./components/course/NextLessonCard";
import { ToolsSection } from "./components/course/ToolsSection";

const posts = [
  ["Anna M.", "Mein erster Erfolg mit Modul 2!", "Ich konnte mein erstes Angebot sichtbar machen und bin so happy.", 24, 8],
  ["Julia P.", "Frage zu Canva Vorlagen", "Hat jemand eine Empfehlung für schöne Vorlagen für Workbook?", 19, 12],
  ["Laura K.", "Neue Datei geteilt", "Kundenavatar-Vorlage für die Positionierung.", 16, 4],
];

const members = ["Sophie L.", "Lena K.", "Marie B.", "Tanja W.", "Lisa M."];
const pages = ["Übersicht", "Classroom", "Community", "Mitglieder", "Kalender", "Ressourcen", "Favoriten", "Einstellungen"];
const adminPin = "KREA";

const nav = [
  ["Übersicht", Home],
  ["Classroom", BookOpen],
  ["Community", Users],
  ["Mitglieder", Users],
  ["Kalender", CalendarDays],
  ["Ressourcen", FileText],
  ["Favoriten", Star],
  ["Einstellungen", Settings],
];

const initialRoute = parseCourseHash(window.location.hash);
const initialModuleIndex = Number.isInteger(initialRoute?.moduleIndex) && modules[initialRoute.moduleIndex]
  ? initialRoute.moduleIndex
  : 0;
const initialLessonIndex = Number.isInteger(initialRoute?.lessonIndex) && modules[initialModuleIndex]?.lessons[initialRoute.lessonIndex]
  ? initialRoute.lessonIndex
  : 0;

function App() {
  const [page, setPage] = useState(() => initialRoute?.type === "admin" ? "Admin" : initialRoute ? "Classroom" : "Übersicht");
  const [courseView, setCourseView] = useState(() => ["module", "lesson"].includes(initialRoute?.type) ? initialRoute.type : "catalog");
  const [activeModule, setActiveModule] = useState(initialModuleIndex);
  const [activeLesson, setActiveLesson] = useState(initialLessonIndex);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState("");
  const [enteredCourse, setEnteredCourse] = useState(() => Boolean(initialRoute));
  const [adminUnlocked, setAdminUnlocked] = useState(() => sessionStorage.getItem("kreaAdminPreview") === "true");
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return normalizeStoredProgress(JSON.parse(sessionStorage.getItem("kreaLessonProgress") || "[]"));
    } catch {
      return new Set();
    }
  });
  const progressSummary = useMemo(() => getProgressSummary(completedLessons), [completedLessons]);
  const nextLesson = useMemo(() => getNextLesson(completedLessons), [completedLessons]);
  const bookProject = useMemo(
    () => ({
      ...demoBookProject,
      phaseId: nextLesson.module.phaseId,
      currentStep: `Modul ${nextLesson.module.number}: ${nextLesson.lesson.title}`,
      progress: progressSummary.percent,
    }),
    [nextLesson, progressSummary.percent]
  );
  const stats = useMemo(
    () => [
      [`${modules.length}`, "Module", BookOpen],
      [`${totalLessons}`, "Lektionen", FileText],
      [`${totalPhases}`, "Phasen", Clock3],
      [`${progressSummary.percent}%`, "Fortschritt", Sparkles],
    ],
    [progressSummary.percent]
  );
  const searchResults = query.trim()
    ? modules
        .flatMap((module, moduleIndex) =>
          module.lessons.map((lesson, lessonIndex) => ({ module, moduleIndex, lesson, lessonIndex }))
        )
        .filter((item) => `${item.module.title} ${item.lesson.title}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  useEffect(() => {
    function syncCourseRoute() {
      const route = parseCourseHash(window.location.hash);
      if (!route) {
        setPage("Übersicht");
        setEnteredCourse(false);
        setCourseView("catalog");
        return;
      }
      if (route.type === "admin") {
        setPage("Admin");
        setEnteredCourse(true);
        return;
      }

      const moduleIndex = modules[route.moduleIndex] ? route.moduleIndex : 0;
      const lessonIndex = modules[moduleIndex]?.lessons[route.lessonIndex] ? route.lessonIndex : 0;
      setPage("Classroom");
      setEnteredCourse(true);
      setCourseView(route.type);
      setActiveModule(moduleIndex);
      setActiveLesson(lessonIndex);
      setDrawer(null);
    }

    window.addEventListener("hashchange", syncCourseRoute);
    window.addEventListener("popstate", syncCourseRoute);
    return () => {
      window.removeEventListener("hashchange", syncCourseRoute);
      window.removeEventListener("popstate", syncCourseRoute);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem("kreaLessonProgress", JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  function updateHash(hash, replace = false) {
    if (window.location.hash === hash) return;
    const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
    window.history[replace ? "replaceState" : "pushState"](null, "", nextUrl);
  }

  function openClassroom() {
    setEnteredCourse(true);
    setPage("Classroom");
    setCourseView("catalog");
    setDrawer(null);
    updateHash(classroomHash());
    window.scrollTo({ top: 0, left: 0 });
  }

  function openModule(moduleIndex) {
    const selectedModule = modules[moduleIndex] || modules[0];
    setEnteredCourse(true);
    setActiveModule(selectedModule.number - 1);
    setActiveLesson(0);
    setCourseView("module");
    setPage("Classroom");
    setDrawer(null);
    updateHash(moduleHash(selectedModule.number));
    window.scrollTo({ top: 0, left: 0 });
  }

  function openLesson(moduleIndex, lessonIndex = 0) {
    const selectedModule = modules[moduleIndex] || modules[0];
    const selectedLesson = selectedModule.lessons[lessonIndex] || selectedModule.lessons[0];
    setEnteredCourse(true);
    setActiveModule(selectedModule.number - 1);
    setActiveLesson(selectedLesson.number - 1);
    setCourseView("lesson");
    setPage("Classroom");
    setDrawer(null);
    updateHash(lessonHash(selectedModule.number, selectedLesson.number));
    window.scrollTo({ top: 0, left: 0 });
  }

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function goToPage(nextPage) {
    if (nextPage === "Classroom") {
      openClassroom();
      return;
    }
    setEnteredCourse(true);
    setPage(nextPage);
    setDrawer(null);
    if (nextPage === "Admin") {
      updateHash("#admin");
    } else if (window.location.hash) {
      updateHash("");
    }
    window.scrollTo({ top: 0, left: 0 });
  }

  function goToLanding() {
    setEnteredCourse(false);
    setPage("Übersicht");
    setDrawer(null);
    setCourseView("catalog");
    updateHash("");
    window.scrollTo({ top: 0, left: 0 });
  }

  function markLessonComplete(moduleIndex = activeModule, lessonIndex = activeLesson) {
    setCompletedLessons((current) => {
      const next = new Set(current);
      next.add(lessonKey(moduleIndex, lessonIndex));
      return next;
    });
  }

  function openNextLesson() {
    openLesson(nextLesson.moduleIndex, nextLesson.lessonIndex);
  }

  function unlockAdmin(pin) {
    if (pin.trim().toUpperCase() === adminPin) {
      sessionStorage.setItem("kreaAdminPreview", "true");
      setAdminUnlocked(true);
      notify("Admin-Vorschau freigeschaltet.");
      return true;
    }
    notify("PIN stimmt nicht.");
    return false;
  }

  if (page === "Admin") {
    return (
      <>
        <AdminPage
          modules={modules}
          unlocked={adminUnlocked}
          unlockAdmin={unlockAdmin}
          goToPage={goToPage}
          goToLanding={goToLanding}
          notify={notify}
        />
        {toast && <div className="toast">{toast}</div>}
      </>
    );
  }

  if (page === "Übersicht" && !enteredCourse) {
    return (
      <>
        <LandingPage setPage={goToPage} openModule={openModule} />
        {toast && <div className="toast">{toast}</div>}
      </>
    );
  }

  return (
    <main className="app-shell" data-version="pages-fix-1">
      <aside className="sidebar">
        <button className="brand" onClick={() => goToPage("Übersicht")}>KREA-MIX<span>*</span></button>
        <nav>
          {nav.map(([label, Icon]) => (
            <button className={page === label ? "active" : ""} onClick={() => goToPage(label)} key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="progress-orb">
          <p>Dein Fortschritt</p>
          <div className="ring" style={{ "--progress": `${progressSummary.percent}%` }}><strong>{progressSummary.percent}%</strong></div>
          <span>{progressSummary.completed} von {progressSummary.total} Lektionen</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <label className="search">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Suche nach Lektionen, Themen oder Ressourcen..." />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <button key={result.lesson.id} onClick={() => openLesson(result.moduleIndex, result.lessonIndex)}>
                    <span>Modul {result.module.number}</span>
                    <strong>{result.lesson.title}</strong>
                  </button>
                ))}
              </div>
            )}
          </label>
          <div className="top-tabs">
            {pages.slice(0, 5).map((item) => (
              <button className={page === item ? "active" : ""} onClick={() => goToPage(item)} key={item}>{item}</button>
            ))}
          </div>
          <div className="top-actions">
            <button aria-label="Benachrichtigungen" onClick={() => setDrawer(drawer === "notice" ? null : "notice")}><Bell size={18} /><i /></button>
            <button aria-label="Nachrichten" onClick={() => setDrawer(drawer === "messages" ? null : "messages")}><MessageCircle size={18} /></button>
            <button className="avatar" aria-label="Profil" onClick={() => setDrawer(drawer === "profile" ? null : "profile")}>K</button>
          </div>
          {drawer && <TopDrawer type={drawer} setPage={goToPage} notify={notify} />}
        </header>

        {page === "Übersicht" && (
          <Dashboard
            stats={stats}
            setPage={goToPage}
            openModule={openModule}
            openNextLesson={openNextLesson}
            progressSummary={progressSummary}
            nextLesson={nextLesson}
            bookProject={bookProject}
            completedLessons={completedLessons}
          />
        )}
        {page === "Classroom" && (
          <Classroom
            view={courseView}
            activeModule={activeModule}
            activeLesson={activeLesson}
            completedLessons={completedLessons}
            markLessonComplete={markLessonComplete}
            openClassroom={openClassroom}
            openModule={openModule}
            openLesson={openLesson}
            openNextLesson={openNextLesson}
            notify={notify}
          />
        )}
        {page === "Community" && <Community notify={notify} />}
        {page === "Mitglieder" && <Members />}
        {page === "Kalender" && <CalendarPage />}
        {page === "Ressourcen" && <Resources notify={notify} openModule={openModule} />}
        {page === "Favoriten" && <Favorites openModule={openModule} completedLessons={completedLessons} />}
        {page === "Einstellungen" && <SettingsPage notify={notify} />}
        {toast && <div className="toast">{toast}</div>}
      </section>
    </main>
  );
}

function LandingPage({ setPage, openModule }) {
  const features = [
    [BookOpen, "Strukturierte Module", "Alles Schritt für Schritt erklärt", () => setPage("Classroom")],
    [Users, "Community", "Tausche dich mit anderen aus", () => setPage("Community")],
    [CalendarDays, "Flexibel lernen", "Lerne wann und wo du willst", () => setPage("Kalender")],
    [Star, "Praxis & Ergebnisse", "Weniger Theorie, mehr Umsetzung", () => openModule(0)],
  ];

  return (
    <main className="landing-page" aria-label="KREA-MIX Landingpage">
      <header className="landing-header">
        <button className="landing-brand" onClick={() => setPage("Übersicht")}>KREA-MIX<span>*</span></button>
        <nav className="landing-nav" aria-label="Landing Navigation">
          <button onClick={() => openModule(0)}>Über den Kurs</button>
          <button onClick={() => setPage("Classroom")}>Inhalte</button>
          <button onClick={() => setPage("Community")}>Für wen?</button>
          <button onClick={() => setPage("Mitglieder")}>Vorteile</button>
          <button onClick={() => setPage("Ressourcen")}>FAQ</button>
        </nav>
        <div className="landing-actions">
          <button className="landing-outline" onClick={() => setPage("Einstellungen")}>Anmelden</button>
          <button className="landing-solid" onClick={() => setPage("Übersicht")}>Jetzt starten</button>
        </div>
      </header>

      <section className="landing-hero">
        <img className="landing-hero-image" src={heroGenerated} alt="" />
        <div className="landing-copy">
          <div className="landing-pill"><Heart size={15} /> Dein kreativer Online-Kurs</div>
          <h1>Kreativit{"\u00e4"}t trifft<br />Strategie - dein Weg<br />zu mehr <span>Erfolg</span></h1>
          <p>Lerne Schritt f{"\u00fc"}r Schritt, wie du deine Ideen umsetzt, sichtbar wirst und dein Herzensprojekt erfolgreich aufbaust.</p>
          <ul>
            <li><Check size={15} /> Praxisnahe Module</li>
            <li><Check size={15} /> Sofort umsetzbar</li>
            <li><Check size={15} /> Community & Support</li>
          </ul>
          <div className="landing-cta-row">
            <button className="landing-main-cta" onClick={() => setPage("Übersicht")}>Jetzt Mitglied werden <ChevronRight size={18} /></button>
            <button className="landing-secondary-cta" onClick={() => openModule(0)}><Play size={16} /> Mehr erfahren</button>
          </div>
        </div>
      </section>

      <section className="landing-feature-row" aria-label="Kursvorteile">
        {features.map(([Icon, title, text, action]) => (
          <button className="landing-feature" key={title} onClick={action}>
            <Icon size={34} />
            <strong>{title}</strong>
            <span>{text}</span>
          </button>
        ))}
      </section>
    </main>
  );
}

function DesignBoard({ setPage, openModule }) {
  const previewCards = [
    ["Community", referenceCommunity],
    ["Kalender", referenceCalendar],
    ["Mitglieder", referenceMembers],
    ["Classroom", referenceClassroom],
  ];

  return (
    <main className="reference-board" aria-label="KREA-MIX Kurs Dashboard">
      <section className="reference-panel reference-hero" aria-label="KREA-MIX Startbereich">
        <img src={referenceHero} alt="" />
        <button className="hotspot hero-primary" onClick={() => setPage("Übersicht")} aria-label="Jetzt Mitglied werden" />
        <button className="hotspot hero-secondary" onClick={() => openModule(0)} aria-label="Mehr erfahren" />
      </section>

      <section className="reference-panel reference-dashboard" aria-label="KREA-MIX Dashboard">
        <img src={referenceDashboard} alt="" />
        <button className="hotspot nav-overview" onClick={() => setPage("Übersicht")} aria-label="Übersicht" />
        <button className="hotspot nav-classroom" onClick={() => setPage("Classroom")} aria-label="Classroom" />
        <button className="hotspot nav-community" onClick={() => setPage("Community")} aria-label="Community" />
        <button className="hotspot nav-members" onClick={() => setPage("Mitglieder")} aria-label="Mitglieder" />
        <button className="hotspot nav-calendar" onClick={() => setPage("Kalender")} aria-label="Kalender" />
        <button className="hotspot nav-resources" onClick={() => setPage("Ressourcen")} aria-label="Ressourcen" />
        <button className="hotspot nav-favorites" onClick={() => setPage("Favoriten")} aria-label="Favoriten" />
        <button className="hotspot nav-settings" onClick={() => setPage("Einstellungen")} aria-label="Einstellungen" />
        {modules.map((module, index) => (
          <button
            key={module.title}
            className={`hotspot module-hotspot module-hotspot-${index + 1}`}
            onClick={() => openModule(index)}
            aria-label={module.title}
          />
        ))}
      </section>

      <div className="reference-previews">
        {previewCards.map(([label, image]) => (
          <button className="reference-panel reference-preview" key={label} onClick={() => setPage(label)} aria-label={label}>
            <img src={image} alt="" />
          </button>
        ))}
      </div>
    </main>
  );
}

function AdminPage({ modules, unlocked, unlockAdmin, goToPage, goToLanding, notify }) {
  const [pin, setPin] = useState("");
  const [selectedModule, setSelectedModule] = useState(0);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [published, setPublished] = useState(() => modules.map((_, index) => index < 3));
  const adminStats = [
    ["128", "Mitglieder", Users],
    [`${modules.length}`, "Kursmodule", BookOpen],
    [`${totalLessons}`, "Lektionen", FileText],
    ["92%", "Systemstatus", ShieldCheck],
  ];

  function submitPin(event) {
    event.preventDefault();
    if (unlockAdmin(pin)) setPin("");
  }

  function togglePublished(index) {
    setPublished((current) => current.map((item, i) => (i === index ? !item : item)));
    notify(published[index] ? "Modul als Entwurf markiert." : "Modul freigegeben.");
  }

  if (!unlocked) {
    return (
      <main className="admin-gate">
        <section className="admin-login-card">
          <button className="admin-back" onClick={goToLanding}><ChevronLeft size={16} /> Zur Landingpage</button>
          <div className="admin-lock"><Lock size={34} /></div>
          <span>KREA-MIX Admin</span>
          <h1>Gesch{"\u00fct"}zter Verwaltungsbereich</h1>
          <p>Dies ist die visuelle Vorschau für deinen später echten Admin-Account. Der Bereich ist nicht in der normalen Navigation sichtbar.</p>
          <form onSubmit={submitPin}>
            <input value={pin} onChange={(event) => setPin(event.target.value)} placeholder="Preview-PIN eingeben" />
            <button className="admin-primary">Adminbereich ansehen</button>
          </form>
          <small>Preview-PIN: <strong>{adminPin}</strong></small>
        </section>
      </main>
    );
  }

  const active = modules[selectedModule];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <button className="admin-brand" onClick={goToLanding}>KREA-MIX<span>*</span></button>
        <div className="admin-owner">
          <UserCog size={18} />
          <div className="avatar">K</div>
          <div>
            <strong>Klaus</strong>
            <span>Administrator</span>
          </div>
        </div>
        <nav className="admin-nav">
          {["Dashboard", "Kursinhalte", "Mitglieder", "Community", "Kalender", "Einstellungen"].map((item, index) => (
            <button className={index === 0 ? "active" : ""} key={item}>{item}</button>
          ))}
        </nav>
        <button className="admin-exit" onClick={goToLanding}><ChevronLeft size={16} /> Zur Webseite</button>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span>Adminbereich</span>
            <h1>Kurssteuerung</h1>
          </div>
          <div className="admin-top-actions">
            <button onClick={() => notify("Entwurfsansicht vorbereitet.")}><Play size={17} /> Vorschau</button>
            <button className="admin-primary" onClick={() => notify("Änderungen lokal gespeichert.")}><Check size={17} /> Speichern</button>
          </div>
        </header>

        <div className="admin-stat-grid">
          {adminStats.map(([number, label, Icon]) => (
            <article className="admin-stat" key={label}>
              <Icon size={24} />
              <strong>{number}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <section className="admin-grid">
          <div className="admin-panel admin-panel-large">
            <div className="admin-panel-head">
              <div>
                <span>Kursstruktur</span>
                <h2>Module verwalten</h2>
              </div>
              <button onClick={() => notify("Neues Modul als Entwurf angelegt.")}><Plus size={16} /> Modul</button>
            </div>
            <div className="admin-module-list">
              {modules.map((module, index) => (
                <button className={selectedModule === index ? "selected" : ""} key={module.title} onClick={() => setSelectedModule(index)}>
                  <ModulePhoto module={module} />
                  <div>
                    <span>Modul {module.number}</span>
                    <strong>{module.title}</strong>
                    {module.subtitle ? <small>{module.subtitle}</small> : null}
                    <small>{module.lessons.length} Lektionen</small>
                  </div>
                  <em className={published[index] ? "live" : ""}>{published[index] ? "Live" : "Entwurf"}</em>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span>Auswahl</span>
                <h2>{active.title}</h2>
              </div>
            </div>
            <label className="admin-field">
              Modultitel
              <input value={active.title} readOnly />
            </label>
            <label className="admin-field">
              Beschreibung
              <textarea value={active.result} readOnly />
            </label>
            <div className="admin-toggle-row">
              <div>
                <strong>Ver{"\u00f6"}ffentlicht</strong>
                <span>{published[selectedModule] ? "Teilnehmerinnen sehen dieses Modul." : "Nur Admin-Vorschau."}</span>
              </div>
              <button className={published[selectedModule] ? "toggle on" : "toggle"} onClick={() => togglePublished(selectedModule)} aria-label="Modul veröffentlichen" />
            </div>
            <button className="admin-wide-button" onClick={() => notify("Lektionseditor vorbereitet.")}>Lektionen bearbeiten</button>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span>Mitglieder</span>
                <h2>Neueste Aktivität</h2>
              </div>
            </div>
            <div className="admin-member-list">
              {members.map((member, index) => (
                <div key={member}>
                  <div className="avatar">{member[0]}</div>
                  <div>
                    <strong>{member}</strong>
                    <span>{index < 2 ? "Heute aktiv" : "Diese Woche aktiv"}</span>
                  </div>
                  <em>{index < 3 ? "Aktiv" : "Pause"}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span>System</span>
                <h2>Freigaben</h2>
              </div>
            </div>
            <div className="admin-check-list">
              {["Neue Kommentare prüfen", "Workbook Uploads kontrollieren", "Live-Q&A Termin veröffentlichen"].map((item) => (
                <label key={item}><input type="checkbox" /> {item}</label>
              ))}
            </div>
            <div className="admin-toggle-row">
              <div>
                <strong>Wartungsmodus</strong>
                <span>Nur als UI-Preview, später mit Backend.</span>
              </div>
              <button className={maintenanceMode ? "toggle on" : "toggle"} onClick={() => setMaintenanceMode(!maintenanceMode)} aria-label="Wartungsmodus" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function TopDrawer({ type, setPage, notify }) {
  const content = {
    notice: ["Live-Q&A beginnt heute um 19:00", "Neue Workbook-Vorlage ist verfügbar", "Anna hat deinen Beitrag kommentiert"],
    messages: ["Sophie: Danke für deine Frage!", "Laura: Ich habe dir die Vorlage geteilt", "Team KREA: Willkommen im Kurs"],
    profile: ["Profil bearbeiten", "Mein Fortschritt", "Einstellungen"],
  }[type];
  return (
    <div className="top-drawer">
      {content.map((item) => (
        <button
          key={item}
          onClick={() => {
            if (item.includes("Einstellungen")) setPage("Einstellungen");
            else notify(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Dashboard({ stats, setPage, openModule, openNextLesson, progressSummary, nextLesson, bookProject, completedLessons }) {
  const projectPhase = coursePhases.find((phase) => phase.id === bookProject.phaseId);
  return (
    <div className="page dashboard">
      <div className="welcome">
        <div>
          <h1>Hallo, sch{"\u00f6"}n dich zu sehen! <span>{"\uD83D\uDC4B"}</span></h1>
          <p>Hier geht's weiter mit deinem Buchprojekt und den n{"\u00e4"}chsten KDP-Schritten.</p>
        </div>
      </div>
      <div className="dashboard-focus">
        <NextLessonCard progressSummary={progressSummary} nextLesson={nextLesson} onContinue={openNextLesson} />
        <BookProjectCard project={bookProject} phase={projectPhase} />
      </div>
      <div className="stats">{stats.map(([n, l, Icon]) => <Glass key={l}><Icon /><strong>{n}</strong><span>{l}</span></Glass>)}</div>
      <ToolsSection openModule={openModule} compact />
      <SectionTitle title="Deine Module" action="Alle anzeigen" onClick={() => setPage("Classroom")} />
      <div className="module-grid dashboard-preview">
        {modules.slice(0, 6).map((m, i) => (
          <ModuleCard
            key={m.id}
            module={m}
            moduleIndex={i}
            phaseNumber={coursePhases.find((phase) => phase.id === m.phaseId)?.number}
            completedLessons={completedLessons}
            onClick={() => openModule(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Classroom({
  view,
  activeModule,
  activeLesson,
  completedLessons,
  markLessonComplete,
  openClassroom,
  openModule,
  openLesson,
  openNextLesson,
  notify,
}) {
  const selected = modules[activeModule];
  const lesson = selected.lessons[activeLesson] || selected.lessons[0];
  const phase = coursePhases.find((item) => item.id === selected.phaseId) || coursePhases[0];

  if (view === "module") {
    return (
      <ModuleDetailPage
        module={selected}
        moduleIndex={activeModule}
        phase={phase}
        completedLessons={completedLessons}
        onBack={openClassroom}
        onLesson={(lessonIndex) => openLesson(activeModule, lessonIndex)}
      />
    );
  }

  if (view === "lesson") {
    return (
      <LessonPage
        module={selected}
        moduleIndex={activeModule}
        lesson={lesson}
        lessonIndex={activeLesson}
        phase={phase}
        completedLessons={completedLessons}
        previousLesson={getAdjacentLesson(activeModule, activeLesson, -1)}
        nextLesson={getAdjacentLesson(activeModule, activeLesson, 1)}
        onModule={() => openModule(activeModule)}
        onNavigate={(target) => openLesson(target.moduleIndex, target.lessonIndex)}
        onComplete={() => markLessonComplete(activeModule, activeLesson)}
        onDownload={(download) => {
          if (download.url) {
            window.open(download.url, "_blank", "noopener,noreferrer");
          } else {
            notify(`${download.title} ist vorbereitet und wird mit dem Backend verknüpft.`);
          }
        }}
      />
    );
  }

  return (
    <ClassroomCatalog
      phases={coursePhases}
      activeModule={activeModule}
      completedLessons={completedLessons}
      foundationProgress={getPhaseProgress("phase-1", completedLessons)}
      nextLesson={getNextLesson(completedLessons)}
      onModule={openModule}
      onContinue={openNextLesson}
    />
  );
}

function Community({ notify }) {
  const [composerOpen, setComposerOpen] = useState(false);
  return (
    <div className="page">
      <SectionTitle title="Community" action="Neuer Beitrag" onClick={() => setComposerOpen(true)} />
      {composerOpen && (
        <div className="composer">
          <button className="composer-close" aria-label="Beitrag schliessen" onClick={() => setComposerOpen(false)}><X size={16} /></button>
          <strong>Neuer Beitrag</strong>
          <textarea placeholder="Was möchtest du mit der Community teilen?" />
          <button
            className="primary"
            onClick={() => {
              setComposerOpen(false);
              notify("Beitrag als Entwurf angelegt.");
            }}
          >
            Entwurf speichern
          </button>
        </div>
      )}
      <div className="feed">{posts.map((p) => <Post key={p[0]} post={p} />)}</div>
    </div>
  );
}

function Members() {
  return <div className="page"><SectionTitle title="Mitglieder" action="Alle" /><div className="member-list">{members.map((m) => <div className="member" key={m}><div className="avatar">{m[0]}</div><div><strong>{m}</strong><span>Krea-Teilnehmerin</span></div><em>Aktiv</em><MoreHorizontal size={18} /></div>)}</div></div>;
}

function CalendarPage() {
  return <div className="page calendar-page"><SectionTitle title="Kalender" action="Monat" /><CalendarBlock /><Panel title="Deine nächsten Events"><Agenda /></Panel></div>;
}

function SettingsPage({ notify }) {
  return <div className="page settings-page"><SectionTitle title="Einstellungen" action="Speichern" onClick={() => notify("Einstellungen gespeichert.")} /><Panel title="Profil"><input defaultValue="Klaus" /><input defaultValue="klaus@example.com" /><button className="primary" onClick={() => notify("Profil gespeichert.")}>Änderungen speichern</button></Panel></div>;
}

function SectionTitle({ title, action, onClick }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button onClick={onClick}>{action}</button>}</div>;
}

function Glass({ children }) { return <div className="glass">{children}</div>; }
function Panel({ title, children }) { return <section className="panel"><h2>{title}</h2>{children}</section>; }

function Resources({ notify, openModule }) {
  const resourceItems = ["Checkliste: Kreativer Monatsplan", "Tutorial: Canva für Anfänger", "Workbook: Markenwerte", "Vorlagen-Paket Branding"];
  return (
    <div className="page">
      <SectionTitle title="Ressourcen" action={<><Upload size={15} /> Upload</>} onClick={() => notify("Upload-Bereich vorbereitet.")} />
      <ToolsSection openModule={openModule} />
      <div className="resource-grid">
        {resourceItems.map((resource, index) => (
          <Glass key={resource}><FileText /><strong>{resource}</strong><span>{index % 2 ? "Video - 18 Min." : "PDF - 1.3 MB"}</span></Glass>
        ))}
      </div>
    </div>
  );
}

function Favorites({ openModule, completedLessons }) {
  return (
    <div className="page">
      <SectionTitle title="Favoriten" action="Sortieren" />
      <div className="module-grid">
        {modules.slice(0, 3).map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            moduleIndex={index}
            phaseNumber={coursePhases.find((phase) => phase.id === module.phaseId)?.number}
            completedLessons={completedLessons}
            onClick={() => openModule(index)}
          />
        ))}
      </div>
    </div>
  );
}

function PostList({ compact }) {
  return <>{posts.slice(0, compact ? 3 : posts.length).map((post) => <Post key={post[0]} post={post} compact={compact} />)}</>;
}

function Post({ post, compact }) {
  return <article className="post"><div className="avatar">{post[0][0]}</div><div><strong>{post[1]}</strong><p>{post[2]}</p><span><Heart size={14} /> {post[3]} <MessageCircle size={14} /> {post[4]} Kommentare</span></div>{!compact && <div className="thumb photo module-14" />}</article>;
}

function Agenda() {
  return <div className="agenda">{[["Live-Q&A Session", "Mittwoch, 14. Mai - 19:00 Uhr", "Live"], ["Workbook Workshop", "Samstag, 17. Mai - 10:00 Uhr", "Neu"], ["Fokus Session", "Dienstag, 20. Mai - 18:30 Uhr", ""]].map((e) => <div className="event" key={e[0]}><CalendarDays size={17} /><div><strong>{e[0]}</strong><span>{e[1]}</span></div>{e[2] && <em>{e[2]}</em>}</div>)}</div>;
}

function CalendarBlock() {
  return <div className="calendar"><div><button><ChevronLeft /></button><strong>Mai 2025</strong><button><ChevronRight /></button></div>{["Mo","Di","Mi","Do","Fr","Sa","So",...Array.from({length:35},(_,i)=>String(i+1))].map((d,i)=><button className={[7,16,20,27].includes(i) ? "marked" : ""} key={i}>{d}</button>)}</div>;
}

createRoot(document.getElementById("root")).render(<App />);
