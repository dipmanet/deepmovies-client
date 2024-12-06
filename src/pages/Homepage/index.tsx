import { useFetchMovieDetails, useFetchNowPlaying, useFetchUpcomingMovies } from "#lib/api";
import CoverPoster from "./CoverPoster";

const Homepage = () => {
	const { data } = useFetchUpcomingMovies({ page: 1 });
	const { dates, page, results, total_pages, total_results } = data || {};

	return (
		<div className="grow">
			<CoverPoster poster={results?.length ? results[0] : {}} />
		</div>
	);
};

export default Homepage;
