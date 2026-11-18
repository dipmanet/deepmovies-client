import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import {
  useFetchPopularPeople,
} from "#lib/api";
import { PersonListType } from "#lib/datatypes";
import { cn, getImageUrl } from "#lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SEOMeta, BreadcrumbStructuredData } from "#components/SEO";

const PeoplePage = () => {
  const { data: peopleData, isLoading } = useFetchPopularPeople();

  const { results: people } = peopleData || {};

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "People", url: "/people" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <SEOMeta
        title="Popular People"
        description="Discover popular actors, directors, and creators. Browse their filmographies and latest works."
        canonical="/people"
        structuredData={breadcrumbStructuredData}
      />
      <div className="container grow">
        <div className="py-12 w-full flex flex-col gap-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                Popular People
              </h1>
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading
              ? Array(10)
                  .fill("")
                  .map((_, idx) => <SklCoverMovieCard key={idx} />)
              : people && people.length > 0
              ? people.map((person: PersonListType) => (
                  <PersonCard key={person.id} person={person} />
                ))
              : (
                  <div className="col-span-full flex items-center justify-center py-20">
                    <p className="text-muted-foreground text-base">
                      No popular people found.
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

const PersonCard = ({ person }: { person: PersonListType }) => {
  const profileUrl = getImageUrl(person.profile_path, "w342");
  const knownFor = person.known_for_department;

  return (
    <Link
      to={`/people/${person.id}`}
      className="group relative block min-w-[50px] rounded-xl"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
        <img
          src={profileUrl}
          alt={person.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 -translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
          <div className="flex items-center justify-between gap-1.5">
            {knownFor && (
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white backdrop-blur-sm">
                {knownFor}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-yellow-400">
              <svg className="h-3 w-3 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{person.popularity?.toFixed(1) ?? "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-2.5 transition-transform duration-300 ease-in-out group-hover:translate-y-0 sm:p-3">
          {person.name && (
            <p className="text-[12px] font-semibold text-white line-clamp-1">
              {person.name}
            </p>
          )}
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-300">
            {knownFor && <span className="capitalize">{knownFor}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PeoplePage;