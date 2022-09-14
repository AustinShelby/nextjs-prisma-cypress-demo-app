describe("Meetup detail page", () => {
  it("Should exist when it is in database", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "Test Meetup",
        slug: "test-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 0, 1),
      },
    ]);

    cy.visit("/test-meetup");
  });
});

export {};
