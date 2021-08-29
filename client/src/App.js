import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";

import { formations } from "./options/formations";
import { players } from "./options/players";
import React, { useState } from "react";
import Button from "./components/Button";
import Title from "./components/Title";
import { imagesFormations } from "./assets/img/formations/imagesFormations";
import FormationContainer from "./components/FormationContainer";

function AvailablePlayers({ players, addPlayer }) {
  return (
    <React.Fragment>
      <p className="text-strong">Currently available</p>
      <p className="text-strong">Goalkeepers</p>
      {players.goalkeepers.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
        </div>
      ))}
      <p className="text-strong">Defenders</p>
      {players.defenders.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
        </div>
      ))}
      <p className="text-strong">Midfielders</p>
      {players.midfielders.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
        </div>
      ))}
      <p className="text-strong">Forwards</p>
      {players.forwards.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} />
        </div>
      ))}
    </React.Fragment>
  );
}

function Position({ player, formation }) {
  console.log(player);
  return (
    <div className="player">
      <label htmlFor={player}>{player}</label>
      <input name={player} />
      {/* <p>{player}</p> */}
    </div>
  );
}

function ActiveSquad({ currentFormation }) {
  return (
    <React.Fragment>
      <p className="text-strong">Starting lineup</p>
      <section className="">
        {currentFormation.positions.map((player, index) => (
          <Position key={index} player={player} />
        ))}
      </section>
      <p className="text-strong">Bench</p>
      <section className="lineup">
        {/* {bench.map((player, index) => (
          <Position key={index} player={player} />
        ))} */}
      </section>
    </React.Fragment>
  );
}

function SquadSelectorContainer({ players, currentFormation, addPlayer }) {
  return (
    <section>
      <ActiveSquad currentFormation={currentFormation} />
      <AvailablePlayers players={players} addPlayer={addPlayer} />
    </section>
  );
}

function Main() {
  const addPlayer = (player) => {
    console.log(player);

    // figure out how to make this grab the currentFormation selections, then push the selected player into it, then update state
    let selections = currentFormation.selections;
    console.log(selections);
    const found = selections.find(
      (element) => element.position === player.position && element.player === ""
    );
    console.log(found);
    const newCurrentFormation = Object.assign(currentFormation);
  };

  const [currentFormation, setCurrentFormation] = useState({
    title: "3412",
    image: imagesFormations["3-4-1-2"],
    positions: ["G", "D", "D", "D", "M", "M", "M", "M", "M", "F", "F"],
    selections: [
      { position: "G", player: "" },
      { position: "D", player: "" },
      { position: "D", player: "" },
      { position: "D", player: "" },
      { position: "M", player: "" },
      { position: "M", player: "" },
      { position: "M", player: "" },
      { position: "M", player: "" },
      { position: "M", player: "" },
      { position: "F", player: "" },
      { position: "F", player: "" },
    ],
  });

  const [bench, setBench] = useState([
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
  ]);

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
      <SquadSelectorContainer
        players={players}
        currentFormation={currentFormation}
        addPlayer={addPlayer}
      />
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
