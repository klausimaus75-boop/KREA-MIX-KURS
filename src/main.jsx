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
} from "lucide-react";
import "./styles.css";

const modules = [
  ["Dein Fundament", "Modul 1", 80, "12 Lektionen", "desk"],
  ["Dein Angebot", "Modul 2", 60, "10 Lektionen", "candles"],
  ["Deine Sichtbarkeit", "Modul 3", 45, "8 Lektionen", "tablet"],
  ["Deine Produkte", "Modul 4", 0, "6 Lektionen", "journal"],
  ["Verkauf & Marketing", "Modul 5", 0, "6 Lektionen", "laptop"],
  ["Automation & Tools", "Modul 6", 0, "7 Lektionen", "studio"],
];

const posts = [
  ["Anna M.", "Mein erster Erfolg mit Modul 2!", "Ich konnte mein erstes Angebot sichtbar machen und bin so happy.", 24, 8],
  ["Julia P.", "Frage zu Canva Vorlagen", "Hat jemand eine Empfehlung fuer schoene Vorlagen fuer Workbook?", 19, 12],
  ["Laura K.", "Neue Datei geteilt", "Kundenavatar-Vorlage fuer die Positionierung.", 16, 4],
];

const members = ["Sophie L.", "Lena K.", "Marie B.", "Tanja W.", "Lisa M."];

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

function App() {
  const [page, setPage] = useState("Übersicht");
  const [activeModule, setActiveModule] = useState(0);
  const stats = useMemo(
    () => [
      ["8", "Module", BookOpen],
      ["24", "Lektionen", FileText],
      ["12h", "Lernzeit", Clock3],
      ["65%", "Fortschritt", Sparkles],
    ],
    []
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">KREA-MIX<span>✦</span></div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button className={page === label ? "active" : ""} onClick={() => setPage(label)} key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="progress-orb">
          <p>Dein Fortschritt</p>
          <div className="ring"><strong>65%</strong></div>
          <span>Weiter so! Du bist gro&szlig;artig.</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <label className="search">
            <Search size={17} />
            <input placeholder="Suche nach Lektionen, Themen oder Ressourcen..." />
          </label>
          <div className="top-actions">
            <button><Bell size={18} /><i /></button>
            <button><MessageCircle size={18} /></button>
            <div className="avatar">K</div>
          </div>
        </header>

        {page === "Übersicht" && <Dashboard stats={stats} setPage={setPage} setActiveModule={setActiveModule} />}
        {page === "Classroom" && <Classroom activeModule={activeModule} setActiveModule={setActiveModule} />}
        {page === "Community" && <Community />}
        {page === "Mitglieder" && <Members />}
        {page === "Kalender" && <CalendarPage />}
        {page === "Ressourcen" && <Resources />}
        {page === "Favoriten" && <Favorites />}
        {page === "Einstellungen" && <SettingsPage />}
      </section>
    </main>
  );
}

function Dashboard({ stats, setPage, setActiveModule }) {
  return (
    <div className="page dashboard">
      <div className="welcome">
        <div>
          <h1>Hallo, schön dich zu sehen! <span>♡</span></h1>
          <p>Hier geht's weiter, wo du aufgehört hast.</p>
        </div>
        <button className="primary" onClick={() => setPage("Classroom")}><Play size={17} /> Weiterlernen</button>
      </div>
      <div className="stats">{stats.map(([n, l, Icon]) => <Glass key={l}><Icon /><strong>{n}</strong><span>{l}</span></Glass>)}</div>
      <SectionTitle title="Deine Module" action="Alle anzeigen" onClick={() => setPage("Classroom")} />
      <div className="module-grid">{modules.map((m, i) => <ModuleCard key={m[0]} data={m} onClick={() => { setActiveModule(i); setPage("Classroom"); }} />)}</div>
      <div className="split">
        <Panel title="Neue Beiträge"><PostList compact /></Panel>
        <Panel title="Nächste Termine"><Agenda /></Panel>
      </div>
    </div>
  );
}

function Classroom({ activeModule, setActiveModule }) {
  const selected = modules[activeModule];
  return (
    <div className="page classroom">
      <SectionTitle title="Classroom" action="Neue Notiz" />
      <div className="lesson-layout">
        <div className="video-card">
          <div className={`photo ${selected[4]}`}><button><Play fill="currentColor" /></button></div>
          <h2>{selected[0]}</h2>
          <p>Arbeite Schritt fuer Schritt an deinem klaren kreativen Angebot.</p>
          <button className="outline"><Check size={16} /> Als abgeschlossen markieren</button>
        </div>
        <aside className="lesson-list">
          <h3>Lektionen</h3>
          {["Deine Vision & Ziele", "Deine Zielgruppe", "Positionierung", "Deine Botschaft", "Zusammenfassung"].map((lesson, i) => (
            <button className={i === 0 ? "active" : ""} key={lesson} onClick={() => setActiveModule((activeModule + i) % modules.length)}>
              <span>1.{i + 1}</span>{lesson}<ChevronRight size={15} />
            </button>
          ))}
        </aside>
      </div>
      <div className="module-grid small">{modules.map((m, i) => <ModuleCard key={m[0]} data={m} onClick={() => setActiveModule(i)} />)}</div>
    </div>
  );
}

