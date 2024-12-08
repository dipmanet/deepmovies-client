import React from "react";
//components
export const ErrorBoundary = React.lazy(() => import("#components/ErrorBoundary"));
export const BaseLayout = React.lazy(() => import("#components/Layouts/BaseLayout"));

//pages
export const HomePage = React.lazy(() => import("#pages/Home"));
export const MoviePage = React.lazy(() => import("#pages/Movie"));
