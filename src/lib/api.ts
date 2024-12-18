import { Query, useQuery, UseQueryResult } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";
import { MovieType, ResponseType, SeasonType, TVSeriesType } from "./datatypes";

//All Categories
export const useFetchMovieGenres = () =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_movie_genres],
		queryFn: () => requests.get("/3/genre/movie/list").then((res) => res?.genres ?? []),
	});
export const useFetchTVGenres = () =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_tv_genres],
		queryFn: () => requests.get("/3/genre/tv/list").then((res) => res?.genres ?? []),
	});

// All lists
export const useFetchNowPlayingMovies = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_now_playing],
		queryFn: () => requests.get("/3/movie/now_playing", { ...params }),
	});
export const useFetchTrendingMovies = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_trending_movies],
		queryFn: () => requests.get("/3/movie/popular", { ...params }),
	});
export const useFetchTopRatedMovies = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_top_rated_movies],
		queryFn: () => requests.get("/3/movie/top_rated", { ...params }),
	});
export const useFetchUpcomingMovies = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_upcoming_movies],
		queryFn: () => requests.get("/3/movie/upcoming", { ...params }),
	});

export const useFetchAiringTodayTVSeries = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_airing_today_tvseries],
		queryFn: () => requests.get("/3/tv/airing_today", { ...params }),
	});
export const useFetchOnTheAirTVSeries = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_airing_today_tvseries],
		queryFn: () => requests.get("/3/tv/on_the_air", { ...params }),
	});
export const useFetchTrendingTVSeries = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_trending_tvseries],
		queryFn: () => requests.get("/3/tv/popular", { ...params }),
	});
export const useFetchTopRatedTVSeries = (params?: object) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_top_rated_tvseries],
		queryFn: () => requests.get("/3/tv/top_rated", { ...params }),
	});

//Single Item Details
export const useFetchMovieDetails = ({ id }: { id?: number }) =>
	useQuery<MovieType>({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/movie/${id}`),
		enabled: !!id,
	});
export const useFetchMovieVideos = ({ id }: { id: number }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_movie_video, id],
		queryFn: () => requests.get(`/3/movie/${id}/videos`),
		enabled: !!id,
	});

export const useFetchTVSeriesDetails = ({ id }: { id?: number }) =>
	useQuery<TVSeriesType>({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/tv/${id}`),
		enabled: !!id,
	});
export const useFetchTVSeriesVideos = ({ id }: { id: number }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_movie_video, id],
		queryFn: () => requests.get(`/3/tv/${id}/videos`),
		enabled: !!id,
	});
export const useFetchSeasonDetails = ({
	series_id,
	season,
}: {
	series_id: number;
	season: number;
}) =>
	useQuery<SeasonType>({
		queryKey: [queries.fetch_movie, series_id, season],
		queryFn: () => requests.get(`/3/tv/${series_id}/season/${season}`),
		enabled: !!series_id && !!season,
	});
export const useFetchEpisodeDetails = ({
	series_id,
	season,
	episode,
}: {
	series_id: number;
	season: number;
	episode: number;
}) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_movie, series_id, season, episode],
		queryFn: () => requests.get(`/3/tv/${series_id}/season/${season}/episode/${episode}`),
		enabled: !!series_id && !!season && !!episode,
	});

//Search Item
export const useSearchMulti = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.search_multi, query],
		queryFn: () => requests.get(`/3/search/multi`, { query }),
	});
export const useSearchMovie = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.search_movie, query],
		queryFn: () => requests.get(`/3/search/movie`, { query }),
	});
export const useSearchTVSeries = ({ query = "" }: { query?: string }) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.search_tv_series, query],
		queryFn: () => requests.get(`/3/search/tv`, { query }),
	});
export const useFetchMoviesByFilter = (
	params: { with_genres?: string; [key: string]: string | undefined } //{ with_genres : numbers seperated by comma }
) =>
	useQuery<ResponseType<any>>({
		queryKey: [queries.fetch_movies_by_filter, params],
		queryFn: () => requests.get(`/3/discover/movie`, { ...params }),
		enabled: Object.keys(params)?.length > 0,
	});
