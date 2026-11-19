import { imageUrl } from "#components/MediaShell";
import { SearchResultType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { Link } from "react-router-dom";

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    className={cn("size-3.5 fill-current", className ?? "")}
    aria-hidden
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69z" />
  </svg>
);

const PeopleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("size-3.5 fill-current", className ?? "")}
    aria-hidden
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5zm-8-1c.9 0 2.1.13 3.4.4C8.7 14.9 10 16.2 10 18v2H4v-1c0-1.33 1.33-2.04 2-2.04z" />
  </svg>
);

const MediaBadge = ({ mediaType }: { mediaType: string }) => {
  if (mediaType === "person") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
        <PeopleIcon />
        Person
      </span>
    );
  }
  return (
    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white backdrop-blur-sm">
      {mediaType === "tv" ? "TV Series" : "Movie"}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

const SearchCard = ({
  data,
  className,
}: {
  data: SearchResultType;
  className?: string;
}) => {
  const { media_type, id } = data || {};
  const isPerson = media_type === "person";
  const poster_path = (data as any).poster_path as string | undefined;
  const profile_path = (data as any).profile_path as string | undefined;
  const backdrop_path = (data as any).backdrop_path as string | undefined;

  const title = isPerson
    ? (data as any).name
    : media_type === "tv"
      ? (data as any).name
      : (data as any).title;
  const date =
    media_type === "movie"
      ? (data as any).release_date
      : media_type === "tv"
        ? (data as any).first_air_date
        : (data as any).known_for_department;
  const vote = (data as any).vote_average as number | undefined;
  const overview = (data as any).overview as string | undefined;
  const profile = profile_path ?? poster_path ?? backdrop_path;

  const image = imageUrl(profile, "w500");

  const href = isPerson
    ? `/people/${id}`
    : media_type === "tv"
      ? `/series/${id}`
      : `/movie/${id}`;

  return (
    <Link
      to={href}
      className={cn(
        "group relative block min-w-[50px] overflow-hidden rounded-xl",
        className ?? "",
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06]">
        {image ? (
          <img
            src={image}
            alt={title ?? ""}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            {isPerson ? (
              <PeopleIcon className="size-10" />
            ) : (
              <StarIcon className="size-10" />
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 top-0 -translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
          <div className="flex items-center justify-between gap-1.5">
            <MediaBadge mediaType={media_type} />
            {!isPerson && vote !== undefined && vote > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[11px] font-semibold text-yellow-400 backdrop-blur-sm">
                <StarIcon />
                {vote.toFixed(1)}
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
          {title && (
            <p className="line-clamp-1 text-[13px] font-semibold text-white">
              {title}
            </p>
          )}
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-300">
            {date && <span>{date}</span>}
            {media_type === "tv" && date && (
              <>
                <span>•</span>
                <span className="capitalize">Series</span>
              </>
            )}
          </div>
          {!isPerson && overview && (
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-200">
              {overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
