import { useQuery } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";
import {
  EpisodeType,
  GenreType,
  MovieListType,
  MovieType,
  PersonListType,
  PersonMovieCredit,
  PersonType,
  ResponseType,
  ReviewType,
  SearchResultType,
  SeasonType,
  TVSeriesListType,
  TVSeriesType,
} from "./datatypes";

//All Categories
export const useFetchMovieGenres = () =>
  useQuery<GenreType[]>({
    queryKey: [queries.fetch_movie_genres],
    queryFn: () =>
      requests.get("/3/genre/movie/list").then((res) => res?.genres ?? []),
  });
export const useFetchTVGenres = () =>
  useQuery<GenreType[]>({
    queryKey: [queries.fetch_tv_genres],
    queryFn: () =>
      requests.get("/3/genre/tv/list").then((res) => res?.genres ?? []),
  });

// All lists
export const useFetchTrendingTodayMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_trending_movies, params],
    queryFn: () => requests.get("/3/trending/movie/day", { ...params }),
  });
export const useFetchTrendingThisWeekMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_trending_movies, params],
    queryFn: () => requests.get("/3/trending/movie/week", { ...params }),
  });
export const useFetchNowPlayingMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_now_playing, params],
    queryFn: () => requests.get("/3/movie/now_playing", { ...params }),
  });
export const useFetchPopularMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_popular_movies, params],
    queryFn: () => requests.get("/3/movie/popular", { ...params }),
  });
export const useFetchTopRatedMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_top_rated_movies, params],
    queryFn: () => requests.get("/3/movie/top_rated", { ...params }),
  });
export const useFetchUpcomingMovies = (params?: object) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_upcoming_movies, params],
    queryFn: () => requests.get("/3/movie/upcoming", { ...params }),
  });

export const useFetchTrendingTodayTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_trending_tvseries, params],
    queryFn: () => requests.get("/3/trending/tv/day", { ...params }),
  });
export const useFetchTrendingThisWeekTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_trending_tvseries, params],
    queryFn: () => requests.get("/3/trending/tv/week", { ...params }),
  });
export const useFetchAiringTodayTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_airing_today_tvseries, params],
    queryFn: () => requests.get("/3/tv/airing_today", { ...params }),
  });
export const useFetchAiringThisWeekTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_on_the_air_tvseries, params],
    queryFn: () => requests.get("/3/tv/on_the_air", { ...params }),
  });
export const useFetchPopularTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_popular_tvseries, params],
    queryFn: () => requests.get("/3/tv/popular", { ...params }),
  });
export const useFetchTopRatedTVSeries = (params?: object) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_top_rated_tvseries, params],
    queryFn: () => requests.get("/3/tv/top_rated", { ...params }),
  });

//Single Item Details
export const useFetchMovie = ({ id }: { id?: number }) =>
  useQuery<MovieType>({
    queryKey: [queries.fetch_movie, id],
    queryFn: () => requests.get(`/3/movie/${id}`),
    enabled: !!id,
  });
export const useFetchMovieCredits = ({ id }: { id?: number }) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_movie_credits, id],
    queryFn: () => requests.get(`/3/movie/${id}/credits`),
    enabled: !!id,
  });
export const useFetchMovieSimilars = ({ id }: { id?: number }) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_movie_similars, id],
    queryFn: () => requests.get(`/3/movie/${id}/similar`),
    enabled: !!id,
  });
export const useFetchMovieRecommendations = ({ id }: { id?: number }) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_movie_recommendations, id],
    queryFn: () => requests.get(`/3/movie/${id}/recommendations`),
    enabled: !!id,
  });
export const useFetchMovieReviews = ({ id }: { id?: number }) =>
  useQuery<ResponseType<ReviewType>>({
    queryKey: [queries.fetch_movie_reviews, id],
    queryFn: () => requests.get(`/3/movie/${id}/reviews`),
    enabled: !!id,
  });

export const useFetchTVSeries = ({ id }: { id?: number }) =>
  useQuery<TVSeriesType>({
    queryKey: [queries.fetch_tvseries, id],
    queryFn: () => requests.get(`/3/tv/${id}`),
    enabled: !!id,
  });
export const useFetchTVSeriesCredits = ({ id }: { id?: number }) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_tvseries_credits, id],
    queryFn: () => requests.get(`/3/tv/${id}/credits`),
    enabled: !!id,
  });
