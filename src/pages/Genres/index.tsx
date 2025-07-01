import { useFetchMovieGenres, useFetchTVGenres } from "#lib/api";
import { GenreTabs } from "#lib/tabs";
import { useState } from "react";
import { Link } from "react-router-dom";

const GenrePage = () => {
	const { data: movieGenres } = useFetchMovieGenres();
	const { data: tvGenres } = useFetchTVGenres();

	const [currentTab, setCurrentTab] = useState(GenreTabs[0]);

	const genres = (currentTab?.id == "movies" ? movieGenres : tvGenres) || [];

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground h-20 flex w-full items-center gap-10">
					<h4 className=" text-3xl font-bold text-white ">Genre</h4>
					<div className="flex gap-2">
						{GenreTabs.map((tab) => (
							<button
								key={tab.id}
								className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
									currentTab.id === tab.id ? "bg-secondary text-white" : "text-foreground"
								}`}
								onClick={() => setCurrentTab(tab)}>
								{tab.name}
							</button>
						))}
					</div>
				</div>

				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{genres?.length > 0
						? genres?.map((gen) => (
								<Link
									to={`/genre/${gen.name.toLowerCase().replaceAll(" ", "_")}/?content_type=${
										currentTab.id
									}`}
									key={gen.id}
									className="text-center hover:text-white">
									<h5 className="text-lg font-semibold">{gen.name}</h5>
								</Link>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default GenrePage;
