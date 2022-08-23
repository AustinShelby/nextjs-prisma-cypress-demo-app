import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "./api/trpc/[trpc]";
import { withTRPC } from "@trpc/next";
import { useRouter } from "next/router";
import Link from "next/link";

function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-32">
        <nav>
          <Link href="/">
            <a className="text-gray-600 hover:text-indigo-700">Home</a>
          </Link>
          <Link href="/create">
            <a className="text-gray-600 hover:text-indigo-700 ml-8">
              Create a new Meetup
            </a>
          </Link>
        </nav>
      </header>
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
