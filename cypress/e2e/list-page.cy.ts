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

  it("past meetups are not shown", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "TypeScript Meetup",
        slug: "typescript-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2000, 11, 23),
      },
    ]);

    cy.visit("/");
    cy.get("ul li").should("have.length", 0);
  });

  it("meetups are shown in order by dateTime in ascending order", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "TypeScript Meetup",
        slug: "typescript-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 11, 23),
      },
      {
        id: 2,
        name: "Python Meetup",
        slug: "python-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 11, 24),
      },
    ]);

    cy.visit("/");

    cy.get("ul li")
      .should("have.length", 2)
      .first()
      .should("contain", "TypeScript Meetup")
      .next()
      .should("contain", "Python Meetup");
  });

  it("meetups are shown in order by dateTime in ascending order when in reverse order in database", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "Python Meetup",
        slug: "python-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 11, 24),
      },
      {
        id: 2,
        name: "TypeScript Meetup",
        slug: "typescript-meetup",
        description: "",
        location: "Online",
        dateTime: new Date(2030, 11, 23),
      },
    ]);

    cy.visit("/");

    cy.get("ul li")
      .should("have.length", 2)
      .first()
      .should("contain", "TypeScript Meetup")
      .next()
      .should("contain", "Python Meetup");
  });

  it("meetup title, description, and start time elements are being populated", () => {
    cy.task("seed:events", [
      {
        id: 1,
        name: "Python Meetup",
        slug: "python-meetup",
        description: "description",
        location: "Online",
        dateTime: new Date(2030, 11, 24),
      },
    ]);

    cy.visit("/");

    cy.get("ul li").should("have.length", 1).first().as("meetup");

    cy.get("@meetup").get("h2").should("not.be.empty");

    cy.get("@meetup").get("div:first p").should("not.be.empty");

    cy.get("@meetup").get("div:last p").should("not.be.empty");
  });
});

export {};
