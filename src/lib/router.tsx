import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout, ErrorBoundary, HomePage, MoviePage } from "./routes";

export const router = createBrowserRouter(
	[
		{
			path: "*",
			element: <ErrorBoundary />,
		},
		{
			path: "/",
			element: (
				<BaseLayout>
					<HomePage />
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
	],
	{}
);
