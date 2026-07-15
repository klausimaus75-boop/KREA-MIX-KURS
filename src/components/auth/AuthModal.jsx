import { useEffect, useState } from "react";
import { Check, Cloud, LoaderCircle, LockKeyhole, LogOut, Mail, UserRound, X } from "lucide-react";

export function AuthModal({ open, onClose, auth, syncStatus }) {
  const [mode, setMode] = useState("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setBusy(false);
      setMessage("");
      setPassword("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;

  async function submitEmail(event) {
    event.preventDefault();
    setMessage("");
    if (password.length < 8) {
      setMessage("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    setBusy(true);
    const result = mode === "signup"
      ? await auth.signUpWithEmail({ displayName, email, password })
      : await auth.signInWithEmail({ email, password });
    setBusy(false);
    if (result.error) {
      setMessage(result.error);
      return;
    }
    if (result.needsConfirmation) {
      setMessage("Fast geschafft: Bitte bestätige den Link in deiner E-Mail.");
      return;
    }
    onClose();
  }

  async function submitGoogle() {
    setBusy(true);
    setMessage("");
    const result = await auth.signInWithGoogle();
    if (result.error) {
      setBusy(false);
      setMessage(result.error);
    }
  }

  async function signOut() {
    setBusy(true);
    const result = await auth.signOut();
    setBusy(false);
    if (result.error) setMessage(result.error);
    else onClose();
  }

  return (
    <div className="auth-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="auth-close" onClick={onClose} aria-label="Anmeldung schließen"><X size={19} /></button>

        {auth.user ? (
          <div className="auth-account">
            <AccountAvatar auth={auth} />
            <span className="auth-eyebrow">Dein KreaMix Account</span>
            <h2 id="auth-title">{auth.profile?.display_name || auth.user.email}</h2>
            <p>{auth.user.email}</p>
            <div className="auth-sync-state">
              <Cloud size={18} />
              <div>
                <strong>{syncStatus === "synced" ? "In Echtzeit synchronisiert" : "Cloud-Fortschritt aktiv"}</strong>
                <span>Deine erledigten Lektionen bleiben auf deinen Geräten erhalten.</span>
              </div>
            </div>
            <button className="auth-signout" onClick={signOut} disabled={busy}>
              <LogOut size={18} /> Abmelden
            </button>
            {message && <p className="auth-message error" role="alert">{message}</p>}
          </div>
        ) : (
          <>
            <div className="auth-heading">
              <span className="auth-eyebrow">Willkommen bei KreaMix</span>
              <h2 id="auth-title">{mode === "signup" ? "Account erstellen" : "Schön, dass du wieder da bist"}</h2>
              <p>Dein Kursfortschritt wird sicher in deinem persönlichen Account gespeichert.</p>
            </div>

            <button className="google-signin" onClick={submitGoogle} disabled={busy || !auth.configured || !auth.googleEnabled}>
              <span className="google-mark" aria-hidden="true">G</span>
              {auth.googleEnabled ? `Mit Google ${mode === "signup" ? "registrieren" : "anmelden"}` : "Google-Anmeldung noch freischalten"}
            </button>

            <div className="auth-divider"><span>oder mit E-Mail</span></div>

            <form className="auth-form" onSubmit={submitEmail}>
              {mode === "signup" && (
                <label>
                  <span>Name</span>
                  <div><UserRound size={18} /><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="name" required /></div>
                </label>
              )}
              <label>
                <span>E-Mail-Adresse</span>
                <div><Mail size={18} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
              </label>
              <label>
                <span>Passwort</span>
                <div><LockKeyhole size={18} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} required /></div>
              </label>
              <button className="auth-submit" type="submit" disabled={busy || !auth.configured}>
                {busy ? <LoaderCircle className="spin" size={19} /> : <Check size={18} />}
                {mode === "signup" ? "Account erstellen" : "Anmelden"}
              </button>
            </form>

            {!auth.configured && <p className="auth-message error">Die Supabase-Verbindung fehlt in dieser Umgebung.</p>}
            {(message || auth.error) && <p className="auth-message error" role="alert">{message || auth.error}</p>}

            <button
              className="auth-switch"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setMessage("");
                auth.clearError();
              }}
            >
              {mode === "signin" ? "Noch keinen Account? Jetzt registrieren" : "Du hast schon einen Account? Anmelden"}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export function AccountAvatar({ auth, size = "large" }) {
  const name = auth.profile?.display_name || auth.user?.email || "KreaMix";
  const avatarUrl = auth.profile?.avatar_url || auth.user?.user_metadata?.avatar_url || auth.user?.user_metadata?.picture;
  return (
    <div className={`account-avatar ${size}`} aria-hidden="true">
      {avatarUrl ? <img src={avatarUrl} alt="" referrerPolicy="no-referrer" /> : <span>{name.slice(0, 1).toUpperCase()}</span>}
    </div>
  );
}
