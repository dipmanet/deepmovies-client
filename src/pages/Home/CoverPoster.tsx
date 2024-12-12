import { CoverMovieCard1 } from "#components/Cards/MovieCards";
import { DotPagination } from "#components/Pagination/index";
import { buttonVariants } from "#components/ui/button";
import { useFetchMovieDetails, useFetchNowPlayingMovies } from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { cn, getHoursTime, getImageUrl } from "#lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

const CoverPoster = () => {
	const { data } = useFetchNowPlayingMovies();
	const { dates, page, results: Movies, total_pages, total_Movies } = data || {};
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
	} = (Movies?.length > 0 && Movies[0]) || {};
	const itemsPerPage = 4;
	const pageCount = Math.ceil(Movies?.length / itemsPerPage) || 0;

	const { data: Movie } = useFetchMovieDetails({ id });
	const genre = Movie?.genres?.length > 0 ? Movie?.genres[0]?.name : "";
	const country = Movie?.origin_country?.length > 0 ? Movie?.origin_country[0] : "";
	const runTime = Movie?.runtime ?? "";

	const [currentPage, setCurrentPage] = useState(0);

	return (
		<>
			<div className="w-full h-screen min-h-[400px] sm:min-h-[786px] overflow-hidden relative ">
				<div className="absolute top-0 right-0 h-full w-full md:w-[70%] flex md:justify-end">
					<div className="h-full w-full relative">
						<img
							src={getImageUrl(backdrop_path)}
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
										<p>{release_date ? new Date(release_date).getFullYear() : ""}</p>
										<div className="h-[80%] min-w-[2px] bg-gray-500"></div>
										<p>{country}</p>
										<div className="h-[80%] min-w-[2px] bg-gray-500"></div>
										<p>{getHoursTime({ minutes: runTime ?? 0 })}</p>
									</div>
								</div>
								<div className="">
									<p className="w-full text-accent-foreground text-[70px] lg:text-[100px] font-heading leading-[80%] ">
										{original_title}
									</p>
									<p className=" w-2/3">{overview ?? ""}</p>
								</div>
								<div className="flex gap-10">
									<Link
										to={`/movie/${id}`}
										className={cn(buttonVariants({ variant: "simple" }), "text-accent-foreground")}>
										<p className="">Watch Now</p>
									</Link>
									<button
										className={cn(
											buttonVariants({ variant: "ghost" }),
											"text-accent-foreground hover:text-accent-foreground"
										)}>
										<p className="">Add to Watchlist</p>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Now Playing Movies List */}
			<div className="sm:mt-[-200px] w-full relative">
				<div className="container">
					<div className="pb-4 w-full flex justify-between">
						<h4 className="w-fit text-[25px] text-accent-foreground font-title whitespace-nowrap">
							Now Playing
						</h4>
						<DotPagination pageCount={pageCount} onPageChange={(page) => setCurrentPage(page)} />
					</div>
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{Movies && Movies?.length > 0
							? Movies.slice(
									currentPage * itemsPerPage,
									currentPage * itemsPerPage + itemsPerPage
							  ).map((mov: any) => <CoverMovieCard1 key={mov.id} movie={mov} className={""} />)
							: null}
					</div>
				</div>
			</div>
		</>
	);
};

export default CoverPoster;
