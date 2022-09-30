describe("Meetup detail page", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("meetup is found on path that matches its slug", () => {
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

    cy.visit("/typescript-meetup");
  });

  it("404 is returned for paths that don't match any meetup slug", () => {
    cy.request({ url: "/typescript-meetup", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });
});

export {};
