describe("Meetup create page", () => {
  beforeEach(() => {
    cy.task("reset");
  });

  it("Create page is rendered correctly", () => {
    cy.visit("/create");

    cy.contains("Add a new meetup");
  });

  it("Meetup title and datetime input work", () => {
    cy.visit("/create");

    cy.get("input#name")
      .should("have.value", "")
      .type("test")
      .should("have.value", "test");

    cy.get("input#datetime")
      .should("have.value", "")
      .type("2030-10-10T10:10")
      .should("have.value", "2030-10-10T10:10");
  });

  it("Submitting empty form gives error on required fields title, location and date", () => {
    cy.visit("/create");

    cy.get("button:submit").click();

    cy.contains("Please enter a name for the meetup.");
    cy.contains("Please enter a location for the meetup.");
    cy.contains("Please enter a date that is in the future.");
  });

  it("Success message shows after a successful submit", () => {
    cy.visit("/create");

    cy.get("input#name")
      .should("have.value", "")
      .type("test")
      .should("have.value", "test");

    cy.get("input#location")
      .should("have.value", "")
      .type("Online")
      .should("have.value", "Online");

    cy.get("input#datetime")
      .should("have.value", "")
      .type("2030-10-10T10:10")
      .should("have.value", "2030-10-10T10:10");

    cy.get("button:submit").click();

    cy.contains("New meetup created successfully!");
  });

  it("Can't create a meetup if one with the same generated slug exists", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "Doesn't matter",
        slug: "typescript-meetup",
        description: "",
        location: "Online",
        dateTime: new Date("2030-10-10T10:10"),
      },
    ]);

    cy.visit("/create");

    cy.get("input#name")
      .should("have.value", "")
      .type("TypeScript Meetup")
      .should("have.value", "TypeScript Meetup");

    cy.get("input#location")
      .should("have.value", "")
      .type("Online")
      .should("have.value", "Online");

    cy.get("input#datetime")
      .should("have.value", "")
      .type("2030-10-10T10:10")
      .should("have.value", "2030-10-10T10:10");

    cy.get("button:submit").click();

    cy.contains("A meetup with this name already exists.");
  });

  it("A newly created meetup has a page", () => {
    cy.visit("/create");

    cy.get("input#name")
      .should("have.value", "")
      .type("TypeScript Meetup")
      .should("have.value", "TypeScript Meetup");

    cy.get("input#location")
      .should("have.value", "")
      .type("Online")
      .should("have.value", "Online");

    cy.get("input#datetime")
      .should("have.value", "")
      .type("2030-10-10T10:10")
      .should("have.value", "2030-10-10T10:10");

    cy.get("button:submit").click();

    cy.contains("New meetup created successfully!");

    cy.visit("/typescript-meetup");
    cy.get("[data-cy='title']").contains("TypeScript Meetup");
  });
});

export {};
