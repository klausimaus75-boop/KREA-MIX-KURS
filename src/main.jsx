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

const moduleImageFiles = import.meta.glob("./assets/modules/module-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const baseModules = [
  {
    title: "Los geht's: Wir bauen dein erstes Buch",
    subtitle: "Start",
    label: "Modul 1",
    progress: 0,
    lessonsText: "5 Lektionen",
    photo: "module-01",
    description: "Kursordner steht, Ziel ist klar, die Teilnehmerin weiß, wie sie den Kurs abarbeitet.",
    lessons: [
      "Kursversprechen: Am Ende steht ein fertiges Buchprojekt mit Upload-Plan",
      "So arbeitet der Kurs: kurze Videos, klare PDFs, Aufgaben, Checklisten",
      "Kursordner anlegen: Buchprojekt, Canva, Cover, Export, Marketing, Belege",
      "Erstes Ziel festlegen: Welche Art Buch soll am Ende entstehen?",
      "Arbeitsregel: Wir erklären nur, was für den nächsten Schritt gebraucht wird",
    ],
  },
  {
    title: "Dein KreaMix-Spickzettel: Was ist was?",
    subtitle: "Start",
    label: "Modul 2",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-02",
    description: "Ein Nachschlagebereich, der später immer wieder genutzt werden kann.",
    lessons: [
      "KDP, Amazon, Taschenbuch, Hardcover, E-Book, Print-on-Demand",
      "BSR, Keywords, Kategorien, Nische, Zielgruppe, Buchbeschreibung",
      "ISBN, ASIN, Impressum, Royalty, Preis, Druckkosten",
      "A+ Content, Mockup, Fullcover, Beschnitt, PDF-Druckdatei",
      "Affiliate, Digistore24, Affiliate-Link, Kennzeichnung, Provision",
      "Amazon Ads, Reels, Stories, Pins, Hooks, CTA",
    ],
  },
  {
    title: "Dein KI-Helfer: ChatGPT richtig nutzen",
    subtitle: "Start",
    label: "Modul 3",
    progress: 0,
    lessonsText: "5 Lektionen",
    photo: "module-03",
    description: "Die Teilnehmerin kann ChatGPT als ruhigen Buchhelfer nutzen.",
    lessons: [
      "Wie spreche ich mit ChatGPT, damit brauchbare Antworten entstehen?",
      "Der einfache Prompt-Aufbau: Rolle, Ziel, Kontext, Ausgabeformat",
      "Wie man Antworten verbessert: kürzer, einfacher, genauer, anfängerfreundlicher",
      "Wie man KI-Fehler erkennt: Fakten prüfen, Wiederholungen finden, Ton verbessern",
      "Was ChatGPT nicht allein entscheiden soll: Recht, Steuern, Marken, sensible Aussagen",
    ],
  },
  {
    title: "Deine KreaMix-Bots: Welcher Bot macht was?",
    subtitle: "Start",
    label: "Modul 4",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-04",
    description: "Die Teilnehmerin weiß, welcher Bot bei welchem Schritt hilft.",
    lessons: [
      "Nischen-Bot: Buchideen prüfen, Konkurrenz einschätzen, Herzbewertung",
      "Buch-Bot: Inhalte, Struktur, Seitenideen und Buchlogik entwickeln",
      "Cover- und Fullcover-Bot: Covermaße, Frontcover, Rückseite, Buchrücken",
      "A+ Content Bot: Bannerkonzept, KDP-Modulauswahl, Go/No-Gos",
      "Creamix Marketing Zauber: Social Media, Reels, Hooks, Captions, 80/20",
      "Affiliate- und Reels-Regeln: Kennzeichnung, echte Reels, keine Fake-Versprechen",
    ],
  },
  {
    title: "Die Buchidee: Nische, Buchart und klarer Plan",
    subtitle: "Buch finden",
    label: "Modul 5",
    progress: 0,
    lessonsText: "5 Lektionen",
    photo: "module-05",
    description: "Eine geprüfte Buchidee steht fest.",
    lessons: [
      "Nische finden: Für wen soll das Buch sein?",
      "Problem, Wunsch oder Anlass erkennen: Warum würde jemand das Buch kaufen?",
      "Buchart auswählen: Malbuch, Journal, Lernbuch, Rätselbuch, Workbook, Planer",
      "Idee leicht prüfen: Nachfrage, Konkurrenz, Machbarkeit, Anfängerfreundlichkeit",
      "Buchentscheidung treffen: eine Idee, ein Ziel, ein Projekt. Nicht 20 Baustellen",
    ],
  },
  {
    title: "Der Buchplan: Struktur, Seiten und Inhaltssystem",
    subtitle: "Buch finden",
    label: "Modul 6",
    progress: 0,
    lessonsText: "5 Lektionen",
    photo: "module-06",
    description: "Ein sauberer Bauplan für das Buch ist fertig.",
    lessons: [
      "Format und Umfang grob festlegen: z. B. A4, 6x9, quadratisch",
      "Seitenplan erstellen: Was kommt auf welche Seite?",
      "Kapitel, Aufgaben, Vorlagen oder wiederkehrende Seitentypen festlegen",
      "Materialliste erstellen: Texte, Bilder, Aufgaben, Illustrationen, Rätsel, Tabellen",
      "Mini-Check: Ist das Buch wirklich als Anfängerprojekt baubar?",
    ],
  },
  {
    title: "Der Buchbau mit ChatGPT: Inhalte erstellen",
    subtitle: "Buch bauen",
    label: "Modul 7",
    progress: 0,
    lessonsText: "5 Lektionen",
    photo: "module-07",
    description: "Die Inhalte liegen vor und können gestaltet werden.",
    lessons: [
      "Prompts für Texte, Aufgaben, Übungen, Rezepte, Rätsel oder Journalseiten",
      "Inhalte kürzen, vereinfachen, sortieren und auf Zielgruppe anpassen",
      "Doppelte Inhalte und langweilige Wiederholungen entfernen",
      "Altersgruppe, Schwierigkeitsgrad und Ton prüfen",
      "Export-Vorbereitung: Was kommt später in Canva?",
    ],
  },
  {
    title: "Die Canva-Werkstatt: Innenseiten, Cover und Fullcover",
    subtitle: "Buch bauen",
    label: "Modul 8",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-08",
    description: "Innenseiten und Cover sind als Dateien vorbereitet.",
    lessons: [
      "Canva-Grundlagen: Oberfläche, Seiten, Raster, Vorlagen, Elemente",
      "KDP-Format anlegen: Innenmaße, Beschnitt, Rand, Lesbarkeit",
      "Innenseiten bauen: Seitentypen, Wiederholungen, Ordnung, Export",
      "Cover erstellen: Frontcover, Titel, Untertitel, Blickfang, Zielgruppe",
      "Fullcover vorbereiten: Rückseite, Buchrücken, Maße, Proportionen",
      "PDF-Export: Druck-PDF, Qualität, Dateibenennung",
    ],
  },
  {
    title: "Der Qualitätscheck: Bevor es zu Amazon geht",
    subtitle: "Buch bauen",
    label: "Modul 9",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-09",
    description: "Das Buch ist bereit für den KDP-Upload oder einen Probedruck.",
    lessons: [
      "Textcheck: Rechtschreibung, Sinn, Wiederholungen, falsche Aussagen",
      "Designcheck: Lesbarkeit, Abstände, Ränder, einheitlicher Look",
      "Bildcheck: keine kaputten Hände, Gesichter, Augen, Artefakte oder falsche Proportionen",
      "Covercheck: Titel lesbar, Zielgruppe klar, kein überladenes Design",
      "Druckcheck: PDF, Seitenreihenfolge, leere Seiten, Beschnitt, Vorschau",
      "No-Go-Liste: keine verbotenen Versprechen, keine fremden Marken, keine irreführenden Angaben",
    ],
  },
  {
    title: "KDP startklar machen: Konto, Steuerinfos und Zahlungsdaten",
    subtitle: "Veröffentlichen",
    label: "Modul 10",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-10",
    description: "Das KDP-Konto ist grundsätzlich uploadbereit.",
    lessons: [
      "KDP-Konto anlegen oder einloggen",
      "Autoren-/Publisher-Daten verstehen und eintragen",
      "Steuerinformationen Schritt für Schritt einordnen",
      "Zahlungsdaten hinterlegen",
      "Was man bereitlegen sollte: Adresse, Bankdaten, Steuerdaten, Buchdateien",
      "Wann man bei Steuerfragen externe Hilfe braucht",
    ],
  },
  {
    title: "Ab zu Amazon: Upload, Buchdaten und Veröffentlichung",
    subtitle: "Veröffentlichen",
    label: "Modul 11",
    progress: 0,
    lessonsText: "7 Lektionen",
    photo: "module-11",
    description: "Das Buch ist hochgeladen und bereit zur Veröffentlichung oder Prüfung.",
    lessons: [
      "Neues Buchprojekt in KDP anlegen",
      "Titel, Untertitel, Autor, Beschreibung und Suchbegriffe eintragen",
      "Keywords und Kategorien einfach auswählen",
      "Preis, Märkte, Druckoptionen und Royalty verstehen",
      "Manuskript und Cover hochladen",
      "Online-Vorschau prüfen und Fehler beheben",
      "Veröffentlichen oder zuerst Probedruck/Autorenexemplar prüfen",
    ],
  },
  {
    title: "Nach dem Upload: Pflichten, Belege und Ordnung",
    subtitle: "Veröffentlichen",
    label: "Modul 12",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-12",
    description: "Die Teilnehmerin weiß, was nach Veröffentlichung organisatorisch wichtig ist.",
    lessons: [
      "Impressum und Pflichtangaben prüfen",
      "Pflichtexemplare/DNB und ggf. Landesbibliothek als Checkpunkt aufnehmen",
      "Datenschutz nur praktisch: Website, Linkliste, Newsletter, Tracking, Affiliate-Hinweise",
      "KDP-Reports, Auszahlungen und Belege ablegen",
      "Rechnung/Gutschrift/Self-Billing als Buchhaltungs-Thema einordnen",
      "Steuerordner anlegen: Einnahmen, Ausgaben, Belege, Tools, Werbung",
    ],
  },
  {
    title: "Das Buch ins Schaufenster stellen: Beschreibung, Mockups und A+ Content",
    subtitle: "Sichtbar machen",
    label: "Modul 13",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-13",
    description: "Das Buch sieht nach außen professioneller und klarer aus.",
    lessons: [
      "Buchbeschreibung verbessern: Nutzen, Zielgruppe, klare Sprache",
      "Positionierung: Warum dieses Buch, für wen, welcher Anlass?",
      "Mockups erstellen: authentisch, nicht übertrieben, richtiges Format",
      "A+ Content planen: Module auswählen, Bannergrößen verstehen, Reihenfolge",
      "Go/No-Gos: keine Premium-Badges, keine übertriebenen Claims, keine Vergleiche",
      "Autorenprofil/Markenauftritt einfach vorbereiten",
    ],
  },
  {
    title: "Marketing, das machbar bleibt",
    subtitle: "Sichtbar machen",
    label: "Modul 14",
    progress: 0,
    lessonsText: "7 Lektionen",
    photo: "module-14",
    description: "Ein einfacher Marketingstart steht.",
    lessons: [
      "Zielgruppe in Alltagssprache beschreiben",
      "80/20-Regel: 80 Prozent Mehrwert, 20 Prozent Verkauf",
      "Instagram, TikTok, Pinterest: wofür welcher Kanal gut ist",
      "Richtige Reels: 9:16, Hook, Szenenplan, Voiceover, Caption",
      "Stories, Pins, einfache Posts, schnelle Content-Ideen",
      "Captions und Hashtags: vier relevante Hashtags statt Keyword-Spam",
      "Mini-Contentplan: Was poste ich diese Woche?",
    ],
  },
  {
    title: "Affiliate und Empfehlungen: Digistore24, Links und Zusatzprodukte",
    subtitle: "Sichtbar machen",
    label: "Modul 15",
    progress: 0,
    lessonsText: "7 Lektionen",
    photo: "module-15",
    description: "Die Teilnehmerin versteht Affiliate als sinnvolles Empfehlungssystem.",
    lessons: [
      "Affiliate einfach erklärt: Empfehlung, Provision, Kennzeichnung",
      "Digistore24 verstehen: Account, Marktplatz, Produkt, Promolink, Werbemittel",
      "Den eigenen KreaMix-Kurs weiterempfehlen lassen",
      "Buch plus passende Affiliate-Produkte denken: Malbuch plus Stifte, Kinderkochbuch plus Kinderküche/Küchenhelfer, Lernbuch plus Schulmaterial",
      "Ressourcen-Seite oder Linkliste sauber aufbauen, statt das Buch mit Werbung zu überladen",
      "Kennzeichnung: Werbung, Affiliate-Link, Provision klar sichtbar",
      "80/20-Regel: erst echter Nutzen, dann sanfter Link-Hinweis",
    ],
  },
  {
    title: "Prompt- und Hook-Bibliothek",
    subtitle: "Sichtbar machen",
    label: "Modul 16",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-16",
    description: "Ein Werkzeugkasten mit Vorlagen, Hooks, Prompts und Checklisten ist fertig.",
    lessons: [
      "Prompts für Nische, Buchidee, Struktur, Inhalte, Titel, Beschreibung",
      "Prompts für Canva, Cover, Mockups und A+ Content",
      "Prompts für Qualitätscheck und Fehlerkorrektur",
      "Hook-Karten für Social Media, Reels, Pins und Stories",
      "Caption-Vorlagen mit 80/20-Aufbau",
      "Checklisten: KDP-Upload, Canva-Export, Qualitätscheck, Marketingstart",
    ],
  },
  {
    title: "Tipps, Tricks und Fehlerretter",
    subtitle: "Wiederholen",
    label: "Modul 17",
    progress: 0,
    lessonsText: "7 Lektionen",
    photo: "module-17",
    description: "Die Teilnehmerin hat einen Erste-Hilfe-Bereich für typische Stolperstellen.",
    lessons: [
      "KDP meckert: Was kann die Ursache sein?",
      "Cover passt nicht: Maße, Rücken, Beschnitt, Export prüfen",
      "Canva-Datei sieht komisch aus: Ränder, Schriften, Auflösung prüfen",
      "Buchbeschreibung klingt langweilig: einfacher Reparatur-Prompt",
      "Keine Idee für Content: schnelle Hook- und Post-Formeln",
      "Buch verkauft nicht sofort: realistische nächste Schritte",
      "Wann man nicht weiterbastelt, sondern sauber neu prüft",
    ],
  },
  {
    title: "Dein nächstes Buch: Aus einem Projekt wird ein System",
    subtitle: "Wiederholen",
    label: "Modul 18",
    progress: 0,
    lessonsText: "6 Lektionen",
    photo: "module-18",
    description: "Die Teilnehmerin kann den Prozess erneut anwenden.",
    lessons: [
      "Was vom ersten Buch wiederverwendet werden kann",
      "Eigene Vorlagen sichern: Canva, Prompts, Checklisten, Ordnerstruktur",
      "Zweite Buchidee schneller prüfen",
      "Serien und Buchfamilien: ähnliche Zielgruppe, ähnliche Optik, neuer Nutzen",
      "Einfache Auswertung: Was lief gut, was muss verbessert werden?",
      "Langsam ein kleines KDP-System aufbauen",
    ],
  },
];

