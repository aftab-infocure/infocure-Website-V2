import { useEffect, useRef } from "react";

export default function LazyVideo({ src, webm, poster, className = "", testId, defer = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let io;
    const arm = () => {
      io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!video.dataset.loaded) {
            video.dataset.loaded = "1";
            if (webm) {
              const s = document.createElement("source");
              s.src = webm;
              s.type = "video/webm";
              video.appendChild(s);
            }
            const s2 = document.createElement("source");
            s2.src = src;
            s2.type = "video/mp4";
            video.appendChild(s2);
            video.load();
          }
          video.play().catch(() => {});
        });
      },
      { rootMargin: "400px" }
      );
      io.observe(video);
    };
    if (defer && document.readyState !== "complete") {
      window.addEventListener("load", arm, { once: true });
    } else {
      arm();
    }
    return () => io && io.disconnect();
  }, [src, webm, defer]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onCanPlay={(e) => { const v = e.currentTarget; if (v.paused) v.play().catch(() => {}); }}
      data-testid={testId}
    />
  );
}
