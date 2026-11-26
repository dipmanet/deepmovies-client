import { imageUrl } from "#components/MediaShell";
import { PersonListType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { Link } from "react-router-dom";

const PeopleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("size-6 fill-current", className ?? "")}
    aria-hidden
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5zm-8-1c.9 0 2.1.13 3.4.4C8.7 14.9 10 16.2 10 18v2H4v-1c0-1.33 1.33-2.04 2-2.04z" />
  </svg>
);

const PersonCard = ({
  person,
  className,
  showDetails = false,
}: {
  person: PersonListType;
  className?: string;
  showDetails?: boolean;
}) => {
  const { id, name, profile_path } = person || {};
  const image = imageUrl(profile_path, "w500");

  return (
    <Link
      to={`/people/${id}`}
      className={cn(
        "group relative block min-w-[50px] rounded-xl",
        className ?? "",
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <PeopleIcon />
          </div>
        )}

        {showDetails && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
              <p className="line-clamp-2 text-[12px] font-semibold text-white">
                {name}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-300">
                <span className="capitalize">Person</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default PersonCard;