export const useFetchTVSeriesSimilars = ({ id }: { id?: number }) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_tvseries_similars, id],
    queryFn: () => requests.get(`/3/tv/${id}/similar`),
    enabled: !!id,
  });
export const useFetchTVSeriesRecommendations = ({ id }: { id?: number }) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_tvseries_recommendations, id],
    queryFn: () => requests.get(`/3/tv/${id}/recommendations`),
    enabled: !!id,
  });
export const useFetchTVSeriesReviews = ({ id }: { id?: number }) =>
  useQuery<ResponseType<ReviewType>>({
    queryKey: [queries.fetch_tvseries_reviews, id],
    queryFn: () => requests.get(`/3/tv/${id}/reviews`),
    enabled: !!id,
  });
export const useFetchSeason = ({
  series_id,
  season_id,
}: {
  series_id: number;
  season_id: number;
}) =>
  useQuery<SeasonType>({
    queryKey: [queries.fetch_movie, series_id, season_id],
    queryFn: () => requests.get(`/3/tv/${series_id}/season/${season_id}`),
    enabled: !!series_id && season_id >= 0,
  });
export const useFetchEpisode = ({
  series_id,
  season_id,
  episode_id,
}: {
  series_id: number;
  season_id: number;
  episode_id: number;
}) =>
  useQuery<EpisodeType>({
    queryKey: [queries.fetch_movie, series_id, season_id, episode_id],
    queryFn: () =>
      requests.get(
        `/3/tv/${series_id}/season/${season_id}/episode/${episode_id}?`,
      ),
    enabled: !!series_id && season_id >= 0 && episode_id >= 0,
  });

//Search Item
export const useSearchMulti = ({
  query = "",
  page = 1,
}: {
  query?: string;
  page?: number;
}) =>
  useQuery<ResponseType<SearchResultType>>({
    queryKey: [queries.search_multi, query, page],
    queryFn: () => requests.get(`/3/search/multi`, { query, page }),
  });
export const useSearchMovie = ({
  query = "",
  page = 1,
}: {
  query?: string;
  page?: number;
}) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.search_movie, query, page],
    queryFn: () => requests.get(`/3/search/movie`, { query, page }),
  });
export const useSearchTVSeries = ({
  query = "",
  page = 1,
}: {
  query?: string;
  page?: number;
}) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.search_tv_series, query, page],
    queryFn: () => requests.get(`/3/search/tv`, { query, page }),
  });
export const useFetchMoviesByFilter = (
  params: { with_genres?: string; [key: string]: string | undefined }, //{ with_genres : numbers seperated by comma }
) =>
  useQuery<ResponseType<MovieListType>>({
    queryKey: [queries.fetch_movies_by_filter, params],
    queryFn: () => requests.get(`/3/discover/movie`, { ...params }),
    // enabled: Object.keys(params)?.length > 0,
  });
export const useFetchTVSeriesByFilter = (
  params: { with_genres?: string; [key: string]: string | undefined }, //{ with_genres : numbers seperated by comma }
) =>
  useQuery<ResponseType<TVSeriesListType>>({
    queryKey: [queries.fetch_tv_series_by_filter, params],
    queryFn: () => requests.get(`/3/discover/tv`, { ...params }),
    // enabled: Object.keys(params)?.length > 0,
  });

// People
export const useFetchPerson = ({ id }: { id?: number }) =>
  useQuery<PersonType>({
    queryKey: [queries.fetch_person, id],
    queryFn: () => requests.get(`/3/person/${id}`),
    enabled: !!id,
  });

export const useFetchPersonMovieCredits = ({ id }: { id?: number }) =>
  useQuery<{ cast: PersonMovieCredit[]; crew: PersonMovieCredit[] }>({
    queryKey: [queries.fetch_person_movie_credits, id],
    queryFn: () => requests.get(`/3/person/${id}/movie_credits`),
    enabled: !!id,
  });

export const useFetchPersonTVCredits = ({ id }: { id?: number }) =>
  useQuery<{ cast: PersonMovieCredit[]; crew: PersonMovieCredit[] }>({
    queryKey: [queries.fetch_person_tv_credits, id],
    queryFn: () => requests.get(`/3/person/${id}/tv_credits`),
    enabled: !!id,
  });

export const useFetchPopularPeople = (params?: object) =>
  useQuery<ResponseType<PersonListType>>({
    queryKey: [queries.fetch_popular_people, params],
    queryFn: () => requests.get("/3/person/popular", { ...params }),
  });
