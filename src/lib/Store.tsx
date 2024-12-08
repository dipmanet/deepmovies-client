import React from "react";
import { useFetchMovieGenres, useFetchTVGenres } from "#lib/api";
import { DataContext } from "./Context";

const Store = ({ children }: { children: React.ReactNode }) => {
	const { data: movieGenres } = useFetchMovieGenres();
	const { data: tvGenres } = useFetchTVGenres();

	// all initial states
	const valuesDataContext = {
		movieGenres,
		tvGenres,
	};

	return <DataContext.Provider value={valuesDataContext}>{children}</DataContext.Provider>;
};

export default Store;