const coursePhases = [
  {
    id: 1,
    title: "Dein Fundament",
    intro: "Hier richtest du deinen Kursstart, die wichtigsten Begriffe und deine KI-Helfer ruhig und sauber ein.",
    moduleIndexes: [0, 1, 2, 3],
  },
  {
    id: 2,
    title: "Dein Buch finden",
    intro: "Hier legst du fest, welches Buch du wirklich bauen willst und wie dein erstes Projekt klar geplant wird.",
    moduleIndexes: [4, 5],
  },
  {
    id: 3,
    title: "Dein Buch bauen",
    intro: "Hier entstehen Inhalte, Gestaltung und der Qualitätscheck für dein fertiges Buchprojekt.",
    moduleIndexes: [6, 7, 8],
  },
  {
    id: 4,
    title: "Veröffentlichen",
    intro: "Hier bereitest du KDP vor, lädst dein Buch hoch und bringst Ordnung in die nächsten Pflichten.",
    moduleIndexes: [9, 10, 11],
  },
  {
    id: 5,
    title: "Sichtbar werden",
    intro: "Hier machst du dein Buch nach außen klarer, attraktiver und Schritt für Schritt auffindbar.",
    moduleIndexes: [12, 13, 14, 15],
  },
  {
    id: 6,
    title: "Dein System",
    intro: "Hier sicherst du deine Vorlagen, löst typische Stolperstellen und baust dein nächstes Buch schneller.",
    moduleIndexes: [16, 17],
  },
];

