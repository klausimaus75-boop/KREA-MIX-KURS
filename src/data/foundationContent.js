const CANVA_DEMO_VIDEO = "https://www.canva.com/design/DAHPMZTSUlE/r0v8jt63fj2HFg9mz6rTNQ/edit";

function lessonId(moduleNumber, lessonNumber) {
  return `module-${String(moduleNumber).padStart(2, "0")}-lesson-${String(lessonNumber).padStart(2, "0")}`;
}

function preparedDownload(moduleNumber, lessonNumber, title, description) {
  return {
    id: `download-${moduleNumber}-${lessonNumber}`,
    title,
    description,
    type: "PDF-Vorlage",
    url: null,
    status: "prepared",
  };
}

function createLesson(moduleNumber, config) {
  return {
    id: lessonId(moduleNumber, config.number),
    number: config.number,
    moduleId: `module-${String(moduleNumber).padStart(2, "0")}`,
    title: config.title,
    shortDescription: config.shortDescription,
    whatWeDo: config.whatWeDo,
    whyItMatters: config.whyItMatters,
    result: config.result,
    videoType: config.videoType,
    videoUrl: config.videoUrl || null,
    estimatedDuration: config.estimatedDuration,
    sections: config.sections,
    examples: config.examples || [],
    tips: config.tips || [],
    task: config.task,
    checklist: config.checklist || [],
    downloads: config.downloads || [],
    nextLessonId: null,
  };
}

const legacyModule1Lessons = [
  createLesson(1, {
    number: 1,
    title: "Willkommen bei KreaMix",
    shortDescription: "Du lernst den gesamten Kursweg kennen und formulierst dein persönliches Ziel.",
    whatWeDo: "Wir schauen uns den Weg von der ersten Idee bis zum veröffentlichten Buch an.",
    whyItMatters: "Wenn du den ganzen Weg kennst, musst du nicht alles sofort können und kannst dich auf den jeweils nächsten Schritt konzentrieren.",
    result: "Ein persönliches Kursziel ist formuliert.",
    videoType: "Erklärvideo",
    videoUrl: CANVA_DEMO_VIDEO,
    estimatedDuration: "12 Minuten",
    sections: [
      {
        title: "Dein Weg durch KreaMix",
        paragraphs: ["KreaMix führt dich in einer festen Reihenfolge durch dein Buchprojekt. Jeder Schritt bereitet den nächsten vor."],
        items: [
          "Orientierung und Werkzeuge kennenlernen",
          "eine tragfähige Buchidee finden",
          "das Buch planen und Inhalte erstellen",
          "Innenseiten und Cover gestalten",
          "Qualität und Dateien prüfen",
          "KDP vorbereiten und das Buch hochladen",
          "das Buch präsentieren und Marketing starten",
          "den Ablauf für weitere Bücher wiederholen",
        ],
      },
      {
        title: "Du musst heute noch nicht alles wissen",
        paragraphs: [
          "Viele Einsteiger springen sofort zu Cover, Canva oder Amazon. Dann fehlen später wichtige Entscheidungen. Hier arbeitest du immer nur an dem Schritt, der gerade dran ist.",
          "Dein erstes Ziel muss noch nicht perfekt sein. Es gibt dir lediglich eine Richtung für die nächsten Lektionen.",
        ],
      },
    ],
    examples: [
      { title: "Mögliche Kursziele", items: ["Mein erstes Taschenbuch bei Amazon veröffentlichen.", "Ein Kinderbuchprojekt vollständig vorbereiten.", "Später selbstständig weitere Bücher erstellen können."] },
    ],
    tips: ["Lies dein Kursziel vor jeder neuen Phase noch einmal. So erkennst du leichter, welche Entscheidungen wirklich zu deinem Projekt passen."],
    task: {
      title: "Formuliere dein Kursziel",
      description: "Vervollständige den Satz in deinen eigenen Worten.",
      steps: ["Am Ende dieses Kurses möchte ich ...", "Speichere den Satz im Ordner 01 Buchidee oder in deinen Kursnotizen."],
    },
    checklist: ["Ich habe den Kursweg verstanden.", "Ich habe ein persönliches Kursziel formuliert.", "Mein Ziel ist gespeichert."],
    downloads: [preparedDownload(1, 1, "Mein KreaMix-Kursziel", "Kurze Arbeitsvorlage für dein persönliches Kursziel.")],
  }),
  createLesson(1, {
    number: 2,
    title: "So funktioniert dieser Arbeitskurs",
    shortDescription: "Du legst einen realistischen Lernrhythmus fest und arbeitest jede Lektion praktisch durch.",
    whatWeDo: "Wir richten eine einfache Arbeitsweise ein, die dich zuverlässig von Lektion zu Lektion führt.",
    whyItMatters: "Zehn Videos am Stück bringen wenig, wenn die Ergebnisse anschließend fehlen. Kleine umgesetzte Schritte bauen dagegen wirklich dein Buch auf.",
    result: "Ein einfacher persönlicher Lernrhythmus ist festgelegt.",
    videoType: "Erklärvideo",
    estimatedDuration: "10 Minuten",
    sections: [
      {
        title: "Das KreaMix-Arbeitsprinzip",
        items: ["Ansehen: Verschaffe dir einen Überblick.", "Verstehen: Prüfe, was der Schritt für dein Buch bedeutet.", "Umsetzen: Erledige die Aufgabe sofort.", "Speichern: Lege dein Ergebnis im Projektordner ab.", "Weitergehen: Markiere die Lektion und öffne erst dann die nächste."],
      },
      {
        title: "So nutzt du den Kurs sinnvoll",
        items: ["Lektionen möglichst in Reihenfolge bearbeiten", "Aufgaben direkt erledigen", "Ergebnisse und Entscheidungen speichern", "Downloads und Vorlagen als Arbeitshilfe nutzen", "bei Bedarf zurückspringen", "Fortschritt als Orientierung und nicht als Wettbewerb betrachten"],
      },
    ],
    examples: [{ title: "Ein realistischer Rhythmus", text: "Dienstag und Donnerstag jeweils 45 Minuten. Pro Termin bearbeite ich eine Lektion und speichere das Ergebnis." }],
    tips: ["Eine Lektion ansehen, Aufgabe erledigen, Ergebnis speichern, dann weiter. Das ist wirksamer als ein ganzer Videoabend ohne Umsetzung."],
    task: {
      title: "Lege deinen Lernrhythmus fest",
      description: "Plane so klein, dass du den Rhythmus auch in einer normalen Woche einhalten kannst.",
      steps: ["Bestimme feste oder bevorzugte Kurstage.", "Lege fest, wie oft du pro Woche arbeiten möchtest.", "Notiere ein realistisches Zeitfenster pro Termin."],
    },
    checklist: ["Meine Kurstage stehen fest.", "Meine Wochenhäufigkeit ist realistisch.", "Ich weiß, wie ich Ergebnisse speichere."],
    downloads: [preparedDownload(1, 2, "Mein Lernrhythmus", "Wochenplan für deine persönlichen KreaMix-Zeiten.")],
  }),
  createLesson(1, {
    number: 3,
    title: "Dein Kursordner und deine Projektstruktur",
    shortDescription: "Du legst einen zentralen Projektordner an, in dem jede Datei einen festen Platz bekommt.",
    whatWeDo: "Wir erstellen eine übersichtliche digitale Ordnerstruktur für dein Buchprojekt.",
    whyItMatters: "Spätestens bei Coverversionen, KDP-Dateien und Belegen entsteht ohne Ordnung schnell Verwirrung. Eine klare Struktur spart später Zeit und Fehler.",
    result: "Die vollständige Projektstruktur ist auf deinem Computer oder in der Cloud angelegt.",
    videoType: "Schritt-für-Schritt-Demo",
    estimatedDuration: "15 Minuten",
    sections: [
      {
        title: "Lege den Hauptordner an",
        paragraphs: ["Nenne ihn zum Beispiel „KreaMix – Mein Buchprojekt“. Wenn du bereits einen Arbeitstitel hast, kannst du ihn ergänzen."],
      },
      {
        title: "Diese Unterordner brauchst du",
        items: ["01 Buchidee – Ziele, Nische und erste Entscheidungen", "02 Recherche – Notizen, Quellen und Konkurrenzbeobachtungen", "03 Inhalte – Texte, Aufgaben und Seitenpläne", "04 Bilder – Illustrationen, Fotos und Bildnachweise", "05 Canva – bearbeitbare Gestaltungsdateien", "06 Cover – Coverideen und freigegebene Versionen", "07 KDP-Dateien – endgültige Druck- und Upload-Dateien", "08 Marketing – Mockups, Posts und Contentpläne", "09 Belege und Unterlagen – Rechnungen, Auszahlungen und organisatorische Dokumente"],
      },
      {
        title: "Eine einfache Dateiregel",
        paragraphs: ["Nutze verständliche Namen und Versionsnummern, zum Beispiel „Innenseiten_v01“ und „Innenseiten_v02“. Überschreibe eine funktionierende Datei nicht vorschnell."],
      },
    ],
    examples: [{ title: "Guter Dateiname", text: "KreaMix_Raetselbuch_Innenseiten_v03_2026-07-15.pdf" }],
    tips: ["Arbeite entweder lokal mit einer Sicherung oder direkt in einem Cloud-Ordner. Wichtig ist, dass du weißt, wo die aktuelle Version liegt."],
    task: {
      title: "Erstelle deinen Projektordner",
      description: "Lege den Hauptordner und alle neun Unterordner jetzt an.",
      steps: ["Speicherort auswählen.", "Hauptordner erstellen.", "Unterordner 01 bis 09 anlegen.", "Eine kurze Testnotiz im Ordner 01 Buchidee speichern."],
    },
    checklist: ["Der Hauptordner existiert.", "Alle neun Unterordner sind angelegt.", "Die Struktur ist gesichert oder synchronisiert.", "Eine Testdatei wurde gespeichert."],
    downloads: [preparedDownload(1, 3, "KreaMix Projektordner", "Checkliste und kopierbare Ordnernamen für dein Buchprojekt.")],
  }),
  createLesson(1, {
    number: 4,
    title: "Welches Buch möchtest du am Ende gebaut haben?",
    shortDescription: "Du entscheidest dich für eine erste Buchrichtung, ohne dich bereits endgültig festzulegen.",
    whatWeDo: "Wir beschreiben grob, welche Art Buch du im Moment am liebsten erstellen möchtest und für wen es gedacht sein könnte.",
    whyItMatters: "Eine erste Richtung macht die nächsten Aufgaben konkret. Die genaue Nische prüfen wir bewusst erst später in Phase 2.",
    result: "Eine erste grobe Buchrichtung ist festgehalten.",
    videoType: "Praxisvideo",
    estimatedDuration: "12 Minuten",
    sections: [
      {
        title: "Wähle eine erste Richtung",
        paragraphs: ["Du triffst hier noch keine endgültige Marktentscheidung. Prüfe lediglich, welche Buchart dich aktuell am meisten anspricht."],
        items: ["Buch mit viel Text oder Ratgeber", "Arbeitsbuch oder Journal", "Rätsel- oder Aktivitätsbuch", "Ausmalbuch", "Kinderbuch", "Planer oder anderes Buchformat"],
      },
      {
        title: "Denke an einen möglichen Leser",
        paragraphs: ["Beschreibe die Person zunächst grob. Ein Alter, ein Interesse oder eine typische Situation reicht für den Start."],
      },
    ],
    examples: [{ title: "Erste Buchrichtung", text: "Im Moment möchte ich am liebsten ein Rätselbuch erstellen. Dieses Buch soll ungefähr für Kinder von 8 bis 10 Jahren gedacht sein." }],
    tips: ["Erlaube dir eine vorläufige Antwort. In Modul 5 wird deine Idee genauer geprüft und darf sich noch verändern."],
    task: {
      title: "Notiere deine Buchrichtung",
      description: "Vervollständige beide Sätze.",
      steps: ["Im Moment möchte ich am liebsten ein ... erstellen.", "Dieses Buch soll ungefähr für ... gedacht sein."],
    },
    checklist: ["Ich habe eine vorläufige Buchart gewählt.", "Ich habe eine mögliche Zielgruppe notiert.", "Ich weiß, dass diese Entscheidung noch nicht endgültig ist."],
    downloads: [preparedDownload(1, 4, "Meine erste Buchrichtung", "Arbeitsblatt für Buchart und mögliche Zielgruppe.")],
  }),
  createLesson(1, {
    number: 5,
    title: "Dein erster klarer Projektplan",
    shortDescription: "Du fasst Kursziel, Buchrichtung und Zeit zu einem einfachen umsetzbaren Plan zusammen.",
    whatWeDo: "Wir bringen deine bisherigen Entscheidungen auf eine Seite und bestimmen den nächsten konkreten Schritt.",
    whyItMatters: "Ein kleiner sichtbarer Plan verhindert, dass dein Projekt nur eine lose Idee bleibt.",
    result: "Ein erster persönlicher Buchprojektplan ist fertig.",
    videoType: "Praxisvideo",
    estimatedDuration: "18 Minuten",
    sections: [
      {
        title: "Die fünf Teile deines Plans",
        items: ["mein aktuelles Buchziel", "meine grobe Buchart", "meine mögliche Zielgruppe", "meine verfügbare Zeit pro Woche", "mein nächster konkreter Schritt"],
      },
      {
        title: "Halte den Plan bewusst einfach",
        paragraphs: ["Der Plan ist kein Vertrag und noch keine endgültige Produktstrategie. Er macht sichtbar, womit du startest und wann du weiterarbeitest."],
      },
    ],
    examples: [{ title: "Ein erster Projektplan", items: ["Buchart: Rätselbuch", "Zielgruppe: Kinder von ungefähr 8 bis 10 Jahren", "Zeit: 3 Stunden pro Woche", "Nächster Schritt: Buchidee in Modul 5 genauer prüfen"] }],
    tips: ["Ein guter nächster Schritt ist klein und eindeutig. „Buch machen“ ist zu groß; „Modul 2, Lektion 1 bearbeiten“ ist konkret."],
    task: {
      title: "Fülle deinen Projektplan aus",
      description: "Übertrage die Ergebnisse der letzten Lektionen und ergänze deinen nächsten Termin.",
      steps: ["Kursziel eintragen.", "Buchart und mögliche Zielgruppe ergänzen.", "Wochenzeit festlegen.", "Nächsten Schritt mit Datum notieren.", "Plan im Ordner 01 Buchidee speichern."],
    },
    checklist: ["Mein Kursziel steht im Plan.", "Buchart und mögliche Zielgruppe sind notiert.", "Meine Wochenzeit ist eingetragen.", "Der nächste Schritt ist konkret.", "Der Plan ist gespeichert."],
    downloads: [preparedDownload(1, 5, "Mein erster Buchprojektplan", "Ausfüllbare Ein-Seiten-Vorlage für deinen Projektstart.")],
  }),
];

