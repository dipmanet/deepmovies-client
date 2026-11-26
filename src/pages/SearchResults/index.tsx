import SearchCard from "#components/Cards/MovieCards/SearchCard";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import { BreadcrumbStructuredData, SEOMeta } from "#components/SEO";
import { MediaPagination } from "#components/MediaShell";
import { useSearchMulti } from "#lib/api";
import { SearchResultType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { useMemo, useState } from "react";
import {
  HiOutlineFilm,
  HiOutlinePhotograph,
  HiOutlineSearch,
  HiOutlineSparkles,
  HiOutlineUsers,
} from "react-icons/hi";
import { ImSearch } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";

type Filter = "all" | "movie" | "tv" | "person";

const FILTERS: { id: Filter; title: string; icon: typeof HiOutlineSparkles }[] =
  [
    { id: "all", title: "All", icon: HiOutlineSparkles },
    { id: "movie", title: "Movies", icon: HiOutlineFilm },
    { id: "tv", title: "TV Series", icon: HiOutlinePhotograph },
    { id: "person", title: "People", icon: HiOutlineUsers },
  ];

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchText = searchParams?.get("query") ?? "";
  const page = Math.min(
    500,
    Math.max(1, Number(searchParams?.get("page")) || 1),
  );
  const [input, setInput] = useState(searchText);
  const [filter, setFilter] = useState<Filter>("all");

  const { data: searchData, isLoading } = useSearchMulti({
    query: searchText,
    page,
  });

  const { results, total_results, total_pages } = searchData || {};

  const goToPage = (next: number) => {
    const params: Record<string, string> = { query: searchText };
    if (next > 1) params.page = String(next);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    if (!results) return [] as SearchResultType[];
    if (filter === "all") return results as SearchResultType[];
    return (results as SearchResultType[]).filter(
      (r) => r.media_type === filter,
    );
  }, [results, filter]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: 0,
      movie: 0,
      tv: 0,
      person: 0,
    };
    if (results) {
      for (const r of results as SearchResultType[]) {
        base.all += 1;
        if (r.media_type === "movie") base.movie += 1;
        else if (r.media_type === "tv") base.tv += 1;
        else if (r.media_type === "person") base.person += 1;
      }
    }
    return base;
  }, [results]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setFilter("all");
    navigate(`/search/?query=${encodeURIComponent(q)}`);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Search", url: "/search" },
  ];

  const breadcrumbStructuredData = BreadcrumbStructuredData(breadcrumbs);

  const emptyNoQuery = !searchText.trim();

  return (
    <>
      <SEOMeta
        title={
          searchText
            ? `Search results for "${searchText}"`
            : "Search Movies & TV Series"
        }
        description={
          searchText
            ? `Search results for "${searchText}". Found ${total_results ?? 0} results.`
            : "Search movies, TV series and people on DeepMovies."
        }
        canonical={
          searchText
            ? `/search/?query=${encodeURIComponent(searchText)}`
            : "/search/"
        }
        noIndex={!searchText}
        structuredData={breadcrumbStructuredData}
      />

      <div className="container grow">
        <div className="py-12 flex flex-col gap-8">
          {/* ============================ HEADER ============================ */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h1 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                {searchText ? (
                  <>
                    Search results for{" "}
                    <span className="text-primary">{searchText}</span>
                  </>
                ) : (
                  "Search"
                )}
              </h1>
            </div>

            {/* Search bar */}
            <form onSubmit={onSubmit} className="w-full max-w-2xl">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <ImSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search movies, TV series, people..."
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-accent-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-white/[0.06] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-110 active:scale-95"
                >
                  <HiOutlineSearch className="text-base" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* ============================ FILTERS ============================ */}
          {searchText && results && results.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] w-fit">
              {FILTERS.map((f) => {
                const Icon = f.icon;
                const disabled = f.id !== "all" && counts[f.id] === 0;
                return (
                  <button
                    key={f.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ease-in-out",
                      filter === f.id
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                      disabled
                        ? "opacity-40 cursor-not-allowed hover:bg-transparent"
                        : "",
                    )}
                  >
                    <Icon className="text-[13px]" />
                    <span>{f.title}</span>
                    {counts[f.id] > 0 && (
                      <span
                        className={cn(
                          "ml-0.5 rounded-full px-1.5 text-[10px] font-bold",
                          filter === f.id
                            ? "bg-white/25 text-white"
                            : "bg-white/[0.08] text-muted-foreground",
                        )}
                      >
                        {counts[f.id]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ============================ RESULTS ============================ */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading && searchText ? (
              Array.from({ length: 10 }).map((_, i) => (
                <SklCoverMovieCard key={i} />
              ))
            ) : emptyNoQuery ? (
              <div className="col-span-full flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-white/[0.04] text-muted-foreground">
                  <HiOutlineSearch className="text-2xl" />
                </div>
                <div>
                  <p className="text-base font-medium text-accent-foreground">
                    Start typing to search
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Search for movies, TV series and people.
                  </p>
                </div>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((result) => (
                <SearchCard key={result.id} data={result} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-white/[0.04] text-muted-foreground">
                  <HiOutlineSearch className="text-2xl" />
                </div>
                <div>
                  <p className="text-base font-medium text-accent-foreground">
                    No results for{" "}
                    <span className="text-primary">"{searchText}"</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filter !== "all"
                      ? "Try switching filters or searching for something else."
                      : "Try a different spelling or a more general term."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {searchText && total_pages && total_pages > 1 && (
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

export default SearchResultsPage;
