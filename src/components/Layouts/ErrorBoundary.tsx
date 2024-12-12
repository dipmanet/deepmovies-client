import { useNavigate, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
	const routerError: any = useRouteError();
	const navigate = useNavigate();

	console.log("error", routerError);

	return (
		<div className="text-center py-8">
			<h1 className="text-red-500">Error</h1>

			<h3 className="text-foreground">
				abc
				{routerError?.status} {routerError?.statusText}
				{JSON.stringify(routerError)}
			</h3>
			<p className=" text-primary-foreground py-8 px-12 my-8">{routerError?.error?.message}</p>
			<p>
				Please Contact the maintainers of the webiste
				<a className="text-accent-5 hover:underline" href="https://workwise/contact" target="blank">
					{" "}
					here
				</a>
			</p>
			<p
				role="button"
				onClick={() => navigate(-1)}
				className="text-accent-6 hover:underline hover:text-accent-8">
				Go back
			</p>
		</div>
	);
};

export default ErrorBoundary;
