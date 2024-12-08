import { MovieListType } from "#lib/datatypes";
import { getImageUrl } from "#lib/utils";
import { Link } from "react-router-dom";

const CoverMovieCard2 = ({ movie, className }: { movie: MovieListType; className?: string }) => {
	const {
		adult,
		backdrop_path,
		genre_ids,
		id,
		original_language,
		original_title,
		overview,
		popularity,
		poster_path,
		release_date,
		title,
		video,
		vote_average,
		vote_count,
	} = movie || {};

	return (
		<Link
			to={`/movie/${id}`}
			className={`min-w-[50px] flex gap-10 backdrop-blur-md rounded-xl ${className}`}>
			<div className="rounded-xl overflow-clip">
				<img src={getImageUrl(poster_path)} alt="" />
			</div>
		</Link>
	);
};

export default CoverMovieCard2;
