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
});

export {};
