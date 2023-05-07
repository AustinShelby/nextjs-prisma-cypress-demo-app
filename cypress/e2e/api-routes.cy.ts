describe("API routes", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("valid routes return 200", () => {
    cy.request("/");
  });

  it("invalid routes returns 404 correctly", () => {
    cy.request({ url: "/random", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });

  it("invalid meetup data returns an error", () => {
    cy.request({
      url: "/api/trpc/create",
      method: "POST",
      body: {
        description: "",
        location: "Berlin",
        dateTime: "2030-05-17T22:22",
      },
      failOnStatusCode: false,
    })
      .its("status")
      .should("eq", 400);
  });

  it("can successfully create a meetup through API", () => {
    cy.request({
      url: "/api/trpc/create",
      method: "POST",
      body: {
        name: "TypeScript Meetup",
        description: "",
        location: "Berlin",
        dateTime: "2030-05-17T22:22",
      },
    });

    cy.request("/typescript-meetup");
  });

  it("can't create a meetup that already exists", () => {
    cy.task("seed:events", [
      {
        id: 0,
        name: "Meetup",
        slug: "typescript-meetup",
        description: "",
        location: "Oslo",
        dateTime: new Date("2030-12-17T22:22"),
      },
    ]);

    cy.request({
      url: "/api/trpc/create",
      method: "POST",
      body: {
        name: "TypeScript Meetup",
        description: "",
        location: "Berlin",
        dateTime: "2030-05-17T22:22",
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).eq(500);
      expect(response.body.error.message).eq(
        "A meetup with this name already exists."
      );
    });
  });
});

export {};
