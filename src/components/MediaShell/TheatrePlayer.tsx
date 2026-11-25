import { useEffect, useRef, useState } from "react";

const TheatrePlayer = ({
  isOpen,
  onClose,
  src,
  fallbackSrc,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  fallbackSrc?: string;
  title: string;
}) => {
  const [usingFallback, setUsingFallback] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state each time the player opens or the source changes
  // useEffect(() => {
  //   if (!isOpen) return;
  //   setUsingFallback(false);
  //   setStatus("loading");

  //   // If the primary iframe hasn't reported load within 6s, switch to fallback
  //   if (fallbackSrc) {
  //     timerRef.current = setTimeout(() => {
  //       setStatus((s) => (s === "ready" ? s : "error"));
  //       setUsingFallback(true);
  //     }, 6000);
  //   }

  //   return () => {
  //     if (timerRef.current) clearTimeout(timerRef.current);
  //   };
  // }, [isOpen, src, fallbackSrc]);

  const handleLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("ready");
  };

  const handleError = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fallbackSrc && !usingFallback) {
      setUsingFallback(true);
      setStatus("loading");
      // Give the fallback a chance too
      timerRef.current = setTimeout(() => {
        setStatus((s) => (s === "ready" ? s : "error"));
      }, 6000);
    } else {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  const currentSrc = usingFallback && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Watch ${title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07071a]/90 p-3 backdrop-blur-xl sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <p>{status}</p>
            <p className="truncate text-sm font-semibold text-white/80">
              {title}
            </p>
            {status === "loading" && (
              <span className="flex items-center gap-1.5 text-xs text-white/50">
                <span className="size-3 animate-spin rounded-full border-2 border-white/20 border-t-primary" />
                Loading
              </span>
            )}
            {usingFallback && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/25">
                Backup
              </span>
            )}
            {status === "error" && (
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-300 ring-1 ring-red-400/25">
                Failed
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close player"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 fill-none stroke-current"
              strokeWidth="2"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] ring-1 ring-primary/30">
          {status === "error" && !fallbackSrc ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/60">
              <svg
                viewBox="0 0 24 24"
                className="size-10 fill-none stroke-current"
                strokeWidth="1.5"
              >
                <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
              <p className="text-sm">This video could not be loaded.</p>
            </div>
          ) : (
            <iframe
              key={currentSrc}
              src={currentSrc}
              title={`Watch ${title}`}
              className="h-full w-full"
              referrerPolicy="origin"
              allowFullScreen
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TheatrePlayer;