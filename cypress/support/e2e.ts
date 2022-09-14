/// <reference types="cypress" />
import type { seedEvents } from "../../cypress.config";

declare global {
  namespace Cypress {
    interface Chainable {
      task(
        task: "seed:events",
        arg: Parameters<typeof seedEvents>[0]
      ): Chainable<ReturnType<typeof seedEvents>>;
    }
  }
}