const canvaMaterial = (id, title, description, url) => ({
  id,
  title,
  description,
  type: "Material öffnen",
  url,
  status: "available",
});

const module1Materials = {
  creativeKickoff: canvaMaterial("material-1-creative-kickoff", "Creative Kickoff", "Startmaterial für deinen kreativen Einstieg.", "https://canva.link/kzlaj3z0egv18co"),
  creativeJourney: canvaMaterial("material-1-creative-journey", "Creative Journey", "Orientierung für deinen Weg durch das Buchprojekt.", "https://canva.link/2pfvls11cd9c9js"),
  kdpStart: canvaMaterial("material-1-kdp-start", "KDP Publishing Start", "Einstieg in den Veröffentlichungsweg mit KDP.", "https://canva.link/yqzmf1y8pbi0iwi"),
  bauplan: canvaMaterial("material-2-bauplan", "KreaMix Bauplan", "Vorlage für dein persönliches Ideenprofil.", "https://canva.link/v7xfmj3ndojl0f0"),
  mentor: canvaMaterial("material-kreamix-mentor", "KreaMix Mentor", "Material für Ideenentwicklung, Nischenprüfung und Entscheidung.", "https://canva.link/fx3pvy4h8zpl3mk"),
  roadmap: canvaMaterial("material-7-roadmap", "Amazon KDP Roadmap", "Material zur groben Preis- und Veröffentlichungsprüfung.", "https://canva.link/td4bijst25zwlrp"),
};

