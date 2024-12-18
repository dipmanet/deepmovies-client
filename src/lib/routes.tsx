import React from "react";
//components
export const BaseLayout = React.lazy(() => import("#components/Layouts/BaseLayout"));
export const ErrorBoundary = React.lazy(() => import("#components/Layouts/ErrorBoundary"));
export const PageNotFound = React.lazy(() => import("#components/Layouts/PageNotFound"));

//pages
export const HomePage = React.lazy(() => import("#pages/Home"));
export const MoviesPage = React.lazy(() => import("#pages/Movies"));
export const MoviePage = React.lazy(() => import("#pages/Movies/Movie"));
export const AllTVSeriesPage = React.lazy(() => import("#pages/TVSeries"));
export const TVSeriesPage = React.lazy(() => import("#pages/TVSeries/TVSeries"));
export const EpisodePage = React.lazy(() => import("#pages/TVSeries/Episode"));
export const GenrePage = React.lazy(() => import("#pages/Genre"));
export const SearchResultsPage = React.lazy(() => import("#pages/SearchResults"));
