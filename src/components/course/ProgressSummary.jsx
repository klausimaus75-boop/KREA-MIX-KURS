export function ProgressSummary({ progress }) {
  return (
    <div className="progress-summary" aria-label={`${progress.percent} Prozent Kursfortschritt`}>
      <div className="progress-summary-value">
        <strong>{progress.percent}%</strong>
        <span>Gesamtfortschritt</span>
      </div>
      <div>
        <p>{progress.completed} von {progress.total} Lektionen abgeschlossen</p>
        <div className="bar"><i style={{ width: `${progress.percent}%` }} /></div>
      </div>
    </div>
  );
}

