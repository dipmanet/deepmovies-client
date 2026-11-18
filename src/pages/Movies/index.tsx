import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import {
  useFetchNowPlayingMovies,
  useFetchPopularMovies,
  useFetchTopRatedMovies,
  useFetchUpcomingMovies,
} from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { useMemo, useState } from "react";
import { HiOutlineClock, HiOutlineFire, HiOutlineStar, HiOutlineTrendingUp } from "react-icons/hi";
import { SEOMeta, BreadcrumbStructuredData } from "#components/SEO";

const MOVIE_CATEGORIES = [
  {
    id: "popular",
    title: "Popular",
    icon: HiOutlineFire,
    useFetch: useFetchPopularMovies,
  },
  {
    id: "top-rated",
    title: "Top Rated",
    icon: HiOutlineStar,
    useFetch: useFetchTopRatedMovies,
  },
  {
    id: "upcoming",
    title: "Upcoming",
    icon: HiOutlineTrendingUp,
    useFetch: useFetchUpcomingMovies,
  },
  {
    id: "now-playing",
    title: "Now Playing",
    icon: HiOutlineClock,
    useFetch: useFetchNowPlayingMovies,
  },
] as const;

type CategoryId = (typeof MOVIE_CATEGORIES)[number]["id"];

const MoviesPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("popular");

  const selectedCategory = useMemo(
    () =>
      MOVIE_CATEGORIES.find(
        (cat) => cat.id === activeCategory,
      ) ?? MOVIE_CATEGORIES[0],
    [activeCategory],
  );

  const { data: moviesData, isLoading } = selectedCategory.useFetch();

  const { results: movies } = moviesData || {};

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Movies", url: "/movie" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  const categoryTitles: Record<CategoryId, string> = {
    popular: "Popular Movies",
    "top-rated": "Top Rated Movies",
    upcoming: "Upcoming Movies",
    "now-playing": "Now Playing Movies",
  };

  const categoryDescriptions: Record<CategoryId, string> = {
    popular: "Discover the most popular movies right now. Trending films everyone is talking about.",
    "top-rated": "Explore the highest-rated movies of all time. Critically acclaimed films you must watch.",
    upcoming: "Check out upcoming movies and future releases. Plan your watchlist in advance.",
    "now-playing": "See what movies are currently playing in theaters. Don't miss the latest releases.",
  };

  return (
    <>
      <SEOMeta
        title={categoryTitles[activeCategory]}
        description={categoryDescriptions[activeCategory]}
        canonical="/movie"
        structuredData={breadcrumbStructuredData}
      />
      <div className="container grow">
        <div className="py-12 w-full flex flex-col gap-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                Movies
              </h1>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {MOVIE_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium",
                      "transition-all duration-200 ease-in-out",
                      category.id === activeCategory
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                    )}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="text-[13px]" />
                    <span>{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading
              ? Array(10)
                  .fill("")
                  .map((_, idx) => <SklCoverMovieCard key={idx} />)
              : movies && movies.length > 0
              ? movies.map((mov: MovieListType) => (
                  <CoverMovieCard2
                    key={mov.id}
                    movie={mov}
                    showDetails
                  />
                ))
              : (
                  <div className="col-span-full flex items-center justify-center py-20">
                    <p className="text-muted-foreground text-base">
                      No {selectedCategory.title.toLowerCase()} movies found.
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesPage;