import React from "react";
import { GenreType } from "./datatypes";
interface DataContextProps {
	movieGenres: GenreType[];
	tvGenres: GenreType[];

	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const initData = {
	movieGenres: [],
	tvGenres: [],

	searchText: "",
	setSearchText: () => null,
};

export const DataContext = React.createContext<DataContextProps>(initData);
