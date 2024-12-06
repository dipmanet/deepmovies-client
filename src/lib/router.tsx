import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout, ErrorBoundary, Homepage } from "./routes";

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
					<Homepage />
				</BaseLayout>
			),
		},
	],
	{}
);
