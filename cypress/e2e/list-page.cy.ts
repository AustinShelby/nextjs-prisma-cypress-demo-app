describe("Meetups list page", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("should show no meetups when no exist", () => {
    cy.visit("/");
    cy.get("ul li").should("have.length", 0);
  });
});

export {};
