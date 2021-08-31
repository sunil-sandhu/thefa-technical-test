import Button from "./Button";

export default function AvailablePlayers({ players, addPlayer }) {
  return (
    <section className="col">
      <p className="text-strong">Currently available</p>
      {/* goalkeepers */}
      {players.G.map((player) => (
        <div key={player.name} className="player">
          <label htmlFor={player.position}>{player.position}</label>
          <p>{player.name}</p>
          <Button
            title="ADD"
            onClickFunc={() => addPlayer(player)}
            btnFor={player.name}
            size="small"
            color="green"
          />
        </div>
      ))}
      {/* defenders */}
      {players.D.map((player) => (
        <div key={player.name} className="player">
          <label htmlFor={player.position}>{player.position}</label>
          <p>{player.name}</p>
          <Button
            title="ADD"
            onClickFunc={() => addPlayer(player)}
            btnFor={player.name}
            size="small"
            color="green"
          />
        </div>
      ))}
      {/* midfielders */}
      {players.M.map((player) => (
        <div key={player.name} className="player">
          <label htmlFor={player.position}>{player.position}</label>
          <p>{player.name}</p>
          <Button
            title="ADD"
            onClickFunc={() => addPlayer(player)}
            btnFor={player.name}
            size="small"
            color="green"
          />
        </div>
      ))}
      {/* forwards */}
      {players.F.map((player) => (
        <div key={player.name} className="player">
          <label htmlFor={player.position}>{player.position}</label>
          <p>{player.name}</p>
          <Button
            title="ADD"
            onClickFunc={() => addPlayer(player)}
            btnFor={player.name}
            size="small"
            color="green"
          />
        </div>
      ))}
    </section>
  );
}
