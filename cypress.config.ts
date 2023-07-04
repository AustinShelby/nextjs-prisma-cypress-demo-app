import { prisma } from "./src/prisma";
import { defineConfig } from "cypress";
import type { Event } from "@prisma/client";
import shell from "shell-exec";

export const seedEvents = async (events: Event[]): Promise<null> => {
  await Promise.all(
    events.map(async (event) => {
      await prisma.event.create({ data: event });
    })
  );
  return null;
};

const resetDatabase = async () => {
  await shell("yarn prisma migrate reset -f");
  return null;
};

export default defineConfig({
  e2e: {
    baseUrl: "http://0.0.0.0:3000",
    supportFile: false,
    setupNodeEvents(on) {
      on("task", {
        "seed:events": seedEvents,
        reset: resetDatabase,
      });
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  screenshotOnRunFailure: false,
  video: false,
});
