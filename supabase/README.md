# KREA-MIX Supabase Backend

Projekt: `wgacssqhyvfylbrzxwqh` (`KREA MIX`, Frankfurt)

## Datenmodell

- `public.profiles`: persönliches Profil und serverseitig verwalteter Adminstatus
- `public.lesson_progress`: abgeschlossene Lektionen pro Account
- RLS: Mitglieder können ausschließlich ihre eigenen Zeilen lesen und ändern
- Realtime: `lesson_progress` ist Teil der Publikation `supabase_realtime`

Migrationen liegen unter `supabase/migrations` und wurden auf das Projekt angewendet.

## Google-Anmeldung aktivieren

1. In Google Cloud einen OAuth-Client vom Typ **Webanwendung** erstellen.
2. Autorisierte JavaScript-Quellen:
   - `https://klausimaus75-boop.github.io`
   - `http://127.0.0.1:5173`
3. Autorisierte Weiterleitungs-URI:
   - `https://wgacssqhyvfylbrzxwqh.supabase.co/auth/v1/callback`
4. Client-ID und Client-Secret in Supabase unter **Authentication > Sign In / Providers > Google** eintragen und Google aktivieren.
5. Unter **Authentication > URL Configuration** eintragen:
   - Site URL: `https://klausimaus75-boop.github.io/KREA-MIX-KURS/`
   - Redirect URLs: `https://klausimaus75-boop.github.io/KREA-MIX-KURS/`, `http://127.0.0.1:5173/KREA-MIX-KURS/`, `http://127.0.0.1:4173/KREA-MIX-KURS/`

Client-Secrets gehören ausschließlich in Google Cloud und Supabase. Sie dürfen niemals in Vite-Variablen oder Git committed werden.

## Eigentümer zum Administrator machen

Nach der ersten erfolgreichen Anmeldung wird das Profil angelegt. Die Adminrolle wird einmalig serverseitig vergeben:

```sql
update public.profiles
set is_admin = true
where id = (
  select id
  from auth.users
  where email = 'DEINE-GOOGLE-EMAIL'
);
```

Mitglieder besitzen keine Berechtigung, `is_admin` selbst zu ändern. `#admin` zeigt ohne diesen Status nur die gesperrte Anmeldeseite.
