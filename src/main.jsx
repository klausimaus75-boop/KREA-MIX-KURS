import React, { useMemo, useState } from "react";
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
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Upload,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const modules = [
  {
    title: "Dein Fundament",
    subtitle: "",
    label: "Modul 1",
    progress: 80,
    lessonsText: "12 Lektionen",
    photo: "desk",
    description: "Lege die Basis fuer deine kreative Positionierung und klare Wochenstruktur.",
    lessons: ["Deine Vision & Ziele", "Deine Zielgruppe", "Positionierung", "Deine Botschaft", "Zusammenfassung"],
  },
  {
    title: "Dein Angebot",
    subtitle: "",
    label: "Modul 2",
    progress: 60,
    lessonsText: "10 Lektionen",
    photo: "candles",
    description: "Forme aus deiner Idee ein Angebot, das sich leicht erklaeren und verkaufen laesst.",
    lessons: ["Angebotskern", "Promise & Ergebnis", "Preisstruktur", "Launch-Check", "Workbook"],
  },
  {
    title: "Deine Sichtbarkeit",
    subtitle: "",
    label: "Modul 3",
    progress: 45,
    lessonsText: "8 Lektionen",
    photo: "tablet",
    description: "Plane Content, der warm wirkt und trotzdem strategisch auf dein Ziel einzahlt.",
    lessons: ["Content-Saeulen", "Instagram-Rhythmus", "Storytelling", "Call to Action", "Redaktionsplan"],
  },
  {
    title: "Deine Produkte",
    subtitle: "",
    label: "Modul 4",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "journal",
    description: "Baue digitale Produkte, Vorlagen und Ressourcen fuer deinen Kurskosmos.",
    lessons: ["Produktidee", "Struktur", "Materialien", "Pricing", "Upload"],
  },
  {
    title: "Verkauf & Marketing",
    subtitle: "",
    label: "Modul 5",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "laptop",
    description: "Erstelle eine Verkaufsseite, E-Mail-Sequenz und klare Kundenreise.",
    lessons: ["Sales Page", "E-Mail Flow", "Einwandarbeit", "Checkout", "Analyse"],
  },
  {
    title: "Automation & Tools",
    subtitle: "",
    label: "Modul 6",
    progress: 0,
    lessonsText: "7 Lektionen",
    photo: "studio",
    description: "Verbinde Tools, Vorlagen und Automationen fuer ein leichteres Kurssystem.",
    lessons: ["Toolstack", "Zapier Basics", "Memberbereich", "Tracking", "Launch-Board"],
  },
];

const posts = [
  ["Anna M.", "Mein erster Erfolg mit Modul 2!", "Ich konnte mein erstes Angebot sichtbar machen und bin so happy.", 24, 8],
  ["Julia P.", "Frage zu Canva Vorlagen", "Hat jemand eine Empfehlung fuer schoene Vorlagen fuer Workbook?", 19, 12],
  ["Laura K.", "Neue Datei geteilt", "Kundenavatar-Vorlage fuer die Positionierung.", 16, 4],
];

const members = ["Sophie L.", "Lena K.", "Marie B.", "Tanja W.", "Lisa M."];
const pages = ["Uebersicht", "Classroom", "Community", "Mitglieder", "Kalender", "Ressourcen", "Favoriten", "Einstellungen"];

const nav = [
  ["Uebersicht", Home],
  ["Classroom", BookOpen],
  ["Community", Users],
  ["Mitglieder", Users],
  ["Kalender", CalendarDays],
  ["Ressourcen", FileText],
  ["Favoriten", Star],
  ["Einstellungen", Settings],
];

