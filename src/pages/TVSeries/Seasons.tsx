import DefaultVideoIcon from "#assets/dynIcons/DefaultVideoIcon";
import { useFetchSeason } from "#lib/api";
import { SeasonListType } from "#lib/datatypes";
import { getHoursTime } from "#lib/utils";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Seasons = ({ seriesId, seasons }: { seriesId: number; seasons: SeasonListType[] }) => {
	const [currentSeasonId, setCurrentSeasonId] = useState(
		seasons?.length > 0 ? seasons[0]?.season_number : -1
	);
	const { data: Season } = useFetchSeason({
		series_id: Number(seriesId),
		season_id: currentSeasonId,
	});
	console.log("test season", Season);

	return (
		<div className="flex flex-col gap-2 ">
			{seasons && seasons?.length > 0
				? seasons?.map((season) => (
						<div key={season.id} className="w-full backdrop-blur-md rounded-xl">
							<div className="flex gap-3 justify-between rounded-xl overflow-clip">
								<h5>{season?.name}</h5>

								<div className="flex gap-2">
									<p>{`${season?.episode_count} ${
										season?.episode_count === 1 ? "episode" : "episodes"
									}`}</p>
									<div
										role="button"
										className="size-8"
										onClick={() =>
											season.season_number === currentSeasonId
												? setCurrentSeasonId(-1)
												: setCurrentSeasonId(season.season_number)
										}>
										<IoMdArrowDropdown className="size-5" />
									</div>
								</div>
							</div>
							{season.season_number === currentSeasonId &&
							Season &&
							Season?.episodes?.length > 0 ? (
								<div className="max-h-[50vh] flex flex-col gap-1 overflow-y-auto no-scrollbar transition-all duration-500 ">
									{Season?.episodes.map((ep, idx) => (
										<Link
											key={idx}
											to={`/series/${ep.show_id}/season/${ep.season_number}/episode/${ep.episode_number}`}
											className="flex gap-4 items-center">
											<DefaultVideoIcon styleClass="" className="text-white" />
											<div>
												<p>{ep.name}</p>
												<p>{getHoursTime({ minutes: Number(ep.runtime) })}</p>
											</div>
										</Link>
									))}
								</div>
							) : null}
						</div>
				  ))
				: null}
		</div>
	);
};

export default Seasons;
