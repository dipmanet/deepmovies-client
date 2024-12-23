import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SklCoverMovieCard from "#components/Cards/Skeletons/SklCoverMovieCard";
import CoverTVSeriesCard from "#components/Cards/TVSeriesCards/CoverTVSeriesCard";
import {
	useFetchTopRatedMovies,
	useFetchTrendingMovies,
	useFetchTrendingTVSeries,
	useFetchTVSeries,
} from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { useState } from "react";
const Tabs = [
	{
		id: 1,
		name: "movies",
		title: "Movies",
	},
	{
		id: 2,
		name: "tv_series",
		title: "TV Series",
	},
];

const CoverTrending = () => {
	const { data: dataMovies, isLoading: isLoadingM } = useFetchTrendingMovies();
	const { data: dataTVSeries, isLoading: isLoadingS } = useFetchTrendingTVSeries();
	const { results: Movies } = dataMovies || {};
	const { results: TVSeries } = dataTVSeries || {};

	const [currentTab, setCurrentTab] = useState(1);

	const items = currentTab === 1 ? Movies : TVSeries;

	return (
		<div className="container py-20 flex flex-col gap-5">
			<div className="w-full sm:w-[500px] flex gap-5 items-center justify-between]">
				<h4 className="text-[25px] text-accent-foreground font-title">Trending</h4>
				<div className="flex gap-1">
					{Tabs.map((tab) => (
						<div
							key={tab.id}
							role="button"
							className={`w-fit h-full font-title ${
								tab.id === currentTab ? "text-accent-foreground" : "text-primary-foreground"
							}`}
							onClick={() => setCurrentTab(tab.id)}>
							<p>{tab.title}</p>
						</div>
					))}
				</div>
			</div>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
				{!isLoadingM && !isLoadingS
					? items?.map((item: MovieListType) =>
							currentTab === 1 ? (
								<CoverMovieCard2 key={item?.id} movie={item} />
							) : (
								<CoverTVSeriesCard key={item?.id} series={item} />
							)
					  )
					: Array(10)
							.fill("")
							.map((_, idx) => <SklCoverMovieCard key={idx} />)}
			</div>
		</div>
	);
};

export default CoverTrending;
