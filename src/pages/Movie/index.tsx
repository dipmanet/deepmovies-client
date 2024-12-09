import { useFetchMovieDetails } from "#lib/api";
import { useParams } from "react-router-dom";

const Movie = () => {
	const { id } = useParams();

	const { data: Movie } = useFetchMovieDetails({ id: Number(id) });
	// console.log("test movie", Movie);

	return (
		<div className="h-screen">
			<div className="text-accent-foreground">{Movie?.title}</div>
			{Movie && (
				<iframe
					src={`https://vidsrc.net/embed/movie?imdb=${Movie?.imdb_id}`}
					className="w-full h-full border border-[red]"></iframe>
			)}
		</div>
	);
};

export default Movie;
