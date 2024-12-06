import { useFetchGenres } from "#lib/api";
const useGetGenre = () => {
	const { data } = useFetchGenres();

	const getGenre = (id: number) =>
		data?.genres?.length > 0
			? data?.genres.find((genre: { id: number; name: string }) => genre.id === id)?.name
			: "";
	return {
		genres: data?.genres,
		getGenre,
	};
};

export default useGetGenre;
