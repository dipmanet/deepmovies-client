import GenreCard from "#components/Cards/GenreCard";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import { BreadcrumbStructuredData, SEOMeta } from "#components/SEO";
import { useFetchMovieGenres, useFetchTVGenres } from "#lib/api";
import { ContentTypes } from "#lib/expressions";
import { cn } from "#lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type ContentType = (typeof ContentTypes)[number];

const GenresPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("content_type");

  const currentTab: ContentType =
    ContentTypes.find((t) => t.name === raw) ?? ContentTypes[0];

  const { data: movieGenres, isLoading: isLoadingMovies } =
    useFetchMovieGenres();
  const { data: tvGenres, isLoading: isLoadingTV } = useFetchTVGenres();

  const genres = useMemo(
    () => (currentTab.name === "movies" ? movieGenres : tvGenres) || [],
    [currentTab.name, movieGenres, tvGenres],
  );

  const isLoading =
    currentTab.name === "movies" ? isLoadingMovies : isLoadingTV;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Genres", url: "/genre" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  const tabTitles: Record<string, string> = {
    movies: "Movie Genres",
    tv: "TV Series Genres",
  };

  const tabDescriptions: Record<string, string> = {
    movies:
      "Browse movies by genre. Find action, comedy, drama, horror, sci-fi, and more.",
    tv: "Browse TV series by genre. Discover shows across all categories.",
  };

  const title = tabTitles[currentTab.name] ?? "Genres";
  const description =
    tabDescriptions[currentTab.name] ?? "Browse genres on DeepMovies.";

  return (
    <>
      <SEOMeta
        title={title}
        description={description}
        canonical="/genre"
        structuredData={breadcrumbStructuredData}
      />

      <div className="container grow">
        <div className="py-12 flex flex-col gap-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                Genres
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {ContentTypes.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ease-in-out",
                      currentTab.name === tab.name
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                    )}
                    onClick={() => setSearchParams({ content_type: tab.name })}
                  >
                    <Icon className="text-[12px]" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <SklCoverMovieCard key={i} />
                ))
              : genres.length > 0
                ? genres.map((genre) => (
                    <GenreCard
                      key={genre.id}
                      genre={genre}
                      contentType={currentTab.name}
                    />
                  ))
                : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenresPage;
