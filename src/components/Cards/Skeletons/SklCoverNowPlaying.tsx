import { Skeleton, SkeletonTheme } from "#components/ui/Skeleton";

const SklCoverNowPlaying = () => {
	return (
		<SkeletonTheme>
			<Skeleton className="h-[180px]" />
		</SkeletonTheme>
	);
};

export default SklCoverNowPlaying;
