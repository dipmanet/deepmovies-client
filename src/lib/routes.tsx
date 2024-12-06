import React from "react";

export const BaseLayout = React.lazy(() => import("#components/Layouts/BaseLayout"));
export const Homepage = React.lazy(() => import("#pages/Homepage"));
export const ErrorBoundary = React.lazy(() => import("#components/ErrorBoundary"));
