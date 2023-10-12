import "../styles/globals.css";
import type { AppType } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import { trpc } from "@/trpc";

const App: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-32">
          <nav>
            <Link className="text-gray-600 hover:text-indigo-700" href="/">
              Home
            </Link>
            <Link
              onClick={
                router.asPath.startsWith("/create") ? router.reload : undefined
              }
              className="text-gray-600 hover:text-indigo-700 ml-8"
              href="/create"
            >
              Create a new Meetup
            </Link>
          </nav>
        </header>
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default trpc.withTRPC(App);
