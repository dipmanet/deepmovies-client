import React, { useContext, useState } from "react";
import { DataContext } from "#lib/Context";
import { ImSearch } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";

const SearchInput = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { searchText, setSearchText } = useContext(DataContext);
	const [search, setSearch] = useState(searchText ?? "");

	const handleSearch = (txt: string) => {
		if (txt) {
			setSearchText(txt);
			console.log("test path", pathname);
			// if (pathname === "/")
			navigate(`/search/?query=${txt}`);
		}
	};

	return (
		<div className="relative w-full flex justify-between gap-2">
			<input
				type="text"
				className="pl-2 pr-10 py-2 border border-foreground rounded-md bg-transparent focus:bg-card text-accent-foreground placeholder:text-foreground"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
			/>
			<div
				role="button"
				className="absolute right-2 h-full p-1 flex items-center hover:text-white "
				onClick={() => handleSearch(search)}>
				<ImSearch className="h-5 w-5" />
			</div>
		</div>
	);
};

export default SearchInput;
