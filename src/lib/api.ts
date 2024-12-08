import { useQuery } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";

//All Categories
export const useFetchMovieGenres = () =>
	useQuery({
		queryKey: [queries.fetch_movie_genres],
		queryFn: () => requests.get("/3/genre/movie/list"),
	});
export const useFetchTVGenres = () =>
	useQuery({
		queryKey: [queries.fetch_tv_genres],
		queryFn: () => requests.get("/3/genre/tv/list"),
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

//Single Movie
export const useFetchMovieDetails = ({ id }: { id?: number }) =>
	useQuery({
		queryKey: [queries.fetch_movie, id],
		queryFn: () => requests.get(`/3/movie/${id}`),
		enabled: !!id,
	});
export const useFetchMovieVideo = ({ id }: { id: number }) =>
	useQuery({
		queryKey: [queries.fetch_movie_video, id],
		queryFn: () => requests.get(`/3/movie/${id}/videos`),
		enabled: !!id,
	});
