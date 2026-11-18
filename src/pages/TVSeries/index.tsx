import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import {
  useFetchPopularTVSeries,
  useFetchTopRatedTVSeries,
  useFetchAiringTodayTVSeries,
  useFetchAiringThisWeekTVSeries,
} from "#lib/api";
import { MovieListType, TVSeriesListType, TVSeriesType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { useMemo, useState } from "react";
import {
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineStar,
  HiOutlineTrendingUp,
} from "react-icons/hi";

const TVSERIES_CATEGORIES = [
  {
    id: "popular",
    title: "Popular",
    icon: HiOutlineFire,
    useFetch: useFetchPopularTVSeries,
  },
  {
    id: "top-rated",
    title: "Top Rated",
    icon: HiOutlineStar,
    useFetch: useFetchTopRatedTVSeries,
  },
  {
    id: "airing-today",
    title: "Airing Today",
    icon: HiOutlineClock,
    useFetch: useFetchAiringThisWeekTVSeries,
  },
  {
    id: "airing-this-week",
    title: "Airing This Week",
    icon: HiOutlineTrendingUp,
    useFetch: useFetchAiringTodayTVSeries,
  },
] as const;

type CategoryId = (typeof TVSERIES_CATEGORIES)[number]["id"];

const TVSeriesPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("popular");

  const selectedCategory = useMemo(
    () =>
      TVSERIES_CATEGORIES.find((cat) => cat.id === activeCategory) ??
      TVSERIES_CATEGORIES[0],
    [activeCategory],
  );

  const { data: tvSeriesData, isLoading } = selectedCategory.useFetch();

  const { results: tvSeries } = tvSeriesData || {};

  return (
    <div className="container grow">
      <div className="py-12 w-full flex flex-col gap-8">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-[28px] w-1 rounded-full bg-primary" />
            <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
              Series
            </h1>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            {TVSERIES_CATEGORIES.map((category) => {
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
          {isLoading ? (
            Array(10)
              .fill("")
              .map((_, idx) => <SklCoverMovieCard key={idx} />)
          ) : tvSeries && tvSeries.length > 0 ? (
            tvSeries.map((series: TVSeriesListType) => (
              <CoverTVSeriesCard key={series.id} series={series} showDetails />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-20">
              <p className="text-muted-foreground text-base">
                No {selectedCategory.title.toLowerCase()} Series found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TVSeriesPage;
