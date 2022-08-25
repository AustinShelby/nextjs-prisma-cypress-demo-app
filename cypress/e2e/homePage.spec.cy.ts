describe("Home page", () => {
  it("should show 'Meetups' heading", () => {
    cy.visit("/");
    cy.get("h1").contains("Meetups");
  });
});

export default {};
