import useGenre from "#hooks/useGenre";
import { TVSeriesListType } from "#lib/datatypes";
import { getDateString, getImageUrl } from "#lib/utils";
import { Link } from "react-router-dom";

const CoverTVSeriesCard1 = ({
	series,
	className = "",
}: {
	series: TVSeriesListType;
	className?: string;
}) => {
	const {
		backdrop_path,
		genre_ids,
		id,
		overview,
		poster_path,
		release_date,
		title,
		vote_average,
	} = series;

	const { getTVGenre } = useGenre();
	const genre = genre_ids?.length ? getTVGenre(genre_ids[0]) : "";
	const year = release_date ? new Date(release_date).getFullYear() : "";
	const rating = vote_average ? vote_average.toFixed(1) : "N/A";

	return (
		<Link
			to={`/series/${id}`}
			className={`group relative w-full h-full overflow-hidden p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 bg-gray-600 bg-opacity-40 backdrop-blur-md rounded-xl ${className}`}>
			<div className="relative h-[120px] w-full sm:w-[140px] min-w-[120px] sm:min-w-[140px] overflow-hidden rounded-xl">
				<img
					src={getImageUrl(backdrop_path || poster_path)}
					alt={title}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col justify-center gap-1.5 min-w-0">
				<p className="text-lg font-semibold text-accent-foreground line-clamp-1">{title}</p>
				<p className="text-sm text-gray-300">{getDateString(release_date)}</p>
			</div>
			<div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
			<div className="absolute inset-0 flex flex-col justify-center gap-1.5 p-3 sm:p-4 translate-x-[-10%] opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
				<div className="flex items-center gap-2 flex-wrap">
					{genre && (
						<span className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white backdrop-blur-sm">
							{genre}
						</span>
					)}
					{year && <span className="text-sm text-gray-300">{year}</span>}
					<div className="flex items-center gap-1.5 text-sm text-yellow-400">
						<svg className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<span>{rating}</span>
					</div>
				</div>
				<p className="text-lg font-semibold text-white line-clamp-1">{title}</p>
				{overview && (
					<p className="line-clamp-2 text-sm leading-relaxed text-gray-200 sm:line-clamp-3">{overview}</p>
				)}
			</div>
		</Link>
	);
};

export default CoverTVSeriesCard1;
