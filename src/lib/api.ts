import { useQuery } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";

//All Categories
export const useFetchMovieGenres = () =>
	useQuery({
		queryKey: [queries.fetch_movie_genres],
		queryFn: () => requests.get("/3/genre/movie/list").then((res) => res?.genres ?? []),
	});
export const useFetchTVGenres = () =>
	useQuery({
		queryKey: [queries.fetch_tv_genres],
		queryFn: () => requests.get("/3/genre/tv/list").then((res) => res?.genres ?? []),
	});

// All lists
export const useFetchNowPlayingMovies = (params?: object) =>
	useQuery({
		queryKey: [queries.fetch_now_playing],
		queryFn: () => requests.get("/3/movie/now_playing", { ...params }),
	});
export const useFetchTrendingMovies = (params?: object) =>
	useQuery({
		queryKey: [queries.fetch_trending_movies],
		queryFn: () => requests.get("/3/movie/popular", { ...params }),
	});
export const useFetchTopRatedMovies = (params?: object) =>
	useQuery({
		queryKey: [queries.fetch_top_rated_movies],
		queryFn: () => requests.get("/3/movie/top_rated", { ...params }),
	});
export const useFetchUpcomingMovies = (params?: object) =>
	useQuery({
		queryKey: [queries.fetch_upcoming_movies],
		queryFn: () => requests.get("/3/movie/upcoming", { ...params }),
	});
export const useFetchMoviesByFilter = (
	params: { with_genres?: string } //{ with_genres : numbers seperated by comma }
) =>
	useQuery({
		queryKey: [queries.fetch_movies_by_filter, params],
		queryFn: () => requests.get(`/3/discover/movie`, { ...params }),
		enabled: Object.keys(params)?.length > 0,
	});

//Single Item Details
export const useFetchMovieDetails = ({ id }: { id?: number }) =>
	useQuery({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/movie/${id}`),
		enabled: !!id,
	});
export const useFetchMovieVideos = ({ id }: { id: number }) =>
	useQuery({
		queryKey: [queries.fetch_movie_video, id],
		queryFn: () => requests.get(`/3/movie/${id}/videos`),
		enabled: !!id,
	});

//Search Item
export const useSearchMovie = ({ query = "" }: { query?: string }) =>
	useQuery({
		queryKey: [queries.search_movie, query],
		queryFn: () => requests.get(`/3/search/movie`, { query }),
	});
