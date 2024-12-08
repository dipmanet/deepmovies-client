import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import { useFetchTrendingMovies } from "#lib/api";
import { MovieListType } from "#lib/datatypes";

const CoverTrending = () => {
	const { data } = useFetchTrendingMovies();

	const { dates, page, results: Movies, total_pages, total_results } = data || {};

	return (
		<div className="container py-20 flex flex-col gap-5">
			<h4 className="text-[25px] text-white font-title">Trending Movies</h4>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
				{Movies?.map((movie: MovieListType) => (
					<CoverMovieCard2 key={movie?.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default CoverTrending;
