import { Skeleton, SkeletonTheme } from "#components/ui/Skeleton";

const SklCoverMovieCard = ({ className }: { className?: string }) => {
	return (
		<SkeletonTheme>
			<Skeleton
				containerClassName={`w-full min-w-[50px] backdrop-blur-md rounded-xl overflow-clip ${className}`}
				className="h-[322.5px] md:h-[343px]f !leading-0"
			/>
		</SkeletonTheme>
	);
};

export default SklCoverMovieCard;
