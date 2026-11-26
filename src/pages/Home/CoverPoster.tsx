import { CoverMovieCard1 } from "#components/Cards/MovieCards";
import { Slider } from "#components/MediaShell";
import SklCoverPoster from "#components/Cards/Skeletons/SklCoverPoster";
import { buttonVariants } from "#components/ui/button";
import { useFetchMovie, useFetchNowPlayingMovies } from "#lib/api";
import { cn, getHoursTime, getImageUrl } from "#lib/utils";
import { Link } from "react-router-dom";
import SklCoverNowPlaying from "#components/Cards/Skeletons/SklCoverNowPlaying";

const CoverPoster = () => {
  const { data, isLoading } = useFetchNowPlayingMovies();
  const { results: Movies } = data || {};
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
  } = (Movies && Movies?.length > 0 && Movies[0]) || {};
  const { data: Movie, isLoading: isLoadingMovie } = useFetchMovie({ id });
  const genre =
    Movie && Movie?.genres?.length > 0 ? Movie?.genres[0]?.name : "";
  const country =
    Movie && Movie?.origin_country?.length > 0 ? Movie?.origin_country[0] : "";
  const runTime = (Movie && Movie?.runtime) ?? "";

  return (
    <>
      {isLoading ? (
        <SklCoverPoster />
      ) : (
        <div className="w-full h-screen min-h-[400px] sm:min-h-[786px] overflow-hidden relative">
          <div className="absolute top-0 right-0 h-full w-full md:w-[70%] flex md:justify-end">
            <div className="h-full w-full relative">
              <img
                src={backdrop_path ? getImageUrl(backdrop_path) : ""}
                alt="poster"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 h-full w-full bg-[rgb(0,0,0,0.5)] md:bg-gradient-to-r from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 h-1/4 w-full bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
          {/* Poster */}
          <div className="absolute top-[100px] left-0 w-full">
            <div className="container">
              <div className="w-full md:w-[80%]">
                <div className="flex flex-col gap-10">
                  <div className="flex gap-5">
                    <p className="text-primary">{genre}</p>
                    <div className="w-fit flex gap-2 items-center">
                      <p>
                        {release_date
                          ? new Date(release_date).getFullYear()
                          : ""}
                      </p>
                      <div className="h-[80%] min-w-[2px] bg-gray-500"></div>
                      <p>{country}</p>
                      <div className="h-[80%] min-w-[2px] bg-gray-500"></div>
                      <p>{getHoursTime({ minutes: Number(runTime) })}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="w-full text-accent-foreground text-[50px] lg:text-[85px] xl:text-[100px] font-heading leading-[80%]">
                      {original_title}
                    </p>
                    <p className=" sm:w-2/3">{overview ?? ""}</p>
                  </div>
                  <div className="flex gap-10">
                    <Link
                      to={`/movie/${id}`}
                      className={cn(
                        buttonVariants({ variant: "simple" }),
                        "text-accent-foreground",
                      )}
                    >
                      <p className="">Watch Now</p>
                    </Link>
                    <button
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "text-accent-foreground hover:text-accent-foreground",
                      )}
                    >
                      <p className="">Add to Watchlist</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Now Playing Movies List */}
      <div className="mt-[-80px] w-full relative">
        <div className="container">
          <div className="pb-4 w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[28px] w-1 rounded-full bg-primary" />
              <h4 className="text-[22px] sm:text-[26px] font-heading text-accent-foreground tracking-wide">
                Now Playing
              </h4>
            </div>
          </div>
          <Slider label="Now playing movies">
            {!isLoadingMovie
              ? Movies && Movies?.length > 0
                ? Movies.map((mov: any) => (
                    <CoverMovieCard1 key={mov.id} movie={mov} />
                  ))
                : null
              : Array(4)
                  .fill("")
                  .map((_, idx) => <SklCoverNowPlaying key={idx} />)}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CoverPoster;
