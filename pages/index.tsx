import { Event } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { prisma } from "../src/prisma";
import { Serializable } from "../src/types";

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ events }) => {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-16">
        <h1 className="font-medium text-4xl">Meetups</h1>
        <Link
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-sm text-white font-medium"
          href={"/create"}
        >
          Create a new meetup
        </Link>
      </div>
      <ul className="space-y-8">
        {events.map((event) => (
          <li
            className="border border-gray-200 rounded-sm hover:-translate-y-2 duration-200 hover:shadow-md"
            key={event.id}
          >
            <Link className="flex" href={`/${event.slug}`}>
              <div className="p-8 flex-1">
                <h2 className="text-2xl font-medium">{event.name}</h2>
                <p className="mt-4 leading-loose whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
              <div className="bg-gray-50 p-8 border-l border-gray-200 w-40 flex items-center justify-center">
                <p className="text-center">
                  <span className="text-2xl font-semibold">
                    {new Date(event.dateTime).getDate()}
                  </span>
                  <br />
                  {new Date(event.dateTime).toLocaleString("en-US", {
                    month: "long",
                  })}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: Serializable<Event>[];
}> = async () => {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: "asc" },
    where: {
      dateTime: {
        gte: new Date(),
      },
    },
  });
  return {
    props: {
      events: events.map((event) => ({
        ...event,
        dateTime: event.dateTime.toISOString(),
      })),
    },
  };
};

export default HomePage;
