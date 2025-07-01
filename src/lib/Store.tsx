import React, { useState } from "react";
import { DataContext, initData } from "./Context";

const Store = ({ children }: { children: React.ReactNode }) => {
	const [searchText, setSearchText] = useState(initData.searchText);

	// all initial states
	const valuesDataContext = {
		searchText,
		setSearchText,
	};

	return <DataContext.Provider value={valuesDataContext}>{children}</DataContext.Provider>;
};

export default Store;
