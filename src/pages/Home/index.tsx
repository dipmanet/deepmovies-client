import CoverPoster from "./CoverPoster";
import CoverCategory from "./CoverCategory";
import { SEOMeta } from "#components/SEO";
import {
  useFetchAiringTodayTVSeries,
  useFetchPopularMovies,
  useFetchPopularTVSeries,
  useFetchTrendingThisWeekMovies,
  useFetchTrendingThisWeekTVSeries,
  useFetchTrendingTodayMovies,
  useFetchTrendingTodayTVSeries,
  useFetchUpcomingMovies,
} from "#lib/api";

const Homepage = () => {
  return (
    <>
      <SEOMeta
        title="DeepMovies - Discover Movies & TV Series"
        description="Explore trending movies, popular TV series, and discover new favorites. Watch trailers, read reviews, and find where to stream."
        canonical="/"
      />
      <div className="grow">
        <CoverPoster />
        <CoverCategory
          title="Trending Today"
          category="trending"
          useGetMovies={useFetchTrendingTodayMovies}
          useGetTVSeries={useFetchTrendingTodayTVSeries}
        />
        <CoverCategory
          title="Trending This Week"
          category="trending_this_week"
          useGetMovies={useFetchTrendingThisWeekMovies}
          useGetTVSeries={useFetchTrendingThisWeekTVSeries}
        />
        <CoverCategory
          title="Popular"
          category="popular"
          useGetMovies={useFetchPopularMovies}
          useGetTVSeries={useFetchPopularTVSeries}
        />
        <CoverCategory
          title="Top Rated"
          category="top_rated"
          useGetMovies={useFetchPopularMovies}
          useGetTVSeries={useFetchPopularTVSeries}
        />
        <CoverCategory
          title="Upcoming Movies"
          category="upcoming"
          useGetMovies={useFetchUpcomingMovies}
          useGetTVSeries={null}
        />
        <CoverCategory
          title="TV Series Airing Today"
          category="airing_today"
          useGetMovies={null}
          useGetTVSeries={useFetchAiringTodayTVSeries}
        />
      </div>
    </>
  );
};

export default Homepage;
