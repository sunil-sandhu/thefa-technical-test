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
