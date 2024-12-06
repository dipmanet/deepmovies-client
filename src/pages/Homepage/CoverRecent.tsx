import { buttonVariants } from "#components/ui/button";
import useGetGenre from "#hooks/useGetGenre";
import { useFetchMovieDetails } from "#lib/api";
import { getHoursTime, getImageUrl } from "#lib/utils";

const CoverPoster = ({ poster }: any) => {
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
	} = poster || {};
	const { data: Movie } = useFetchMovieDetails({ id });
	const genre = Movie?.genres?.length > 0 ? Movie?.genres[0]?.name : "";
	const country = Movie?.origin_country?.length > 0 ? Movie?.origin_country[0] : "";
	const runTime = Movie?.runtime ?? "";

	return (
		<div className="w-full h-screen overflow-hidden relative ">
			<div className="absolute top-0 right-0 md:translate-x-[15%] h-full w-full md:w-[60%] flex md:justify-end">
				<img src={getImageUrl(backdrop_path)} alt="poster" className="w-full h-full object-cover" />
			</div>
			<div className="absolute top-0 left-0 h-full w-full bg-[rgb(0,0,0,0.5)] md:bg-gradient-to-r from-black via-black to-transparent"></div>
			<div className="absolute top-[100px] left-0 w-full">
				<div className="container">
					<div className="w-full md:w-1/2">
						<div className="flex flex-col gap-10">
							<div className="flex gap-5 text-gray-100">
								<p className="text-[#ff055f]">{genre}</p>
								<div className="flex gap-2">
									<p>{release_date ? new Date(release_date).getFullYear() : ""}</p>
									<p>{country}</p>
									<p>{getHoursTime({ minutes: runTime ?? 0 })}</p>
								</div>
							</div>
							<div className="">
								<p className="w-full text-white text-[70px] lg:text-[120px] font-ruslan leading-[80px] ">
									{original_title}
								</p>
								<p className=" text-white">{overview ?? ""}</p>
							</div>
							<div className="flex gap-10">
								<button className={buttonVariants({ variant: "purple" })}>
									<p className="text-white">Watch Now</p>
								</button>
								<button className={buttonVariants({ variant: "ghost" })}>
									<p className="text-white">Add to Watchlist</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoverPoster;
