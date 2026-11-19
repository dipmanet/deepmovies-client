import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import { MovieListType, ResponseType, TVSeriesListType } from "#lib/datatypes";
import { ContentTypes } from "#lib/expressions";
import { movieCategory, tvCategory } from "#lib/type";
import { cn } from "#lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  category?: movieCategory | tvCategory;
  useGetMovies:
    | ((
        params?: object | undefined,
      ) => UseQueryResult<ResponseType<MovieListType>, Error>)
    | null;
  useGetTVSeries:
    | ((
        params?: object | undefined,
      ) => UseQueryResult<ResponseType<TVSeriesListType>, Error>)
    | null;
};

/* Maps a home-section category to the matching tab id on the target page. */
const MOVIE_LINKS: Record<movieCategory, string> = {
  trending: "trending",
  trending_this_week: "trending",
  now_playing: "now-playing",
  top_rated: "top-rated",
  popular: "popular",
  upcoming: "upcoming",
};

const TV_LINKS: Record<tvCategory, string> = {
  trending: "trending",
  trending_this_week: "trending",
  airing_today: "airing-today",
  airing_this_week: "airing-this-week",
  popular: "popular",
  upcoming: "popular",
};

const CoverCategory = ({
  title,
  category,
  useGetMovies,
  useGetTVSeries,
}: Props) => {
  const { data: dataMovies, isLoading: isLoadingM } = useGetMovies?.() ?? {
    data: undefined,
    isLoading: false,
  };
  const { data: dataTVSeries, isLoading: isLoadingS } = useGetTVSeries?.() ?? {
    data: undefined,
    isLoading: false,
  };
  const { results: Movies } = dataMovies || {};
  const { results: TVSeries } = dataTVSeries || {};

  const [selectedTab, setSelectedTab] = useState<1 | 2>(1);

  const hasMovies = useGetMovies !== null;
  const hasSeries = useGetTVSeries !== null;
  const currentTab: 1 | 2 = !hasMovies ? 2 : !hasSeries ? 1 : selectedTab;

  const items = useMemo(
    () => (currentTab === 1 ? Movies : TVSeries),
    [Movies, TVSeries, currentTab],
  );

  const targetIsSeries = currentTab === 2;

  const showAllHref = (() => {
    const base = targetIsSeries ? "/series" : "/movie";
    if (!category) return base;
    const id = targetIsSeries
      ? TV_LINKS[category as tvCategory]
      : MOVIE_LINKS[category as movieCategory];
    return id ? `${base}?category=${id}` : base;
  })();

  return (
    <div className="container py-12 flex flex-col gap-8">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-[28px] w-1 rounded-full bg-primary" />
          <h2 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {(useGetMovies !== null || useGetTVSeries !== null) && (
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {ContentTypes.map((tab) => {
                if (
                  (tab.id === 1 && useGetMovies === null) ||
                  (tab.id === 2 && useGetTVSeries === null)
                )
                  return null;
                return (
                  <button
                    key={tab.id}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium",
                      "transition-all duration-200 ease-in-out",
                      tab.id === currentTab
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                    )}
                    onClick={() => setSelectedTab(tab.id === 2 ? 2 : 1)}
                  >
                    <tab.icon className="text-[13px]" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          <Link
            to={showAllHref}
            className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <span>Show All</span>
            <IoArrowForward className="text-[14px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {!isLoadingM && !isLoadingS
          ? items
              ?.slice(0, 10)
              ?.map((item) =>
                currentTab === 1 ? (
                  <CoverMovieCard2
                    key={item?.id}
                    movie={item as MovieListType}
                    showDetails
                  />
                ) : (
                  <CoverTVSeriesCard
                    key={item?.id}
                    series={item as TVSeriesListType}
                    showDetails
                  />
                ),
              )
          : Array(10)
              .fill("")
              .map((_, idx) => <SklCoverMovieCard key={idx} />)}
      </div>
    </div>
  );
};

export default CoverCategory;
