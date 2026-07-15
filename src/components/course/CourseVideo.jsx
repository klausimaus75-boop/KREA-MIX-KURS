import { Play, Video } from "lucide-react";
import { ModulePhoto } from "./ModulePhoto";

export function CourseVideo({ module, video, title, introduction = false }) {
  const hasVideo = Boolean(video?.url);
  return (
    <figure className="course-video">
      <ModulePhoto module={module}>
        {hasVideo ? (
          <a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${title} öffnen`}>
            <Play fill="currentColor" />
          </a>
        ) : (
          <div className="course-video-placeholder" role="status">
            <span><Video size={16} /> Demo-Vorschau</span>
            <i><Play fill="currentColor" /></i>
            <strong>{introduction ? "Einführungsvideo folgt" : "Lektionsvideo folgt"}</strong>
          </div>
        )}
      </ModulePhoto>
      <figcaption>
        <span>{video?.type || "Erklärvideo"}</span>
        <strong>{hasVideo ? "Video öffnen" : "Videoskript und Poster sind vorbereitet"}</strong>
      </figcaption>
    </figure>
  );
}
