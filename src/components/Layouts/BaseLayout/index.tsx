// import Navbar from "#components/Navbar";

const BaseLayout = ({
	children,
}: // navbar = true,
{
	children: React.ReactNode;
	navbar?: boolean;
}) => {
	return (
		<div className="relative w-full h-full min-h-screen flex flex-col">
			{/* {navbar && <Navbar />} */}
			<div className="w-full h-full flex flex-col flex-grow relative">{children}</div>
		</div>
	);
};

export default BaseLayout;
