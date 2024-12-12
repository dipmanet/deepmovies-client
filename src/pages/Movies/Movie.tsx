import { useFetchMovieDetails } from "#lib/api";
import { useParams } from "react-router-dom";

const MoviePage = () => {
	const { id } = useParams();

	const { data: Movie } = useFetchMovieDetails({ id: Number(id) });
	// console.log("test movie", Movie);

	return (
		<div className="container grow">
			{/* main section */}
			<div className="w-full flex gap-8">
				<div className="w-full lg:w-[70%]">
					<div className="text-accent-foreground">{Movie?.title}</div>
					{Movie && (
						<iframe
							src={`https://vidsrc.net/embed/movie?imdb=${Movie?.imdb_id}`}
							className="w-full h-[400px] lg:h-[600px] "
							referrerPolicy="origin"
							allowFullScreen></iframe>
					)}
				</div>
			</div>
		</div>
	);
};

export default MoviePage;
