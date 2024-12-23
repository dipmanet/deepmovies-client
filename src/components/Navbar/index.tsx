import React, { useContext, useEffect, useState } from "react";
import { navData } from "src/lib/navData";
import { RiVideoOnAiFill } from "react-icons/ri";
import { FaHeartBroken } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { buttonVariants } from "#components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "#lib/Context";
import { useDebounce } from "#hooks/useDebounce";
import { useFetchMovieGenres } from "#lib/api";
import { GenreType } from "#lib/datatypes";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import SearchInput from "#components/SearchInput";

const Navbar = ({ className = "" }: { className?: string }) => {
	const { pathname } = useLocation();
	const { data: genres } = useFetchMovieGenres();

	const [currentNav, setCurrentNav] = useState(0);
	const [showNavbar, setShowNavbar] = useState(false);
	const [showHeader, setShowHeader] = useState(true);

	const finalNavData = navData.map((nav) =>
		nav.id === 3
			? {
					...nav,
					children:
						genres?.length > 0
							? genres.map((genre: GenreType) => ({
									id: genre.id,
									name: genre.name.toLowerCase(),
									title: genre.name,
									link: `/genre/${genre.name.toLowerCase()?.replace(" ", "_")}`,
									isExternal: false,
							  }))
							: [],
			  }
			: nav
	);
	const pagePath = pathname.split("/")[1];

	useEffect(() => {
		if (pathname === "/") setShowHeader(false);
		const handleScroll = () => {
			const root = document.body;
			if (pathname === "/") {
				if ((root && root?.scrollTop) > 100) {
					setShowHeader(true);
				} else setShowHeader(false);
			}
		};
		return () => document.body.addEventListener("scroll", handleScroll);
	}, []);

	const NavList = () => (
		<div className="transition duration-300">
			{/* for large screens */}
			<ul className="hidden lg:flex gap-5 items-center">
				{finalNavData.map((nav, id) =>
					nav?.children ? (
						<li key={id} className="relative" onMouseLeave={() => setCurrentNav(0)}>
							<div
								role="button"
								className="text-accent-foreground hover:text-primary"
								onClick={() => setCurrentNav(nav.id)}>
								<span className={`${pagePath === nav.link.split("/")[1] ? "underline" : ""}`}>
									{nav.title}
								</span>
							</div>
							{currentNav === nav.id ? (
								<div className="absolute top-[100%] left-0 h-[30vh] z-[100] overflow-hidden overflow-y-auto no-scrollbar bg-secondary transition-transform ease-out duration-1000">
									<ul className="py-1 flex flex-col">
										{nav.children?.length > 0
											? nav.children?.map((childNav: any) => (
													<li key={childNav.id}>
														<a
															role="button"
															href={childNav.link}
															className="pt-1 mx-3 border-b hover:border-primary text-accent-foreground hover:text-primary">
															<span className="font-title whitespace-nowrap">
																{childNav?.title}
															</span>
														</a>
													</li>
											  ))
											: null}
									</ul>
								</div>
							) : null}
						</li>
					) : (
						<li key={id}>
							<Link to={nav.link} className="text-accent-foreground hover:text-primary">
								<span
									className={`leading-[100%] ${
										pagePath === nav.link.split("/")[1] ? "underline" : ""
									}`}>
									{nav.title}
								</span>
							</Link>
						</li>
					)
				)}
			</ul>
			{/* for small screens */}
			<div className="flex lg:hidden  transition">
				{!showNavbar ? (
					<div
						role="button"
						className=" text-accent-foreground hover:text-primary"
						onClick={() => setShowNavbar(!showNavbar)}>
						<FaBars className="w-6 h-6" />
					</div>
				) : (
					<div
						className={`fixed top-0 left-0 h-screen w-screen z-[100] bg-background backdrop-blur-xl transition ease-out duration-500 ${
							!showNavbar
								? "translate-x-[100vw] -translate-y-[100vw] opacity-0"
								: "translate-x-0 translate-y-0 opacity-100"
						}`}>
						<div className="px-5 pt-2 pb-5 w-full flex justify-end">
							<div
								role="button"
								className="w-fit text-accent-foreground hover:text-primary"
								onClick={() => setShowNavbar(false)}>
								<ImCross className="h-5 w-5" />
							</div>
						</div>
						<ul className="flex flex-col gap-5 items-center">
							{finalNavData.map((nav, id) =>
								nav?.children ? (
									<li key={id} className="relative" onMouseLeave={() => setCurrentNav(0)}>
										<div
											role="button"
											className="text-accent-foreground hover:text-primary"
											onClick={() => setCurrentNav(nav.id)}>
											<span className={`${pagePath === nav.link.split("/")[1] ? "underline" : ""}`}>
												{nav.title}
											</span>
										</div>
										{currentNav === nav.id ? (
											<div className="h-[150px] z-[100] overflow-hidden overflow-y-auto no-scrollbar bg-secondary transition-transform ease-out duration-1000">
												<ul className="py-1 flex flex-col">
													{nav.children?.length > 0
														? nav.children?.map((childNav: any) => (
																<li key={childNav.id}>
																	<a
																		role="button"
																		href={childNav.link}
																		className="pt-1 mx-3 border-b hover:border-primary text-accent-foreground hover:text-primary">
																		<span className="font-title whitespace-nowrap">
																			{childNav?.title}
																		</span>
																	</a>
																</li>
														  ))
														: null}
												</ul>
											</div>
										) : null}
									</li>
								) : (
									<li key={id}>
										<Link to={nav.link} className="text-accent-foreground hover:text-primary">
											<span
												className={`leading-[100%] ${
													pagePath === nav.link.split("/")[1] ? "underline" : ""
												}`}>
												{nav.title}
											</span>
										</Link>
									</li>
								)
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);

	return (
		<div
			className={` w-full bg-card shadow-background shadow-lg transition duration-1000 ${
				showHeader
					? "sticky top-0 z-[50] translate-y-0 opacity-100"
					: "h-0 overflow-hidden -translate-y-[100%] opacity-0"
			} ${className}`}>
			<div className="container py-4 ">
				<div className="w-full flex gap-10 justify-between items-center">
					{/* website logo */}
					<Link to="/" className="flex gap-2 items-center relative">
						<RiVideoOnAiFill className="h-8 w-8 text-primary" />
						<p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-primary">
							DeepMovies
						</p>
					</Link>
					{/* search text */}
					<div className="hidden md:flex">
						<SearchInput />
					</div>
					{/* navbar */}
					<NavList />

					{/* watchlist */}
					<div className="hidden sm:flex gap-5 items-center">
						<FaHeartBroken className="size-6" />
						<div className="relative">
							<IoIosNotifications className="size-8" />
							<div className="absolute size-2 rounded-full top-1 right-1 bg-[red] opacity-90 shadow-md"></div>
						</div>
						<div className="flex gap-3">
							<a href={"/login"} className={buttonVariants({ variant: "simple" })}>
								<p className="w-[50px]">Sign in</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