function Community() {
  return <div className="page"><SectionTitle title="Community" action="Neuer Beitrag" /><div className="feed">{posts.map((p) => <Post key={p[0]} post={p} />)}</div></div>;
}

function Members() {
  return <div className="page"><SectionTitle title="Mitglieder" action="Alle" /><div className="member-list">{members.map((m, i) => <div className="member" key={m}><div className="avatar">{m[0]}</div><div><strong>{m}</strong><span>Krea-Teilnehmerin</span></div><em>Aktiv</em><MoreHorizontal size={18} /></div>)}</div></div>;
}

function CalendarPage() {
  return <div className="page calendar-page"><SectionTitle title="Kalender" action="Monat" /><CalendarBlock /><Panel title="Deine nächsten Events"><Agenda /></Panel></div>;
}

function Resources() {
  return <div className="page"><SectionTitle title="Ressourcen" action="Upload" /><div className="resource-grid">{["Checkliste: Kreativer Monatsplan", "Tutorial: Canva fuer Anfaenger", "Workbook: Markenwerte", "Vorlagen-Paket Branding"].map((r, i) => <Glass key={r}><FileText /><strong>{r}</strong><span>{i % 2 ? "Video · 18 Min." : "PDF · 1.3 MB"}</span></Glass>)}</div></div>;
}

function Favorites() {
  return <div className="page"><SectionTitle title="Favoriten" action="Sortieren" /><div className="module-grid">{modules.slice(0, 3).map((m) => <ModuleCard key={m[0]} data={m} />)}</div></div>;
}

function SettingsPage() {
  return <div className="page settings-page"><SectionTitle title="Einstellungen" action="Speichern" /><Panel title="Profil"><input defaultValue="Klaus" /><input defaultValue="klaus@example.com" /><button className="primary">Änderungen speichern</button></Panel></div>;
}

function SectionTitle({ title, action, onClick }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button onClick={onClick}>{action}</button>}</div>;
}

function Glass({ children }) { return <div className="glass">{children}</div>; }
function Panel({ title, children }) { return <section className="panel"><h2>{title}</h2>{children}</section>; }

function ModuleCard({ data, onClick }) {
  const [title, mod, progress, lessons, photo] = data;
  return <button className="module-card" onClick={onClick}><div className={`photo ${photo}`} /><span>{mod}</span><strong>{title}</strong><div className="bar"><i style={{ width: `${progress}%` }} /></div><small>{lessons}<b>{progress}%</b></small></button>;
}

function PostList({ compact }) {
  return <>{posts.slice(0, compact ? 3 : posts.length).map((post) => <Post key={post[0]} post={post} compact={compact} />)}</>;
}

function Post({ post, compact }) {
  return <article className="post"><div className="avatar">{post[0][0]}</div><div><strong>{post[1]}</strong><p>{post[2]}</p><span><Heart size={14} /> {post[3]} <MessageCircle size={14} /> {post[4]} Kommentare</span></div>{!compact && <div className="thumb photo candles" />}</article>;
}

function Agenda() {
  return <div className="agenda">{[["Live-Q&A Session", "Mittwoch, 14. Mai · 19:00 Uhr", "Live"], ["Workbook Workshop", "Samstag, 17. Mai · 10:00 Uhr", "Neu"], ["Fokus Session", "Dienstag, 20. Mai · 18:30 Uhr", ""]].map((e) => <div className="event" key={e[0]}><CalendarDays size={17} /><div><strong>{e[0]}</strong><span>{e[1]}</span></div>{e[2] && <em>{e[2]}</em>}</div>)}</div>;
}

function CalendarBlock() {
  return <div className="calendar"><div><button><ChevronLeft /></button><strong>Mai 2025</strong><button><ChevronRight /></button></div>{["Mo","Di","Mi","Do","Fr","Sa","So",...Array.from({length:35},(_,i)=>String(i+1))].map((d,i)=><span className={[7,16,20,27].includes(i) ? "marked" : ""} key={i}>{d}</span>)}</div>;
}

createRoot(document.getElementById("root")).render(<App />);
