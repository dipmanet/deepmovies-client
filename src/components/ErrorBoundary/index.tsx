import { useNavigate } from "react-router-dom";

export default function ErrorBoundary() {
	// const routerError: any = useRouteError();
	const navigate = useNavigate();

	return (
		<div className="text-center py-8">
			<h1 className="text-headline-1">Error</h1>

			{/* <h3 className="text-headline-4">
				{routerError?.status} {routerError?.statusText}
			</h3>
			<p className=" text-headline-5 py-8 px-12 my-8">{routerError?.error?.message}</p> */}
			<p>
				Please Contact the maintainers of the webiste
				<a className="text-accent-5 hover:underline" href="https://workwise/contact" target="blank">
					{" "}
					here
				</a>
			</p>
			<p onClick={() => navigate(-1)} className="text-accent-6 hover:underline hover:text-accent-8">
				Go back
			</p>
		</div>
	);
}
