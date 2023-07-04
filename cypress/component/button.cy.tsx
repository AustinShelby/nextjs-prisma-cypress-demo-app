import { Button } from "../../src/Button";

describe("button", () => {
  it("works", () => {
    cy.mount(
      <Button disabled={false} onClick={() => undefined} text={"Hello World"} />
    );

    cy.contains("Hello World");
  });

  it("disabled works", () => {
    cy.mount(
      <Button disabled={true} onClick={() => undefined} text={"Hello World"} />
    );

    cy.get("button").should("be.disabled");
  });

  it("onClick handler gets called", () => {
    const spy = cy.spy().as("spy");
    cy.mount(<Button disabled={false} onClick={spy} text={"Hello World"} />);

    cy.get("button").click();

    cy.get("@spy").should("have.been.calledOnce");
  });

  it("disabling button works", () => {
    const spy = cy.spy().as("spy");
    cy.mount(<Button disabled={true} onClick={spy} text={"Hello World"} />);

    cy.get("button").click({ force: true });

    cy.get("@spy").should("not.have.been.called");
  });
});

export {};
