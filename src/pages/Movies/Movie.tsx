import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";

import {
  useFetchMovie,
  useFetchMovieCredits,
  useFetchMovieRecommendations,
  useFetchMovieReviews,
  useFetchMovieSimilars,
} from "#lib/api";

import { ReviewType } from "#lib/datatypes";
import { getDateString } from "#lib/utils";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const imageUrl = (
  path?: string | null,
  size: string = "original",
): string | undefined =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : undefined;

const formatRuntime = (runtime?: number) => {
  if (!runtime) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatMoney = (value?: number) =>
  value
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value)
    : "N/A";

/* Inline SVG film grain – no extra network request */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

const SectionHeading = ({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
}) => (
  <div className="mb-6 flex items-end justify-between gap-4">
    <div className="flex items-stretch gap-3">
      <span className="w-1 rounded-full bg-gradient-to-b from-primary to-primary/0" />
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-white/45 sm:text-sm">{subtitle}</p>
        )}
      </div>
    </div>

    {meta && <span className="shrink-0 text-xs text-white/40">{meta}</span>}
  </div>
);

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

    // Track size changes too (skeletons -> real cards, window resize)
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
      // reset after the click event that follows mouseup has been handled
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

const CARD = "w-[145px] shrink-0 snap-start sm:w-[185px] lg:w-[200px]";
const REVIEWS_COLLAPSED = 4; // two rows of two on desktop

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <p className="text-[11px] text-white/40">{label}</p>
    <p
      className="mt-1 truncate text-sm font-medium text-white/90"
      title={value}
    >
      {value}
    </p>
  </div>
);

const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Hero overlays – layered, cinematic colour grade                     */
/* ------------------------------------------------------------------ */

