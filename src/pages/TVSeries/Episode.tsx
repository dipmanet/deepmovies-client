import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { useFetchEpisode, useFetchTVSeries, useFetchSeason } from "#lib/api";
import { EpisodeListType } from "#lib/datatypes";
import { getDateString } from "#lib/utils";

import {
  imageUrl,
  TheatrePlayer,
  HeroOverlays,
  CastSection,
  MediaSection,
  FactsPanel,
  Slider,
  PlayIcon,
} from "#components/MediaShell";

/* ------------------------------------------------------------------ */
/* More episodes in the current season                                */
/* ------------------------------------------------------------------ */

const EpisodeItem = ({
  episode,
  seriesId,
}: {
  episode: EpisodeListType;
  seriesId: number;
}) => {
  const stillUrl = imageUrl(episode.still_path, "w300");
  return (
    <Link
      to={`/series/${seriesId}/${episode.season_number}/${episode.episode_number}`}
      className="group w-28 shrink-0 snap-start"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] group-hover:border-primary/30">
        {stillUrl ? (
          <img
            src={stillUrl}
            alt={episode.name}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <PlayIcon className="size-8" />
          </div>
        )}
        <span className="absolute left-2.5 top-2.5 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          EP {episode.episode_number}
        </span>
      </div>
      <h4 className="mt-2 line-clamp-1 text-[13px] font-semibold text-white">
        {episode.name}
      </h4>
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const EpisodePage = () => {
  const { id, season_id, episode_id } = useParams();
  const { pathname } = useLocation();

  const pageType = pathname.split("/")[1];
  const seriesId = Number(id);
  const seasonNumber = Number(season_id);
  const episodeNumber = Number(episode_id);

  const { data: Series } = useFetchTVSeries({ id: seriesId });
  const { data: Episode } = useFetchEpisode({
    series_id: seriesId,
    season_id: seasonNumber,
    episode_id: episodeNumber,
  });
  const { data: Season } = useFetchSeason({
    series_id: seriesId,
    season_id: seasonNumber,
  });

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

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

  if (!Series || !Episode) return null;

  const backdropUrl = imageUrl(Series.backdrop_path);
  const posterUrl = imageUrl(Episode.still_path ?? Series.poster_path, "w500");
  const airDate = Episode.air_date ? getDateString(Episode.air_date) : "N/A";
  const runtime = Episode.runtime ? `${Episode.runtime}m` : "N/A";
  const rating = Episode.vote_average ? Episode.vote_average.toFixed(1) : "N/A";

  const playerSrc = `${import.meta.env.VITE_VIDEO_URL}/tv/${seriesId}/${Episode.season_number}/${Episode.episode_number}/`;

  const otherEpisodes =
    Season?.episodes?.filter((ep) => ep.id !== Episode.id) ?? [];

  return (
    <main className="min-h-screen grow overflow-hidden bg-[#191936] text-white">
      {/* ============================================================
          THEATRE MODE PLAYER
      ============================================================ */}
      <TheatrePlayer
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        src={playerSrc}
        title={Episode.name}
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
          {Series && (
            <button
              onClick={openPlayer}
              aria-label={`Play ${Episode.name}`}
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
            <Link
              to={`/${pageType}/${seriesId}`}
              className="capitalize text-white/50 transition hover:text-white"
            >
              {Series.name}
            </Link>
            <span className="text-white/20">/</span>
            <span className="max-w-[220px] truncate font-medium text-white/85">
              {Episode.name}
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
                  alt={`${Episode.name} still`}
                  className="relative w-full rounded-xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/15"
                />
              ) : (
                <div className="relative aspect-[2/3] rounded-xl bg-white/10 ring-1 ring-white/10" />
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  S{Episode.season_number} E{Episode.episode_number}
                </span>
              </div>

              <h1 className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl xl:text-6xl">
                {Episode.name}
              </h1>

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
                  <span className="font-bold">{rating}</span>
                  <span className="text-yellow-300/60">
                    ({Episode.vote_count?.toLocaleString() ?? 0})
                  </span>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {airDate}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                  {runtime}
                </span>

                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 font-bold text-emerald-300 ring-1 ring-emerald-400/25">
                  HD
                </span>
              </div>

              {Episode.overview && (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-[15px]">
                  {Episode.overview}
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

                {Series?.homepage && (
                  <a
                    href={Series.homepage}
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
            { label: "Air date", value: airDate },
            { label: "Runtime", value: runtime },
            { label: "Season", value: String(Episode.season_number) },
            { label: "Episode", value: String(Episode.episode_number) },
            { label: "Rating", value: rating },
            {
              label: "Votes",
              value: Episode.vote_count?.toLocaleString() ?? "0",
            },
            {
              label: "Production code",
              value: Episode.production_code ?? "N/A",
            },
            { label: "Series", value: Series.name },
          ]}
        />

        {/* ============================ CAST ============================ */}
        <CastSection
          cast={Episode.guest_stars ?? []}
          title="Guest stars"
          subtitle="Featuring in this episode"
        />

        {/* ================== MORE EPISODES IN SEASON ================== */}
        {otherEpisodes.length > 0 && (
          <MediaSection
            title="More episodes in this season"
            subtitle="Continue watching the season"
          >
            <Slider label="more episodes">
              {otherEpisodes.map((ep) => (
                <div key={ep.id} className="w-28 shrink-0 snap-start">
                  <EpisodeItem episode={ep} seriesId={seriesId} />
                </div>
              ))}
            </Slider>
          </MediaSection>
        )}
      </div>
    </main>
  );
};

export default EpisodePage;
