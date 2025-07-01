import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import { useFetchTrendingMovies, useSearchMovie } from "#lib/api";
import { DataContext } from "#lib/Context";
import { MovieListType } from "#lib/datatypes";
import { useContext, useState } from "react";

const MoviesPage = () => {
	const { searchText } = useContext(DataContext);
	const { data: searchData } = useSearchMovie({ query: searchText });
	const { data: trendingMoviesData } = useFetchTrendingMovies();

	const { page, results, total_pages, total_results } = searchData || {};
	const { results: trendingMovies } = trendingMoviesData || {};

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground">
					<h4 className=" text-3xl font-bold ">Movies</h4>
				</div>
				{searchText ? (
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
						{results && results?.length > 0
							? results.map((mov: MovieListType) => <CoverMovieCard2 movie={mov} />)
							: null}
					</div>
				) : (
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
						{trendingMovies && trendingMovies?.length > 0
							? trendingMovies.map((mov: MovieListType) => <CoverMovieCard2 movie={mov} />)
							: null}
					</div>
				)}
			</div>
		</div>
	);
};

export default MoviesPage;
