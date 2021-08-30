import { render, screen, waitFor } from "@testing-library/react";
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
  let player = app.container.querySelector('[data-player="Harry Kane"]');
  player.click();

  const squadWithPlayer = screen.getByTestId("Harry Kane");

  expect(squadWithPlayer).toBeInTheDocument();
});

test("if a player has been selected, they cannot be selected again", () => {
  const app = render(<AppWrapper />);
  let player = app.container.querySelector('[data-player="Raheem Sterling"]');
  player.click();
  expect(player).not.toBeInTheDocument();
});

test("players can be removed from the squad", () => {
  const app = render(<AppWrapper />);

  let player = app.container.querySelector('[data-player="Jordan Henderson"]');
  player.click();

  let squadWithPlayer = app.container.querySelector('[data-player-to-remove="Jordan Henderson"]');
  squadWithPlayer.click();

  expect(squadWithPlayer).not.toBeInTheDocument();
});

test("players removed from squad are added back into the pool", () => {
  const app = render(<AppWrapper />);

  let player = app.container.querySelector('[data-player="Nick Pope"]');
  player.click();

  let squadWithPlayer = app.container.querySelector('[data-player-to-remove="Nick Pope"]');
  squadWithPlayer.click();

  let samePlayer = app.container.querySelector('[data-player="Nick Pope"]');
  expect(samePlayer).toBeInTheDocument();
});
