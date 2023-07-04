import { TimeCalculator } from "../../src/TimeCalculator";

describe("timeCalculator", () => {
  it("shows correct date today", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2023, 0, 1, 12, 0)} />);

    cy.contains("today");
  });

  it("shows correct date tomorrow", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2023, 0, 2, 12, 0)} />);

    cy.contains("tomorrow");
  });

  it("shows correct date yesterday", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2022, 11, 31, 12, 0)} />);

    cy.contains("yesterday");
  });

  it("shows correct date in 2 days", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2023, 0, 3, 12, 0)} />);

    cy.contains("in 2 days");
  });

  it("shows correct date in 2 days", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2022, 11, 30, 12, 0)} />);

    cy.contains("2 days ago");
  });

  it("shows correct date next week", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2023, 0, 8, 12, 0)} />);

    cy.contains("next week");
  });

  it("shows correct date last week", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2022, 11, 25, 12, 0)} />);

    cy.contains("last week");
  });

  it("shows correct date in 2 weeks", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2023, 0, 15, 12, 0)} />);

    cy.contains("in 2 weeks");
  });

  it("shows correct date 2 weeks ago", () => {
    const mockDateNow = new Date(2023, 0, 1, 12, 0);
    cy.clock(mockDateNow);
    cy.mount(<TimeCalculator date={new Date(2022, 11, 18, 12, 0)} />);

    cy.contains("2 weeks ago");
  });
});

export {};
