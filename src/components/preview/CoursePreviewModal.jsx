import { useEffect } from "react";
import { BookOpen, Check, Clock3, Lock, Play, Sparkles, X } from "lucide-react";

export function CoursePreviewModal({ open, heroImage, phases, onClose, onSignIn }) {
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="preview-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="course-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-preview-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="preview-close" type="button" onClick={onClose} aria-label="Kursvorschau schließen">
          <X size={18} />
        </button>

        <div className="preview-trailer" aria-label="KreaMix Kurs-Trailer Vorschau">
          <img src={heroImage} alt="KreaMix Kursvorschau mit Aquarellbuch und Blumen" />
          <div className="preview-trailer-label">
            <span><Play size={18} fill="currentColor" /></span>
            <div>
              <strong>Kurs-Trailer</strong>
              <small>Ein erster Blick in deinen Weg zum eigenen Buch</small>
            </div>
          </div>
        </div>

        <div className="preview-content">
          <div className="preview-eyebrow"><Sparkles size={15} /> KreaMix Kursvorschau</div>
          <h2 id="course-preview-title">Von deiner Buchidee bis zu deinem eigenen System</h2>
          <p>
            Du entwickelst dein Buch Schritt für Schritt, bereitest es für Amazon KDP vor und baust daraus einen Ablauf,
            den du für weitere Projekte wiederverwenden kannst.
          </p>

          <div className="preview-stats" aria-label="Kursumfang">
            <span><BookOpen size={18} /><strong>18</strong> Module</span>
            <span><Clock3 size={18} /><strong>107</strong> Lektionen</span>
            <span><Check size={18} /><strong>6</strong> Phasen</span>
          </div>

          <div className="preview-phase-grid" aria-label="Kursphasen">
            {phases.map((phase) => (
              <div key={phase.id}>
                <span>{String(phase.number).padStart(2, "0")}</span>
                <strong>{phase.title}</strong>
              </div>
            ))}
          </div>

          <div className="preview-access-note">
            <Lock size={17} />
            <span>Dashboard, Module und Lektionen sind ausschließlich nach der Anmeldung zugänglich.</span>
          </div>

          <button className="preview-signin" type="button" onClick={onSignIn}>
            Anmelden oder Account erstellen
          </button>
        </div>
      </section>
    </div>
  );
}
