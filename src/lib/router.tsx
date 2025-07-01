import { createBrowserRouter, Outlet } from "react-router-dom";
import {
	BaseLayout,
	ErrorBoundary,
	PageNotFound,
	GenresPage,
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
		path: "",
		errorElement: <ErrorBoundary />,
		element: (
			<BaseLayout>
				<Outlet />
			</BaseLayout>
		),
		children: [
			{
				path: "",
				element: <HomePage />,
				index: true,
			},
			{
				path: "movie",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: <MoviesPage />,
						index: true,
					},
					{
						path: ":id",
						element: <MoviePage />,
					},
				],
			},
			{
				path: "series",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: <AllTVSeriesPage />,
						index: true,
					},
					{
						path: ":id",
						element: <TVSeriesPage />,
					},
					{
						path: ":series_id/season/:season_id/episode/:episode_id",
						element: <EpisodePage />,
					},
				],
			},
			{
				path: "genre",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: <GenresPage />,
						index: true,
					},
					{
						path: ":genre",
						element: <GenrePage />,
					},
				],
			},
			{
				path: "/search/",
				element: <SearchResultsPage />,
			},
		],
	},
]);
