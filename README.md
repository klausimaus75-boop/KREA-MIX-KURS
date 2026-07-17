# KREA-MIX-KURS

KREA-MIX-KURS ist ein Web-Prototyp fuer einen kreativen Onlinekurs mit Landingpage, geschuetztem Kursbereich, Classroom, Modulen, Lektionen, Community-Ansicht, Kalender, Mitgliederbereich und Admin-Vorschau.

Live-Seite:
[klausimaus75-boop.github.io/KREA-MIX-KURS](https://klausimaus75-boop.github.io/KREA-MIX-KURS/)

## Funktionen

- Kreative KreaMix-Landingpage mit Kursvorschau
- Kursbereich erst nach Anmeldung erreichbar
- Google-Login vorbereitet ueber Supabase Auth
- Module und Lektionen nach Kursstruktur
- Fortschritt pro Account mit Supabase-Backend vorbereitet
- Admin-Bereich als geschuetzte Vorschau
- Responsive Darstellung fuer Desktop und Mobilgeraete

## Entwicklung

Voraussetzungen:

- Node.js
- pnpm

Installation:

```bash
pnpm install
```

Lokaler Start:

```bash
pnpm dev
```

Produktionsbuild:

```bash
pnpm build
```

## Supabase

Die Datenbankstruktur liegt unter `supabase/migrations`. Fuer Auth, Profile, Rollen und Lernfortschritt sind Migrationen vorbereitet.

Die benoetigten Umgebungsvariablen stehen als Vorlage in `.env.example`.

## Deployment

Die Seite wird als statische Vite-App gebaut und ueber GitHub Pages bereitgestellt. Die Datei `.nojekyll` ist enthalten, damit GitHub Pages die Assets unveraendert ausliefert.
