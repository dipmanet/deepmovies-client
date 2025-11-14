import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import useGenre from "#hooks/useGenre";
import {
	useFetchMovieGenres,
	useFetchMoviesByFilter,
	useFetchTVGenres,
	useFetchTVSeriesByFilter,
} from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { ContentTypes } from "#lib/expressions";
import { cn } from "#lib/utils";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const GenrePage = () => {
	const { genre } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const contentType = searchParams.get("content_type");
	const { movieGenres, tvGenres } = useGenre();

	const [currentTab, setCurrentTab] = useState(
		contentType
			? ContentTypes.find((tab) => tab.name === contentType) || ContentTypes[0]
			: ContentTypes[0]
	);
	const genres = (currentTab?.name == "movies" ? movieGenres : tvGenres) || [];

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

	const { results } = currentTab.name === "movies" ? filterMovies || {} : filterTVSeries || {};

	console.log("test genre", results);

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground flex items-center gap-10">
					<h4 className=" text-3xl font-bold capitalize">
						{genreObject?.name || genre?.split("_").join(" ")} Genre
					</h4>
					<div className="flex gap-4 items-center">
						{ContentTypes.map((tab) => (
							<div
								key={tab.id}
								className={cn(
									`w-fit h-full flex gap-1 items-center font-title cursor-pointer`,
									tab.id === currentTab.id ? "text-accent-foreground" : "text-primary-foreground"
								)}
								onClick={() => {
									setCurrentTab(tab);
									setSearchParams({ content_type: tab.name });
								}}>
								<tab.icon />
								<p>{tab.title}</p>
							</div>
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
