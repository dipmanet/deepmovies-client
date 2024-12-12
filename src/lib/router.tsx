import { createBrowserRouter } from "react-router-dom";
import {
	BaseLayout,
	ErrorBoundary,
	PageNotFound,
	GenrePage,
	HomePage,
	MoviePage,
	MoviesPage,
} from "./routes";

export const router = createBrowserRouter([
	{
		path: "*",
		element: <PageNotFound />,
	},
	{
		path: "/",
		errorElement: <ErrorBoundary />,
		element: (
			<BaseLayout>
				<HomePage />
			</BaseLayout>
		),
	},
	{
		path: "",
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "/movie",
				element: (
					<BaseLayout>
						<MoviesPage />
					</BaseLayout>
				),
			},
			{
				path: "/movie/:id",
				element: (
					<BaseLayout>
						<MoviePage />
					</BaseLayout>
				),
			},
			{
				path: "/genre/:genre",
				element: (
					<BaseLayout>
						<GenrePage />
					</BaseLayout>
				),
			},
		],
	},
]);
