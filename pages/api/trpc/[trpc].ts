import * as trpcNext from "@trpc/server/adapters/next";
import { publicProcedure, router } from "@/server";
import { CreateEventSchema } from "@/createEventSchema";
import { prisma } from "@/prisma";
import slugify from "slugify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

const appRouter = router({
  create: publicProcedure
    .input(CreateEventSchema)
    .mutation(async ({ input }) => {
      try {
        const event = await prisma.event.create({
          data: {
            name: input.name,
            slug: slugify(input.name, { lower: true }),
            description: input.description,
            location: input.location,
            dateTime: new Date(input.dateTime),
          },
        });
        return event;
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "A meetup with this name already exists.",
            cause: error,
          });
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
});
