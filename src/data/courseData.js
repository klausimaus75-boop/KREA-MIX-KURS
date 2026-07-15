const moduleImageFiles = import.meta.glob("../assets/modules/module-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const DEFAULT_VIDEO_URL = "https://www.canva.com/design/DAHPMZTSUlE/r0v8jt63fj2HFg9mz6rTNQ/edit";

const phaseSeeds = [
  {
    id: "phase-1",
    number: 1,
    title: "Dein Fundament",
    description: "Du richtest deinen Kursstart ein, klärst die wichtigsten Begriffe und lernst deine KI-Werkzeuge kennen.",
    moduleIds: ["module-01", "module-02", "module-03", "module-04"],
  },
  {
    id: "phase-2",
    number: 2,
    title: "Dein Buch finden",
    description: "Du entscheidest dich für eine tragfähige Buchidee und entwickelst daraus einen klaren Bauplan.",
    moduleIds: ["module-05", "module-06"],
  },
  {
    id: "phase-3",
    number: 3,
    title: "Dein Buch bauen",
    description: "Du erstellst Inhalte und Gestaltung und prüfst dein Buch sorgfältig vor dem Upload.",
    moduleIds: ["module-07", "module-08", "module-09"],
  },
  {
    id: "phase-4",
    number: 4,
    title: "Veröffentlichen",
    description: "Du bereitest KDP vor, lädst dein Buch hoch und ordnest alle Schritte nach der Veröffentlichung.",
    moduleIds: ["module-10", "module-11", "module-12"],
  },
  {
    id: "phase-5",
    number: 5,
    title: "Sichtbar werden",
    description: "Du präsentierst dein Buch professionell und entwickelst einen machbaren Weg zu mehr Sichtbarkeit.",
    moduleIds: ["module-13", "module-14", "module-15", "module-16"],
  },
  {
    id: "phase-6",
    number: 6,
    title: "Dein System",
    description: "Du löst typische Probleme schneller und machst aus deinem ersten Buch einen wiederholbaren Ablauf.",
    moduleIds: ["module-17", "module-18"],
  },
];

const moduleSeeds = [
  {
    number: 1,
    phaseId: "phase-1",
    title: "Los geht’s",
    subtitle: "Wir bauen dein erstes Buch",
    result: "Du weißt, wie der Kurs funktioniert, hast deine Ordnerstruktur angelegt und ein erstes Ziel festgelegt.",
    lessons: [
      "Willkommen bei KreaMix",
      "So funktioniert dieser Arbeitskurs",
      "Dein Kursordner und deine Projektstruktur",
      "Welches Buch möchtest du am Ende gebaut haben?",
      "Dein erster klarer Projektplan",
    ],
  },
  {
    number: 2,
    phaseId: "phase-1",
    title: "Der KreaMix-Spickzettel",
    subtitle: "Was ist was?",
    result: "Ein dauerhaft nutzbarer Nachschlagebereich steht dir zur Verfügung.",
    isTool: true,
    lessons: [
      "KDP, Print-on-Demand und Buchformate",
      "Nische, Zielgruppe, Keywords und Kategorien",
      "ISBN, ASIN, Preis, Royalty und Druckkosten",
      "Cover, Fullcover, Beschnitt und Druck-PDF",
      "Mockups, A+ Content und Buchbeschreibung",
      "Affiliate, Digistore24, Hooks und CTA",
    ],
  },
  {
    number: 3,
    phaseId: "phase-1",
    title: "Dein KI-Helfer",
    subtitle: "ChatGPT richtig nutzen",
    result: "Du kannst ChatGPT sinnvoll als Buchhelfer einsetzen.",
    lessons: [
      "So sprichst du mit ChatGPT",
      "Der einfache Prompt-Aufbau",
      "Antworten verbessern und nacharbeiten",
      "KI-Fehler erkennen",
      "Was ChatGPT nicht allein entscheiden sollte",
    ],
  },
  {
    number: 4,
    phaseId: "phase-1",
    title: "Deine KreaMix-Bots",
    subtitle: "Welcher Bot macht was?",
    result: "Du weißt, welches Werkzeug du wann benutzt.",
    lessons: [
      "Überblick über deine KreaMix-Werkzeuge",
      "Der Nischen-Bot",
      "Der Buch-Bot",
      "Der Cover- und Fullcover-Bot",
      "Der A+ Content Bot",
      "Der Marketing-Bot",
    ],
  },
  {
    number: 5,
    phaseId: "phase-2",
    title: "Die Buchidee",
    subtitle: "Nische, Buchart und klarer Plan",
    result: "Eine geprüfte Buchidee steht fest.",
    lessons: [
      "Für wen soll dein Buch sein?",
      "Welches Problem, welchen Wunsch oder Anlass gibt es?",
      "Welche Buchart passt zu deiner Idee?",
      "Deine Idee einfach prüfen",
      "Eine Buchidee auswählen und festlegen",
    ],
  },
  {
    number: 6,
    phaseId: "phase-2",
    title: "Der Buchplan",
    subtitle: "Struktur, Seiten und Inhaltssystem",
    result: "Ein vollständiger Bauplan für dein Buch ist fertig.",
    lessons: [
      "Format und Umfang festlegen",
      "Deinen Seitenplan erstellen",
      "Wiederkehrende Seitentypen festlegen",
      "Deine Materialliste erstellen",
      "Der Machbarkeitscheck",
    ],
  },
  {
    number: 7,
    phaseId: "phase-3",
    title: "Der Buchbau mit ChatGPT",
    subtitle: "Inhalte erstellen",
    result: "Die Inhalte deines Buches sind fertig vorbereitet.",
    lessons: [
      "Inhalte mit passenden Prompts erstellen",
      "Texte und Inhalte verbessern",
      "Wiederholungen und schwache Inhalte entfernen",
      "Zielgruppe, Ton und Schwierigkeit prüfen",
      "Inhalte für Canva vorbereiten",
    ],
  },
  {
    number: 8,
    phaseId: "phase-3",
    title: "Die Canva-Werkstatt",
    subtitle: "Innenseiten, Cover und Fullcover",
    result: "Innenseiten und Cover liegen als fertige Dateien vor.",
    lessons: [
      "Canva-Grundlagen für dein Buchprojekt",
      "Das richtige KDP-Format anlegen",
      "Deine Innenseiten bauen",
      "Dein Frontcover erstellen",
      "Dein Fullcover vorbereiten",
      "Dateien richtig als PDF exportieren",
    ],
  },
  {
    number: 9,
    phaseId: "phase-3",
    title: "Der Qualitätscheck",
    subtitle: "Bevor es zu Amazon geht",
    result: "Dein Buch ist bereit für den KDP-Upload oder einen Probedruck.",
    lessons: [
      "Textcheck",
      "Designcheck",
      "Bildcheck",
      "Covercheck",
      "Druckdatei und Vorschau prüfen",
      "Die KreaMix-No-Go-Liste",
    ],
  },
  {
    number: 10,
    phaseId: "phase-4",
    title: "KDP startklar machen",
    subtitle: "Konto, Steuerinfos und Zahlungsdaten",
    result: "Dein KDP-Konto ist grundsätzlich uploadbereit.",
    lessons: [
      "Dein KDP-Konto",
      "Autoren- und Publisher-Daten",
      "Steuerinformationen einordnen",
      "Zahlungsdaten hinterlegen",
      "Was du vor dem Upload bereithalten solltest",
      "Wann externe Hilfe sinnvoll ist",
    ],
  },
  {
    number: 11,
    phaseId: "phase-4",
    title: "Ab zu Amazon",
    subtitle: "Upload, Buchdaten und Veröffentlichung",
    result: "Dein Buch ist hochgeladen und bereit zur Veröffentlichung.",
    lessons: [
      "Ein neues Buchprojekt anlegen",
      "Titel, Untertitel und Autor",
      "Buchbeschreibung, Keywords und Kategorien",
      "Preis, Märkte und Druckoptionen",
      "Manuskript und Cover hochladen",
      "Online-Vorschau prüfen",
      "Veröffentlichen oder Probedruck bestellen",
    ],
  },
  {
    number: 12,
    phaseId: "phase-4",
    title: "Nach dem Upload",
    subtitle: "Pflichten, Belege und Ordnung",
    result: "Die organisatorischen Schritte nach der Veröffentlichung sind klar.",
    lessons: [
      "Impressum und Pflichtangaben",
      "Pflichtexemplare und Bibliotheken",
      "Datenschutz praktisch einordnen",
      "KDP-Reports und Auszahlungen",
      "Belege und Buchhaltung",
      "Deinen Steuer- und Belegordner aufbauen",
    ],
  },
  {
    number: 13,
    phaseId: "phase-5",
    title: "Das Buch ins Schaufenster stellen",
    subtitle: "Beschreibung, Mockups und A+ Content",
    result: "Dein Buch wird professionell präsentiert.",
    lessons: [
      "Deine Buchbeschreibung verbessern",
      "Dein Buch klar positionieren",
      "Gute Mockups erstellen",
      "A+ Content planen",
      "A+ Content No-Gos",
      "Autorenprofil und Markenauftritt",
    ],
  },
  {
    number: 14,
    phaseId: "phase-5",
    title: "Marketing, das machbar bleibt",
    result: "Ein realistischer Marketingstart steht.",
    lessons: [
      "Deine Zielgruppe in Alltagssprache",
      "Die 80/20-Regel",
      "Instagram, TikTok und Pinterest",
      "Gute Reels planen",
      "Stories, Pins und einfache Posts",
      "Captions und Hashtags",
      "Dein einfacher Wochenplan",
    ],
  },
  {
    number: 15,
    phaseId: "phase-5",
    title: "Affiliate und Empfehlungen",
    subtitle: "Digistore24, Links und Zusatzprodukte",
    result: "Affiliate wird als sinnvolles Empfehlungssystem verstanden.",
    lessons: [
      "Affiliate einfach erklärt",
      "Digistore24 verstehen",
      "Promolinks und Werbemittel",
      "Den KreaMix-Kurs weiterempfehlen",
      "Buch und passende Zusatzprodukte verbinden",
      "Ressourcen-Seiten und Linklisten",
      "Kennzeichnung und 80/20-Regel",
    ],
  },
  {
    number: 16,
    phaseId: "phase-5",
    title: "Prompt- und Hook-Bibliothek",
    result: "Ein dauerhaft nutzbarer Werkzeugkasten steht dir zur Verfügung.",
    isTool: true,
    lessons: [
      "Prompts für Nische und Buchidee",
      "Prompts für Struktur und Inhalte",
      "Prompts für Titel und Buchbeschreibung",
      "Prompts für Canva, Cover und A+ Content",
      "Prompts für Qualitätskontrolle",
      "Hooks, Captions und Checklisten",
    ],
  },
  {
    number: 17,
    phaseId: "phase-6",
    title: "Tipps, Tricks und Fehlerretter",
    result: "Ein Erste-Hilfe-Bereich für typische Probleme steht bereit.",
    isTool: true,
    lessons: [
      "KDP meldet einen Fehler",
      "Das Cover passt nicht",
      "Die Canva-Datei sieht falsch aus",
      "Die Buchbeschreibung funktioniert nicht",
      "Keine Idee für Content",
      "Das Buch verkauft sich nicht sofort",
      "Wann du stoppen und neu prüfen solltest",
    ],
  },
  {
    number: 18,
    phaseId: "phase-6",
    title: "Dein nächstes Buch",
    subtitle: "Aus einem Projekt wird ein System",
    result: "Du kannst den gesamten Ablauf für weitere Bücher wiederholen.",
    lessons: [
      "Was du wiederverwenden kannst",
      "Eigene Vorlagen sichern",
      "Die nächste Buchidee schneller prüfen",
      "Buchserien und Buchfamilien",
      "Dein erstes Projekt auswerten",
      "Dein eigenes KDP-System aufbauen",
    ],
  },
];

function createLesson(module, title, index) {
  const lessonNumber = index + 1;
  return {
    id: `module-${String(module.number).padStart(2, "0")}-lesson-${String(lessonNumber).padStart(2, "0")}`,
    number: lessonNumber,
    title,
    whatWeDo: `Wir bearbeiten „${title}“ Schritt für Schritt und übertragen das Ergebnis direkt in dein Buchprojekt.`,
    result: `Du hast den Arbeitsschritt „${title}“ klar ausgearbeitet und dokumentiert.`,
    videoUrl: DEFAULT_VIDEO_URL,
    content: `In dieser Arbeitslektion konzentrierst du dich auf „${title}“. Arbeite den Schritt in Ruhe durch und halte nur die Entscheidungen fest, die du für dein aktuelles Buch wirklich brauchst.`,
    task: `Bearbeite „${title}“ für dein eigenes Buch und speichere das Ergebnis in deinem Kursordner.`,
    downloads: [
      {
        id: `download-${module.number}-${lessonNumber}`,
        title: `Arbeitsblatt: ${title}`,
        type: "PDF",
        url: null,
      },
    ],
  };
}

const modules = moduleSeeds.map((module) => {
  const id = `module-${String(module.number).padStart(2, "0")}`;
  const imageKey = `../assets/modules/module-${module.number}.jpg`;
  return {
    id,
    number: module.number,
    phaseId: module.phaseId,
    title: module.title,
    subtitle: module.subtitle || "",
    description: module.result,
    result: module.result,
    image: moduleImageFiles[imageKey] || null,
    imageName: `module-${module.number}.jpg`,
    isTool: Boolean(module.isTool),
    lessons: module.lessons.map((lesson, index) => createLesson(module, lesson, index)),
  };
});

export const courseData = {
  id: "kreamix-course-2",
  title: "KreaMix Kurs 2.0",
  phases: phaseSeeds,
  modules,
};

export const coursePhases = courseData.phases;
export { modules };

export const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
export const totalPhases = coursePhases.length;

export const modulesById = new Map(modules.map((module) => [module.id, module]));
export const moduleIndexById = new Map(modules.map((module, index) => [module.id, index]));

export const toolEntries = modules
  .filter((module) => module.isTool)
  .map((module) => ({
    id: `tool-${module.id}`,
    title: module.number === 17 ? "Fehlerretter" : module.title,
    description: module.result,
    moduleId: module.id,
    moduleIndex: moduleIndexById.get(module.id),
  }));

export const demoBookProject = {
  workingTitle: "Mein erstes Buchprojekt",
  phaseId: "phase-1",
  currentStep: "Mit Modul 1 beginnen",
  progress: 0,
};

