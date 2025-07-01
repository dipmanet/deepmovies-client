import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import {
	useFetchMovieGenres,
	useFetchMoviesByFilter,
	useFetchTVGenres,
	useFetchTVSeriesByFilter,
} from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { GenreTabs } from "#lib/tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
	const { genre } = useParams();
	const { data: movieGenres } = useFetchMovieGenres();
	const { data: tvGenres } = useFetchTVGenres();

	const [currentTab, setCurrentTab] = useState(GenreTabs[0]);
	const genres = (currentTab?.id == "movies" ? movieGenres : tvGenres) || [];

	const genreObject =
		genres?.length > 0
			? genres.find((gen) => gen.name?.toLowerCase().replace(" ", "_") === genre)
			: undefined;

	const { data: filterMovies } = useFetchMoviesByFilter({
		...(genreObject?.id ? { with_genres: `${genreObject?.id}` } : {}),
	});
	const { data: filterTVSeries } = useFetchTVSeriesByFilter({
		...(genreObject?.id ? { with_genres: `${genreObject?.id}` } : {}),
	});

	const { results } = (genreObject ? filterMovies : filterTVSeries) || {};

	console.log("test genre", genre, results, genreObject?.id);

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground flex items-center gap-10">
					<h4 className=" text-3xl font-bold capitalize">
						{genreObject?.name || genre?.split("_").join(" ")} Genre
					</h4>
					<div className="flex gap-2">
						{GenreTabs.map((tab) => (
							<button
								key={tab.id}
								className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
									currentTab.id === tab.id ? "bg-secondary text-white" : "text-foreground"
								}`}
								onClick={() => setCurrentTab(tab)}
								// disabled={!!genreObject}
							>
								{tab.name}
							</button>
						))}
					</div>
				</div>

				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{results && results?.length > 0
						? results.map((mov: MovieListType) => (
								<CoverMovieCard2 movie={mov} className="w-[200px]" />
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default GenrePage;
