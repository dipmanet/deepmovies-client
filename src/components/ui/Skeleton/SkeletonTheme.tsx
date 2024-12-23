import { ReactNode } from "react";
import { SkeletonTheme as ReactSkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ children }: { children: ReactNode }) => {
	return (
		<ReactSkeletonTheme baseColor="#202020" highlightColor="#555">
			{children}
		</ReactSkeletonTheme>
	);
};

export default SkeletonLoader;
