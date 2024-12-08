import CoverPoster from "./CoverPoster";
import CoverTopRated from "./CoverTopRated";
import CoverTrending from "./CoverTrending";

const Homepage = () => {
	return (
		<div className="grow">
			<CoverPoster />
			<CoverTrending />
			<CoverTopRated />
		</div>
	);
};

export default Homepage;
