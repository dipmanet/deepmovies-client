import ImgCover from "#assets/images/Movie_Website_Cover.jpg";
import { Skeleton, SkeletonTheme } from "#components/ui/Skeleton";

const SklCoverPoster = () => {
	return (
		<SkeletonTheme>
			<div className="w-full h-screen min-h-[400px] sm:min-h-[786px] overflow-hidden relative ">
				<div className="absolute top-0 right-0 h-full w-full md:w-[70%] flex md:justify-end">
					<div className="h-full w-full relative">
						<img src={ImgCover} alt="poster" className="w-full h-full object-cover" />
						<div className="absolute top-0 right-0 h-full w-full bg-[rgb(0,0,0,0.5)] md:bg-gradient-to-r from-black via-transparent to-transparent"></div>
						<div className="absolute bottom-0 left-0 h-1/4 w-full bg-gradient-to-t from-black to-transparent"></div>
					</div>
				</div>
				{/* Poster */}
				<div className="absolute top-[100px] left-0 w-full">
					<div className="container">
						<div className="w-full md:w-[80%]">
							<div className="flex flex-col gap-10">
								<Skeleton
									count={2}
									containerClassName="w-full flex gap-5"
									className="h-6 w-60 first-of-type:w-20 "
								/>
								<div className="flex flex-col gap-2">
									<Skeleton className="!w-1/2 h-20" />
									<Skeleton count={4} containerClassName="!w-2/3" />
								</div>
								<Skeleton
									count={2}
									containerClassName="flex gap-10"
									className="!w-32 h-10"></Skeleton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SklCoverPoster;
