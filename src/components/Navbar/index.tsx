import React from "react";
import { navData } from "src/lib/navData";
import { RiVideoOnAiFill } from "react-icons/ri";
import { FaHeartBroken } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { buttonVariants } from "#components/ui/button";
import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<div className="w-full">
			<div className="container">
				<div className="w-full flex gap-10 justify-between items-center">
					{/* website logo */}
					<div className="flex gap-2 items-center">
						<RiVideoOnAiFill className="h-8 w-8" />
						<p className="text-lg">DeepMovies</p>
					</div>
					{/* search text */}
					<input
						type="text"
						className="px-4 py-2 border border-[black] rounded-md"
						placeholder="Search"
					/>
					{/* navbar */}
					<ul className="flex gap-5 items-center">
						{navData.map((nav, id) => (
							<li key={id}>
								<Link to={nav.link}>
									<span>{nav.title}</span>
								</Link>
							</li>
						))}
					</ul>
					{/* watchlist */}
					<div className="flex gap-5 items-center">
						<FaHeartBroken className="size-6" />
						<div className="relative">
							<IoIosNotifications className="size-8" />
							<div className="absolute size-2 rounded-full top-1 right-1 bg-[red] opacity-90 shadow-md"></div>
						</div>
						<div className="flex gap-3">
							<a href={""} className={buttonVariants({ variant: "purple" })}>
								<p>Sign in</p>
							</a>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
