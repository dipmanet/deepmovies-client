import { useQuery } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";
import {
	EpisodeType,
	GenreType,
	MovieListType,
	MovieType,
	ResponseType,
	SeasonType,
	TVSeriesListType,
	TVSeriesType,
} from "./datatypes";

//All Categories
export const useFetchMovieGenres = () =>
	useQuery<GenreType[]>({
		queryKey: [queries.fetch_movie_genres],
		queryFn: () => requests.get("/3/genre/movie/list").then((res) => res?.genres ?? []),
	});
export const useFetchTVGenres = () =>
	useQuery<GenreType[]>({
		queryKey: [queries.fetch_tv_genres],
		queryFn: () => requests.get("/3/genre/tv/list").then((res) => res?.genres ?? []),
	});

// All lists
export const useFetchNowPlayingMovies = (params?: object) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_now_playing],
		queryFn: () => requests.get("/3/movie/now_playing", { ...params }),
	});
export const useFetchTrendingMovies = (params?: object) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_trending_movies],
		queryFn: () => requests.get("/3/movie/popular", { ...params }),
	});
export const useFetchTopRatedMovies = (params?: object) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_top_rated_movies],
		queryFn: () => requests.get("/3/movie/top_rated", { ...params }),
	});
export const useFetchUpcomingMovies = (params?: object) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_upcoming_movies],
		queryFn: () => requests.get("/3/movie/upcoming", { ...params }),
	});

export const useFetchAiringTodayTVSeries = (params?: object) =>
	useQuery<ResponseType<TVSeriesListType>>({
		queryKey: [queries.fetch_airing_today_tvseries],
		queryFn: () => requests.get("/3/tv/airing_today", { ...params }),
	});
export const useFetchOnTheAirTVSeries = (params?: object) =>
	useQuery<ResponseType<TVSeriesListType>>({
		queryKey: [queries.fetch_airing_today_tvseries],
		queryFn: () => requests.get("/3/tv/on_the_air", { ...params }),
	});
export const useFetchTrendingTVSeries = (params?: object) =>
	useQuery<ResponseType<TVSeriesListType>>({
		queryKey: [queries.fetch_trending_tvseries],
		queryFn: () => requests.get("/3/tv/popular", { ...params }),
	});
export const useFetchTopRatedTVSeries = (params?: object) =>
	useQuery<ResponseType<TVSeriesListType>>({
		queryKey: [queries.fetch_top_rated_tvseries],
		queryFn: () => requests.get("/3/tv/top_rated", { ...params }),
	});

//Single Item Details
export const useFetchMovie = ({ id }: { id?: number }) =>
	useQuery<MovieType>({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/movie/${id}`),
		enabled: !!id,
	});
export const useFetchTVSeries = ({ id }: { id?: number }) =>
	useQuery<TVSeriesType>({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/tv/${id}`),
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
		queryFn: () => requests.get(`/3/tv/${series_id}/season/${season_id}/episode/${episode_id}?`),
		enabled: !!series_id && season_id >= 0 && episode_id >= 0,
	});

//Search Item
export const useSearchMulti = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.search_multi, query],
		queryFn: () => requests.get(`/3/search/multi`, { query }),
	});
export const useSearchMovie = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.search_movie, query],
		queryFn: () => requests.get(`/3/search/movie`, { query }),
	});
export const useSearchTVSeries = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<TVSeriesListType>>({
		queryKey: [queries.search_tv_series, query],
		queryFn: () => requests.get(`/3/search/tv`, { query }),
	});
export const useFetchMoviesByFilter = (
	params: { with_genres?: string; [key: string]: string | undefined } //{ with_genres : numbers seperated by comma }
) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_movies_by_filter, params],
		queryFn: () => requests.get(`/3/discover/movie`, { ...params }),
		enabled: Object.keys(params)?.length > 0,
	});
export const useFetchTVSeriesByFilter = (
	params: { with_genres?: string; [key: string]: string | undefined } //{ with_genres : numbers seperated by comma }
) =>
	useQuery<ResponseType<MovieListType>>({
		queryKey: [queries.fetch_tv_series_by_filter, params],
		queryFn: () => requests.get(`/3/discover/tv`, { ...params }),
		enabled: Object.keys(params)?.length > 0,
	});
