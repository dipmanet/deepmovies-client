import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/**
 * Reusable horizontal slider:
 *  - arrow buttons (desktop, appear on hover / focus)
 *  - drag-to-scroll with the mouse, native swipe on touch
 *  - scroll-snap, edge fades that only show when there is more to see
 *  - progress bar, arrow-key support
 */
const Slider = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false });

  const [isDragging, setIsDragging] = useState(false);
  const [state, setState] = useState({
    canPrev: false,
    canNext: false,
    progress: 0,
    thumb: 1,
  });

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;

    setState({
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
      thumb:
        el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });

    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollPage = (direction: 1 | -1) =>
    scrollerRef.current?.scrollBy({
      left: direction * scrollerRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || e.button !== 0) return;

    drag.current = {
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: false,
    };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.pageX - drag.current.startX;

      if (!drag.current.moved && Math.abs(dx) > 5) {
        drag.current.moved = true;
        setIsDragging(true);
      }

      if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setIsDragging(false);
      setTimeout(() => (drag.current.moved = false), 0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") scrollPage(1);
    if (e.key === "ArrowLeft") scrollPage(-1);
  };

  const arrow =
    "absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#191936]/85 text-white opacity-0 shadow-xl shadow-black/40 backdrop-blur-md transition duration-200 hover:scale-110 hover:border-primary hover:bg-primary focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary group-hover/slider:opacity-100 md:flex";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="group/slider relative -mx-4 sm:-mx-6 lg:-mx-8"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          onMouseDown={handleMouseDown}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className={`overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8 scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8 ${
            isDragging
              ? "cursor-grabbing select-none snap-none"
              : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          <div className="flex w-max gap-4 sm:gap-5">{children}</div>
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#191936] to-transparent transition-opacity duration-300 sm:w-16 ${
            state.canPrev ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#191936] to-transparent transition-opacity duration-300 sm:w-16 ${
            state.canNext ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Arrows */}
        {state.canPrev && (
          <button
            onClick={() => scrollPage(-1)}
            aria-label={`Previous ${label}`}
            className={`${arrow} left-3`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 fill-none stroke-current"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
        )}

        {state.canNext && (
          <button
            onClick={() => scrollPage(1)}
            aria-label={`Next ${label}`}
            className={`${arrow} right-3`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 fill-none stroke-current"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress */}
      {state.thumb < 1 && (
        <div
          aria-hidden
          className="mx-4 mt-3 h-[3px] overflow-hidden rounded-full bg-white/10 sm:mx-6 lg:mx-8"
        >
          <div
            className="h-full rounded-full bg-primary transition-[margin] duration-150"
            style={{
              width: `${state.thumb * 100}%`,
              marginLeft: `${state.progress * (1 - state.thumb) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
