import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import { useFetchTVSeries } from "#lib/api";
import { getImageUrl } from "#lib/utils";
import { Link, useLocation, useParams } from "react-router-dom";
import Seasons from "./Seasons";

const TVSeriesPage = () => {
	const { id } = useParams();
	const { pathname } = useLocation();
	const pageType = pathname.split("/")[1];

	const { data: TVSeries } = useFetchTVSeries({ id: Number(id) });

	const {
		adult,
		backdrop_path,
		created_by,
		episode_run_time,
		first_air_date,
		genres,
		homepage,
		in_production,
		languages,
		last_air_date,
		last_episode_to_air,
		name,
		networks,
		next_episode_to_air,
		number_of_episodes,
		number_of_seasons,
		origin_country,
		original_language,
		original_name,
		overview,
		popularity,
		poster_path,
		production_companies,
		production_countries,
		seasons,
		spoken_languages,
		status,
		tagline,
		type,
		vote_average,
		vote_count,
	} = TVSeries || {};

	console.log("test series", TVSeries);

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
					<p className=" capitalize">{name}</p>
				</div>
				<div className="w-full flex flex-col lg:flex-row gap-8">
					{/* main section */}
					<div className="w-full lg:w-[70%] flex flex-col gap-20">
						<img
							src={getImageUrl(backdrop_path || "")}
							className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl"
							alt=""
						/>

						{/* Seasons */}
						<Seasons seriesId={Number(id)} seasons={seasons || []} />
					</div>
					<div className="w-full lg:w-[28%] flex flex-col gap-10">
						<CoverTVSeriesCard series={TVSeries} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TVSeriesPage;
