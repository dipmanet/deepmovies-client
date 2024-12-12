import React from "react";
//components
export const BaseLayout = React.lazy(() => import("#components/Layouts/BaseLayout"));
export const ErrorBoundary = React.lazy(() => import("#components/Layouts/ErrorBoundary"));
export const PageNotFound = React.lazy(() => import("#components/Layouts/PageNotFound"));

//pages
export const HomePage = React.lazy(() => import("#pages/Home"));
export const MoviesPage = React.lazy(() => import("#pages/Movies"));
export const MoviePage = React.lazy(() => import("#pages/Movies/Movie"));
export const GenrePage = React.lazy(() => import("#pages/Genre"));
