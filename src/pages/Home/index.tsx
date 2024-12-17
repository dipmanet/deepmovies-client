import { useContext, useEffect } from "react";
import CoverPoster from "./CoverPoster";
import CoverTopRated from "./CoverTopRated";
import CoverTrending from "./CoverTrending";
import { DataContext } from "#lib/Context";

const Homepage = () => {
	const { setSearchText } = useContext(DataContext);
	useEffect(() => {
		setSearchText("");
	}, []);

	return (
		<div className="grow">
			<CoverPoster />
			<CoverTrending />
			<CoverTopRated />
		</div>
	);
};

export default Homepage;
