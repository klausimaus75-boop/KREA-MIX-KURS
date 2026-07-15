export function BookProjectCard({ project, phase }) {
  return (
    <section className="book-project-card">
      <span>Mein Buchprojekt</span>
      <h2>{project.workingTitle}</h2>
      <dl>
        <div><dt>Arbeitstitel</dt><dd>{project.workingTitle}</dd></div>
        <div><dt>Aktuelle Phase</dt><dd>{phase?.title || "Dein Fundament"}</dd></div>
        <div><dt>Aktueller Schritt</dt><dd>{project.currentStep}</dd></div>
        <div><dt>Projektfortschritt</dt><dd>{project.progress}%</dd></div>
      </dl>
      <div className="bar"><i style={{ width: `${project.progress}%` }} /></div>
    </section>
  );
}

