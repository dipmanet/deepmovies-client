
const TheatrePlayer = ({
  isOpen,
  onClose,
  src,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Watch ${title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07071a]/90 p-3 backdrop-blur-xl sm:p-8"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="truncate text-sm font-semibold text-white/80">
            {title}
          </p>

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

        <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] ring-1 ring-primary/30">
          <iframe
            src={src}
            title={`Watch ${title}`}
            className="h-full w-full"
            referrerPolicy="origin"
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default TheatrePlayer;
