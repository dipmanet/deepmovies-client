import PersonCard from "#components/Cards/PersonCard";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import { BreadcrumbStructuredData, SEOMeta } from "#components/SEO";
import { MediaPagination } from "#components/MediaShell";
import { useFetchPopularPeople } from "#lib/api";
import { PersonListType } from "#lib/datatypes";
import { useMemo } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

const DEPARTMENTS = [
  { id: "all", title: "All" },
  { id: "acting", title: "Acting" },
  { id: "directing", title: "Directing" },
  { id: "writing", title: "Writing" },
  { id: "production", title: "Production" },
] as const;

type Dept = (typeof DEPARTMENTS)[number]["id"];

const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("department");
  const department: Dept =
    raw && DEPARTMENTS.some((d) => d.id === raw) ? (raw as Dept) : "all";
  const page = Math.min(500, Math.max(1, Number(searchParams.get("page")) || 1));

  const { data, isLoading } = useFetchPopularPeople({
    page,
    known_for_department: "Directing",
  });

  const { results, total_pages } = data || {};

  const people = useMemo(() => {
    if (!results) return [] as PersonListType[];
    if (department === "all") return results;
    const map: Record<string, string> = {
      acting: "acting",
      directing: "directing",
      writing: "writing",
      production: "production",
    };
    const target = map[department] ?? "";
    return results.filter(
      (p) =>
        (p as any).known_for_department?.toLowerCase() === target ||
        target === "all",
    );
  }, [results, department]);

  const goToPage = (next: number) => {
    const params: Record<string, string> = {};
    if (department !== "all") params.department = department;
    if (next > 1) params.page = String(next);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "People", url: "/people" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <SEOMeta
        title="Popular People"
        description="Discover popular actors, directors, and crew members on DeepMovies."
        canonical="/people"
        structuredData={breadcrumbStructuredData}
      />
      <div className="container grow">
        <div className="py-12 w-full flex flex-col gap-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                People
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d.id}
                  className={
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ease-in-out " +
                    (department === d.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]")
                  }
                  onClick={() => setSearchParams({ department: d.id })}
                >
                  {d.id === "all" && <HiOutlineUsers className="text-[13px]" />}
                  <span>{d.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <SklCoverMovieCard key={i} />
              ))
            ) : people.length > 0 ? (
              people.map((person: PersonListType) => (
                <PersonCard key={person.id} person={person} showDetails />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <p className="text-muted-foreground text-base">
                  No people found in this category.
                </p>
              </div>
            )}
          </div>

          {total_pages && total_pages > 1 && (
            <MediaPagination
              page={page}
              pageCount={total_pages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
