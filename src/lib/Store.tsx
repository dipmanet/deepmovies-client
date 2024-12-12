import React, { useState } from "react";
import { useFetchMovieGenres, useFetchTVGenres } from "#lib/api";
import { DataContext, initData } from "./Context";

const Store = ({ children }: { children: React.ReactNode }) => {
	const { data: movieGenres } = useFetchMovieGenres();
	const { data: tvGenres } = useFetchTVGenres();

	const [searchText, setSearchText] = useState(initData.searchText);

	// all initial states
	const valuesDataContext = {
		movieGenres,
		tvGenres,

		searchText,
		setSearchText,
	};

	return <DataContext.Provider value={valuesDataContext}>{children}</DataContext.Provider>;
};

export default Store;
