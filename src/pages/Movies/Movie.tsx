import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import {
  SEOMeta,
  MovieStructuredData,
  BreadcrumbStructuredData,
} from "#components/SEO";

import {
  useFetchMovie,
  useFetchMovieCredits,
  useFetchMovieRecommendations,
  useFetchMovieReviews,
  useFetchMovieSimilars,
} from "#lib/api";

import { getDateString } from "#lib/utils";

import {
  imageUrl,
  TheatrePlayer,
  HeroOverlays,
  CastSection,
  ReviewsSection,
  MediaSection,
  FactsPanel,
  Slider,
} from "#components/MediaShell";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

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

const CARD = "w-[145px] shrink-0 snap-start sm:w-[185px] lg:w-[200px]";

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const MoviePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

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

  const castMembers = (credits as any)?.cast ?? [];
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
    window.scrollTo({ top: 0 });
  }, [movieId]);

  const playerSrc = `${import.meta.env.VITE_VIDEO_URL}/movie/${movieId}/`;
  const fallbackPlayerSrc = `${import.meta.env.VITE_VIDEO_URL2}/${movieId}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Movies", url: "/movie" },
    { name: Movie?.title ?? "Movie", url: `/movie/${movieId}` },
  ];

  const movieStructuredData = Movie
    ? MovieStructuredData(Movie as any)
    : undefined;
  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <SEOMeta
        title={Movie?.title ?? "Movie"}
        description={Movie?.overview ?? "Watch this movie on DeepMovies"}
        canonical={`/movie/${movieId}`}
        ogImage={
          Movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${Movie.backdrop_path}`
            : undefined
        }
        ogType="video.movie"
        structuredData={[movieStructuredData, breadcrumbStructuredData].filter(
          Boolean,
        )}
      />
      <main className="min-h-screen grow overflow-hidden bg-[#191936] text-white">
        {/* ============================================================
          THEATRE MODE PLAYER
      ============================================================ */}
        <TheatrePlayer
          isOpen={isPlayerOpen}
          onClose={closePlayer}
          src={playerSrc}
          fallbackSrc={fallbackPlayerSrc}
          title={Movie?.title ?? "movie"}
        />

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
                <svg
                  viewBox="0 0 24 24"
                  className="fill-current relative ml-1 size-8 transition-transform group-hover:scale-110 sm:size-10"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm"
            >
              <Link
                to="/"
                className="text-white/50 transition hover:text-white"
              >
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
                    <svg
                      viewBox="0 0 24 24"
                      className="fill-current size-4"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
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
          <FactsPanel
            facts={[
              {
                label: "Release date",
                value: Movie?.release_date
                  ? getDateString(Movie.release_date)
                  : "N/A",
              },
              { label: "Status", value: Movie?.status ?? "N/A" },
              { label: "Country", value: countries },
              { label: "Languages", value: languages },
              { label: "Production", value: companies },
              {
                label: "Original language",
                value: Movie?.original_language?.toUpperCase() ?? "N/A",
              },
              { label: "Budget", value: formatMoney(Movie?.budget) },
              { label: "Revenue", value: formatMoney(Movie?.revenue) },
            ]}
          />

          {/* ============================ CAST ============================ */}
          <CastSection
            cast={castMembers}
            isLoading={isLoadingCredits}
            title="Top cast"
            subtitle="The people behind the story"
          />

          {/* =========================== REVIEWS =========================== */}
          <ReviewsSection
            ref={reviewsRef}
            reviews={movieReviews}
            isLoading={isLoadingReviews}
            title="Audience reviews"
            subtitle="What viewers are saying about this movie"
            meta={
              movieReviews.length
                ? `${movieReviews.length} ${
                    movieReviews.length === 1 ? "review" : "reviews"
                  }`
                : undefined
            }
          />

          {/* ======================== SIMILAR MOVIES ======================== */}
          <MediaSection
            title="Similar movies"
            subtitle="Same style and story, different adventure"
          >
            <Slider label="similar movies">
              {isLoadingSimilars
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : similarMovies.slice(0, 18).map((movie) => (
                    <div key={movie.id} className={CARD}>
                      <CoverMovieCard2 movie={movie} showDetails />
                    </div>
                  ))}
            </Slider>
          </MediaSection>

          {/* ======================== RECOMMENDED ======================== */}
          <MediaSection
            title="Recommended for you"
            subtitle="More movies you might enjoy"
          >
            <Slider label="recommended movies">
              {isLoadingRecommendations
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : recommendedMovies.slice(0, 18).map((movie) => (
                    <div key={movie.id} className={CARD}>
                      <CoverMovieCard2 movie={movie} showDetails />
                    </div>
                  ))}
            </Slider>
          </MediaSection>
        </div>
      </main>
    </>
  );
};

export default MoviePage;