const moduleDisplayOverrides = [
  ["Los geht's", "Wir bauen dein erstes Buch"],
  ["Dein KreaMix-Spickzettel", "Was ist was?"],
  ["Dein KI-Helfer", "ChatGPT richtig nutzen"],
  ["Deine KreaMix-Bots", "Welcher Bot macht was?"],
  ["Die Buchidee", "Nische, Buchart und klarer Plan"],
  ["Der Buchplan", "Struktur, Seiten und Inhaltssystem"],
  ["Der Buchbau mit ChatGPT", "Inhalte erstellen"],
  ["Die Canva-Werkstatt", "Innenseiten, Cover und Fullcover"],
  ["Der Qualitätscheck", "Bevor es zu Amazon geht"],
  ["KDP startklar machen", "Konto, Steuerinfos und Zahlungsdaten"],
  ["Ab zu Amazon", "Upload, Buchdaten und Veröffentlichung"],
  ["Nach dem Upload", "Pflichten, Belege und Ordnung"],
  ["Das Buch ins Schaufenster stellen", "Beschreibung, Mockups und A+ Content"],
  ["Marketing", "Das machbar bleibt"],
  ["Affiliate und Empfehlungen", "Digistore24, Links und Zusatzprodukte"],
  ["Prompt- und Hook-Bibliothek", "Vorlagen, Hooks und Checklisten"],
  ["Tipps, Tricks und Fehlerretter", "Hilfe bei typischen Stolperstellen"],
  ["Dein nächstes Buch", "Aus einem Projekt wird ein System"],
];

