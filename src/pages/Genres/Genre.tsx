import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import { BreadcrumbStructuredData, SEOMeta } from "#components/SEO";
import { MediaPagination } from "#components/MediaShell";
import useGenre from "#hooks/useGenre";
import { useFetchMoviesByFilter, useFetchTVSeriesByFilter } from "#lib/api";
import { MovieListType, TVSeriesListType } from "#lib/datatypes";
import { ContentTypes } from "#lib/expressions";
import { cn } from "#lib/utils";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

type ContentType = (typeof ContentTypes)[number];

const GenrePage = () => {
  const { genre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const contentType = searchParams.get("content_type");
  const page = Math.min(500, Math.max(1, Number(searchParams.get("page")) || 1));

  const { movieGenres, tvGenres } = useGenre();

  const currentTab: ContentType =
    ContentTypes.find((t) => t.name === contentType) ?? ContentTypes[0];

  const genres = (currentTab.name === "movies" ? movieGenres : tvGenres) || [];

  const genreObject =
    genres.length > 0
      ? genres.find(
          (gen) => gen.name?.toLowerCase().replace(" ", "_") === genre,
        )
      : undefined;

  const filterParams = {
    ...(genreObject?.id ? { with_genres: `${genreObject.id}` } : {}),
    page: String(page),
  };

  const { data: filterMovies, isLoading: isLoadingMovies } =
    useFetchMoviesByFilter(filterParams);
  const { data: filterTVSeries, isLoading: isLoadingTV } =
    useFetchTVSeriesByFilter(filterParams);

  const isLoading =
    currentTab.name === "movies" ? isLoadingMovies : isLoadingTV;

  const { results, total_pages } =
    (currentTab.name === "movies" ? filterMovies : filterTVSeries) || {};

  const goToPage = (next: number) => {
    const params: Record<string, string> = {
      content_type: currentTab.name,
    };
    if (next > 1) params.page = String(next);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchTab = (tab: ContentType) => {
    setSearchParams({ content_type: tab.name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Genres", url: "/genre" },
    {
      name: genreObject?.name ?? genre?.split("_").join(" ") ?? "Genre",
      url: `/genre/${genre}`,
    },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  const genreName = genreObject?.name ?? genre?.split("_").join(" ") ?? "Genre";
  const tabTitle = currentTab.name === "movies" ? "Movies" : "TV Series";
  const tabTitleLower = currentTab.name === "movies" ? "movies" : "TV series";

  return (
    <>
      <SEOMeta
        title={`${genreName} ${tabTitle}`}
        description={`Browse ${genreName.toLowerCase()} ${tabTitleLower}. Discover the best ${genreName.toLowerCase()} ${tabTitleLower} with ratings, reviews, and trailers.`}
        canonical={`/genre/${genre}?content_type=${currentTab.name}`}
        structuredData={breadcrumbStructuredData}
      />

      <div className="container grow">
        <div className="py-12 flex flex-col gap-8">
          <Link
            to="/genre"
            className="flex w-fit items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-white/[0.06] hover:text-white"
          >
            <HiOutlineArrowLeft className="text-base" />
            <span>Back to Genres</span>
          </Link>

          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide capitalize">
                {genreName}
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
                    onClick={() => switchTab(tab)}
                  >
                    <Icon className="text-[12px]" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <SklCoverMovieCard key={i} />
              ))
            ) : results && results.length > 0 ? (
              results.map((mov) =>
                currentTab.name === "movies" ? (
                  <CoverMovieCard2
                    key={(mov as MovieListType).id}
                    movie={mov as MovieListType}
                    showDetails
                  />
                ) : (
                  <CoverTVSeriesCard
                    key={(mov as TVSeriesListType).id}
                    series={mov as TVSeriesListType}
                    showDetails
                  />
                ),
              )
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <p className="text-muted-foreground text-base">
                  No {genreName.toLowerCase()} {tabTitleLower} found.
                </p>
              </div>
            )}
          </div>

          {total_pages && total_pages > 1 && (
            <MediaPagination
              page={page}
              pageCount={total_pages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GenrePage;