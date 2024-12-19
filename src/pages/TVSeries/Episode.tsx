import { Link, useLocation, useParams } from "react-router-dom";
import { useFetchEpisode, useFetchTVSeries } from "#lib/api";
import { getImageUrl } from "#lib/utils";

const EpisodePage = () => {
	const { series_id, season_id, episode_id } = useParams();
	const { pathname } = useLocation();
	const pageType = pathname.split("/")[1];

	const { data: Series } = useFetchTVSeries({ id: Number(series_id) });
	const { data: Episode } = useFetchEpisode({
		series_id: Number(series_id),
		season_id: Number(season_id),
		episode_id: Number(episode_id),
	});

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
					<Link to={`/${pageType}/${series_id}`} className="text-accent-foreground capitalize">
						{Series?.name}
					</Link>
					<span className="text-accent-foreground">/</span>
					<p className=" capitalize">{Episode?.name}</p>
				</div>
				{/* main section */}
				<div className="w-full flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-[70%]">
						{Series && Episode ? (
							<iframe
								src={`https://vidsrc.net/embed/tv?tmdb=${series_id}&season=${Episode.season_number}&episode=${Episode.episode_number}`}
								className="w-full h-[400px] lg:h-[600px] rounded-2xl"
								referrerPolicy="origin"
								allowFullScreen></iframe>
						) : (
							<img
								src={getImageUrl(Episode?.still_path ?? "")}
								className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl border border-[white]"
								alt=""
							/>
						)}
					</div>
					<div className="w-full lg:w-[28%]">{/* <CoverMovieCard2 movie={Episode} /> */}</div>
				</div>
			</div>
		</div>
	);
};

export default EpisodePage;
