import Player from "./Player";

export default function AvailablePlayers({ players, addPlayer }) {
  return (
    <section className="col">
      <p className="text-strong">Currently available</p>
      {/* goalkeepers */}
      {players.G.map((player) => (
        <Player player={player} key={player.name} addPlayer={addPlayer} />
      ))}
      {/* defenders */}
      {players.D.map((player) => (
        <Player player={player} key={player.name} addPlayer={addPlayer} />
      ))}
      {/* midfielders */}
      {players.M.map((player) => (
        <Player player={player} key={player.name} addPlayer={addPlayer} />
      ))}
      {/* forwards */}
      {players.F.map((player) => (
        <Player player={player} key={player.name} addPlayer={addPlayer} />
      ))}
    </section>
  );
}