const module1Lessons = [
  createLesson(1, {
    number: 1,
    title: "Kickoff und Orientierung",
    shortDescription: "Du verstehst den KDP-Prozess und wählst eine erste Buchrichtung.",
    whatWeDo: "Wir ordnen den Ablauf von der Idee über die Nische und Prüfung bis zur späteren Buchentwicklung.",
    whyItMatters: "Eine klare Buchrichtung verhindert, dass du zu früh in Cover, Inhalte oder Uploaddetails springst.",
    result: "Eine realistische Ausgangslage und eine grobe Buchrichtung.",
    videoType: "Arbeitslektion",
    videoUrl: CANVA_DEMO_VIDEO,
    estimatedDuration: "12 Minuten",
    sections: [
      {
        title: "Der einfache Ablauf",
        paragraphs: ["Der Ablauf lautet: Idee → Nische → Prüfung → Buchentwicklung. In Modul 1 geht es noch nicht darum, ein fertiges Buch zu bauen. Du schaffst eine prüfbare Ausgangslage."],
        items: ["Idee: Welche Buchrichtung interessiert dich?", "Nische: Für wen und wofür soll das Buch sein?", "Prüfung: Gibt es Nachfrage, Konkurrenz und wirtschaftlichen Sinn?", "Buchentwicklung: Erst danach werden Konzept, Struktur und Inhalte ausgearbeitet."],
      },
      {
        title: "Wähle eine grobe Buchart",
        paragraphs: ["Wähle zunächst eine einfache Richtung: Malbuch, Rätselbuch, Journal, Kinderbuch oder ein anderes KDP-Buch, das für den Anfang überschaubar bleibt.", "Diese Entscheidung ist vorläufig. Sie gibt dir nur genug Richtung, um die nächsten Prüfungen sinnvoll durchzuführen."],
      },
    ],
    examples: [{ title: "Mögliche Buchrichtungen", items: ["ein einfaches Rätselbuch für Kinder", "ein Journal für mehr Struktur im Alltag", "ein Malbuch mit klarer Zielgruppe"] }],
    tips: ["Entscheide dich bewusst vorläufig. Eine prüfbare Idee darf sich in diesem Modul noch verändern."],
    task: {
      title: "Entscheide dich für eine erste Buchrichtung",
      description: "Notiere, mit welcher Buchart du in die Prüfung gehen möchtest.",
      steps: ["Wähle eine einfache Buchart.", "Schreibe auf, warum dich diese Richtung interessiert.", "Speichere die Notiz in deinem Kursordner."],
    },
    checklist: ["Ich kenne den Ablauf Idee → Nische → Prüfung → Buchentwicklung.", "Ich habe eine erste Buchart gewählt.", "Meine Ausgangslage ist realistisch notiert."],
    downloads: [module1Materials.creativeKickoff, module1Materials.creativeJourney, module1Materials.kdpStart],
  }),
  createLesson(1, {
    number: 2,
    title: "Deine Ausgangslage festlegen",
    shortDescription: "Du schaffst die persönliche Basis für passende Buchideen.",
    whatWeDo: "Wir erfassen Zielgruppe, Interessen, Zeitrahmen, gewünschte Buchart und klare Ausschlüsse.",
    whyItMatters: "Eine Buchidee passt nur dann zu dir, wenn sie auch zu deiner Zeit, deinen Interessen und deinen Grenzen passt.",
    result: "Ein persönliches Ideenprofil.",
    videoType: "Arbeitslektion",
    estimatedDuration: "14 Minuten",
    sections: [
      { title: "Dein Ideenprofil", paragraphs: ["Bevor du Ideen sammelst, legst du fest, welche Ausgangslage deine Ideen erfüllen sollen. Dadurch sortierst du später schneller aus, was nicht zu dir passt."], items: ["Zielgruppe", "eigene Interessen", "verfügbarer Zeitaufwand", "gewünschte Buchart", "Themen, die du nicht umsetzen möchtest"] },
      { title: "Grenzen helfen dir", paragraphs: ["Ausschlüsse sind kein Hindernis. Sie schützen dich vor Ideen, die zu aufwendig, zu weit weg von dir oder für den Anfang zu komplex sind."] },
    ],
    examples: [{ title: "Beispielprofil", items: ["Zielgruppe: Kinder von 8 bis 10 Jahren", "Buchart: Rätselbuch", "Zeit: 3 Stunden pro Woche", "Nicht geeignet: sehr textlastige Ratgeber"] }],
    tips: ["Schreibe lieber klar und einfach als perfekt. Dieses Profil ist Arbeitsmaterial, keine fertige Marktanalyse."],
    task: {
      title: "Lege deine Ausgangslage fest",
      description: "Notiere die wichtigsten Rahmenbedingungen für deine Ideenfindung.",
      steps: ["Zielgruppe und Interessen notieren.", "verfügbaren Zeitaufwand festhalten.", "gewünschte Buchart ergänzen.", "Themen ausschließen, die du nicht umsetzen möchtest."],
    },
    checklist: ["Zielgruppe ist notiert.", "Zeitaufwand ist realistisch eingeschätzt.", "Ausschlüsse sind klar benannt."],
    downloads: [module1Materials.bauplan],
  }),
  createLesson(1, {
    number: 3,
    title: "Erste Buchideen entwickeln",
    shortDescription: "Du entwickelst mehrere einfache und passende Buchideen.",
    whatWeDo: "Wir nutzen dein Ideenprofil, um mehrere Buchideen zu erzeugen und anschließend bewusst zu reduzieren.",
    whyItMatters: "Eine einzelne spontane Idee wirkt oft überzeugender, als sie ist. Mehrere Optionen machen die Auswahl klarer.",
    result: "Zwei bis drei machbare Buchideen.",
    videoType: "Arbeitslektion",
    estimatedDuration: "18 Minuten",
    sections: [
      { title: "Aus Profil wird Ideensammlung", paragraphs: ["Beantworte die Fragen zu Zielgruppe, Interessen, Buchart und Zeitaufwand. Daraus lässt du dir zehn Buchideen vorschlagen."] },
      { title: "Sortiere streng aus", items: ["zu aufwendige Ideen streichen", "unpassende Zielgruppen streichen", "unklare oder zu breite Ideen markieren", "zwei bis drei Favoriten auswählen"] },
    ],
    examples: [{ title: "Aus zehn werden drei", text: "Von zehn Vorschlägen bleiben ein Dinosaurier-Malbuch, ein Ferien-Rätselbuch und ein Dankbarkeitsjournal übrig." }],
    tips: ["Machbarkeit zählt in diesem Schritt stärker als Begeisterung. Eine schöne Idee darf gehen, wenn sie für den Start zu groß ist."],
    task: {
      title: "Entwickle und reduziere deine Buchideen",
      description: "Erzeuge mehrere Ideen und wähle die machbarsten Favoriten.",
      steps: ["Fragen zu Zielgruppe, Interessen, Buchart und Zeitaufwand beantworten.", "zehn Buchideen vorschlagen lassen.", "zu aufwendige oder unpassende Ideen streichen.", "zwei bis drei Favoriten auswählen."],
    },
    checklist: ["Zehn Ideen wurden gesammelt.", "zu große Ideen wurden gestrichen.", "zwei bis drei Favoriten stehen fest."],
    downloads: [module1Materials.mentor],
  }),
  createLesson(1, {
    number: 4,
    title: "Die Idee zur Nische zuspitzen",
    shortDescription: "Du machst aus einer breiten Idee eine klare, suchbare Nische.",
    whatWeDo: "Wir schärfen Zielgruppe, Thema, Suchgrund und Machbarkeit deiner Favoritenidee.",
    whyItMatters: "Breite Ideen sind schwer prüfbar. Eine klare Nische lässt sich besser einschätzen und später klarer positionieren.",
    result: "Eine klar formulierte Nischenidee.",
    videoType: "Arbeitslektion",
    estimatedDuration: "16 Minuten",
    sections: [
      { title: "Von breit zu klar", paragraphs: ["Nicht „Malbuch für Kinder“, sondern beispielsweise „Dinosaurier-Malbuch für Kinder ab 6 mit großen, einfachen Motiven“."] },
      { title: "Vier Prüffragen", items: ["Für wen ist das Buch?", "Welches genaue Thema behandelt es?", "Warum würde jemand danach suchen?", "Ist die Umsetzung für Anfänger machbar?"] },
    ],
    examples: [{ title: "Zugespitzte Nische", text: "Ferien-Rätselbuch für Kinder von 8 bis 10 Jahren mit einfachen Logikaufgaben für Autofahrten und Wartezeiten." }],
    tips: ["Eine gute Nische ist nicht möglichst eng, sondern klar genug, damit du sie prüfen kannst."],
    task: {
      title: "Formuliere deine Nischenidee",
      description: "Definiere Zielgruppe, genaues Thema, Suchgrund und Machbarkeit.",
      steps: ["Zielgruppe festlegen.", "genaues Thema formulieren.", "Suchgrund notieren.", "Machbarkeit für Anfänger einschätzen."],
    },
    checklist: ["Zielgruppe ist konkret.", "Thema ist klar beschrieben.", "Suchgrund und Machbarkeit sind notiert."],
    downloads: [module1Materials.mentor],
  }),
  createLesson(1, {
    number: 5,
    title: "Nische vorprüfen",
    shortDescription: "Du schätzt Stärken, Risiken und die erste Tragfähigkeit deiner Nischenidee ein.",
    whatWeDo: "Wir bewerten deine Nische vorsichtig anhand klarer Kriterien und vergeben eine erste Gesamtbewertung.",
    whyItMatters: "Eine frühe Prüfung verhindert, dass du zu viel Zeit in eine Idee investierst, die noch zu breit oder riskant ist.",
    result: "Eine erste Nischenbewertung.",
    videoType: "Arbeitslektion",
    estimatedDuration: "17 Minuten",
    sections: [
      { title: "Bewertungskriterien", items: ["Zielgruppen-Klarheit", "Themen-Konkretisierung", "Machbarkeit", "mögliche Nachfrage", "Konkurrenz", "Chancen", "Risiken"] },
      { title: "Vorsichtig bewerten", paragraphs: ["Vergib eine Gesamtbewertung von 1 bis 10. Diese Zahl ist nur eine Orientierung und keine Verkaufs- oder Umsatzgarantie."] },
    ],
    examples: [{ title: "Bewertung", text: "7 von 10: klare Zielgruppe, machbar, aber Konkurrenz muss noch genauer geprüft werden." }],
    tips: ["Die Bewertung ist eine Orientierung. Wichtige Annahmen prüfst du in den nächsten Lektionen weiter."],
    task: {
      title: "Bewerte deine Nische",
      description: "Schätze Stärken und Risiken deiner Nischenidee ein.",
      steps: ["Kriterien einzeln durchgehen.", "Chancen und Risiken notieren.", "vorsichtige Gesamtbewertung von 1 bis 10 vergeben.", "offene Prüffragen festhalten."],
    },
    checklist: ["Stärken sind notiert.", "Risiken sind notiert.", "eine vorsichtige Gesamtbewertung liegt vor."],
    downloads: [module1Materials.mentor],
  }),
  createLesson(1, {
    number: 6,
    title: "Konkurrenz auf Amazon prüfen",
    shortDescription: "Du schätzt Konkurrenz eigenständig und realistisch ein.",
    whatWeDo: "Wir prüfen die wichtigsten Suchbegriffe deiner Nische direkt anhand sichtbarer Amazon-Ergebnisse.",
    whyItMatters: "Konkurrenz ist nicht automatisch schlecht. Du musst erkennen, ob der Markt erreichbar, überfüllt oder unklar ist.",
    result: "Konkurrenz-Einschätzung: niedrig, mittel oder hoch.",
    videoType: "Arbeitslektion",
    estimatedDuration: "20 Minuten",
    sections: [
      { title: "So gehst du vor", items: ["wichtigste Suchbegriffe deiner Nische suchen", "die ersten 10 bis 20 Ergebnisse prüfen", "ähnliche Bücher, Titel, Cover und Inhalte vergleichen", "Bewertungen, Marktchancen und Warnzeichen notieren"] },
      { title: "Realistisch bleiben", paragraphs: ["Eine Konkurrenzprüfung ist keine Garantie. Sie hilft dir, deine Idee nüchterner einzuschätzen und zu erkennen, ob du sie anpassen solltest."] },
    ],
    examples: [{ title: "Einschätzung", text: "Mittel: Es gibt ähnliche Bücher, aber viele sind allgemein gehalten. Eine klarere Zielgruppe könnte eine Chance sein." }],
    tips: ["Prüfe mit verschiedenen Suchbegriffen. Ein einzelner Suchlauf zeigt selten das ganze Bild."],
    task: {
      title: "Prüfe deine wichtigsten Suchbegriffe",
      description: "Untersuche Amazon-Ergebnisse und ordne die Konkurrenz ein.",
      steps: ["3 bis 5 Suchbegriffe notieren.", "erste 10 bis 20 Ergebnisse ansehen.", "ähnliche Bücher und Warnzeichen dokumentieren.", "Konkurrenz als niedrig, mittel oder hoch einschätzen."],
    },
    checklist: ["Suchbegriffe wurden geprüft.", "10 bis 20 Ergebnisse wurden verglichen.", "Konkurrenz-Einschätzung ist dokumentiert."],
    downloads: [module1Materials.mentor],
  }),
  createLesson(1, {
    number: 7,
    title: "Preis und Marge grob prüfen",
    shortDescription: "Du schätzt die wirtschaftliche Machbarkeit deiner Idee ein.",
    whatWeDo: "Wir betrachten Verkaufspreise, geplante Seitenzahl, mögliche Druckkosten und realistische Marge.",
    whyItMatters: "Eine Buchidee kann inhaltlich schön sein und trotzdem wirtschaftlich unpraktisch werden, wenn Umfang, Druckkosten und Preis nicht zusammenpassen.",
    result: "Ein sinnvoller Preisrahmen und eine erste Wirtschaftlichkeits-Einschätzung.",
    videoType: "Arbeitslektion",
    estimatedDuration: "18 Minuten",
    sections: [
      { title: "Was du grob prüfst", items: ["übliche Verkaufspreise ähnlicher Bücher", "geplante Seitenzahl", "mögliche Druckkosten", "realistische Marge", "Preis, der zur Zielgruppe passt"] },
      { title: "Noch keine endgültige Kalkulation", paragraphs: ["In diesem Modul reicht ein grober Rahmen. Exakte Werte prüfst du später mit den aktuellen KDP-Vorgaben und passenden Druckoptionen."] },
    ],
    examples: [{ title: "Preisrahmen", text: "Ähnliche Bücher liegen zwischen 8,99 € und 12,99 €. Für meine Idee prüfe ich später einen Preisrahmen um 9,99 € bis 11,99 €." }],
    tips: ["Aktuelle Druckkosten und Royalty-Regeln prüfst du immer direkt bei KDP, weil sich Vorgaben ändern können."],
    task: {
      title: "Prüfe Preis und Marge grob",
      description: "Erstelle eine erste Einschätzung zur wirtschaftlichen Machbarkeit.",
      steps: ["übliche Verkaufspreise notieren.", "geplante Seitenzahl schätzen.", "Druckkosten grob prüfen.", "Marge und Preisrahmen vorsichtig einschätzen."],
    },
    checklist: ["Preisrahmen ist notiert.", "Seitenzahl ist grob geplant.", "erste Wirtschaftlichkeits-Einschätzung liegt vor."],
    downloads: [module1Materials.roadmap],
  }),
  createLesson(1, {
    number: 8,
    title: "Go-/No-Go-Entscheidung",
    shortDescription: "Du triffst eine fundierte Entscheidung über deine Buchidee.",
    whatWeDo: "Wir fassen alle Ergebnisse zu einer Abschlusskarte zusammen und entscheiden GO, ANPASSEN oder NO-GO.",
    whyItMatters: "Eine klare Entscheidung spart Zeit. Du weißt danach, ob du weitergehst, nachschärfst oder eine andere Idee prüfst.",
    result: "Eine Buchidee-Karte mit Entscheidung: GO, ANPASSEN oder NO-GO.",
    videoType: "Abschlusslektion",
    estimatedDuration: "22 Minuten",
    sections: [
      { title: "Deine Abschlusskarte", items: ["Arbeitstitel", "Buchart", "Zielgruppe", "konkrete Nische", "Nutzen für die Zielgruppe", "Konkurrenz-Einschätzung", "Preisrahmen und Marge", "Chancen, Risiken und offene Fragen", "Entscheidung: GO, ANPASSEN oder NO-GO"] },
      { title: "Entscheidungslogik", items: ["GO: Die Idee ist konkret, machbar und zeigt keine deutlichen Warnsignale.", "ANPASSEN: Die Idee ist interessant, aber noch zu breit oder unklar positioniert.", "NO-GO: Die Idee ist zu aufwendig, zu unspezifisch oder wirtschaftlich nicht sinnvoll."] },
      { title: "Danach geht es weiter", paragraphs: ["Bei GO oder nach erfolgreicher Anpassung kannst du mit Modul 2 fortfahren: Buchkonzept, Seitenstruktur, Titel und Positionierung ausarbeiten."] },
    ],
    examples: [{ title: "Entscheidung", text: "ANPASSEN: Die Zielgruppe ist klar, aber die Nische ist noch zu breit. Ich schärfe das Thema vor Modul 2 nach." }],
    tips: ["Eine ehrliche Anpassung ist kein Rückschritt. Sie macht dein späteres Buch stabiler."],
    task: {
      title: "Erstelle deine Buchidee-Karte",
      description: "Fasse die wichtigsten Entscheidungen zusammen und triff eine klare Bewertung.",
      steps: ["alle Kartenpunkte ausfüllen.", "Chancen, Risiken und offene Fragen ergänzen.", "GO, ANPASSEN oder NO-GO wählen.", "Entscheidung kurz begründen."],
    },
    checklist: ["Buchidee-Karte ist vollständig.", "Konkurrenz und Preisrahmen sind berücksichtigt.", "GO-/No-Go-Entscheidung ist begründet."],
    downloads: [],
  }),
];

