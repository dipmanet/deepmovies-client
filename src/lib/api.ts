import { useQuery } from "@tanstack/react-query";
import requests from "src/lib/requests";
import { queries } from "./queries";

// All lists
export const useFetchNowPlaying = ({ page = 1 }) =>
	useQuery({
		queryKey: [queries.fetch_now_playing],
		queryFn: () => requests.get("/3/movie/now_playing", { page }),
	});
export const useFetchTrendingMovies = ({ page = 1 }) =>
	useQuery({
		queryKey: [queries.fetch_trending_movies],
		queryFn: () => requests.get("/3/movie/popular", { page }),
	});
export const useFetchTopRatedMovies = ({ page = 1 }) =>
	useQuery({
		queryKey: [queries.fetch_top_rated_movies],
		queryFn: () => requests.get("/3/movie/top_rated", { page }),
	});
export const useFetchUpcomingMovies = ({ page = 1 }) =>
	useQuery({
		queryKey: [queries.fetch_upcoming_movies],
		queryFn: () => requests.get("/3/movie/upcoming", { page }),
	});

//All Categories
export const useFetchGenres = () =>
	useQuery({
		queryKey: [queries.fetch_genres],
		queryFn: () => requests.get("/3/genre/movie/list"),
	});

//Single Movie
export const useFetchMovieDetails = ({ id }: { id: number }) =>
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
