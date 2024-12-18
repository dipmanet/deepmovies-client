import DefaultVideoIcon from "#assets/dynIcons/DefaultVideoIcon";
import { useFetchSeasonDetails } from "#lib/api";
import { SeasonListType } from "#lib/datatypes";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Seasons = ({ seriesId, seasons }: { seriesId: number; seasons: SeasonListType[] }) => {
	const [currentSeasonId, setCurrentSeasonId] = useState(1);
	const { data: Season } = useFetchSeasonDetails({
		series_id: Number(seriesId),
		season: currentSeasonId,
	});
	console.log("test epi", Season);

	return (
		<div className="flex flex-col gap-2 ">
			{seasons && seasons?.length > 0
				? seasons?.map((season, idx) => (
						<div key={season.id} className="w-full backdrop-blur-md rounded-xl">
							<div className="flex gap-3 justify-between rounded-xl overflow-clip">
								<h5>{season?.name}</h5>

								<div className="flex gap-2">
									<p>{`${season?.episode_count} ${
										season?.episode_count === 1 ? "episode" : "episodes"
									}`}</p>
									<div role="button" className="size-8" onClick={() => setCurrentSeasonId(idx + 1)}>
										<IoMdArrowDropdown className="size-5" />
									</div>
								</div>
							</div>
							{idx + 1 === currentSeasonId && Season && Season?.episodes?.length > 0 ? (
								<div className="h-[50vh] flex flex-col gap-1 overflow-y-auto no-scrollbar">
									{Season?.episodes.map((ep, idx) => (
										<Link
											key={idx}
											to={`/series/${ep.show_id}/episode/${ep.id}`}
											className="flex gap-4 items-center">
											<DefaultVideoIcon styleClass="" className="text-white" />
											<div>
												<p>{ep.name}</p>
												<p>{ep.runtime}</p>
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
