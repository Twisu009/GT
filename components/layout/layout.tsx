"use client";
import { LoadingProvider } from "../loading/LoadingContext";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingProvider>
      <div>{children}</div>
    </LoadingProvider>
  );
};
