import { createBrowserRouter } from "react-router-dom";
import {
	BaseLayout,
	ErrorBoundary,
	PageNotFound,
	GenrePage,
	HomePage,
	MoviePage,
	MoviesPage,
	SearchResultsPage,
	AllTVSeriesPage,
	TVSeriesPage,
	EpisodePage,
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
				path: "/series",
				element: (
					<BaseLayout>
						<AllTVSeriesPage />
					</BaseLayout>
				),
			},
			{
				path: "/series/:id",
				element: (
					<BaseLayout>
						<TVSeriesPage />
					</BaseLayout>
				),
			},
			{
				path: "/series/:series_id/season/:season_id/episode/:episode_id",
				element: (
					<BaseLayout>
						<EpisodePage />
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
			{
				path: "/search/",
				element: (
					<BaseLayout>
						<SearchResultsPage />
					</BaseLayout>
				),
			},
		],
	},
]);
