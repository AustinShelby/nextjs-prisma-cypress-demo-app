import { prisma } from "./src/prisma";
import { defineConfig } from "cypress";
import type { Event } from "@prisma/client";

export const seedEvents = async (events: Event[]): Promise<null> => {
  await Promise.all(
    events.map(async (event) => {
      await prisma.event.create({ data: event });
    })
  );
  return null;
};

export default defineConfig({
  e2e: {
    baseUrl: "http://0.0.0.0:3000",
    supportFile: false,
    setupNodeEvents(on) {
      on("task", {
        "seed:events": seedEvents,
      });
    },
  },
  screenshotOnRunFailure: false,
  video: false,
});