const bookProject = {
  title: "Mein erstes Buchprojekt",
  phaseId: 2,
  currentStep: "Buchidee festlegen",
  progress: 38,
};

const toolEntries = [
  { title: "KreaMix-Spickzettel", description: "Begriffe und KDP-Abkürzungen schnell nachschlagen.", moduleIndex: 1 },
  { title: "Prompt- und Hook-Bibliothek", description: "Prompts, Hooks und Checklisten direkt öffnen.", moduleIndex: 15 },
  { title: "Fehlerretter", description: "Schnelle Hilfe, wenn KDP, Canva oder Marketing hakt.", moduleIndex: 16 },
];

function getPhaseForModule(moduleIndex) {
  return coursePhases.find((phase) => phase.moduleIndexes.includes(moduleIndex)) || coursePhases[0];
}

const modules = baseModules.map((module, index) => {
  const phase = getPhaseForModule(index);
  const moduleNumber = String(index + 1);
  const imageSrc = moduleImageFiles[`./assets/modules/module-${moduleNumber}.jpg`] || null;
  const [displayTitle, displaySubtitle] = moduleDisplayOverrides[index] || module.title.split(": ");
  return {
    ...module,
    phase,
    phaseId: phase.id,
    displayTitle: displayTitle || module.title,
    displaySubtitle: displaySubtitle || module.subtitle,
    result: module.description,
    imageSrc,
    imageName: `module-${moduleNumber}.jpg`,
  };
});