const module2Lessons = [
  createLesson(2, {
    number: 1,
    title: "KDP, Print-on-Demand und Buchformate",
    shortDescription: "Du verstehst, wie ein selbst veröffentlichtes Buch bei Amazon angeboten und gedruckt wird.",
    whatWeDo: "Wir übersetzen die Grundbegriffe KDP, Print-on-Demand, Taschenbuch, Hardcover und E-Book in normale Sprache.",
    whyItMatters: "Diese Begriffe begegnen dir bei fast jedem späteren Upload- und Format-Schritt.",
    result: "Du kannst erklären, wie KDP und Print-on-Demand zusammenarbeiten und welche Buchformate es gibt.",
    videoType: "Erklärvideo",
    estimatedDuration: "11 Minuten",
    sections: [
      { title: "KDP", paragraphs: ["Amazon Kindle Direct Publishing ist eine Plattform, über die Autoren und Verlage Bücher selbst veröffentlichen können. Dort werden Buchdaten, Dateien und Preise hinterlegt."] },
      { title: "Print-on-Demand", paragraphs: ["Das gedruckte Buch wird normalerweise erst produziert, wenn jemand es bestellt. Du musst daher keine große Auflage vorfinanzieren oder lagern."] },
      { title: "Buchformate", items: ["Taschenbuch: gedrucktes Buch mit flexiblem Umschlag", "Hardcover: gedrucktes Buch mit festem Einband", "E-Book: digitale Ausgabe für ein Lesegerät oder eine App"] },
      { title: "Kurz gesagt", paragraphs: ["Du lädst dein Buch bei KDP hoch. Amazon bietet es zum Verkauf an. Gedruckte Exemplare werden in der Regel erst nach einer Bestellung produziert."] },
    ],
    examples: [{ title: "Beispiel", text: "Du veröffentlichst ein Rätselbuch als Taschenbuch. Erst wenn eine Kundin bestellt, wird ein Exemplar gedruckt und versendet." }],
    tips: ["Entscheide das endgültige Format erst, wenn Zielgruppe, Nutzung und Seitenumfang klarer sind."],
    task: { title: "Ordne die Formate ein", description: "Notiere zu Taschenbuch, Hardcover und E-Book jeweils einen möglichen Vorteil für deine erste Buchidee.", steps: ["Drei Formate aufschreiben.", "Je einen Vorteil ergänzen.", "Ein vorläufig bevorzugtes Format markieren."] },
    checklist: ["Ich kann KDP einfach erklären.", "Ich verstehe Print-on-Demand.", "Ich kenne die drei grundlegenden Buchformate."],
    downloads: [preparedDownload(2, 1, "Spickzettel: KDP und Formate", "Kurzübersicht der wichtigsten Grundbegriffe.")],
  }),
  createLesson(2, {
    number: 2,
    title: "Nische, Zielgruppe, Keywords und Kategorien",
    shortDescription: "Du unterscheidest, für wen ein Buch gedacht ist und wie es später gefunden und eingeordnet werden kann.",
    whatWeDo: "Wir klären vier Begriffe, die bei Buchidee und Auffindbarkeit eng zusammenarbeiten.",
    whyItMatters: "Ein Buch wird verständlicher und leichter auffindbar, wenn Thema, Leser und Einordnung zueinander passen.",
    result: "Du kannst Nische, Zielgruppe, Keywords und Kategorien voneinander unterscheiden.",
    videoType: "Erklärvideo",
    estimatedDuration: "12 Minuten",
    sections: [
      { title: "Nische", paragraphs: ["Eine Nische ist ein klar umrissener Themen- oder Bedarfsbereich, zum Beispiel Rätselbücher für Grundschulkinder oder Journals für den Berufseinstieg."] },
      { title: "Zielgruppe", paragraphs: ["Die Zielgruppe beschreibt die Menschen, für die dein Buch besonders passend sein soll. Alter, Interessen, Alltagssituation und gewünschter Nutzen können dazugehören."] },
      { title: "Keywords", paragraphs: ["Keywords sind Suchbegriffe, die mögliche Käufer verwenden könnten, zum Beispiel „Rätselbuch Kinder 8 Jahre“."] },
      { title: "Kategorien", paragraphs: ["Kategorien ordnen ein Buch in passende Bereiche eines Shops ein. Sie sind eher Regale, während Keywords eher Suchanfragen sind."] },
      { title: "Kurz gesagt", paragraphs: ["Die Nische ist dein Themenfeld. Die Zielgruppe sind deine Leser. Keywords helfen bei der Suche. Kategorien ordnen das Buch ein."] },
    ],
    examples: [{ title: "Ein zusammenhängendes Beispiel", items: ["Nische: kindgerechte Logikrätsel", "Zielgruppe: Kinder von 8 bis 10 Jahren", "Keyword: Logikrätsel Kinder 8 Jahre", "Kategorie: Kinderbücher / Spiele und Rätsel"] }],
    tips: ["Aktuelle auswählbare Kategorien und Vorgaben prüfst du später direkt in KDP, weil sich Plattformoptionen ändern können."],
    task: { title: "Vier Begriffe auf deine Idee anwenden", description: "Schreibe eine vorläufige Nische, Zielgruppe, zwei Suchbegriffe und eine mögliche Kategorie auf.", steps: ["Nische in einem Satz beschreiben.", "Zielgruppe benennen.", "Zwei Suchbegriffe notieren.", "Eine denkbare Kategorie ergänzen."] },
    checklist: ["Nische und Zielgruppe sind nicht dasselbe.", "Ich habe zwei mögliche Keywords.", "Ich verstehe Kategorien als Einordnung."],
    downloads: [preparedDownload(2, 2, "Begriffsblatt: Nische bis Kategorie", "Arbeitsblatt zum Zuordnen der vier Begriffe.")],
  }),
  createLesson(2, {
    number: 3,
    title: "ISBN, ASIN, Preis, Royalty und Druckkosten",
    shortDescription: "Du verstehst die wichtigsten Kennnummern und Geldbegriffe rund um ein veröffentlichtes Buch.",
    whatWeDo: "Wir unterscheiden Buchkennnummern, Verkaufspreis, mögliche Vergütung und Produktionskosten.",
    whyItMatters: "Diese Angaben beeinflussen, wie dein Buch identifiziert wird und wie sich ein Verkauf wirtschaftlich zusammensetzt.",
    result: "Du kannst ISBN und ASIN unterscheiden und den Zusammenhang zwischen Preis, Druckkosten und Royalty beschreiben.",
    videoType: "Erklärvideo",
    estimatedDuration: "13 Minuten",
    sections: [
      { title: "ISBN und ASIN", items: ["ISBN: internationale Buchnummer für eine bestimmte Ausgabe und ein bestimmtes Format", "ASIN: Amazon-interne Identifikationsnummer für ein Produkt"] },
      { title: "Preis", paragraphs: ["Der Verkaufspreis ist der Betrag, zu dem das Buch angeboten wird. Er sollte zu Umfang, Format, Zielgruppe und Markt passen."] },
      { title: "Royalty", paragraphs: ["Royalty bezeichnet die Vergütung, die nach den Regeln der Plattform aus einem Verkauf entstehen kann. Sie ist nicht einfach mit dem Verkaufspreis gleichzusetzen."] },
      { title: "Druckkosten", paragraphs: ["Bei gedruckten Büchern entstehen Produktionskosten. Sie hängen unter anderem von Format, Seitenzahl, Farbe und Druckart ab."] },
      { title: "Kurz gesagt", paragraphs: ["ISBN und ASIN identifizieren dein Buch. Vom Verkaufspreis werden je nach Plattformmodell Kosten berücksichtigt; daraus ergibt sich die mögliche Vergütung."] },
    ],
    examples: [{ title: "Vereinfachtes Denkmodell", text: "Verkaufspreis minus die nach dem aktuellen Plattformmodell berücksichtigten Kosten ergibt nicht automatisch Gewinn. Weitere Ausgaben und Steuern müssen getrennt betrachtet werden." }],
    tips: ["Verwende für echte Kalkulationen immer die aktuellen offiziellen KDP-Angaben und den jeweils gültigen Druckkostenrechner."],
    task: { title: "Baue deine Begriffskarte", description: "Erkläre jeden der fünf Begriffe in einem eigenen kurzen Satz, als würdest du ihn einer Freundin erklären.", steps: ["ISBN und ASIN vergleichen.", "Preis, Royalty und Druckkosten verbinden.", "Offene Fragen markieren."] },
    checklist: ["Ich kenne den Unterschied zwischen ISBN und ASIN.", "Ich setze Royalty nicht mit Verkaufspreis gleich.", "Ich weiß, dass aktuelle Kosten offiziell geprüft werden müssen."],
    downloads: [preparedDownload(2, 3, "Spickzettel: Nummern und Kosten", "Einfache Übersicht ohne fest eingetragene Plattformwerte.")],
  }),
  createLesson(2, {
    number: 4,
    title: "Cover, Fullcover, Beschnitt und Druck-PDF",
    shortDescription: "Du erkennst, welche Dateien und Randbereiche für ein gedrucktes Buch wichtig werden.",
    whatWeDo: "Wir unterscheiden Frontcover, vollständigen Umschlag, Beschnitt und druckfertige PDF-Datei.",
    whyItMatters: "Falsche Maße oder fehlende Randbereiche führen später häufig zu Uploadfehlern oder unerwünschten weißen Kanten.",
    result: "Du kannst die wichtigsten Bestandteile einer Druckdatei benennen.",
    videoType: "Erklärvideo",
    estimatedDuration: "12 Minuten",
    sections: [
      { title: "Cover und Fullcover", items: ["Cover meint im Alltag oft die Vorderseite.", "Fullcover umfasst bei einem gedruckten Buch Rückseite, Buchrücken und Vorderseite in einer gemeinsamen Datei."] },
      { title: "Beschnitt", paragraphs: ["Beschnitt ist ein zusätzlicher Rand außerhalb des Endformats. Bilder oder Flächen, die bis zur Papierkante reichen sollen, werden bis in diesen Bereich gezogen."] },
      { title: "Druck-PDF", paragraphs: ["Eine Druck-PDF ist die exportierte Datei für die Produktion. Sie muss die richtigen Maße, Seiten und Qualitätsmerkmale enthalten."] },
      { title: "Kurz gesagt", paragraphs: ["Das Fullcover umschließt das Buch. Beschnitt schützt randabfallende Gestaltung. Die Druck-PDF ist die fertige Produktionsdatei."] },
    ],
    examples: [{ title: "Beispiel", text: "Ein Foto soll ohne weißen Rand bis an die Seite reichen. Es wird deshalb über das Endformat hinaus bis in den vorgesehenen Beschnitt gezogen." }],
    tips: ["Konkrete Maße hängen vom gewählten Format, der Seitenzahl und aktuellen Druckvorgaben ab. Nutze später die offiziellen Vorlagen für dein konkretes Buch."],
    task: { title: "Beschrifte ein Buch", description: "Nimm ein gedrucktes Buch und benenne Vorderseite, Buchrücken und Rückseite. Notiere anschließend, welche Dateien du später dafür brauchst.", steps: ["Buchbestandteile zeigen.", "Fullcover als Gesamtfläche skizzieren.", "Druck-PDF als Enddatei notieren."] },
    checklist: ["Ich kenne Cover und Fullcover.", "Ich verstehe den Zweck von Beschnitt.", "Ich weiß, was eine Druck-PDF ist."],
    downloads: [preparedDownload(2, 4, "Datei-Spickzettel: Cover und Druck", "Beschriftete Übersicht der wichtigsten Druckbegriffe.")],
  }),
  createLesson(2, {
    number: 5,
    title: "Mockups, A+ Content und Buchbeschreibung",
    shortDescription: "Du lernst drei Möglichkeiten kennen, ein Buch verständlich und ansprechend zu präsentieren.",
    whatWeDo: "Wir klären, wie Vorschau-Bilder, zusätzliche Produktinhalte und Beschreibungstext unterschiedliche Aufgaben übernehmen.",
    whyItMatters: "Ein fertiges Buch muss online schnell zeigen, für wen es gedacht ist und welchen Nutzen es bietet.",
    result: "Du kannst Mockup, A+ Content und Buchbeschreibung sinnvoll voneinander abgrenzen.",
    videoType: "Erklärvideo",
    estimatedDuration: "11 Minuten",
    sections: [
      { title: "Mockup", paragraphs: ["Ein Mockup ist eine Darstellung, die dein Buch in einer realistischen Situation zeigt, zum Beispiel auf einem Tisch oder in einer Hand."] },
      { title: "A+ Content", paragraphs: ["A+ Content ist ein zusätzlicher visueller Präsentationsbereich auf einer Produktseite, sofern die Plattform und das Konto ihn unterstützen."] },
      { title: "Buchbeschreibung", paragraphs: ["Die Buchbeschreibung erklärt in Textform Zielgruppe, Inhalt und Nutzen. Sie soll klar informieren und nicht nur werblich klingen."] },
      { title: "Kurz gesagt", paragraphs: ["Mockups zeigen das Buch. A+ Content vertieft die Präsentation. Die Buchbeschreibung erklärt das Angebot in Worten."] },
    ],
    examples: [{ title: "Zusammenspiel", text: "Ein Mockup zeigt das Rätselbuch auf einem Kinderschreibtisch. Die Beschreibung nennt Alter und Aufgabentypen. A+ Content zeigt beispielhafte Innenseiten und Vorteile." }],
    tips: ["Eine gute Präsentation zeigt das echte Buch möglichst klar. Vermeide Darstellungen, die Format, Inhalt oder Qualität irreführend verändern."],
    task: { title: "Plane deine spätere Präsentation", description: "Notiere für jede der drei Formen eine Information, die dein Buch später zeigen sollte.", steps: ["Mockup-Idee notieren.", "einen möglichen A+ Abschnitt skizzieren.", "einen Satz für die Buchbeschreibung schreiben."] },
    checklist: ["Ich kenne die Aufgabe eines Mockups.", "Ich verstehe A+ Content als Zusatzbereich.", "Ich kann den Zweck einer Buchbeschreibung erklären."],
    downloads: [preparedDownload(2, 5, "Präsentations-Spickzettel", "Übersicht für Mockup, A+ Content und Beschreibung.")],
  }),
  createLesson(2, {
    number: 6,
    title: "Affiliate, Digistore24, Hooks und CTA",
    shortDescription: "Du verstehst grundlegende Begriffe, die dir später bei Empfehlungen und Marketing begegnen.",
    whatWeDo: "Wir übersetzen vier Marketingbegriffe und zeigen, wie sie in einem einfachen Beitrag zusammenwirken können.",
    whyItMatters: "Wer Empfehlungen oder Inhalte veröffentlicht, sollte wissen, was ein Link bewirkt und welche Handlung er von Lesern erwartet.",
    result: "Du kannst Affiliate, Digistore24, Hook und CTA in Alltagssprache erklären.",
    videoType: "Erklärvideo",
    estimatedDuration: "12 Minuten",
    sections: [
      { title: "Affiliate", paragraphs: ["Affiliate bedeutet, ein Produkt oder Angebot über einen besonderen Empfehlungslink zu empfehlen und bei bestimmten Ergebnissen möglicherweise eine Provision zu erhalten."] },
      { title: "Digistore24", paragraphs: ["Digistore24 ist eine Plattform, über die digitale Produkte verkauft und Partnerprogramme organisiert werden können."] },
      { title: "Hook", paragraphs: ["Ein Hook ist der Einstieg, der Aufmerksamkeit gewinnt, zum Beispiel eine Frage oder ein überraschender, aber ehrlicher Nutzenhinweis."] },
      { title: "CTA", paragraphs: ["CTA steht für Call to Action. Das ist eine klare nächste Handlung, zum Beispiel „Lese die Buchbeschreibung“ oder „Speichere dir die Checkliste“."] },
      { title: "Kurz gesagt", paragraphs: ["Der Hook holt Aufmerksamkeit. Der CTA zeigt den nächsten Schritt. Affiliate-Links können Empfehlungen messbar machen und müssen transparent eingesetzt werden."] },
    ],
    examples: [{ title: "Ein einfacher Beitrag", text: "Hook: „Drei Dinge, die ein Rätselbuch für unterwegs praktisch machen.“ CTA: „Sieh dir die Beispielseiten an.“ Ein Affiliate-Link wäre zusätzlich klar als Werbung oder Empfehlungslink zu kennzeichnen." }],
    tips: ["Kennzeichnungs- und Plattformregeln können sich ändern. Prüfe sie vor einer echten Veröffentlichung bei den offiziellen beziehungsweise zuständigen Quellen."],
    task: { title: "Schreibe Hook und CTA", description: "Formuliere einen ehrlichen Einstieg und eine passende nächste Handlung für deine vorläufige Buchidee.", steps: ["Nutzen auswählen.", "kurzen Hook schreiben.", "passenden CTA ergänzen.", "prüfen, ob beides wirklich zum Inhalt passt."] },
    checklist: ["Ich kann Affiliate einfach erklären.", "Ich weiß, was Digistore24 grundsätzlich ist.", "Ich unterscheide Hook und CTA.", "Ich kenne die Bedeutung transparenter Kennzeichnung."],
    downloads: [preparedDownload(2, 6, "Marketing-Begriffe kurz erklärt", "Spickzettel mit Hook- und CTA-Miniübung.")],
  }),
];

