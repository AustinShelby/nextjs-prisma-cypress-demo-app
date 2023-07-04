import { Event } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../src/prisma";
import { Serializable } from "../src/types";
import { TimeCalculator } from "../src/TimeCalculator";
import { Button } from "../src/Button";

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ event }) => {
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h1 data-cy="title" className="font-semibold text-4xl">
          {event.name}
        </h1>
        <TimeCalculator date={new Date(event.dateTime)} />
      </div>
      <p data-cy="location" className="mt-2">
        {event.location}
      </p>
      <p
        data-cy="description"
        className="mt-4 leading-loose whitespace-pre-wrap"
      >
        {event.description}
      </p>
      <div className="mt-16">
        <Button
          disabled={false}
          onClick={() => console.log("world")}
          text={"Delete meetup"}
        />
      </div>
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
