import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SEOMeta, TVSeriesStructuredData, BreadcrumbStructuredData } from "#components/SEO";

import {
  useFetchSeason,
  useFetchTVSeries,
  useFetchTVSeriesCredits,
  useFetchTVSeriesRecommendations,
  useFetchTVSeriesReviews,
  useFetchTVSeriesSimilars,
} from "#lib/api";

import { SeasonListType } from "#lib/datatypes";
import { cn, getDateString } from "#lib/utils";

import {
  imageUrl,
  TheatrePlayer,
  HeroOverlays,
  CastSection,
  ReviewsSection,
  MediaSection,
  FactsPanel,
  Slider,
  SectionHeading,
  PlayIcon,
} from "#components/MediaShell";

/* ------------------------------------------------------------------ */
/* Episodes Section                                                   */
/* ------------------------------------------------------------------ */

const EpisodeCard = ({
  episode,
  seriesId,
}: {
  episode: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  seriesId: number;
}) => {
  const stillUrl = imageUrl(episode.still_path, "w300");
  const airDate = episode.air_date
    ? new Date(episode.air_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "TBA";
  const rating = episode.vote_average?.toFixed(1) ?? "N/A";

  return (
    <Link
      to={`/series/${seriesId}/${episode.season_number}/${episode.episode_number}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-200 hover:border-primary/30 hover:bg-white/[0.06]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0e0e28]">
        {stillUrl ? (
          <img
            src={stillUrl}
            alt={episode.name}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayIcon className="size-8 text-white/20" />
          </div>
        )}

        {/* Gradient + play overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-lg backdrop-blur-md transition group-hover:scale-110 group-hover:border-primary group-hover:bg-primary">
            <PlayIcon className="ml-0.5 size-5" />
          </div>
        </div>

        {/* Episode number badge */}
        <span className="absolute left-2.5 top-2.5 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          EP {episode.episode_number}
        </span>

        {/* Rating */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-yellow-400 backdrop-blur-sm">
          <svg viewBox="0 0 20 20" className="size-3 fill-current" aria-hidden>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69z" />
          </svg>
          {rating}
        </div>

        {/* Runtime badge */}
        {episode.runtime > 0 && (
          <span className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            {episode.runtime}m
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <h4 className="line-clamp-1 text-[13px] font-semibold text-white">
          {episode.name}
        </h4>
        <p className="mt-1 text-[11px] text-white/40">{airDate}</p>
        {episode.overview && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/50">
            {episode.overview}
          </p>
        )}
      </div>
    </Link>
  );
};

const EpisodesSection = ({
  seriesId,
  seasons,
}: {
  seriesId: number;
  seasons: SeasonListType[];
}) => {
  const [activeSeason, setActiveSeason] = useState(
    seasons?.[0]?.season_number ?? -1,
  );

  return (
    <section>
      <SectionHeading
        title="Episodes"
        subtitle="Browse all episodes across seasons"
        meta={
          seasons?.length > 0
            ? `${seasons.length} ${seasons.length === 1 ? "season" : "seasons"}`
            : undefined
        }
      />

      {/* Season tabs */}
      {seasons && seasons.length > 0 && (
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
          {seasons.map((season) => (
            <button
              key={season.id}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2 text-[13px] font-medium",
                "transition-all duration-200 ease-in-out",
                season.season_number === activeSeason
                  ? "bg-primary text-white shadow-sm"
                  : "border border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white",
              )}
              onClick={() => setActiveSeason(season.season_number)}
            >
              {season.name}
              <span className="ml-1.5 text-[11px] opacity-60">
                ({season.episode_count})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Season meta */}
      {(() => {
        const season = seasons?.find((s) => s.season_number === activeSeason);
        if (!season) return null;
        return (
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
            {season.air_date && (
              <span>
                {new Date(season.air_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
            <span>{season.episode_count} episodes</span>
            {season.vote_average > 0 && (
              <span className="flex items-center gap-1 text-yellow-400">
                ★ {season.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        );
      })()}

      {/* Episodes grid */}
      <SeasonEpisodes seriesId={seriesId} seasonNumber={activeSeason} />
    </section>
  );
};

const SeasonEpisodes = ({
  seriesId,
  seasonNumber,
}: {
  seriesId: number;
  seasonNumber: number;
}) => {
  const { data: Season } = useFetchSeason({
    series_id: seriesId,
    season_id: seasonNumber,
  });

  if (seasonNumber < 0) return null;

  if (!Season?.episodes || Season.episodes.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02]"
          >
            <div className="aspect-video bg-white/[0.06]" />
            <div className="p-3">
              <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
              <div className="mt-2 h-2 w-1/2 rounded bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Season.episodes.map((episode: any) => (
        <EpisodeCard key={episode.id} episode={episode} seriesId={seriesId} />
      ))}
    </div>
  );
};

const CARD = "w-[145px] shrink-0 snap-start sm:w-[185px] lg:w-[200px]";

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const TVSeriesPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const pageType = pathname.split("/")[1];
  const seriesId = Number(id);

  const { data: TVSeries, isLoading: isLoadingSeries } = useFetchTVSeries({
    id: seriesId,
  });
  const { data: credits, isLoading: isLoadingCredits } =
    useFetchTVSeriesCredits({ id: seriesId });
  const { data: similars, isLoading: isLoadingSimilars } =
    useFetchTVSeriesSimilars({ id: seriesId });
  const { data: recommendations, isLoading: isLoadingRecommendations } =
    useFetchTVSeriesRecommendations({ id: seriesId });
  const { data: reviews, isLoading: isLoadingReviews } =
    useFetchTVSeriesReviews({ id: seriesId });

  const castMembers = (credits as any)?.cast ?? [];
  const similarSeries = similars?.results ?? [];
  const recommendedSeries = recommendations?.results ?? [];
  const seriesReviews = reviews?.results ?? [];

  const backdropUrl = imageUrl(TVSeries?.backdrop_path);
  const posterUrl = imageUrl(TVSeries?.poster_path, "w500");

  const firstYear = TVSeries?.first_air_date
    ? new Date(TVSeries.first_air_date).getFullYear()
    : "N/A";
  const lastYear = TVSeries?.last_air_date
    ? new Date(TVSeries.last_air_date).getFullYear()
    : "Present";
  const yearRange =
    firstYear === lastYear ? firstYear : `${firstYear} – ${lastYear}`;

  const countries =
    (TVSeries?.production_countries as { name: string }[] | undefined)
      ?.map((c) => c.name)
      .join(", ") || "N/A";
  const languages =
    (TVSeries?.spoken_languages as { english_name: string }[] | undefined)
      ?.map((l) => l.english_name)
      .join(", ") || "N/A";
  const networks =
    TVSeries?.networks?.map((n: { name: string }) => n.name).join(", ") ||
    "N/A";
  const episodeRuntime = TVSeries?.episode_run_time?.[0]
    ? `${TVSeries.episode_run_time[0]}m`
    : "N/A";

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

  // Reset player when navigating to another series
  useEffect(() => {
    setIsPlayerOpen(false);
    window.scrollTo({ top: 0 });
  }, [seriesId]);

  const playerSrc = `https://vidsrc.net/embed/tv?tmdb=${seriesId}&season=1&episode=1`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "TV Series", url: "/series" },
    { name: TVSeries?.name ?? "TV Series", url: `/series/${seriesId}` },
  ];

  const seriesStructuredData = TVSeries ? TVSeriesStructuredData(TVSeries as any) : undefined;
  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <SEOMeta
        title={TVSeries?.name ?? "TV Series"}
        description={TVSeries?.overview ?? "Watch this TV series on DeepMovies"}
        canonical={`/series/${seriesId}`}
        ogImage={TVSeries?.backdrop_path ? `https://image.tmdb.org/t/p/original${TVSeries.backdrop_path}` : undefined}
        ogType="video.tv_show"
        structuredData={[seriesStructuredData, breadcrumbStructuredData].filter(Boolean)}
      />
      <main className="min-h-screen grow overflow-hidden bg-[#191936] text-white">
      {/* ============================================================
          THEATRE MODE PLAYER
      ============================================================ */}
      <TheatrePlayer
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        src={playerSrc}
        title={TVSeries?.name ?? "series"}
      />

      {/* ============================================================
          CINEMATIC HERO
      ============================================================ */}
      <section className="relative isolate min-h-[640px] overflow-hidden sm:min-h-[700px] lg:min-h-[760px]">
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
          {TVSeries && (
            <button
              onClick={openPlayer}
              aria-label={`Play ${TVSeries.name}`}
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
              {TVSeries?.name}
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
                  alt={`${TVSeries?.name ?? "TV Series"} poster`}
                  className="relative w-full rounded-xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/15"
                />
              ) : (
                <div
                  className={`relative aspect-[2/3] rounded-xl bg-white/10 ring-1 ring-white/10 ${
                    isLoadingSeries ? "animate-pulse" : ""
                  }`}
                />
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              {/* Genres */}
              <div className="mb-4 flex flex-wrap gap-2">
                {TVSeries?.genres?.map(
                  (genre: { id: number; name: string }) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-md"
                    >
                      {genre.name}
                    </span>
                  ),
                )}
              </div>

              <h1 className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl xl:text-6xl">
                {TVSeries?.name}
              </h1>

              {TVSeries?.tagline && (
                <p className="mt-3 text-sm italic text-white/60 sm:text-base">
                  &ldquo;{TVSeries.tagline}&rdquo;
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
                    {TVSeries?.vote_average?.toFixed(1) ?? "N/A"}
                  </span>
                  <span className="text-yellow-300/60">
                    ({TVSeries?.vote_count?.toLocaleString() ?? 0})
                  </span>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {yearRange}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {episodeRuntime}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {TVSeries?.number_of_seasons}{" "}
                  {TVSeries?.number_of_seasons === 1 ? "season" : "seasons"}
                </span>

                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 font-bold text-emerald-300 ring-1 ring-emerald-400/25">
                  HD
                </span>
              </div>

              {TVSeries?.overview && (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-[15px]">
                  {TVSeries.overview}
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

                {TVSeries?.homepage && (
                  <a
                    href={TVSeries.homepage}
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
        {/* Facts panel */}
        <FactsPanel
          facts={[
            { label: "First aired", value: TVSeries?.first_air_date ? getDateString(TVSeries.first_air_date) : "N/A" },
            { label: "Last aired", value: TVSeries?.last_air_date ? getDateString(TVSeries.last_air_date) : "Present" },
            { label: "Status", value: TVSeries?.status ?? "N/A" },
            { label: "Network", value: networks },
            { label: "Seasons", value: `${TVSeries?.number_of_seasons ?? 0} seasons` },
            { label: "Episodes", value: `${TVSeries?.number_of_episodes ?? 0} episodes` },
            { label: "Country", value: countries },
            { label: "Languages", value: languages },
            { label: "Original language", value: TVSeries?.original_language?.toUpperCase() ?? "N/A" },
            { label: "Episode runtime", value: episodeRuntime },
            { label: "Type", value: TVSeries?.type ?? "N/A" },
            { label: "In production", value: TVSeries?.in_production ? "Yes" : "No" },
          ]}
        />

        {/* ============================ EPISODES ============================ */}
        {TVSeries?.seasons && TVSeries.seasons.length > 0 && (
          <EpisodesSection seriesId={seriesId} seasons={TVSeries.seasons} />
        )}

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
          reviews={seriesReviews}
          isLoading={isLoadingReviews}
          title="Audience reviews"
          subtitle="What viewers are saying about this series"
          meta={
            seriesReviews.length
              ? `${seriesReviews.length} ${
                  seriesReviews.length === 1 ? "review" : "reviews"
                }`
              : undefined
          }
        />

        {/* ======================== SIMILAR TV SERIES ======================== */}
        {(similarSeries.length > 0 || isLoadingSimilars) && (
          <MediaSection
            title="Similar series"
            subtitle="Same style and story, different adventure"
          >
            <Slider label="similar series">
              {isLoadingSimilars
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : similarSeries.slice(0, 18).map((series) => (
                    <div key={series.id} className={CARD}>
                      <CoverTVSeriesCard series={series} showDetails />
                    </div>
                  ))}
            </Slider>
          </MediaSection>
        )}

        {/* ======================== RECOMMENDED ======================== */}
        {(recommendedSeries.length > 0 || isLoadingRecommendations) && (
          <MediaSection
            title="Recommended for you"
            subtitle="More series you might enjoy"
          >
            <Slider label="recommended series">
              {isLoadingRecommendations
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={CARD}>
                      <SklCoverMovieCard />
                    </div>
                  ))
                : recommendedSeries.slice(0, 18).map((series) => (
                    <div key={series.id} className={CARD}>
                      <CoverTVSeriesCard series={series} showDetails />
                    </div>
                  ))}
            </Slider>
          </MediaSection>
        )}
      </div>
    </main>
  </>);
};

export default TVSeriesPage;