const module3Lessons = [
  createLesson(3, {
    number: 1,
    title: "So sprichst du mit ChatGPT",
    shortDescription: "Du verwandelst eine vage Idee in eine klare, gut beantwortbare Aufgabe.",
    whatWeDo: "Wir üben, der KI eine Aufgabe, den nötigen Kontext und ein klares Ziel zu geben.",
    whyItMatters: "Eine unklare Anfrage führt oft zu einer allgemeinen oder unpassenden Antwort.",
    result: "Du hast einen schlechten Prompt in einen klaren Arbeitsauftrag verwandelt.",
    videoType: "Bildschirmaufnahme",
    estimatedDuration: "14 Minuten",
    sections: [
      { title: "Eine Aufgabe pro Schritt", paragraphs: ["Bitte nicht gleichzeitig Titel, Inhaltsverzeichnis, Cover, Keywords und Marketingplan in einen chaotischen Satz packen. Teile große Ziele in einzelne Arbeitsschritte."], items: ["klare Aufgabe nennen", "relevanten Kontext geben", "Ziel oder gewünschtes Ergebnis nennen", "Rückfragen erlauben", "Ausgabeform festlegen"] },
      { title: "Gib nur hilfreichen Kontext", paragraphs: ["Die KI braucht Informationen über Buchart, Zielgruppe und Zweck. Persönliche oder sensible Daten gehören nicht in einen Prompt, wenn sie für die Aufgabe nicht nötig sind."] },
    ],
    examples: [{ title: "Vorher und nachher", items: ["Unklar: „Mach mir ein gutes Kinderbuch.“", "Klarer: „Entwickle zehn Themenideen für ein Rätselbuch für Kinder von 8 bis 10 Jahren. Die Ideen sollen ohne Bildschirm funktionieren. Stelle Rückfragen, falls dir Angaben fehlen.“"] }],
    tips: ["Wenn die Antwort nicht passt, prüfe zuerst deine Aufgabe. Oft fehlt eine Zielgruppe, eine Bedingung oder die gewünschte Ausgabeform."],
    task: { title: "Repariere einen schlechten Prompt", description: "Wähle eine vage Anfrage und ergänze Aufgabe, Kontext, Ziel und Ausgabe.", steps: ["Vage Anfrage notieren.", "eine einzelne Aufgabe auswählen.", "Zielgruppe und Bedingungen ergänzen.", "Rückfragen erlauben.", "überarbeiteten Prompt testen."] },
    checklist: ["Mein Prompt enthält eine klare Aufgabe.", "Der nötige Kontext ist enthalten.", "Das gewünschte Ergebnis ist erkennbar.", "Ich habe nicht mehrere Projekte vermischt."],
    downloads: [preparedDownload(3, 1, "Prompt-Reparaturblatt", "Vorher-Nachher-Vorlage für klare Aufgaben.")],
  }),
  createLesson(3, {
    number: 2,
    title: "Der einfache Prompt-Aufbau",
    shortDescription: "Du lernst ein wiederverwendbares Fünf-Felder-System für klare Prompts.",
    whatWeDo: "Wir bauen Prompts aus Aufgabe, Kontext, Zielgruppe, Bedingungen und gewünschter Ausgabe auf.",
    whyItMatters: "Ein festes System macht gute Anfragen wiederholbar und leichter zu verbessern.",
    result: "Dein erster Prompt nach dem KreaMix-System ist fertig.",
    videoType: "Bildschirmaufnahme",
    estimatedDuration: "16 Minuten",
    sections: [
      { title: "AUFGABE", paragraphs: ["Was soll konkret gemacht werden?"] },
      { title: "KONTEXT", paragraphs: ["Worum geht es und welche Ausgangslage ist wichtig?"] },
      { title: "ZIELGRUPPE", paragraphs: ["Für wen wird das Ergebnis erstellt?"] },
      { title: "BEDINGUNGEN", paragraphs: ["Was muss beachtet oder vermieden werden?"] },
      { title: "AUSGABE", paragraphs: ["Wie soll das Ergebnis aufgebaut sein, zum Beispiel als Tabelle, Liste oder Schrittfolge?"] },
    ],
    examples: [{ title: "Kompletter Beispielprompt", text: "Erstelle 20 Themenideen für ein Rätselbuch. Das Buch richtet sich an Kinder von 8 bis 10 Jahren. Die Themen sollen leicht verständlich, abwechslungsreich und für ein gedrucktes Aktivitätsbuch geeignet sein. Gib die Ergebnisse als nummerierte Liste aus." }],
    tips: ["Nicht jedes Feld muss lang sein. Ein klarer Satz pro Feld reicht oft völlig aus."],
    task: { title: "Baue deinen Prompt", description: "Erstelle einen Prompt für einen echten nächsten Arbeitsschritt deines Buchprojekts.", steps: ["Aufgabe notieren.", "Kontext und Zielgruppe ergänzen.", "Bedingungen festlegen.", "Ausgabeformat wählen.", "Prompt testen und Antwort speichern."] },
    checklist: ["Alle fünf Prompt-Felder wurden geprüft.", "Die Ausgabeform ist klar.", "Der Prompt betrifft nur einen Arbeitsschritt.", "Die Antwort ist im Projektordner gespeichert."],
    downloads: [preparedDownload(3, 2, "KreaMix-Prompt-Vorlage", "Wiederverwendbare Vorlage mit fünf Prompt-Feldern.")],
  }),
  createLesson(3, {
    number: 3,
    title: "Antworten verbessern und nacharbeiten",
    shortDescription: "Du lernst, eine erste KI-Antwort gezielt statt komplett von vorn zu überarbeiten.",
    whatWeDo: "Wir geben präzise Folgeaufträge, vergleichen Varianten und sichern die beste Fassung.",
    whyItMatters: "Die erste Antwort ist selten die endgültige. Qualität entsteht häufig in zwei oder drei klaren Überarbeitungsschritten.",
    result: "Du hast eine KI-Antwort sichtbar verbessert und die Änderungen begründet.",
    videoType: "Bildschirmaufnahme",
    estimatedDuration: "15 Minuten",
    sections: [
      { title: "Konkreter machen", paragraphs: ["Bitte um spezifischere Beispiele, stärkere Unterschiede oder klarere Kriterien."] },
      { title: "Kürzer und einfacher machen", paragraphs: ["Nenne gewünschte Länge, Lesestufe oder Ton statt nur „besser“ zu schreiben."] },
      { title: "Varianten vergleichen", paragraphs: ["Lass zwei oder drei Alternativen erstellen und bewerte sie nach deinen eigenen Kriterien."] },
      { title: "Fehler korrigieren", paragraphs: ["Markiere die konkrete Stelle, erkläre das Problem und fordere eine überarbeitete Fassung an."] },
    ],
    examples: [{ title: "Nützliche Folgeaufträge", items: ["Kürze jeden Punkt auf höchstens zwölf Wörter.", "Erkläre die Ideen für Einsteiger ohne Fachbegriffe.", "Erstelle drei deutlich unterschiedliche Varianten.", "Entferne Wiederholungen und zeige, was du geändert hast."] }],
    tips: ["Speichere nicht jede Zwischenfassung. Vergleiche bewusst und lege nur brauchbare Ergebnisse in deinem Projektordner ab."],
    task: { title: "Verbessere eine echte Antwort", description: "Nimm die Antwort aus Lektion 2 und führe mindestens zwei gezielte Überarbeitungen durch.", steps: ["Schwachstelle benennen.", "präzisen Folgeauftrag geben.", "Variante vergleichen.", "beste Fassung auswählen und speichern."] },
    checklist: ["Ich habe eine Schwachstelle konkret benannt.", "Mindestens zwei Überarbeitungen wurden getestet.", "Ich habe selbst die beste Fassung ausgewählt."],
    downloads: [preparedDownload(3, 3, "Antworten verbessern", "Checkliste für gezielte Überarbeitungsschritte.")],
  }),
  createLesson(3, {
    number: 4,
    title: "KI-Fehler erkennen",
    shortDescription: "Du prüfst KI-Antworten auf erfundene Fakten, Wiederholungen und unpassende Sicherheit.",
    whatWeDo: "Wir verwenden einen einfachen Qualitätscheck, bevor Inhalte in dein Buch übernommen werden.",
    whyItMatters: "Eine flüssig formulierte Antwort kann trotzdem falsch, veraltet oder für deine Zielgruppe ungeeignet sein.",
    result: "Du hast eine KI-Antwort mit einer festen Prüfliste bewertet.",
    videoType: "Erklärvideo",
    estimatedDuration: "17 Minuten",
    sections: [
      { title: "Typische Warnzeichen", items: ["erfundene Fakten oder Quellen", "veraltete Informationen", "Wiederholungen und leere Formulierungen", "unpassende Zielgruppe", "widersprüchliche Aussagen", "zu selbstsichere Antworten ohne belastbare Grundlage"] },
      { title: "So prüfst du", items: ["Behauptungen markieren.", "wichtige Fakten mit verlässlichen Quellen abgleichen.", "Zahlen und technische Vorgaben separat prüfen.", "Inhalt laut lesen und auf Logik achten.", "bei Unsicherheit nicht veröffentlichen."] },
      { title: "Aktuelle und sensible Themen", paragraphs: ["Aktuelle KDP-Regeln, rechtliche Fragen, Steuerfragen und technische Vorgaben prüfst du immer bei offiziellen beziehungsweise zuständigen Quellen. KI-Antworten sind dafür kein endgültiger Nachweis."] },
    ],
    examples: [{ title: "Prüffrage", text: "Woher stammt diese Zahl, von wann ist sie und kann ich sie in einer offiziellen aktuellen Quelle bestätigen?" }],
    tips: ["Je wichtiger eine Aussage für Veröffentlichung, Kosten oder Verantwortung ist, desto stärker muss deine Prüfung sein."],
    task: { title: "Mache den KreaMix-KI-Check", description: "Prüfe eine bisherige Antwort und markiere sichere, unsichere und zu prüfende Aussagen.", steps: ["Behauptungen markieren.", "Wiederholungen suchen.", "Zielgruppenpassung prüfen.", "mindestens eine wichtige Angabe extern verifizieren.", "Ergebnis korrigieren oder verwerfen."] },
    checklist: ["Fakten wurden nicht ungeprüft übernommen.", "Wiederholungen sind markiert.", "Zielgruppe und Ton passen.", "Aktuelle Vorgaben wurden als prüfpflichtig erkannt."],
    downloads: [preparedDownload(3, 4, "KreaMix-KI-Qualitätscheck", "Prüfliste für Fakten, Logik und Zielgruppenpassung.")],
  }),
  createLesson(3, {
    number: 5,
    title: "Was ChatGPT nicht allein entscheiden sollte",
    shortDescription: "Du legst fest, welche Entscheidungen und Verantwortung bei dir bleiben.",
    whatWeDo: "Wir trennen hilfreiche KI-Unterstützung von menschlichen Projektentscheidungen.",
    whyItMatters: "Die KI kennt weder deine gesamte Zielgruppe noch deinen Geschmack, deine Verantwortung oder die aktuelle Rechtslage zuverlässig.",
    result: "Dein erster wiederverwendbarer KreaMix-Prompt und deine persönliche Prüfroutine sind fertig.",
    videoType: "Erklärvideo",
    estimatedDuration: "13 Minuten",
    sections: [
      { title: "Das entscheidest du", items: ["endgültige Buchidee", "Qualitätsniveau", "Gestaltung und Geschmack", "Zielgruppenpassung", "rechtliche Verantwortung", "Veröffentlichung und Freigabe"] },
      { title: "Dabei kann die KI helfen", items: ["Ideen sammeln", "Strukturen vorschlagen", "Texte überarbeiten", "Varianten entwickeln", "Prüffragen formulieren"] },
      { title: "Deine Freigabefrage", paragraphs: ["Würde ich dieses Ergebnis auch dann verantworten, wenn niemand wüsste, dass eine KI daran beteiligt war? Wenn nicht, muss es weiter geprüft oder überarbeitet werden."] },
    ],
    examples: [{ title: "Klare Rollen", text: "ChatGPT schlägt fünf Buchrichtungen vor. Du prüfst Machbarkeit und Zielgruppe und entscheidest selbst, welche Richtung weiterverfolgt wird." }],
    tips: ["Nutze KI als gut vorbereiteten Assistenten. Die abschließende Entscheidung und Freigabe bleiben bei dir."],
    task: { title: "Erstelle deinen wiederverwendbaren Prompt", description: "Überarbeite deinen Prompt aus diesem Modul so, dass du ihn mit wenigen Anpassungen erneut verwenden kannst.", steps: ["feste Struktur übernehmen.", "variable Stellen markieren.", "Prüfkriterien ergänzen.", "eine Rückfrage-Regel einbauen.", "Vorlage im Ordner 03 Inhalte speichern."] },
    checklist: ["Ich kenne meine Entscheidungen.", "Mein Prompt ist wiederverwendbar.", "Prüfkriterien sind enthalten.", "Die Vorlage ist gespeichert."],
    downloads: [preparedDownload(3, 5, "Mein wiederverwendbarer KreaMix-Prompt", "Prompt-Vorlage mit Prüfroutine und Freigabefrage.")],
  }),
];

