import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";

import { formations } from "./options/formations";
import { players } from "./options/players";

function Title({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

function Button({ title, onClickFunc }) {
  return <button onClick={onClickFunc}>{title}</button>;
}

function FormationContainer({ formation }) {
  const changeFormation = () => {
    return console.log("change formation clicked");
  };
  return (
    <div>
      <img src={formation.image} alt="current formation" />
      <p>Current formation: {formation.title}</p>
      <Button title="CHANGE FORMATION" onClickFunc={changeFormation} />
    </div>
  );
}

function AvailablePlayers({ players }) {
  const addPlayer = (player) => {
    return console.log(`add player ${player.name} clicked`);
  };
  return (
    <div>
      <p className="text-strong">Currently available</p>
      <p className="text-strong">Goalkeepers</p>
      {players.goalkeepers.map((player) => (
        <span>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
          <p key={player.name}>{player.name}</p>
        </span>
      ))}
      <p className="text-strong">Defenders</p>
      {players.defenders.map((player) => (
        <span>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
          <p key={player.name}>{player.name}</p>
        </span>
      ))}
      <p className="text-strong">Midfielders</p>
      {players.midfielders.map((player) => (
        <span>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
          <p key={player.name}>{player.name}</p>
        </span>
      ))}
      <p className="text-strong">Forwards</p>
      {players.forwards.map((player) => (
        <span>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
          <p key={player.name}>{player.name}</p>
        </span>
      ))}
    </div>
  );
}

const starting = [
  { position: "G", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "M", player: "" },
  { position: "M", player: "" },
  { position: "M", player: "" },
  { position: "F", player: "" },
  { position: "F", player: "" },
  { position: "F", player: "" },
];

const bench = [
  { position: "G", player: "" },
  { position: "G", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "D", player: "" },
  { position: "M", player: "" },
  { position: "M", player: "" },
  { position: "M", player: "" },
  { position: "M", player: "" },
  { position: "F", player: "" },
  { position: "F", player: "" },
  { position: "F", player: "" },
  { position: "F", player: "" },
];

function ActiveSquad() {
  return (
    <div>
      <p className="text-strong">Starting lineup</p>
      <section className="lineup">
        {starting.map((player) => (
          <div className="lineup-player">
            <p>{player.position}</p>
          </div>
        ))}
      </section>
      <p className="text-strong">Bench</p>
      <section className="lineup">
        {bench.map((player) => (
          <div className="lineup-player">
            <p>{player.position}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function SquadSelectorContainer({ players }) {
  return (
    <section>
      <ActiveSquad />
      <AvailablePlayers players={players} />
    </section>
  );
}

function Main() {
  const saveSquad = () => {
    return console.log("save squad clicked");
  };
  return (
    <div className="">
      <Title title="ENGLAND SQUAD" />
      <FormationContainer formation={formations[41212]} />
      <SquadSelectorContainer players={players} />
      <Button title="SAVE SQUAD" onClickFunc={saveSquad} />
    </div>
  );
}

function App() {
  const list = useSelector((store) => store.appReducer.list);
  const dispatch = useDispatch();

  const redux_add = (todo) => dispatch(appActions.redux_add(todo));
  const redux_delete = (id) => dispatch(appActions.redux_delete(id));

  const props = { list, redux_add, redux_delete };

  return <Main {...props} />;
}

export default App;