const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
const totalPhases = coursePhases.length;

function lessonKey(moduleIndex, lessonIndex) {
  return `${moduleIndex}:${lessonIndex}`;
}

function countCompletedForModule(completedLessons, moduleIndex) {
  return modules[moduleIndex].lessons.reduce(
    (sum, _lesson, lessonIndex) => sum + (completedLessons.has(lessonKey(moduleIndex, lessonIndex)) ? 1 : 0),
    0
  );
}

function getProgressSummary(completedLessons) {
  const completed = modules.reduce((sum, module, moduleIndex) => sum + countCompletedForModule(completedLessons, moduleIndex), 0);
  return {
    completed,
    total: totalLessons,
    percent: totalLessons ? Math.round((completed / totalLessons) * 100) : 0,
  };
}

function getModuleProgress(moduleIndex, completedLessons) {
  const total = modules[moduleIndex].lessons.length;
  const completed = countCompletedForModule(completedLessons, moduleIndex);
  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

function getNextLesson(completedLessons) {
  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
    for (let lessonIndex = 0; lessonIndex < modules[moduleIndex].lessons.length; lessonIndex += 1) {
      if (!completedLessons.has(lessonKey(moduleIndex, lessonIndex))) {
        return { moduleIndex, lessonIndex, module: modules[moduleIndex], lesson: modules[moduleIndex].lessons[lessonIndex] };
      }
    }
  }
  const moduleIndex = modules.length - 1;
  const lessonIndex = modules[moduleIndex].lessons.length - 1;
  return { moduleIndex, lessonIndex, module: modules[moduleIndex], lesson: modules[moduleIndex].lessons[lessonIndex] };
}

function createLessonOverview(module, lesson, lessonIndex) {
  const cleanLesson = lesson.replace(/[.:]$/, "");
  return {
    what: `Du arbeitest diesen Schritt praktisch aus: ${cleanLesson}.`,
    result: `Ein klarer Baustein für "${module.displayTitle}" ist vorbereitet.`,
    task: lessonIndex === 0
      ? "Lege diesen Schritt in deinem Kursordner an und notiere deine erste Entscheidung."
      : "Übertrage das Ergebnis direkt in dein Buchprojekt oder deine Checkliste.",
    download: lessonIndex % 2 === 0 ? "Arbeitsblatt als Workbook-Vorlage" : "Checkliste für diesen Kursschritt",
  };
}