function botLesson(number, title, shortDescription, purpose, whenToUse, preparation, input, output, selfCheck, example) {
  const botLabel = title.replace(/^Der /, "den ");
  return createLesson(4, {
    number,
    title,
    shortDescription,
    whatWeDo: `Wir klären, wie du ${botLabel} für einen konkreten Arbeitsschritt vorbereitest und sinnvoll einsetzt.`,
    whyItMatters: "Ein spezialisiertes Werkzeug liefert nur dann brauchbare Ergebnisse, wenn Aufgabe und Eingaben zum richtigen Arbeitsschritt passen.",
    result: "Du kennst den passenden Einsatz, die nötigen Angaben und deine eigenen Prüfaufgaben.",
    videoType: number === 1 ? "Erklärvideo" : "Bildschirmaufnahme",
    estimatedDuration: number === 1 ? "12 Minuten" : "14 Minuten",
    sections: [
      { title: "Wofür ist der Bot gedacht?", paragraphs: [purpose] },
      { title: "Wann benutze ich ihn?", paragraphs: [whenToUse] },
      { title: "Was sollte ich vorbereitet haben?", items: preparation },
      { title: "Welche Informationen gebe ich ihm?", items: input },
      { title: "Was bekomme ich als Ergebnis?", items: output },
      { title: "Was muss ich selbst prüfen?", items: selfCheck },
    ],
    examples: [{ title: "Konkretes Beispiel", text: example }],
    tips: ["Der Bot liefert Vorschläge und Arbeitsmaterial. Er trifft keine automatische endgültige Entscheidung für dein Buch."],
    task: { title: `Bereite ${botLabel} vor`, description: "Erstelle eine kurze Eingabekarte für dein eigenes Buchprojekt.", steps: ["aktuellen Arbeitsschritt benennen.", "vorhandene Informationen sammeln.", "gewünschtes Ergebnis festlegen.", "eigene Prüfkriterien notieren."] },
    checklist: ["Ich kenne den Einsatzzweck.", "Meine Eingaben sind vorbereitet.", "Das gewünschte Ergebnis ist klar.", "Ich weiß, was ich selbst prüfen muss."],
    downloads: [preparedDownload(4, number, `Eingabekarte: ${title}`, "Vorbereitete Karte für Ziel, Angaben und Prüfkriterien.")],
  });
}

