import Navbar from "#components/Navbar";
import React from "react";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="relative w-full h-full min-h-screen flex flex-col">
				<div className="w-full h-full flex flex-col flex-grow relative">{children}</div>
			</div>
		</>
	);
};

export default BaseLayout;
