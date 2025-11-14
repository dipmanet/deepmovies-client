import useGenre from "#hooks/useGenre";
import { DataContext } from "#lib/Context";
import { GenreType, MovieListType } from "#lib/datatypes";
import { getDateString, getImageUrl } from "#lib/utils";
import { useContext } from "react";
import { Link } from "react-router-dom";

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
	} = movie;

	const { getMovieGenre } = useGenre();
	const genre = getMovieGenre(genre_ids[0]) || "";
	return (
		<Link
			to={`/movie/${id}`}
			className={`w-full h-full p-4 flex flex-col sm:flex-row gap-4 bg-gray-600 bg-opacity-40 backdrop-blur-md rounded-xl transition duration-500  hover:scale-105 ${className}`}>
			<div className="h-[120px] w-full sm:w-[120px] min-w-[120px] sm:w-[40%]f min-w-[40%]f rounded-xl">
				<img
					src={getImageUrl(backdrop_path)}
					alt=""
					className="h-full w-full object-cover rounded-xl"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<p className="w-fit py-1 px-4 inline-flex items-center bg-accent rounded-[18px] text-[12px] font-text border border-primary">
					{genre}
				</p>
				<p className="text-accent-foreground">{title}</p>
				<p>{getDateString(release_date)}</p>
			</div>
		</Link>
	);
};

export default CoverMovieCard1;
