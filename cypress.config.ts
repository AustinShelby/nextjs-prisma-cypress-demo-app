import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://0.0.0.0:3000",
    supportFile: false,
  },
  screenshotOnRunFailure: false,
  video: false,
});
