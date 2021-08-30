import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";

import { players } from "./options/players";
import React, { useState } from "react";
import Button from "./components/Button";
import Title from "./components/Title";
import { imagesFormations } from "./assets/img/formations/imagesFormations";
import FormationContainer from "./components/FormationContainer";
import { sortBenchByPositionOrder } from "./utils/sortBenchByPositionOrder";

function AvailablePlayers({ players, addPlayer }) {
  return (
    <React.Fragment>
      <p className="text-strong">Currently available</p>
      <p className="text-strong">Goalkeepers</p>
      {players.goalkeepers.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Defenders</p>
      {players.defenders.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Midfielders</p>
      {players.midfielders.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Forwards</p>
      {players.forwards.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
    </React.Fragment>
  );
}

function Position({ player }) {
  return (
    <div className="player">
      <label htmlFor={player.position}>{player.position}</label>
      <p data-testid={player.name}>{player.name}</p>
      {player.name && (
        <Button
          title="Remove"
          // onClickFunc={() => removePlayer(player)} btnFor={player.name}
        />
      )}
    </div>
  );
}

function ActiveSquad({ currentFormation, bench }) {
  return (
    <React.Fragment>
      <p className="text-strong">Starting lineup</p>
      <section className="">
        {currentFormation.selections.map((player, index) => (
          <Position key={index} player={player} />
        ))}
      </section>
      <p className="text-strong">Bench</p>
      <section className="">
        {bench.map((player, index) => (
          <Position key={index} player={player} />
        ))}
      </section>
    </React.Fragment>
  );
}

function SquadSelectorContainer({ players, currentFormation, bench, addPlayer }) {
  return (
    <section>
      <ActiveSquad currentFormation={currentFormation} bench={bench} />
      <AvailablePlayers players={players} addPlayer={addPlayer} />
    </section>
  );
}

function Main() {
  const addPlayerToBench = (player) => {
    const playerAlreadyInSquad = bench.find((element) => element.name === player.name);
    if (!playerAlreadyInSquad) {
      const indexOfMatchingSquadPositionToReplace = bench.findIndex(
        (element) => element.name === ""
      );
      if (indexOfMatchingSquadPositionToReplace !== -1) {
        let updatedBench = bench;
        updatedBench[indexOfMatchingSquadPositionToReplace] = player;
        updatedBench.sort(sortBenchByPositionOrder);
        // function to sort bench by position
        setBench(() => [...updatedBench]);
      }
    }
  };

  const addPlayer = (player) => {
    let { selections } = currentFormation;

    let returnMinusOneIfStartingLineupIsFull = selections
      .map((position) => position.name)
      .findIndex((element) => element === "");
    if (returnMinusOneIfStartingLineupIsFull === -1) {
      addPlayerToBench(player);
    } else {
      const playerAlreadyInSquad = selections.find((element) => element.name === player.name);
      if (!playerAlreadyInSquad) {
        const indexOfMatchingSquadPositionToReplace = selections.findIndex(
          (element) => element.position === player.position && element.name === ""
        );

        if (indexOfMatchingSquadPositionToReplace !== -1) {
          selections[indexOfMatchingSquadPositionToReplace] = player;
          setCurrentFormation(Object.assign({}, currentFormation, selections));
        }
      }
    }
  };

  const [currentFormation, setCurrentFormation] = useState({
    title: "3412",
    image: imagesFormations["3-4-1-2"],
    positions: ["G", "D", "D", "D", "M", "M", "M", "M", "M", "F", "F"],
    selections: [
      { position: "G", name: "" },
      { position: "D", name: "" },
      { position: "D", name: "" },
      { position: "D", name: "" },
      { position: "M", name: "" },
      { position: "M", name: "" },
      { position: "M", name: "" },
      { position: "M", name: "" },
      { position: "M", name: "" },
      { position: "F", name: "" },
      { position: "F", name: "" },
    ],
  });

  const [bench, setBench] = useState([
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
    { position: "", name: "" },
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
        bench={bench}
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
