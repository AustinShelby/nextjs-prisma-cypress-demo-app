import { Event } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../src/prisma";
import { Serializable } from "../src/types";

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ event }) => {
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h1 className="font-medium text-3xl">{event.name}</h1>
        <p>
          {new Date(event.dateTime).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <p className="mt-2">{event.location}</p>
      <p className="mt-4 leading-loose whitespace-pre-wrap">
        {event.description}
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  {
    event: Serializable<Event>;
  },
  { slug: string }
> = async (context) => {
  const slug = context.params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  const event = await prisma.event.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event: {
        ...event,
        dateTime: event.dateTime.toISOString(),
      },
    },
  };
};

export default HomePage;