function App() {
  const [page, setPage] = useState("Uebersicht");
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState("");
  const stats = useMemo(
    () => [
      ["8", "Module", BookOpen],
      ["24", "Lektionen", FileText],
      ["12h", "Lernzeit", Clock3],
      ["65%", "Fortschritt", Sparkles],
    ],
    []
  );
  const searchResults = query.trim()
    ? modules
        .flatMap((module, moduleIndex) =>
          module.lessons.map((lesson, lessonIndex) => ({ module, moduleIndex, lesson, lessonIndex }))
        )
        .filter((item) => `${item.module.title} ${item.lesson}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  function openModule(moduleIndex, lessonIndex = 0) {
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    setPage("Classroom");
    setDrawer(null);
  }

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function goToPage(nextPage) {
    setPage(nextPage);
    setDrawer(null);
  }

  return (
    <main className="app-shell" data-version="pages-fix-1">
      <aside className="sidebar">
        <button className="brand" onClick={() => goToPage("Uebersicht")}>KREA-MIX<span>*</span></button>
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
          <div className="ring"><strong>65%</strong></div>
          <span>Weiter so! Du bist grossartig.</span>
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
                  <button key={`${result.module.label}-${result.lesson}`} onClick={() => openModule(result.moduleIndex, result.lessonIndex)}>
                    <span>{result.module.label}</span>
                    <strong>{result.lesson}</strong>
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

        {page === "Uebersicht" && <Dashboard stats={stats} setPage={goToPage} openModule={openModule} />}
        {page === "Classroom" && <Classroom activeModule={activeModule} activeLesson={activeLesson} setActiveModule={setActiveModule} setActiveLesson={setActiveLesson} />}
        {page === "Community" && <Community notify={notify} />}
        {page === "Mitglieder" && <Members />}
        {page === "Kalender" && <CalendarPage />}
        {page === "Ressourcen" && <Resources notify={notify} />}
        {page === "Favoriten" && <Favorites openModule={openModule} />}
        {page === "Einstellungen" && <SettingsPage notify={notify} />}
        {toast && <div className="toast">{toast}</div>}
      </section>
    </main>
  );
}

function TopDrawer({ type, setPage, notify }) {
  const content = {
    notice: ["Live-Q&A beginnt heute um 19:00", "Neue Workbook-Vorlage ist verfuegbar", "Anna hat deinen Beitrag kommentiert"],
    messages: ["Sophie: Danke fuer deine Frage!", "Laura: Ich habe dir die Vorlage geteilt", "Team KREA: Willkommen im Kurs"],
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

function Dashboard({ stats, setPage, openModule }) {
  return (
    <div className="page dashboard">
      <div className="welcome">
        <div>
          <h1>Hallo, sch{"\u00f6"}n dich zu sehen! <span>{"\uD83D\uDC4B"}</span></h1>
          <p>Hier geht's weiter, wo du aufgeh{"\u00f6"}rt hast.</p>
        </div>
      </div>
      <div className="stats">{stats.map(([n, l, Icon]) => <Glass key={l}><Icon /><strong>{n}</strong><span>{l}</span></Glass>)}</div>
      <SectionTitle title="Deine Module" action="Alle anzeigen" onClick={() => setPage("Classroom")} />
      <div className="module-grid">{modules.map((m, i) => <ModuleCard key={m.title} data={m} onClick={() => openModule(i)} />)}</div>
    </div>
  );
}

function Classroom({ activeModule, activeLesson, setActiveModule, setActiveLesson }) {
  const selected = modules[activeModule];
  const lesson = selected.lessons[activeLesson] || selected.lessons[0];
  const completeLesson = () => setActiveLesson(Math.min(activeLesson + 1, selected.lessons.length - 1));
  return (
    <div className="page classroom">
      <SectionTitle title="Classroom" action={`${selected.label} wechseln`} />
      <div className="lesson-layout">
        <div className="video-card">
          <div className={`photo ${selected.photo}`}><button aria-label="Lektion starten"><Play fill="currentColor" /></button></div>
          <span className="lesson-kicker">{selected.label} / Lektion {activeLesson + 1}</span>
          <h2>{lesson}</h2>
          {selected.subtitle && <strong className="module-subtitle">{selected.subtitle}</strong>}
          <p>{selected.description}</p>
          <div className="lesson-actions">
            <button className="outline" onClick={completeLesson}><Check size={16} /> Als abgeschlossen markieren</button>
            <button className="outline"><FileText size={16} /> Workbook oeffnen</button>
          </div>
        </div>
        <aside className="lesson-list">
          <h3>Lektionen</h3>
          {selected.lessons.map((item, i) => (
            <button className={i === activeLesson ? "active" : ""} key={item} onClick={() => setActiveLesson(i)}>
              <span>{activeModule + 1}.{i + 1}</span>{item}<ChevronRight size={15} />
            </button>
          ))}
        </aside>
      </div>
      <SectionTitle title="Alle Module" />
      <div className="module-grid small">
        {modules.map((m, i) => (
          <ModuleCard
            key={m.title}
            data={m}
            selected={i === activeModule}
            onClick={() => {
              setActiveModule(i);
              setActiveLesson(0);
            }}
          />
        ))}
      </div>
    </div>
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
          <textarea placeholder="Was moechtest du mit der Community teilen?" />
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
  return <div className="page calendar-page"><SectionTitle title="Kalender" action="Monat" /><CalendarBlock /><Panel title="Deine naechsten Events"><Agenda /></Panel></div>;
}

function Resources({ notify }) {
  return <div className="page"><SectionTitle title="Ressourcen" action={<><Upload size={15} /> Upload</>} onClick={() => notify("Upload-Bereich vorbereitet.")} /><div className="resource-grid">{["Checkliste: Kreativer Monatsplan", "Tutorial: Canva fuer Anfaenger", "Workbook: Markenwerte", "Vorlagen-Paket Branding"].map((r, i) => <Glass key={r}><FileText /><strong>{r}</strong><span>{i % 2 ? "Video - 18 Min." : "PDF - 1.3 MB"}</span></Glass>)}</div></div>;
}

function Favorites({ openModule }) {
  return <div className="page"><SectionTitle title="Favoriten" action="Sortieren" /><div className="module-grid">{modules.slice(0, 3).map((m, i) => <ModuleCard key={m.title} data={m} onClick={() => openModule(i)} />)}</div></div>;
}

function SettingsPage({ notify }) {
  return <div className="page settings-page"><SectionTitle title="Einstellungen" action="Speichern" onClick={() => notify("Einstellungen gespeichert.")} /><Panel title="Profil"><input defaultValue="Klaus" /><input defaultValue="klaus@example.com" /><button className="primary" onClick={() => notify("Profil gespeichert.")}>Aenderungen speichern</button></Panel></div>;
}

function SectionTitle({ title, action, onClick }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button onClick={onClick}>{action}</button>}</div>;
}

function Glass({ children }) { return <div className="glass">{children}</div>; }
function Panel({ title, children }) { return <section className="panel"><h2>{title}</h2>{children}</section>; }

function ModuleCard({ data, selected, onClick }) {
  return (
    <button className={`module-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className={`photo ${data.photo}`} />
      <span>{data.label}</span>
      <strong>{data.title}</strong>
      {data.subtitle && <em>{data.subtitle}</em>}
      <div className="bar"><i style={{ width: `${data.progress}%` }} /></div>
      <small>{data.lessonsText}<b>{data.progress}%</b></small>
    </button>
  );
}

