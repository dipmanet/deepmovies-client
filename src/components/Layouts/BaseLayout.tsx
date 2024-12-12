// import Navbar from "#components/Navbar";

import Navbar from "#components/Navbar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useLocation();

	const [showNavbar, setShowNavbar] = useState(true);

	// useEffect(() => {
	// 	if (pathname === "/") {
	// 		setShowNavbar(false);
	// 	}
	// }, []);
	// useEffect(() => {
	// 	console.log("test path", window.scrollY);
	// 	// if (window.scrollY >= 500) {
	// 	// 	setShowNavbar(true);
	// 	// }
	// 	return () =>
	// 		document.addEventListener("scroll", (e) => {
	// 			console.log("test scroll", e);
	// 			setShowNavbar(true);
	// 		});
	// }, []);

	return (
		<>
			{showNavbar && <Navbar className="" />}
			<div className="relative w-full h-full min-h-screen flex flex-col">
				<div className="w-full h-full flex flex-col flex-grow relative">{children}</div>
			</div>
		</>
	);
};

export default BaseLayout;
