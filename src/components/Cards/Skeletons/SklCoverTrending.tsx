import { Skeleton, SkeletonTheme } from "#components/ui/Skeleton";
import SklCoverMovieCard from "./SklCoverMovieCard";

const SklCoverTrending = () => {
	return (
		<SkeletonTheme>
			<div className="container py-20 flex flex-col gap-5">
				<div className="w-full sm:w-[500px] flex gap-5 items-center justify-between]">
					<Skeleton className="h-8" />
					<div className="flex gap-1"></div>
				</div>
				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{Array(10)?.map((_, idx) => (
						<SklCoverMovieCard key={idx} className="" />
					))}
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SklCoverTrending;
