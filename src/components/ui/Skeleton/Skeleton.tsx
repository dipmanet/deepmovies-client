import { ReactNode } from "react";
import ReactSkeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = (props: SkeletonProps) => (
	<ReactSkeleton containerClassName="w-full h-fit" {...props} />
);

export default Skeleton;
