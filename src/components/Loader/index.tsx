import { cn } from "#lib/utils";

const Loader = ({ className = "" }) => {
	return (
		<div className={cn("w-screen h-screen flex items-center justify-center", className)}>
			Loading...
		</div>
	);
};

export default Loader;
