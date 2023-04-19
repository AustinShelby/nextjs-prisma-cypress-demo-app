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

    cy.get("input#name").should("have.value", "").type("test");
    cy.get("input#name").should("have.value", "test");

    cy.get("input#datetime").should("have.value", "").type("2030-10-10T10:10");
    cy.get("input#datetime").should("have.value", "2030-10-10T10:10");
  });

  it("Submitting empty form gives error on required fields title, location and date", () => {
    cy.visit("/create");

    cy.get("button:submit").click();

    cy.get("[data-cy='name-error']").contains(
      "Please enter a name for the meetup."
    );
    cy.get("[data-cy='location-error']").contains(
      "Please enter a location for the meetup."
    );
    cy.get("[data-cy='date-error']").contains(
      "Please enter a date that is in the future."
    );
  });

  it("Success message shows after a successful submit", () => {
    cy.visit("/create");

    cy.get("input#name").type("test");
    cy.get("input#location").type("Online");
    cy.get("input#datetime").type("2030-10-10T10:10");

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

    cy.get("input#name").type("TypeScript Meetup");
    cy.get("input#location").type("Online");
    cy.get("input#datetime").type("2030-10-10T10:10");

    cy.get("button:submit").click();

    cy.contains("A meetup with this name already exists.");
  });

  it("A newly created meetup has a page", () => {
    cy.visit("/create");

    cy.get("input#name").type("TypeScript Meetup");
    cy.get("input#location").type("Online");
    cy.get("input#datetime").type("2030-10-10T10:10");

    cy.get("button:submit").click();

    cy.contains("New meetup created successfully!");

    cy.visit("/typescript-meetup");
    cy.get("[data-cy='title']").contains("TypeScript Meetup");
  });

  it("Submitting form with too long inputs gives error on fields title, description, and location", () => {
    cy.visit("/create");

    cy.get("input#name").type("a".repeat(65));
    cy.get("input#location").type("a".repeat(65));
    cy.get("textarea#description").type("a".repeat(1025));

    cy.get("button:submit").click();

    cy.get("[data-cy='name-error']").contains("Maximum length 64 characters.");
    cy.get("[data-cy='location-error']").contains(
      "Maximum length 64 characters."
    );
    cy.get("[data-cy='description-error']").contains(
      "Maximum length 1024 characters."
    );
  });
});

export {};
