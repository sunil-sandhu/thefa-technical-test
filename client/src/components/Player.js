import Button from "./Button";

export default function Player({ player, addPlayer }) {
  return (
    <div className="player">
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
  );
}
