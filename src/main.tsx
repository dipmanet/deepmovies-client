import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "#components/Loader/index.tsx";
import Store from "#lib/Store.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Suspense fallback={<Loader />}>
			<QueryClientProvider client={queryClient}>
				<Store>
					<Toaster />
					<App />
				</Store>
			</QueryClientProvider>
		</Suspense>
	</StrictMode>
);