function PostList({ compact }) {
  return <>{posts.slice(0, compact ? 3 : posts.length).map((post) => <Post key={post[0]} post={post} compact={compact} />)}</>;
}

function Post({ post, compact }) {
  return <article className="post"><div className="avatar">{post[0][0]}</div><div><strong>{post[1]}</strong><p>{post[2]}</p><span><Heart size={14} /> {post[3]} <MessageCircle size={14} /> {post[4]} Kommentare</span></div>{!compact && <div className="thumb photo candles" />}</article>;
}

function Agenda() {
  return <div className="agenda">{[["Live-Q&A Session", "Mittwoch, 14. Mai - 19:00 Uhr", "Live"], ["Workbook Workshop", "Samstag, 17. Mai - 10:00 Uhr", "Neu"], ["Fokus Session", "Dienstag, 20. Mai - 18:30 Uhr", ""]].map((e) => <div className="event" key={e[0]}><CalendarDays size={17} /><div><strong>{e[0]}</strong><span>{e[1]}</span></div>{e[2] && <em>{e[2]}</em>}</div>)}</div>;
}

function CalendarBlock() {
  return <div className="calendar"><div><button><ChevronLeft /></button><strong>Mai 2025</strong><button><ChevronRight /></button></div>{["Mo","Di","Mi","Do","Fr","Sa","So",...Array.from({length:35},(_,i)=>String(i+1))].map((d,i)=><button className={[7,16,20,27].includes(i) ? "marked" : ""} key={i}>{d}</button>)}</div>;
}

createRoot(document.getElementById("root")).render(<App />);
