import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import { BreadcrumbStructuredData, SEOMeta } from "#components/SEO";
import { MediaPagination } from "#components/MediaShell";
import {
  useFetchAiringThisWeekTVSeries,
  useFetchAiringTodayTVSeries,
  useFetchPopularTVSeries,
  useFetchTopRatedTVSeries,
  useFetchTrendingTodayTVSeries,
} from "#lib/api";
import { TVSeriesListType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { useMemo } from "react";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineStar,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

const TVSERIES_CATEGORIES = [
  {
    id: "trending",
    title: "Trending",
    icon: HiOutlineTrendingUp,
    useFetch: useFetchTrendingTodayTVSeries,
  },
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
    useFetch: useFetchAiringTodayTVSeries,
  },
  {
    id: "airing-this-week",
    title: "Airing This Week",
    icon: HiOutlineCalendar,
    useFetch: useFetchAiringThisWeekTVSeries,
  },
] as const;

type CategoryId = (typeof TVSERIES_CATEGORIES)[number]["id"];

const DEFAULT_CATEGORY: CategoryId = "popular";

/* Normalises a raw URL value (e.g. `airing_this_week`) to a tab id. */
const resolveCategory = (raw: string | null): CategoryId => {
  if (!raw) return DEFAULT_CATEGORY;
  const normalised = raw.replace(/_/g, "-");
  if (normalised.startsWith("trending")) return "trending";
  const match = TVSERIES_CATEGORIES.find((cat) => cat.id === normalised);
  return match?.id ?? DEFAULT_CATEGORY;
};

const categoryTitles: Record<CategoryId, string> = {
  trending: "Trending TV Series",
  popular: "Popular TV Series",
  "top-rated": "Top Rated TV Series",
  "airing-today": "TV Series Airing Today",
  "airing-this-week": "TV Series Airing This Week",
};

const categoryDescriptions: Record<CategoryId, string> = {
  trending: "Discover the TV series trending today. The shows everyone is talking about right now.",
  popular: "Discover the most popular TV series right now. Trending shows everyone is watching.",
  "top-rated": "Explore the highest-rated TV series of all time. Critically acclaimed shows you must watch.",
  "airing-today": "See what TV series are airing new episodes today. Stay up to date with your favorite shows.",
  "airing-this-week": "Check out TV series airing new episodes this week. Never miss an episode.",
};

const TVSeriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = resolveCategory(searchParams.get("category"));
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const selectedCategory = useMemo(
    () =>
      TVSERIES_CATEGORIES.find((cat) => cat.id === activeCategory) ??
      TVSERIES_CATEGORIES[0],
    [activeCategory],
  );

  const { data: tvSeriesData, isLoading } = selectedCategory.useFetch({ page });

  const { results: tvSeries, total_pages } = tvSeriesData || {};

  const goToPage = (next: number) => {
    const params: Record<string, string> = { category: activeCategory };
    if (next > 1) params.page = String(next);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "TV Series", url: "/series" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <SEOMeta
        title={categoryTitles[activeCategory]}
        description={categoryDescriptions[activeCategory]}
        canonical="/series"
        structuredData={breadcrumbStructuredData}
      />
      <div className="container grow">
        <div className="py-12 w-full flex flex-col gap-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                Series
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
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
                    onClick={() => setSearchParams({ category: category.id })}
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
                  No {selectedCategory.title.toLowerCase()} series found.
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

export default TVSeriesPage;
