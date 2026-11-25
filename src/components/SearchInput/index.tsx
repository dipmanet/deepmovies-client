import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "#lib/Context";
import { useDebounce } from "#hooks/useDebounce";
import { ImSearch } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchInput = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { searchText, setSearchText } = useContext(DataContext);
	const [search, setSearch] = useState(searchText ?? "");

	const debouncedSearch = useDebounce(search, 400);
	const currentQuery = searchParams.get("query") ?? "";
	const isFirstRender = useRef(true);

	// Navigate automatically after the user stops typing (debounced)
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const q = debouncedSearch.trim();
		if (q && q !== currentQuery) {
			setSearchText(q);
			navigate(`/search/?query=${encodeURIComponent(q)}`);
		}
	}, [debouncedSearch, currentQuery, navigate, setSearchText]);

	const handleSearch = (txt: string) => {
		const q = txt.trim();
		if (!q) return;
		setSearchText(q);
		navigate(`/search/?query=${encodeURIComponent(q)}`);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch(search);
			}}
			className="relative w-full"
		>
			<input
				type="text"
				className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 pl-10 pr-10 text-sm text-accent-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-white/[0.06] focus:outline-none"
				placeholder="Search movies, TV series, people..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				aria-label="Search"
				className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
			>
				<ImSearch className="size-4" />
			</button>
		</form>
	);
};

export default SearchInput;