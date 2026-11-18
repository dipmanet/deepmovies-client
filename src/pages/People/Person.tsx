import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import { SEOMeta, BreadcrumbStructuredData } from "#components/SEO";

import {
  useFetchPerson,
  useFetchPersonMovieCredits,
  useFetchPersonTVCredits,
} from "#lib/api";

import { getDateString, getImageUrl } from "#lib/utils";

import {
  imageUrl,
  TheatrePlayer,
  HeroOverlays,
  CastSection,
  MediaSection,
  FactsPanel,
  Slider,
  SectionHeading,
  PlayIcon,
} from "#components/MediaShell";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

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

const PersonPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const personId = Number(id);

  const { data: Person, isLoading: isLoadingPerson } = useFetchPerson({
    id: personId,
  });
  const { data: movieCredits, isLoading: isLoadingMovieCredits } = useFetchPersonMovieCredits({
    id: personId,
  });
  const { data: tvCredits, isLoading: isLoadingTVCredits } = useFetchPersonTVCredits({
    id: personId,
  });

  const movieCast = movieCredits?.cast ?? [];
  const tvCast = tvCredits?.cast ?? [];
  const crew = [...(movieCredits?.crew ?? []), ...(tvCredits?.crew ?? [])];

  const profileUrl = imageUrl(Person?.profile_path);
  const backdropUrl = imageUrl(Person?.profile_path);

  const birthday = Person?.birthday
    ? new Date(Person.birthday).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";
  const deathday = Person?.deathday
    ? new Date(Person.deathday).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const age = Person?.birthday
    ? Math.floor(
        (deathday ? new Date(Person.deathday).getTime() : Date.now()) -
          new Date(Person.birthday).getTime()
      ) / (1000 * 60 * 60 * 24 * 365.25)
    : null;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "People", url: "/people" },
    { name: Person?.name ?? "Person", url: `/people/${personId}` },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  const personStructuredData = Person
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `https://deepmovies.example.com/people/${personId}`,
        name: Person.name,
        birthDate: Person.birthday,
        deathDate: Person.deathday,
        gender: Person.gender === 1 ? "Female" : Person.gender === 2 ? "Male" : "Non-binary",
        description: Person.biography,
        image: Person.profile_path ? `https://image.tmdb.org/t/p/original${Person.profile_path}` : undefined,
        jobTitle: Person.known_for_department,
        url: Person.homepage,
      }
    : undefined;

  return (
    <>
      <SEOMeta
        title={Person?.name ?? "Person"}
        description={Person?.biography ? Person.biography.slice(0, 160) : "View filmography and biography"}
        canonical={`/people/${personId}`}
        ogImage={Person?.profile_path ? `https://image.tmdb.org/t/p/original${Person.profile_path}` : undefined}
        ogType="profile"
        structuredData={[personStructuredData, breadcrumbStructuredData].filter(Boolean)}
      />
      <main className="min-h-screen grow overflow-hidden bg-[#191936] text-white">
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
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm"
            >
              <Link to="/" className="text-white/50 transition hover:text-white">
                Home
              </Link>
              <span className="text-white/20">/</span>
              <Link to="/people" className="capitalize text-white/50 transition hover:text-white">
                People
              </Link>
              <span className="text-white/20">/</span>
              <span className="max-w-[220px] truncate font-medium text-white/85">
                {Person?.name}
              </span>
            </nav>

            {/* Details */}
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end">
              {/* Profile Image */}
              <div className="relative w-[130px] shrink-0 sm:w-[170px] lg:w-[210px]">
                <div className="absolute -inset-3 rounded-3xl bg-primary/30 blur-2xl" />
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt={`${Person?.name ?? "Person"} profile`}
                    className="relative w-full rounded-xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/15"
                  />
                ) : (
                  <div
                    className={`relative aspect-[2/3] rounded-xl bg-white/10 ring-1 ring-white/10 ${
                      isLoadingPerson ? "animate-pulse" : ""
                    }`}
                  />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                {/* Department */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {Person?.known_for_department && (
                    <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-md">
                      {Person.known_for_department}
                    </span>
                  )}
                </div>

                <h1 className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl xl:text-6xl">
                  {Person?.name}
                </h1>

                {Person?.also_known_as?.length && (
                  <p className="mt-3 text-sm italic text-white/60 sm:text-base">
                    Also known as: {Person.also_known_as.slice(0, 3).join(", ")}
                  </p>
                )}

                {/* Rating row */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                    {birthday}
                    {deathday && ` – ${deathday}`}
                  </span>

                  {age && (
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                      Age {age.toFixed(1)}
                    </span>
                  )}

                  {Person?.place_of_birth && (
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/80 ring-1 ring-white/10">
                      {Person.place_of_birth}
                    </span>
                  )}

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 font-bold text-emerald-300 ring-1 ring-emerald-400/25">
                    Known for: {Person?.known_for_department}
                  </span>
                </div>

                {Person?.biography && (
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-[15px]">
                    {Person.biography}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {Person?.homepage && (
                    <a
                      href={Person.homepage}
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

                  {Person?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${Person.imdb_id}`}
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
                      IMDb
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
              { label: "Born", value: birthday },
              { label: "Died", value: deathday || "Alive" },
              { label: "Birthplace", value: Person?.place_of_birth ?? "N/A" },
              { label: "Known for", value: Person?.known_for_department ?? "N/A" },
              { label: "Gender", value: Person?.gender === 1 ? "Female" : Person?.gender === 2 ? "Male" : "Non-binary" },
              { label: "IMDb", value: Person?.imdb_id ?? "N/A" },
              { label: "Popularity", value: Person?.popularity?.toFixed(1) ?? "N/A" },
            ]}
          />

          {/* =========================== MOVIE CAST =========================== */}
          {movieCast.length > 0 && (
            <MediaSection
              title="Movie Credits (Cast)"
              subtitle={`As ${Person?.known_for_department === "Acting" ? "Actor" : "Cast"}`}
            >
              <Slider label="movie cast">
                {isLoadingMovieCredits
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={CARD}>
                        <SklCoverMovieCard />
                      </div>
                    ))
                  : movieCast
                      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
                      .slice(0, 18)
                      .map((movie) => (
                        <div key={movie.id} className={CARD}>
                          <CoverMovieCard2
                            movie={{
                              ...movie,
                              title: movie.title || movie.name,
                              release_date: movie.release_date || movie.first_air_date,
                            } as any}
                            showDetails
                          />
                        </div>
                      ))}
              </Slider>
            </MediaSection>
          )}

          {/* =========================== TV CAST =========================== */}
          {tvCast.length > 0 && (
            <MediaSection
              title="TV Series Credits (Cast)"
              subtitle={`As ${Person?.known_for_department === "Acting" ? "Actor" : "Cast"}`}
            >
              <Slider label="tv cast">
                {isLoadingTVCredits
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={CARD}>
                        <SklCoverMovieCard />
                      </div>
                    ))
                  : tvCast
                      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
                      .slice(0, 18)
                      .map((series) => (
                        <div key={series.id} className={CARD}>
                          <CoverTVSeriesCard
                            series={{
                              ...series,
                              name: series.name || series.title,
                              first_air_date: series.first_air_date || series.release_date,
                            } as any}
                            showDetails
                          />
                        </div>
                      ))}
              </Slider>
            </MediaSection>
          )}

          {/* =========================== CREW =========================== */}
          {crew.length > 0 && (
            <MediaSection
              title="Crew Credits"
              subtitle="Behind the scenes work"
            >
              <Slider label="crew credits">
                {crew
                  .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
                  .slice(0, 18)
                  .map((credit) => (
                    <div key={credit.credit_id} className={CARD}>
                      {credit.media_type === "movie" ? (
                        <CoverMovieCard2
                          movie={{
                            ...credit,
                            title: credit.title || credit.name,
                            release_date: credit.release_date || credit.first_air_date,
                          } as any}
                          showDetails
                        />
                      ) : (
                        <CoverTVSeriesCard
                          series={{
                            ...credit,
                            name: credit.name || credit.title,
                            first_air_date: credit.first_air_date || credit.release_date,
                          } as any}
                          showDetails
                        />
                      )}
                    </div>
                  ))}
              </Slider>
            </MediaSection>
          )}
        </div>
      </main>
    </>
  );
};

export default PersonPage;