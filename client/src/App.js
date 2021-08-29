import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";

import { formations } from "./options/formations";
import { players } from "./options/players";
import React, { useState } from "react";
import Button from "./components/Button";
import Title from "./components/Title";
import FormationModal from "./components/FormationModal";

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

function FormationContainer({ formation, handleSetCurrentFormation }) {
  const [showModal, setShowModal] = useState(false);

  const updateFormation = (formation) => {
    handleSetCurrentFormation(formation);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <p>Current formation: {formation.title}</p>
      <img src={formation.image} alt="current formation" />

      <Button title="CHANGE FORMATION" onClickFunc={() => setShowModal(true)} />
      <FormationModal
        title="SELECT FORMATION"
        showModal={showModal}
        onClickFunc={updateFormation}
      />
    </React.Fragment>
  );
}

function AvailablePlayers({ players }) {
  const addPlayer = (player) => {
    return console.log(`add player ${player.name} clicked`);
  };
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

function Player({ player }) {
  return (
    <div className="lineup-player">
      <p>{player.position}</p>
    </div>
  );
}

function ActiveSquad({ formation }) {
  console.log("do something with " + formation);
  return (
    <React.Fragment>
      <p className="text-strong">Starting lineup</p>
      <section className="lineup">
        {starting.map((player) => (
          <Player player={player} />
        ))}
      </section>
      <p className="text-strong">Bench</p>
      <section className="lineup">
        {bench.map((player) => (
          <Player player={player} />
        ))}
      </section>
    </React.Fragment>
  );
}

function SquadSelectorContainer({ players, formation }) {
  return (
    <section>
      <ActiveSquad formation={formation} />
      <AvailablePlayers players={players} />
    </section>
  );
}

function Main() {
  const [currentFormation, setCurrentFormation] = useState(formations[0]);

  const saveSquad = () => {
    return console.log("save squad clicked");
  };
  return (
    <React.Fragment>
      <Title title="ENGLAND SQUAD" />
      <FormationContainer
        formation={currentFormation}
        handleSetCurrentFormation={setCurrentFormation}
      />
      {/* <SquadSelectorContainer players={players} formation={formations[41212]} /> */}
      {/* <Button title="SAVE SQUAD" onClickFunc={saveSquad} /> */}
    </React.Fragment>
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
