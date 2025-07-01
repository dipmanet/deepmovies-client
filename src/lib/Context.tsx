import React from "react";
interface DataContextProps {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const initData = {
	searchText: "",
	setSearchText: () => null,
};

export const DataContext = React.createContext<DataContextProps>(initData);
