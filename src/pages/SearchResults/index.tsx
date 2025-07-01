import { CoverMovieCard2 } from "#components/Cards/MovieCards";
import SearchCard from "#components/Cards/MovieCards/SearchCard";
import { useSearchMulti } from "#lib/api";
import { MovieListType } from "#lib/datatypes";
import { useSearchParams } from "react-router-dom";

const SearchResultsPage = () => {
	const [searchParams] = useSearchParams();
	const searchText = searchParams?.get("query") ?? "";
	const { data: searchData } = useSearchMulti({ query: searchText });

	const { page, results, total_pages, total_results } = searchData || {};

	return (
		<div className="container grow">
			<div className="py-20 w-full flex flex-col gap-10">
				<div className="text-accent-foreground">
					<h4 className=" text-3xl font-bold ">
						Search Results for <span className="text-primary">{searchText}</span>
					</h4>
				</div>
				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{results?.length > 0
						? results.map((result: any) => <SearchCard data={result} className="w-[200px]" />)
						: null}
				</div>
			</div>
		</div>
	);
};

export default SearchResultsPage;
