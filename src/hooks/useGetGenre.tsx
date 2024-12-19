import { useFetchMovieGenres, useFetchTVGenres } from "#lib/api";
const useGetGenre = () => {
	const { data: movieGenres } = useFetchMovieGenres();
	const { data: tvGenres } = useFetchTVGenres();

	const getMovieGenre = (id: number) =>
		movieGenres && movieGenres?.length > 0
			? movieGenres?.find((genre: { id: number; name: string }) => genre.id === id)?.name
			: "";
	const getTVGenre = (id: number) =>
		tvGenres && tvGenres?.length > 0
			? tvGenres?.find((genre: { id: number; name: string }) => genre.id === id)?.name
			: "";
	return {
		movieGenres,
		tvGenres,
		getMovieGenre,
		getTVGenre,
	};
};

export default useGetGenre;
