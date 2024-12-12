import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import {
	useFetchMovieDetails,
	useFetchMoviesByFilter,
	useFetchTrendingMovies,
	useSearchMovie,
} from "#lib/api";
import { DataContext } from "#lib/Context";
import { MovieListType } from "#lib/datatypes";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
	const { genre } = useParams();
	const { movieGenres, searchText } = useContext(DataContext);
	// const { data: searchData } = useSearchMovie({ query: searchText });
	const genreId =
		movieGenres?.length > 0
			? movieGenres.find((gen) => gen.name?.toLowerCase().replace(" ", "_") === genre)?.id
			: undefined;
	console.log("test genres", movieGenres, genreId);
	const { data: filterData } = useFetchMoviesByFilter({
		...(genreId ? { with_genres: `${genreId}` } : {}),
	});

	// const { page, results, total_pages, total_results } = searchData || {};
	const { results } = filterData || {};

	console.log("test search", results);

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground">
					<h4 className=" text-3xl font-bold ">Movies</h4>
				</div>
				{/* {searchText ? ( */}
				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{results?.length > 0
						? results.map((mov: MovieListType) => (
								<CoverMovieCard2 movie={mov} className="w-[200px]" />
						  ))
						: null}
				</div>
				{/* ) : (
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
						{trendingMovies?.length > 0
							? trendingMovies.map((mov: MovieListType) => (
									<CoverMovieCard2 movie={mov} className="w-[200px]" />
							  ))
							: null}
					</div>
				)} */}
			</div>
		</div>
	);
};

export default GenrePage;
