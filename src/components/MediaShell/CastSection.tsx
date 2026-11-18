import { Link } from "react-router-dom";
import { imageUrl } from "./imageUrl";
import SectionHeading from "./SectionHeading";
import Slider from "./Slider";

const CastSection = ({
  cast,
  isLoading,
  title = "Top cast",
  subtitle = "The people behind the story",
}: {
  cast: any[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}) => {
  if (!(cast.length > 0 || isLoading)) return null;

  const items = isLoading
    ? Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-28 shrink-0 animate-pulse snap-start sm:w-32">
          <div className="aspect-[3/4] rounded-xl bg-white/10" />
          <div className="mt-3 h-3 w-4/5 rounded bg-white/10" />
          <div className="mt-2 h-2 w-3/5 rounded bg-white/5" />
        </div>
      ))
    : cast.slice(0, 20).map((person: any) => {
        const profile = imageUrl(person.profile_path, "w342");

        return (
          <div
            key={person.id}
            className="group w-28 shrink-0 snap-start sm:w-32"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:ring-primary/60">
              {profile ? (
                <Link
                  to={`/people/${person.id}`}
                  className="absolute inset-0 z-10"
                >
                  <img
                    src={profile}
                    alt={person.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white/30">
                  {person.name?.charAt(0) ?? "?"}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#191936]/80 to-transparent" />
            </div>

            <p className="mt-3 truncate text-xs font-semibold text-white/90">
              {person.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-white/45">
              {person.character || "Cast"}
            </p>
          </div>
        );
      });

  return (
    <section>
      <SectionHeading title={title} subtitle={subtitle} />
      <Slider label="cast">{items}</Slider>
    </section>
  );
};

export default CastSection;