const posts = [
  ["Anna M.", "Mein erster Erfolg mit Modul 2!", "Ich konnte mein erstes Angebot sichtbar machen und bin so happy.", 24, 8],
  ["Julia P.", "Frage zu Canva Vorlagen", "Hat jemand eine Empfehlung für schöne Vorlagen für Workbook?", 19, 12],
  ["Laura K.", "Neue Datei geteilt", "Kundenavatar-Vorlage für die Positionierung.", 16, 4],
];

const members = ["Sophie L.", "Lena K.", "Marie B.", "Tanja W.", "Lisa M."];
const pages = ["Übersicht", "Classroom", "Community", "Mitglieder", "Kalender", "Ressourcen", "Favoriten", "Einstellungen"];
const adminPin = "KREA";
const lessonVideoUrl = "https://www.canva.com/design/DAHPMZTSUlE/r0v8jt63fj2HFg9mz6rTNQ/edit";

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
  const [page, setPage] = useState(() => (window.location.hash === "#admin" ? "Admin" : "Übersicht"));
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState("");
  const [enteredCourse, setEnteredCourse] = useState(() => window.location.hash === "#admin");
  const [adminUnlocked, setAdminUnlocked] = useState(() => sessionStorage.getItem("kreaAdminPreview") === "true");
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return new Set(JSON.parse(sessionStorage.getItem("kreaLessonProgress") || "[]"));
    } catch {
      return new Set();
    }
  });
  const progressSummary = useMemo(() => getProgressSummary(completedLessons), [completedLessons]);
  const nextLesson = useMemo(() => getNextLesson(completedLessons), [completedLessons]);
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
        .filter((item) => `${item.module.title} ${item.lesson}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  useEffect(() => {
    function syncAdminRoute() {
      if (window.location.hash === "#admin") setPage("Admin");
    }
    window.addEventListener("hashchange", syncAdminRoute);
    return () => window.removeEventListener("hashchange", syncAdminRoute);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("kreaLessonProgress", JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  function openModule(moduleIndex, lessonIndex = 0) {
    setEnteredCourse(true);
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    setPage("Classroom");
    setDrawer(null);
    window.scrollTo({ top: 0, left: 0 });
  }

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function goToPage(nextPage) {
    setEnteredCourse(true);
    setPage(nextPage);
    setDrawer(null);
    if (nextPage === "Admin") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#admin`);
    } else if (window.location.hash === "#admin") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0 });
  }

  function goToLanding() {
    setEnteredCourse(false);
    setPage("Übersicht");
    setDrawer(null);
    if (window.location.hash === "#admin") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
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
    openModule(nextLesson.moduleIndex, nextLesson.lessonIndex);
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
            activeModule={activeModule}
            activeLesson={activeLesson}
            setActiveModule={setActiveModule}
            setActiveLesson={setActiveLesson}
            completedLessons={completedLessons}
            markLessonComplete={markLessonComplete}
            openModule={openModule}
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
                    <span>{module.label}</span>
                    <strong>{module.displayTitle}</strong>
                    <small>{module.displaySubtitle}</small>
                    <small>{module.lessonsText} · {module.progress}% Fortschritt</small>
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
                <h2>{active.displayTitle}</h2>
              </div>
            </div>
            <label className="admin-field">
              Modultitel
              <input value={active.displayTitle} readOnly />
            </label>
            <label className="admin-field">
              Beschreibung
              <textarea value={active.description} readOnly />
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
          <ModuleCard key={m.title} data={m} moduleIndex={i} completedLessons={completedLessons} onClick={() => openModule(i)} />
        ))}
      </div>
    </div>
  );
}

