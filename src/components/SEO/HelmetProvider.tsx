import { HelmetProvider } from "react-helmet-async";
import { ReactNode } from "react";

interface HelmetProviderProps {
  children: ReactNode;
}

export function SEOHelmetProvider({ children }: HelmetProviderProps) {
  return <HelmetProvider>{children}</HelmetProvider>;
}