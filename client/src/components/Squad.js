import Position from "./Position";

export default function Squad({ currentFormation, bench, removePlayer }) {
  return (
    <section className="col">
      <p className="text-strong">Starting lineup</p>
      <div data-testid="starting-lineup" className="">
        {currentFormation.selections.map((player, index) => (
          <Position key={index} player={player} removePlayer={removePlayer} />
        ))}
      </div>
      <p className="text-strong">Bench</p>
      <div className="">
        {bench.map((player, index) => (
          <Position key={index} player={player} removePlayer={removePlayer} />
        ))}
      </div>
    </section>
  );
}
