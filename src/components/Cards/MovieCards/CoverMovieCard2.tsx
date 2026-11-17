import useGenre from "#hooks/useGenre";
import { MovieListType } from "#lib/datatypes";
import { getDateString, getImageUrl } from "#lib/utils";
import { Link } from "react-router-dom";

const CoverMovieCard2 = ({
  movie,
  className,
  showDetails = false,
}: {
  movie: MovieListType;
  className?: string;
  showDetails?: boolean;
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
  } = movie || {};

  const { getMovieGenre } = useGenre();
  const genre = genre_ids?.length ? getMovieGenre(genre_ids[0]) : "";
  const year = release_date ? new Date(release_date).getFullYear() : "";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";

  return (
    <Link
      to={`/movie/${id}`}
      className={`group relative block min-w-[50px] rounded-xl ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
        <img
          src={getImageUrl(poster_path || backdrop_path)}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {showDetails && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            <div className="absolute inset-x-0 top-0 -translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
              <div className="flex items-center justify-between gap-1.5">
                {genre && (
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white backdrop-blur-sm">
                    {genre}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-[11px] text-yellow-400">
                  <svg className="h-3 w-3 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{rating}</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
              {title && (
                <p className="text-[12px] font-semibold text-white line-clamp-1">
                  {title}
                </p>
              )}
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-300">
                {year && <span>{year}</span>}
                {release_date && year && <span>•</span>}
                {release_date && <span>{getDateString(release_date)}</span>}
              </div>
              {overview && (
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-200">
                  {overview}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default CoverMovieCard2;
