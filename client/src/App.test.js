import { render, screen } from "@testing-library/react";
import AppWrapper from "./AppWrapper";

test("renders page", () => {
  render(<AppWrapper />);
  const heading = screen.getByText(/england squad/i);
  expect(heading).toBeInTheDocument();
});

test("pressing 'change formation' button displays 'formation' overlay", () => {
  render(<AppWrapper />);
  const changeFormationButton = screen.getByText(/change formation/i);
  changeFormationButton.click();
  const selectFormationText = screen.getByText(/select formation/i);
  expect(selectFormationText).toBeInTheDocument();
});

test("changing formation updates the formation", () => {
  render(<AppWrapper />);
  const selectFormationButton = screen.getByText(/select formation/i);
  selectFormationButton.click();

  const formation = screen.getByRole("button", { name: /451/i });
  formation.click();

  const currentFormation = screen.getByText(/current formation: 451/i);
  expect(currentFormation).toBeInTheDocument();
});

test("changing formation updates the formation options in the starting lineup", () => {
  const app = render(<AppWrapper />);
  const selectFormationButton = screen.getByText(/select formation/i);
  selectFormationButton.click();

  const formation = screen.getByRole("button", { name: /343/i });
  formation.click();

  let currentFormation = app.container.querySelectorAll('label[for="F"]');
  expect(currentFormation.length).toBe(3);
});

test("selecting a player adds them to the starting lineup", () => {
  const app = render(<AppWrapper />);
  let harryKane = app.container.querySelector('[data-player="Harry Kane"]');
  harryKane.click();

  const squadWithHarryKane = screen.getByTestId("Harry Kane");

  expect(squadWithHarryKane).toBeInTheDocument();
});

test("if a player has been selected, they cannot be selected again", () => {
  const app = render(<AppWrapper />);
  let harryKane = app.container.querySelector('[data-player="Harry Kane"]');
  harryKane.click();

  harryKane.click();

  harryKane.click();
  const squadWithHarryKane = screen.getAllByTestId("Harry Kane");

  expect(squadWithHarryKane.length).toBe(1);
});

test("players can be removed from the squad", () => {
  const app = render(<AppWrapper />);

  let harryKane = app.container.querySelector('[data-player="Harry Kane"]');
  harryKane.click();

  let squadWithHarryKane = app.container.querySelector('[data-player-to-remove="Harry Kane"]');
  squadWithHarryKane.click();

  expect(squadWithHarryKane).not.toBeInTheDocument();
});
