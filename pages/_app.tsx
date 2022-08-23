import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "./api/trpc/[trpc]";
import { withTRPC } from "@trpc/next";

function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32">
      <Component {...pageProps} />
    </main>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: "/api/trpc",
    };
  },
})(App);
