import { FileText } from "lucide-react";
import { toolEntries } from "../../data/courseData";

export function ToolsSection({ openModule, compact = false }) {
  return (
    <section className={`tools-section ${compact ? "compact" : ""}`}>
      <div className="section-title"><h2>Werkzeuge</h2></div>
      <div className="tools-grid">
        {toolEntries.map((tool) => (
          <button key={tool.id} onClick={() => openModule(tool.moduleIndex)}>
            <FileText size={18} />
            <strong>{tool.title}</strong>
            <span>{tool.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