const module4Lessons = [
  createLesson(4, {
    number: 1,
    title: "Überblick über deine KreaMix-Werkzeuge",
    shortDescription: "Du ordnest jedem typischen Buchschritt das passende spezialisierte Werkzeug zu.",
    whatWeDo: "Wir erstellen eine Werkzeugkarte für Idee, Aufbau, Cover, Produktpräsentation und Marketing.",
    whyItMatters: "Wenn du zuerst dein Ziel klärst, musst du nicht jedes Mal bei null anfangen oder den falschen Bot mit einer unpassenden Aufgabe füttern.",
    result: "Du kannst für einen Arbeitsschritt das passende KreaMix-Werkzeug auswählen.",
    videoType: "Erklärvideo",
    estimatedDuration: "12 Minuten",
    sections: [
      { title: "Nischen-Bot", paragraphs: ["Für Buchideen, Zielgruppen und erste Marktüberlegungen."] },
      { title: "Buch-Bot", paragraphs: ["Für Struktur, Seitenplan und Inhalte."] },
      { title: "Cover- und Fullcover-Bot", paragraphs: ["Für Coverideen, Bildkonzepte und technische Vorbereitung."] },
      { title: "A+ Content Bot", paragraphs: ["Für die zusätzliche Präsentation des Buches auf der Produktseite."] },
      { title: "Marketing-Bot", paragraphs: ["Für Content-Ideen, Hooks und einfache Marketingpläne."] },
    ],
    examples: [{ title: "Werkzeug wählen", text: "Du hast eine grobe Idee, aber noch keine klare Zielgruppe. Dann ist der Nischen-Bot passender als der Cover-Bot." }],
    tips: ["Frage zuerst: Was möchte ich gerade erreichen? Wähle erst danach das Werkzeug."],
    task: { title: "Erstelle deine Werkzeugkarte", description: "Ordne fünf typische Aufgaben den passenden Bots zu.", steps: ["Aufgabe benennen.", "passenden Bot wählen.", "kurz begründen.", "fehlende Vorbereitung notieren."] },
    checklist: ["Ich kenne alle fünf Werkzeuge.", "Ich wähle nach Ziel und nicht nach Neugier.", "Ich weiß, dass die Bereiche derzeit als vorbereitete Vorschau dienen."],
    downloads: [preparedDownload(4, 1, "KreaMix-Werkzeugkarte", "Übersicht der spezialisierten Bots und ihrer Einsatzbereiche.")],
  }),
  botLesson(2, "Der Nischen-Bot", "Du bereitest eine grobe Buchidee so vor, dass daraus mehrere prüfbare Richtungen entstehen können.", "Der Nischen-Bot hilft bei Buchideen, Zielgruppen, Interessen und ersten Marktüberlegungen.", "Nutze ihn, wenn du eine grobe Buchart kennst, aber Thema oder Zielgruppe noch eingrenzen möchtest.", ["eine grobe Buchart", "eine erste Idee oder ein Interessengebiet", "deine persönlichen Grenzen bei Zeit und Aufwand"], ["ungefähres Alter oder Zielgruppe", "Interessen", "Buchart", "erste Idee", "gewünschtes Ergebnis"], ["konkretere Buchrichtungen", "Zielgruppenideen", "erste Themenansätze", "Fragen zur weiteren Eingrenzung"], ["Passt die Idee wirklich zu mir?", "Ist sie realistisch umsetzbar?", "Gibt es belastbare Nachfragehinweise?", "Sind Aussagen und Annahmen nachvollziehbar?"], "Eingabe: Beschäftigungsbuch für Kinder, Alter 8 bis 10, Interesse Weltraum. Mögliches Ergebnis: mehrere konkrete Buchrichtungen und Fragen zur weiteren Eingrenzung."),
  botLesson(3, "Der Buch-Bot", "Du lernst, wie aus einer geprüften Idee ein Seitenplan und eine belastbare Inhaltsstruktur werden.", "Der Buch-Bot unterstützt bei Aufbau, Kapiteln, Seitentypen, Übungen und Inhaltsideen.", "Nutze ihn nach der ersten Ideenprüfung, wenn Buchart, Zielgruppe und grober Nutzen feststehen.", ["Buchart und Zielgruppe", "Zweck des Buches", "ungefährer Umfang", "bereits vorhandene Inhalte"], ["gewünschte Kapitel oder Seitentypen", "Ton und Schwierigkeit", "Formatbedingungen", "Inhalte, die enthalten oder vermieden werden sollen"], ["mögliche Buchstruktur", "Seitenplan", "Inhaltsideen", "offene Entscheidungsfragen"], ["Ist die Reihenfolge logisch?", "Sind Aufgaben abwechslungsreich?", "Passt der Umfang?", "Sind Fakten und Inhalte korrekt?"], "Eingabe: Rätselbuch für Kinder von 8 bis 10 Jahren mit 60 Seiten. Mögliches Ergebnis: ein Seitenplan mit Einleitung, fünf Rätselarten, Lösungen und wiederkehrenden Seitentypen."),
  botLesson(4, "Der Cover- und Fullcover-Bot", "Du bereitest Coverideen und technische Anforderungen getrennt und nachvollziehbar vor.", "Der Bot hilft bei Coverkonzept, Blickfang, Bildsprache sowie der Planung von Vorderseite, Rücken und Rückseite.", "Nutze ihn, wenn Titel, Zielgruppe, Format und grober Inhalt bereits klar sind.", ["Arbeitstitel und Untertitel", "Zielgruppe", "Buchformat", "Seitenzahl oder aktueller Stand", "gewünschte Stimmung"], ["wichtige Texte", "Bildmotive", "Farbrichtung", "vergleichbare Stilrichtung ohne fremde Marken zu kopieren", "technische Ausgangsdaten"], ["Coverrichtungen", "Bildkonzepte", "Text-Hierarchie", "Checkfragen für das Fullcover"], ["Lesbarkeit in kleiner Ansicht", "richtige Maße anhand offizieller Vorlagen", "Bildrechte und Marken", "Beschnitt, Rücken und Rückseite"], "Eingabe: kindgerechtes Weltraum-Rätselbuch, neugierig und klar, keine überladene Optik. Mögliches Ergebnis: drei unterschiedliche Coverkonzepte mit Titelanordnung und Bildidee."),
  botLesson(5, "Der A+ Content Bot", "Du planst eine ehrliche zusätzliche Produktpräsentation mit klaren Inhaltsblöcken.", "Der Bot hilft bei Reihenfolge, Bildideen, Textbausteinen und Nutzenargumenten für eine Produktseite.", "Nutze ihn, wenn Buch, Cover, Zielgruppe und wichtigste Vorteile feststehen.", ["fertiges oder weitgehend fertiges Buch", "Cover und Beispielseiten", "Zielgruppe", "wichtigste Vorteile"], ["gewünschte Botschaft", "vorhandene Bilder", "mögliche Module", "Aussagen, die nicht verwendet werden dürfen"], ["Modulreihenfolge", "Bannerideen", "kurze Texte", "Go- und No-Go-Checkliste"], ["Entspricht alles dem echten Buch?", "Sind Behauptungen belegbar?", "Werden aktuelle Plattformvorgaben eingehalten?", "Ist die Darstellung klar statt überladen?"], "Eingabe: Rätselbuch mit fünf Rätselarten und Lösungen. Mögliches Ergebnis: A+ Ablauf mit Zielgruppen-Banner, drei Inhaltsvorteilen und Beispielseiten."),
  botLesson(6, "Der Marketing-Bot", "Du bereitest alltagstaugliche Inhalte vor, die echten Nutzen zeigen und zu deinem Buch passen.", "Der Bot unterstützt bei Content-Ideen, Hooks, Captions, Reels und einfachen Wochenplänen.", "Nutze ihn, wenn dein Buch und seine Zielgruppe klar genug beschrieben sind.", ["Buchnutzen und Zielgruppe", "verfügbare Kanäle", "echte Bilder oder Mockups", "realistische Zeit pro Woche"], ["Themen und Formate", "gewünschter Ton", "Häufigkeit", "klare Grenzen und keine falschen Versprechen"], ["Content-Ideen", "Hooks", "Caption-Entwürfe", "einfacher Wochenplan"], ["Passt der Inhalt zum echten Buch?", "Ist der Hook ehrlich?", "Sind Kennzeichnungen nötig?", "Entspricht alles aktuellen Plattformregeln?"], "Eingabe: Rätselbuch für Reisen und Wartezeiten, zwei Posts pro Woche. Mögliches Ergebnis: vier Content-Ideen, passende Hooks und ein einfacher Zwei-Wochen-Plan."),
];

