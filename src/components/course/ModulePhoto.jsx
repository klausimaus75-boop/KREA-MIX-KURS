export function ModulePhoto({ module, children }) {
  const style = module.image
    ? {
        backgroundImage: `linear-gradient(rgba(255, 244, 235, .04), rgba(255, 244, 235, .08)), url("${module.image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <div className={`photo ${module.image ? "has-image" : "image-fallback"}`} style={style}>
      {children}
    </div>
  );
}

