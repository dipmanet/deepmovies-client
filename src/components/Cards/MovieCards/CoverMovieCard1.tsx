import { DataContext } from "#lib/Context";
import { GenreType, MovieListType } from "#lib/datatypes";
import { getImageUrl } from "#lib/utils";
import { useContext } from "react";

const CoverMovieCard1 = ({
	movie,
	className = "",
}: {
	movie: MovieListType;
	className?: string;
}) => {
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

	const { movieGenres } = useContext(DataContext);

	return (
		<div
			className={`w-full h-full p-2 flex flex-col sm:flex-row gap-4 backdrop-blur-md rounded-xl ${className}`}>
			<div className="h-[140px] sm:h-full w-full sm:w-[40%] min-w-[40%] rounded-xl">
				<img
					src={getImageUrl(backdrop_path)}
					alt=""
					className="h-full w-full object-cover rounded-xl"
				/>
			</div>
			<div className=" text-white">
				<p>
					{(genre_ids?.length > 0 &&
						movieGenres?.genres?.length > 0 &&
						movieGenres?.genres?.find((genre: GenreType) => genre.id === genre_ids[0])?.name) ||
						""}
				</p>
				<p>{title}</p>
				<p>{release_date}</p>
			</div>
		</div>
	);
};

export default CoverMovieCard1;
