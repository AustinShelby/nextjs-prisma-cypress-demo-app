describe("Home page", () => {
  it("Should have heading 'Meetups'", () => {
    cy.visit("/");
    cy.get("h1").contains("Meetups");
  });
});

export {};
