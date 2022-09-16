describe("Meetups list page", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("should show no meetups when no exist", () => {
    cy.visit("/");
    cy.get("ul li").should("have.length", 0);
  });

  it("should show meetup name", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "TypeScript Meetup",
        slug: "typescript-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 0, 1),
      },
    ]);

    cy.visit("/");
    cy.get("ul li").should("have.length", 1).contains("TypeScript Meetup");
  });
});

export {};
