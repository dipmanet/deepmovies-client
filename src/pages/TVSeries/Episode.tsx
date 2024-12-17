import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import { useFetchEpisodeDetails, useFetchMovieDetails } from "#lib/api";
import { getImageUrl } from "#lib/utils";
import { Link, useLocation, useParams } from "react-router-dom";

const EpisodePage = () => {
	const { series_id, episode_id } = useParams();
	const { pathname } = useLocation();
	const pageType = pathname.split("/")[1];

	const { data: Movie } = useFetchEpisodeDetails({ series_id: series_id, episode: episode_id });
	// console.log("test movie", Movie);

	return (
		<div className="container grow">
			<div className="flex flex-col gap-10">
				<div className=" py-3 flex gap-1">
					<Link to="/" className="text-accent-foreground capitalize">
						Home
					</Link>
					<span className="text-accent-foreground">/</span>
					<Link to={`/${pageType}`} className="text-accent-foreground capitalize">
						{pageType}
					</Link>
					<span className="text-accent-foreground">/</span>
					<p className=" capitalize">{Movie?.title}</p>
				</div>
				{/* main section */}
				<div className="w-full flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-[70%]">
						{Movie && (
							<iframe
								src={`https://vidsrc.net/embed/movie?imdb=${Movie?.imdb_id}`}
								className="w-full h-[400px] lg:h-[600px] rounded-2xl"
								referrerPolicy="origin"
								allowFullScreen></iframe>
						)}
						{/* <img
							src={getImageUrl(Movie?.backdrop_path)}
							className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl border border-[white]"
							alt=""
						/> */}
					</div>
					<div className="w-full lg:w-[28%]">
						<CoverMovieCard2 movie={Movie} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EpisodePage;
