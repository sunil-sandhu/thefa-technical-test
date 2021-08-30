import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";
import { formations } from "./options/formations";
import { bench as _bench } from "./options/bench";
import { players as _players } from "./options/players";
import React, { useState } from "react";
import Button from "./components/Button";
import Title from "./components/Title";
import FormationContainer from "./components/FormationContainer";
import { sortBenchByPositionOrder } from "./utils/sortBenchByPositionOrder";

function AvailablePlayers({ players, addPlayer }) {
  return (
    <React.Fragment>
      <p className="text-strong">Currently available</p>
      <p className="text-strong">Goalkeepers</p>
      {players.G.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Defenders</p>
      {players.D.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Midfielders</p>
      {players.M.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
      <p className="text-strong">Forwards</p>
      {players.F.map((player) => (
        <div key={player.name} className="player">
          <p>{player.name}</p>
          <Button title="Add" onClickFunc={() => addPlayer(player)} btnFor={player.name} />
        </div>
      ))}
    </React.Fragment>
  );
}

function Position({ player, removePlayer }) {
  return (
    <div className="player">
      <label htmlFor={player.position}>{player.position}</label>
      <p data-testid={player.name}>{player.name}</p>
      {player.name && (
        <button data-player-to-remove={player.name} onClick={() => removePlayer(player)}>
          Remove
        </button>
      )}
    </div>
  );
}

function ActiveSquad({ currentFormation, bench, removePlayer }) {
  return (
    <React.Fragment>
      <p className="text-strong">Starting lineup</p>
      <section className="">
        {currentFormation.selections.map((player, index) => (
          <Position key={index} player={player} removePlayer={removePlayer} />
        ))}
      </section>
      <p className="text-strong">Bench</p>
      <section className="">
        {bench.map((player, index) => (
          <Position key={index} player={player} removePlayer={removePlayer} />
        ))}
      </section>
    </React.Fragment>
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

  const filterSelectedPlayerFromSquadOptions = (player) => {
    // copy of old state
    let availablePlayers = players;

    // filter selected player out of available players in that player's position
    const playerToRemoveFromAvailablePlayers = players[player.position].filter(
      (p) => p.name !== player.name
    );

    // then replace the values in that position with the new filtered array
    availablePlayers[player.position] = playerToRemoveFromAvailablePlayers;

    setPlayers(availablePlayers);
  };

  const addPlayer = (player) => {
    let { selections } = currentFormation;

    const returnMinusOneIfStartingLineupIsFull = selections
      .map((position) => position.name)
      .findIndex((element) => element === "");
    if (returnMinusOneIfStartingLineupIsFull === -1) {
      addPlayerToBench(player);
    } else {
      filterSelectedPlayerFromSquadOptions(player);
      // const playerAlreadyInSquad = selections.find((element) => element.name === player.name);
      // if (!playerAlreadyInSquad) {
      const indexOfMatchingSquadPositionToReplace = selections.findIndex(
        (element) => element.position === player.position && element.name === ""
      );

      if (indexOfMatchingSquadPositionToReplace !== -1) {
        selections[indexOfMatchingSquadPositionToReplace] = player;
        setCurrentFormation(Object.assign({}, currentFormation, selections));
      }
      // }
    }
  };

  const removePlayer = (player) => {
    let { selections } = currentFormation;
    if (selections.includes(player)) {
      let indexPositionToClear = selections.findIndex((s) => s.name === player.name);
      selections[indexPositionToClear] = { position: player.position, name: "" };
      setCurrentFormation(Object.assign({}, currentFormation, selections));
    } else {
      let indexPositionToClear = bench.findIndex((s) => s.name === player.name);
      bench[indexPositionToClear] = { position: "", name: "" };
      setBench(() => [...bench]);
    }
  };

  const [currentFormation, setCurrentFormation] = useState(formations[0]);

  const [bench, setBench] = useState(_bench);

  const [players, setPlayers] = useState(_players);

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
      <ActiveSquad currentFormation={currentFormation} bench={bench} removePlayer={removePlayer} />
      <AvailablePlayers players={players} addPlayer={addPlayer} />

      <Button title="SAVE SQUAD" onClickFunc={saveSquad} />
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