export const foundationModuleContent = [
  {
    id: "module-01",
    number: 1,
    phaseId: "phase-1",
    title: "Los geht’s",
    subtitle: "Wir bauen dein erstes Buch",
    description: "Du startest dein Buchprojekt, lernst den Kursaufbau kennen und richtest deine Arbeit sauber ein.",
    result: "Du hast eine klare Grundlage für dein erstes Buchprojekt.",
    resultItems: ["verstanden, wie KreaMix funktioniert", "deine Projektstruktur angelegt", "ein erstes Buchziel formuliert", "einen einfachen persönlichen Projektplan erstellt"],
    introduction: "In diesem Modul startest du dein eigenes Buchprojekt. Du musst noch nicht jedes Detail wissen. Aus einer losen Idee wird jetzt ein echtes, geordnetes Projekt.",
    introductionVideo: {
      type: "Einführungsvideo",
      url: null,
      script: `Willkommen bei KreaMix.

In diesem Kurs geht es nicht darum, dass du dir stundenlang Videos ansiehst und am Ende trotzdem vor einem leeren Dokument sitzt.

Wir bauen Schritt für Schritt ein echtes Buchprojekt.

Du musst heute noch nicht wissen, wie dein perfekter Titel lautet, welches Cover du brauchst oder welche Keywords später bei Amazon funktionieren.

Das kommt alles noch.

In diesem ersten Modul schaffen wir die Grundlage.

Du lernst, wie der Kurs funktioniert, richtest dein Projekt sauber ein und legst fest, was du mit deinem ersten Buch erreichen möchtest.

Arbeite die Lektionen am besten der Reihe nach durch.

Mach die Aufgaben wirklich mit.

Denn am Ende dieses Kurses soll nicht nur dein Wissen gewachsen sein.

Am Ende soll ein echtes Buchprojekt stehen.

Also fangen wir an.`,
    },
    title: "Von der Idee zur prüfbaren KDP-Buchidee",
    fullTitle: "Modul 1 – Von der Idee zur prüfbaren KDP-Buchidee",
    subtitle: "Entwickle eine konkrete KDP-Buchidee, prüfe ihre Nische und entscheide fundiert, ob du sie weiterverfolgen möchtest.",
    description: "Du entwickelst eine konkrete KDP-Buchidee, prüfst Nische, Konkurrenz, Preisrahmen und triffst eine Go-/No-Go-Entscheidung.",
    result: "Am Ende dieses Moduls hast du eine konkrete Buchidee mit Zielgruppe, Nische, erster Konkurrenzprüfung, Preis-/Margenrahmen und einer Go-/No-Go-Entscheidung.",
    resultItems: ["konkrete Buchidee mit Zielgruppe", "klare Nische und Suchgrund", "erste Konkurrenzprüfung", "Preis-/Margenrahmen", "Go-/No-Go-Entscheidung"],
    introduction: "In diesem Modul entwickelst du aus einer ersten Richtung eine prüfbare KDP-Buchidee. Du arbeitest acht Lektionen der Reihe nach durch und entscheidest am Ende bewusst: GO, ANPASSEN oder NO-GO.",
    introductionVideo: {
      type: "Einführungsvideo",
      url: null,
      script: "Willkommen in Modul 1. In diesem Modul gehst du von einer ersten Idee zu einer prüfbaren KDP-Buchidee. Du wählst eine Buchrichtung, schärfst daraus eine Nische, prüfst Konkurrenz und Preisrahmen und triffst am Ende eine klare Entscheidung: GO, ANPASSEN oder NO-GO.",
    },
    lessons: module1Lessons,
    completionMessage: "Dein Projekt steht. Du hast jetzt eine klare Grundlage und kannst im nächsten Modul die wichtigsten Begriffe kennenlernen, die dir im weiteren Kurs immer wieder begegnen.",
    completionMessage: "Modul 1 abgeschlossen. Du hast deine Buchidee geprüft und eine Entscheidung getroffen. Bei GO oder nach erfolgreicher Anpassung kannst du mit Modul 2 fortfahren.",
    completionChecklist: ["Arbeitstitel", "Buchart", "Zielgruppe", "konkrete Nische", "Nutzen für die Zielgruppe", "Konkurrenz-Einschätzung", "Preisrahmen und Marge", "Chancen, Risiken und offene Fragen", "Entscheidung: GO, ANPASSEN oder NO-GO"],
    nextModuleNumber: 2,
  },
  {
    id: "module-02",
    number: 2,
    phaseId: "phase-1",
    title: "Der KreaMix-Spickzettel",
    subtitle: "Was ist was?",
    description: "Ein verständlicher Nachschlagebereich für die wichtigsten Begriffe rund um Buch, KDP und Marketing.",
    result: "Du verstehst die wichtigsten Begriffe, die im weiteren Kurs verwendet werden.",
    resultItems: ["KDP- und Buchbegriffe einfach erklären", "Datei- und Präsentationsbegriffe unterscheiden", "Marketingbegriffe sinnvoll einordnen", "später gezielt zu einem Begriff zurückkehren"],
    introduction: "Dieses Modul ist dein persönlicher Begriffswerkzeugkasten. Du gehst ihn einmal in Ruhe durch und kannst später jederzeit zurückkehren, ohne Fachsprache auswendig lernen zu müssen.",
    introductionVideo: {
      type: "Einführungsvideo",
      url: null,
      script: `In den nächsten Modulen werden dir immer wieder Begriffe begegnen, die am Anfang komplizierter klingen, als sie eigentlich sind.

KDP, Print-on-Demand, ASIN, Beschnitt, Fullcover, Keywords, A+ Content und einige andere.

Du musst diese Begriffe nicht auswendig lernen.

Genau dafür gibt es diesen Spickzettel.

Du kannst dieses Modul jetzt einmal durchgehen und später jederzeit zurückkommen, wenn dir ein Begriff unklar ist.

Betrachte diesen Bereich wie deinen persönlichen KreaMix-Werkzeugkasten für Begriffe.

Wir machen aus Fachsprache jetzt normale Sprache.`,
    },
    isTool: true,
    lessons: module2Lessons,
  },
  {
    id: "module-03",
    number: 3,
    phaseId: "phase-1",
    title: "Dein KI-Helfer",
    subtitle: "ChatGPT richtig nutzen",
    description: "Du lernst ein einfaches System für klare Aufgaben, bessere Antworten und verantwortungsvolle Prüfung.",
    result: "Du kannst ChatGPT sinnvoll als Arbeitswerkzeug für dein Buchprojekt einsetzen.",
    resultItems: ["klare Aufgaben formulieren", "bessere Prompts schreiben", "Antworten gezielt verbessern", "KI-Fehler erkennen", "Entscheidungen selbst prüfen"],
    introduction: "ChatGPT kann dir viel Arbeit abnehmen, ist aber keine Maschine für automatisch perfekte Bücher. Du gibst Richtung und Kriterien vor und prüfst jedes wichtige Ergebnis.",
    introductionVideo: {
      type: "Einführungsvideo",
      url: null,
      script: `ChatGPT kann dir bei einem Buchprojekt unglaublich viel Arbeit abnehmen.

Aber nur, wenn du weißt, wie du mit dem Werkzeug arbeitest.

Eine unklare Aufgabe führt meistens zu einer unklaren Antwort.

Deshalb lernst du in diesem Modul nicht hundert komplizierte Prompt-Formeln.

Du lernst ein einfaches System.

Du sagst der KI, was du brauchst, für wen du es brauchst, welche Bedingungen gelten und wie das Ergebnis aussehen soll.

Und ganz wichtig:

Du prüfst das Ergebnis.

ChatGPT ist dein Helfer.

Nicht der Chef deines Buchprojekts.`,
    },
    lessons: module3Lessons,
    completionMessage: "Dein erster wiederverwendbarer KreaMix-Prompt ist vorbereitet. Du kannst ihn ab jetzt an neue Arbeitsschritte anpassen und jedes Ergebnis mit deiner Prüfroutine kontrollieren.",
  },
  {
    id: "module-04",
    number: 4,
    phaseId: "phase-1",
    title: "Deine KreaMix-Bots",
    subtitle: "Welcher Bot macht was?",
    description: "Du lernst die spezialisierten KreaMix-Werkzeuge kennen und wählst sie passend zum Arbeitsschritt aus.",
    result: "Du kannst für einen Arbeitsschritt das passende Werkzeug auswählen.",
    resultItems: ["die fünf Werkzeugbereiche unterscheiden", "Eingaben sinnvoll vorbereiten", "erwartbare Ergebnisse einschätzen", "eigene Prüfaufgaben erkennen"],
    introduction: "Spezialisierte Bots helfen dir, wiederkehrende Aufgaben klarer vorzubereiten. Die Bereiche sind als Vorschau angelegt, bis die echten Bot-Funktionen technisch verbunden werden.",
    introductionVideo: {
      type: "Einführungsvideo",
      url: null,
      script: `Du könntest für jede Aufgabe immer wieder bei null anfangen und ChatGPT jedes Mal neu erklären, was du möchtest.

Oder du benutzt ein Werkzeug, das bereits für eine bestimmte Aufgabe vorbereitet ist.

Genau dafür sind die KreaMix-Bots gedacht.

Ein Bot hilft dir bei der Buchidee.

Ein anderer beim Aufbau des Buches.

Ein anderer beim Cover, bei der Produktpräsentation oder beim Marketing.

In diesem Modul schauen wir uns an, welches Werkzeug wofür gedacht ist.

Du musst nicht jeden Bot ständig benutzen.

Die wichtigste Frage lautet immer:

Was möchte ich gerade erreichen?

Danach wählst du das passende Werkzeug.`,
    },
    lessons: module4Lessons,
    completionMessage: "Du kennst jetzt deine wichtigsten Werkzeuge. Als Nächstes beginnt die eigentliche Arbeit an deinem Buch. In Phase 2 finden und prüfen wir deine konkrete Buchidee.",
  },
];