function Classroom({ activeModule, activeLesson, setActiveModule, setActiveLesson, completedLessons, markLessonComplete, openModule }) {
  const selected = modules[activeModule];
  const lesson = selected.lessons[activeLesson] || selected.lessons[0];
  const lessonOverview = createLessonOverview(selected, lesson, activeLesson);
  const moduleProgress = getModuleProgress(activeModule, completedLessons);
  const lessonDone = completedLessons.has(lessonKey(activeModule, activeLesson));
  const completeLesson = () => markLessonComplete(activeModule, activeLesson);
  const goToFollowingLesson = () => {
    markLessonComplete(activeModule, activeLesson);
    if (activeLesson < selected.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      return;
    }
    if (activeModule < modules.length - 1) {
      openModule(activeModule + 1, 0);
    }
  };
  return (
    <div className="page classroom">
      <SectionTitle title="Classroom" action={`${selected.label} wechseln`} />
      <div className="lesson-layout">
        <div className="video-card">
          <LessonOverview module={selected} lesson={lesson} lessonIndex={activeLesson} overview={lessonOverview} moduleProgress={moduleProgress} />
          <ModulePhoto module={selected}>
            <a href={lessonVideoUrl} target="_blank" rel="noopener noreferrer" aria-label="Lektion in Canva öffnen">
              <Play fill="currentColor" />
            </a>
          </ModulePhoto>
          <span className="lesson-kicker">{selected.label} / Lektion {activeLesson + 1}</span>
          <h2>{lesson}</h2>
          {selected.displaySubtitle && <strong className="module-subtitle">{selected.displaySubtitle}</strong>}
          <div className="lesson-work">
            <section>
              <span>Lektionstext</span>
              <p>{selected.description}</p>
            </section>
            <section>
              <span>Aufgabe</span>
              <p>{lessonOverview.task}</p>
            </section>
            <section>
              <span>Download</span>
              <p>{lessonOverview.download}</p>
            </section>
          </div>
          <div className="lesson-actions">
            <button className="outline" onClick={completeLesson}><Check size={16} /> {lessonDone ? "Bereits erledigt" : "Als erledigt markieren"}</button>
            <button className="primary" onClick={goToFollowingLesson}><ChevronRight size={16} /> N{"\u00e4"}chste Lektion</button>
            <button className="outline"><FileText size={16} /> Workbook öffnen</button>
          </div>
        </div>
        <aside className="lesson-list">
          <h3>Lektionen</h3>
          {selected.lessons.map((item, i) => (
            <button className={i === activeLesson ? "active" : ""} key={item} onClick={() => setActiveLesson(i)}>
              <span>{activeModule + 1}.{i + 1}</span>{item}{completedLessons.has(lessonKey(activeModule, i)) && <Check size={14} />}<ChevronRight size={15} />
            </button>
          ))}
        </aside>
      </div>
      <SectionTitle title="Alle Module nach Phasen" />
      <div className="phase-stack">
        {coursePhases.map((phase) => (
          <CoursePhase
            key={phase.id}
            phase={phase}
            activeModule={activeModule}
            completedLessons={completedLessons}
            onOpen={(moduleIndex) => {
              setActiveModule(moduleIndex);
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

function LegacyResources({ notify, openModule }) {
  return <div className="page"><SectionTitle title="Ressourcen" action={<><Upload size={15} /> Upload</>} onClick={() => notify("Upload-Bereich vorbereitet.")} /><div className="resource-grid">{["Checkliste: Kreativer Monatsplan", "Tutorial: Canva für Anfänger", "Workbook: Markenwerte", "Vorlagen-Paket Branding"].map((r, i) => <Glass key={r}><FileText /><strong>{r}</strong><span>{i % 2 ? "Video - 18 Min." : "PDF - 1.3 MB"}</span></Glass>)}</div></div>;
}

function LegacyFavorites({ openModule }) {
  return <div className="page"><SectionTitle title="Favoriten" action="Sortieren" /><div className="module-grid">{modules.slice(0, 3).map((m, i) => <ModuleCard key={m.title} data={m} onClick={() => openModule(i)} />)}</div></div>;
}

function SettingsPage({ notify }) {
  return <div className="page settings-page"><SectionTitle title="Einstellungen" action="Speichern" onClick={() => notify("Einstellungen gespeichert.")} /><Panel title="Profil"><input defaultValue="Klaus" /><input defaultValue="klaus@example.com" /><button className="primary" onClick={() => notify("Profil gespeichert.")}>Änderungen speichern</button></Panel></div>;
}

function SectionTitle({ title, action, onClick }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button onClick={onClick}>{action}</button>}</div>;
}

function Glass({ children }) { return <div className="glass">{children}</div>; }
function Panel({ title, children }) { return <section className="panel"><h2>{title}</h2>{children}</section>; }

function LegacyModuleCard({ data, selected, onClick }) {
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
          <ModuleCard key={module.title} data={module} moduleIndex={index} completedLessons={completedLessons} onClick={() => openModule(index)} />
        ))}
      </div>
    </div>
  );
}

function ModulePhoto({ module, children }) {
  const style = module.imageSrc
    ? {
        backgroundImage: `linear-gradient(rgba(255, 244, 235, .06), rgba(255, 244, 235, .1)), url("${module.imageSrc}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;
  return (
    <div className={`photo ${module.imageSrc ? "has-image" : module.photo}`} style={style}>
      {children}
    </div>
  );
}

function ModuleCard({ data, moduleIndex, completedLessons = new Set(), selected, onClick }) {
  const progress = getModuleProgress(moduleIndex, completedLessons);
  const cta = progress.completed > 0 ? "Weiterlernen" : "Modul starten";
  return (
    <button className={`module-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <ModulePhoto module={data} />
      <span className="module-eyebrow">PHASE {data.phaseId} · {data.label.toUpperCase()}</span>
      <strong>{data.displayTitle}</strong>
      {data.displaySubtitle && <em>{data.displaySubtitle}</em>}
      <p>{data.result}</p>
      <small><span>{progress.completed} von {progress.total} Lektionen</span><b>{progress.percent}%</b></small>
      <div className="bar"><i style={{ width: `${progress.percent}%` }} /></div>
      <span className="module-cta">{cta}</span>
    </button>
  );
}

function CoursePhase({ phase, activeModule, completedLessons, onOpen }) {
  return (
    <section className="course-phase">
      <div className="phase-heading">
        <span>PHASE {phase.id}</span>
        <h2>{phase.title}</h2>
        <p>{phase.intro}</p>
      </div>
      <div className="module-grid small">
        {phase.moduleIndexes.map((moduleIndex) => (
          <ModuleCard
            key={modules[moduleIndex].title}
            data={modules[moduleIndex]}
            moduleIndex={moduleIndex}
            completedLessons={completedLessons}
            selected={moduleIndex === activeModule}
            onClick={() => onOpen(moduleIndex)}
          />
        ))}
      </div>
    </section>
  );
}

function NextLessonCard({ progressSummary, nextLesson, onContinue }) {
  return (
    <section className="next-step-card">
      <span>Dein nächster Schritt</span>
      <div className="next-step-top">
        <strong>{progressSummary.percent}%</strong>
        <p>{progressSummary.completed} von {progressSummary.total} Lektionen abgeschlossen</p>
      </div>
      <div className="bar"><i style={{ width: `${progressSummary.percent}%` }} /></div>
      <div className="next-step-module">
        <small>{nextLesson.module.label}</small>
        <h2>{nextLesson.module.displayTitle}</h2>
        <p>{nextLesson.module.displaySubtitle}</p>
      </div>
      <button className="primary" onClick={onContinue}><ChevronRight size={16} /> Weiterlernen</button>
    </section>
  );
}

function BookProjectCard({ project, phase }) {
  return (
    <section className="book-project-card">
      <span>Mein Buchprojekt</span>
      <h2>{project.title}</h2>
      <dl>
        <div><dt>Aktuelle Phase</dt><dd>{phase?.title || "Dein Buch finden"}</dd></div>
        <div><dt>Aktueller Schritt</dt><dd>{project.currentStep}</dd></div>
        <div><dt>Projektfortschritt</dt><dd>{project.progress}%</dd></div>
      </dl>
      <div className="bar"><i style={{ width: `${project.progress}%` }} /></div>
    </section>
  );
}

function LessonOverview({ module, lesson, lessonIndex, overview, moduleProgress }) {
  return (
    <section className="lesson-overview">
      <span>Diese Lektion</span>
      <h2>{module.displayTitle}</h2>
      <div className="lesson-overview-grid">
        <div>
          <strong>Was machen wir?</strong>
          <p>{overview.what}</p>
        </div>
        <div>
          <strong>Am Ende hast du:</strong>
          <p>{overview.result}</p>
        </div>
      </div>
      <small>Lektion {lessonIndex + 1}: {lesson} · {moduleProgress.completed} von {moduleProgress.total} Lektionen abgeschlossen</small>
    </section>
  );
}

function ToolsSection({ openModule, compact = false }) {
  return (
    <section className={`tools-section ${compact ? "compact" : ""}`}>
      <div className="section-title">
        <h2>Werkzeuge</h2>
      </div>
      <div className="tools-grid">
        {toolEntries.map((tool) => (
          <button key={tool.title} onClick={() => openModule(tool.moduleIndex)}>
            <FileText size={18} />
            <strong>{tool.title}</strong>
            <span>{tool.description}</span>
          </button>
        ))}
      </div>
    </section>
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
