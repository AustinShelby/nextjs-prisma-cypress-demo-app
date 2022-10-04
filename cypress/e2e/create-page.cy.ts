describe("Meetup create page", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("Create page is rendered correctly", () => {
    cy.visit("/create");

    cy.contains("Add a new meetup");
  });
});

export {};
