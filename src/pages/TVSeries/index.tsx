import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import {
	useFetchMovieDetails,
	useFetchTrendingMovies,
	useFetchTrendingTVSeries,
	useSearchMovie,
	useSearchTVSeries,
} from "#lib/api";
import { DataContext } from "#lib/Context";
import { MovieListType, TVSeriesListType } from "#lib/datatypes";
import { useContext, useState } from "react";

const TVSeriesPage = () => {
	const { searchText } = useContext(DataContext);
	const { data: searchData } = useSearchTVSeries({ query: searchText });
	const { data: trendingTVSeriesData } = useFetchTrendingTVSeries();

	const { page, results: searchResults, total_pages, total_results } = searchData || {};
	const { results: trendingTVSeries } = trendingTVSeriesData || {};

	console.log("test tv", trendingTVSeries);

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground">
					<h4 className=" text-3xl font-bold ">TV Series</h4>
				</div>
				{searchText ? (
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
						{searchResults && searchResults?.length > 0
							? searchResults.map((mov: MovieListType) => (
									<CoverMovieCard2 key={mov.id} movie={mov} />
							  ))
							: null}
					</div>
				) : (
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
						{trendingTVSeries && trendingTVSeries?.length > 0
							? trendingTVSeries.map((series: TVSeriesListType) => (
									<CoverTVSeriesCard key={series.id} series={series} />
							  ))
							: null}
					</div>
				)}
			</div>
		</div>
	);
};

export default TVSeriesPage;