const HeroOverlays = () => (
  <>
    {/* 1. Colour grade: pulls any backdrop toward the site's indigo palette */}
    <div className="absolute inset-0 bg-[#191936]/45 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-indigo-900/40 mix-blend-soft-light" />

    {/* 2. Reading gradient from the left, where the text lives */}
    <div className="absolute inset-0 bg-[linear-gradient(95deg,#12122a_0%,rgba(18,18,42,0.88)_28%,rgba(25,25,54,0.35)_62%,rgba(25,25,54,0.1)_100%)]" />

    {/* 3. Soft spotlight behind the poster / title block */}
    <div className="absolute -bottom-32 -left-24 size-[640px] rounded-full bg-primary/25 blur-[140px]" />

    {/* 4. Cool rim light, top right */}
    <div className="absolute -right-24 -top-24 size-[460px] rounded-full bg-sky-400/15 blur-[130px]" />

    {/* 5. Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,8,22,0.65)_100%)]" />

    {/* 6. Top fade so the navbar stays legible */}
    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0c0c1e]/80 to-transparent" />

    {/* 7. Bottom fade that melts the hero into the page */}
    <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#191936] via-[#191936]/85 to-transparent" />

    {/* 8. Film grain – hides banding and adds texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
      style={{ backgroundImage: GRAIN }}
    />
  </>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const MoviePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
    new Set(),
  );
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsRef = useRef<HTMLElement>(null);

  const pageType = pathname.split("/")[1];
  const movieId = Number(id);

  const { data: Movie, isLoading: isLoadingMovie } = useFetchMovie({
    id: movieId,
  });
  const { data: credits, isLoading: isLoadingCredits } = useFetchMovieCredits({
    id: movieId,
  });
  const { data: similars, isLoading: isLoadingSimilars } =
    useFetchMovieSimilars({ id: movieId });
  const { data: recommendations, isLoading: isLoadingRecommendations } =
    useFetchMovieRecommendations({ id: movieId });
  const { data: reviews, isLoading: isLoadingReviews } = useFetchMovieReviews({
    id: movieId,
  });

  const castMembers = credits?.cast ?? [];
  const similarMovies = similars?.results ?? [];
  const recommendedMovies = recommendations?.results ?? [];
  const movieReviews = reviews?.results ?? [];

  const backdropUrl = imageUrl(Movie?.backdrop_path);
  const posterUrl = imageUrl(Movie?.poster_path, "w500");

  const year = Movie?.release_date
    ? new Date(Movie.release_date).getFullYear()
    : "N/A";

  // TMDB returns these as arrays
  const countries =
    (Movie?.production_countries as { name: string }[] | undefined)
      ?.map((c) => c.name)
      .join(", ") || "N/A";
  const languages =
    (Movie?.spoken_languages as { english_name: string }[] | undefined)
      ?.map((l) => l.english_name)
      .join(", ") || "N/A";
  const companies =
    Movie?.production_companies
      ?.map((c: { name: string }) => c.name)
      .join(", ") || "N/A";

  const openPlayer = () => setIsPlayerOpen(true);
  const closePlayer = () => setIsPlayerOpen(false);

  const toggleReview = (reviewId: string) =>
    setExpandedReviews((prev) => {
      const next = new Set(prev);
      next.has(reviewId) ? next.delete(reviewId) : next.add(reviewId);
      return next;
    });

  // Close player on Escape, lock body scroll while it is open
  useEffect(() => {
    if (!isPlayerOpen) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePlayer();
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isPlayerOpen]);

  // Reset player when navigating to another movie
  useEffect(() => {
    setIsPlayerOpen(false);
    setExpandedReviews(new Set());
    setShowAllReviews(false);
    window.scrollTo({ top: 0 });
  }, [movieId]);

  return (
    <main className="min-h-screen grow overflow-hidden bg-[#191936] text-white">
      {/* ============================================================
          THEATRE MODE PLAYER
      ============================================================ */}
      {isPlayerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Watch ${Movie?.title ?? "movie"}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07071a]/90 p-3 backdrop-blur-xl sm:p-8"
          onClick={closePlayer}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-semibold text-white/80">
                {Movie?.title}
              </p>

              <button
                onClick={closePlayer}
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
                src={`https://www.2embed.cc/embed/${movieId}/`}
                title={`Watch ${Movie?.title ?? "movie"}`}
                className="h-full w-full"
                referrerPolicy="origin"
                allowFullScreen
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          CINEMATIC HERO
      ============================================================ */}
      <section className="relative isolate min-h-[640px] overflow-hidden sm:min-h-[700px] lg:min-h-[760px]">
        {/* Backdrop */}
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_20%]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#26264f] to-[#12122a]" />
        )}

        <HeroOverlays />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-end px-4 pb-12 pt-24 sm:min-h-[700px] sm:px-6 sm:pb-16 lg:min-h-[760px] lg:px-8">
          {/* Centre play button */}
          {Movie && (
            <button
              onClick={openPlayer}
              aria-label={`Play ${Movie.title}`}
              className="group absolute left-1/2 top-[28%] flex size-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_0_60px_-8px_theme(colors.primary.DEFAULT)] backdrop-blur-md transition duration-300 hover:scale-110 hover:border-primary hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:top-[32%] sm:size-24"
            >
              <span className="absolute inset-0 rounded-full border border-primary/40 motion-safe:animate-ping [animation-duration:2.8s]" />
              <PlayIcon className="relative ml-1 size-8 transition-transform group-hover:scale-110 sm:size-10" />
            </button>
          )}

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm"
          >
            <Link to="/" className="text-white/50 transition hover:text-white">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link
              to={`/${pageType}`}
              className="capitalize text-white/50 transition hover:text-white"
            >
              {pageType}
            </Link>
            <span className="text-white/20">/</span>
            <span className="max-w-[220px] truncate font-medium text-white/85">
              {Movie?.title}
            </span>
          </nav>

          {/* Details */}
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end">
            {/* Poster */}
            <div className="relative w-[130px] shrink-0 sm:w-[170px] lg:w-[210px]">
              <div className="absolute -inset-3 rounded-3xl bg-primary/30 blur-2xl" />
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${Movie?.title ?? "Movie"} poster`}
                  className="relative w-full rounded-xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/15"
                />
              ) : (
                <div
                  className={`relative aspect-[2/3] rounded-xl bg-white/10 ring-1 ring-white/10 ${
                    isLoadingMovie ? "animate-pulse" : ""
                  }`}
                />
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              {/* Genres */}
              <div className="mb-4 flex flex-wrap gap-2">
                {Movie?.genres?.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl xl:text-6xl">
                {Movie?.title}
              </h1>

              {Movie?.tagline && (
                <p className="mt-3 text-sm italic text-white/60 sm:text-base">
                  “{Movie.tagline}”
                </p>
              )}

              {/* Rating row */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 rounded-full bg-yellow-400/15 px-3 py-1.5 text-yellow-300 ring-1 ring-yellow-400/25">
                  <svg
                    viewBox="0 0 20 20"
                    className="size-4 fill-current"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69z" />
                  </svg>
                  <span className="font-bold">
                    {Movie?.vote_average?.toFixed(1) ?? "N/A"}
                  </span>
                  <span className="text-yellow-300/60">
                    ({Movie?.vote_count?.toLocaleString() ?? 0})
                  </span>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {year}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {formatRuntime(Movie?.runtime)}
                </span>

                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 font-bold text-emerald-300 ring-1 ring-emerald-400/25">
                  HD
                </span>
              </div>

              {Movie?.overview && (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-[15px]">
                  {Movie.overview}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={openPlayer}
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
                >
                  <PlayIcon className="size-4" />
                  Watch now
                </button>

                {Movie?.homepage && (
                  <a
                    href={Movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 fill-none stroke-current"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M14 3h7v7M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    Official website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-4 pb-16 sm:px-6 lg:px-8">
        {/* Facts panel – overlaps the hero edge */}
        <section
          aria-label="Movie facts"
          className="relative z-20 -mt-6 grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:grid-cols-3 sm:p-6 lg:grid-cols-4"
        >
          <Fact
            label="Release date"
            value={
              Movie?.release_date ? getDateString(Movie.release_date) : "N/A"
            }
          />
          <Fact label="Status" value={Movie?.status ?? "N/A"} />
          <Fact label="Country" value={countries} />
          <Fact label="Languages" value={languages} />
          <Fact label="Production" value={companies} />
          <Fact
            label="Original language"
            value={Movie?.original_language?.toUpperCase() ?? "N/A"}
          />
          <Fact label="Budget" value={formatMoney(Movie?.budget)} />
          <Fact label="Revenue" value={formatMoney(Movie?.revenue)} />
        </section>

        {/* ============================ CAST ============================ */}
        {(castMembers.length > 0 || isLoadingCredits) && (
          <section>
            <SectionHeading
              title="Top cast"
              subtitle="The people behind the story"
              meta={
                castMembers.length
                  ? `${Math.min(castMembers.length, 20)} of ${castMembers.length}`
                  : undefined
              }
            />

            <Slider label="cast">
              {isLoadingCredits
                ? Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-28 shrink-0 animate-pulse snap-start sm:w-32"
                    >
                      <div className="aspect-[3/4] rounded-xl bg-white/10" />
                      <div className="mt-3 h-3 w-4/5 rounded bg-white/10" />
                      <div className="mt-2 h-2 w-3/5 rounded bg-white/5" />
                    </div>
                  ))
                : castMembers.slice(0, 20).map((person: any) => {
                    const profile = imageUrl(person.profile_path, "w342");

                    return (
                      <div
                        key={person.id}
                        className="group w-28 shrink-0 snap-start sm:w-32"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:ring-primary/60">
                          {profile ? (
                            <img
                              src={profile}
                              alt={person.name}
                              loading="lazy"
                              draggable={false}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white/30">
                              {person.name?.charAt(0) ?? "?"}
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#191936]/80 to-transparent" />
                        </div>

                        <p className="mt-3 truncate text-xs font-semibold text-white/90">
                          {person.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-white/45">
                          {person.character || "Cast"}
                        </p>
                      </div>
                    );
                  })}
            </Slider>
          </section>
        )}

        {/* =========================== REVIEWS =========================== */}
        <section ref={reviewsRef} className="scroll-mt-24">
          <SectionHeading
            title="Audience reviews"
            subtitle="What viewers are saying about this movie"
            meta={
              movieReviews.length
                ? `${movieReviews.length} ${movieReviews.length === 1 ? "review" : "reviews"}`
                : undefined
            }
          />

          {isLoadingReviews ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-xl border border-white/5 bg-white/[0.03] p-5 ${
                    i >= 2 ? "hidden md:block" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white/10" />
                    <div className="flex-1">
                      <div className="h-3 w-28 rounded bg-white/10" />
                      <div className="mt-2 h-2 w-20 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="mt-5 h-3 w-full rounded bg-white/10" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-white/5" />
                </div>
              ))}
            </div>
          ) : movieReviews.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {movieReviews.map((review: ReviewType, index: number) => {
                  const reviewId = String(review.id);
                  const isExpanded = expandedReviews.has(reviewId);
                  const isLong = (review.content?.length ?? 0) > 280;

                  // Collapsed = two rows: 4 cards on desktop, 2 on mobile
                  const visibility = showAllReviews
                    ? ""
                    : index >= REVIEWS_COLLAPSED
                      ? "hidden"
                      : index >= 2
                        ? "hidden md:block"
                        : "";

                  return (
                    <article
                      key={review.id}
                      className={`rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05] ${visibility}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold uppercase text-white ring-1 ring-primary/40">
                            {review.author?.charAt(0) || "?"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {review.author_details?.name || review.author}
                            </p>
                            <p className="mt-0.5 text-[11px] text-white/40">
                              {getDateString(review.created_at)}
                            </p>
                          </div>
                        </div>

                        {review.author_details?.rating != null && (
                          <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-yellow-400/10 px-2.5 py-1.5 text-xs font-bold text-yellow-300">
                            <span aria-hidden>★</span>
                            <span>{review.author_details.rating}/10</span>
                          </div>
                        )}
                      </div>

                      <p
                        className={`mt-4 whitespace-pre-line text-sm leading-6 text-white/65 ${
                          isExpanded ? "" : "line-clamp-5"
                        }`}
                      >
                        {review.content}
                      </p>

                      {isLong && (
                        <button
                          onClick={() => toggleReview(reviewId)}
                          aria-expanded={isExpanded}
                          className="mt-3 text-xs font-semibold text-primary transition hover:brightness-125"
                        >
                          {isExpanded ? "Show less" : "Read full review"}
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>

              {movieReviews.length > 2 && (
                <div
                  className={`mt-6 flex justify-center ${
                    movieReviews.length <= REVIEWS_COLLAPSED ? "md:hidden" : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      setShowAllReviews((prev) => !prev);
                      if (showAllReviews) {
                        reviewsRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    aria-expanded={showAllReviews}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-primary hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {showAllReviews
                      ? "Show fewer reviews"
                      : `View all ${movieReviews.length} reviews`}
                    <svg
                      viewBox="0 0 24 24"
                      className={`size-4 fill-none stroke-current transition-transform ${
                        showAllReviews ? "rotate-180" : ""
                      }`}
                      strokeWidth="2.5"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-10 text-center">
              <p className="text-sm text-white/50">
                No reviews yet. Be the first to share what you thought after
                watching.
              </p>
            </div>
          )}
        </section>

        {/* ======================== SIMILAR MOVIES ======================== */}
        {(similarMovies.length > 0 || isLoadingSimilars) && (
          <section>
            <SectionHeading
              title="Similar movies"
              subtitle="Same style and story, different adventure"
            />

            <Slider label="similar movies">
              {isLoadingSimilars
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : similarMovies.slice(0, 18).map((movie) => (
                    <div key={movie.id} className={CARD}>
                      <CoverMovieCard2 movie={movie} />
                    </div>
                  ))}
            </Slider>
          </section>
        )}

        {/* ======================== RECOMMENDED ======================== */}
        {(recommendedMovies.length > 0 || isLoadingRecommendations) && (
          <section>
            <SectionHeading
              title="Recommended for you"
              subtitle="More movies you might enjoy"
            />

            <Slider label="recommended movies">
              {isLoadingRecommendations
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : recommendedMovies.slice(0, 18).map((movie) => (
                    <div key={movie.id} className={CARD}>
                      <CoverMovieCard2 movie={movie} />
                    </div>
                  ))}
            </Slider>
          </section>
        )}
      </div>
    </main>
  );
};

export default MoviePage;
