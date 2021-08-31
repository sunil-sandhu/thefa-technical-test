export default function Position({ player, removePlayer }) {
  return (
    <div className="player" data-testid={player.name}>
      <label htmlFor={player.position}>{player.position}</label>
      <p>{player.name}</p>
      {player.name && (
        <button
          data-player-to-remove={player.name}
          onClick={() => removePlayer(player)}
          className="button button-small red">
          REMOVE
        </button>
      )}
    </div>
  );
}
