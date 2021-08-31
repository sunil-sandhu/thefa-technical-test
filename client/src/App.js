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
import Squad from "./components/Squad";
import AvailablePlayers from "./components/AvailablePlayers";

function Main() {
  const addPlayerToBench = (player) => {
    removeSelectedPlayerFromSquadOptions(player);

    const indexOfMatchingSquadPositionToReplace = bench.findIndex((element) => element.name === "");
    if (indexOfMatchingSquadPositionToReplace !== -1) {
      let updatedBench = bench;
      updatedBench[indexOfMatchingSquadPositionToReplace] = player;
      updatedBench.sort(sortBenchByPositionOrder);
      // function to sort bench by position
      setBench(() => [...updatedBench]);
    }
  };

  const removeSelectedPlayerFromSquadOptions = (player) => {
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

  const addPlayerBackIntoSquadOptions = (player) => {
    let availablePlayers = players;
    availablePlayers[player.position].push(player);
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
      removeSelectedPlayerFromSquadOptions(player);

      const indexOfMatchingSquadPositionToReplace = selections.findIndex(
        (element) => element.position === player.position && element.name === ""
      );

      if (indexOfMatchingSquadPositionToReplace !== -1) {
        selections[indexOfMatchingSquadPositionToReplace] = player;
        setCurrentFormation(Object.assign({}, currentFormation, selections));
      }
    }
  };

  const removePlayer = (player) => {
    let { selections } = currentFormation;
    if (selections.includes(player)) {
      let indexPositionToClear = selections.findIndex((s) => s.name === player.name);
      selections[indexPositionToClear] = { position: player.position, name: "" };
      setCurrentFormation(Object.assign({}, currentFormation, selections));
      addPlayerBackIntoSquadOptions(player);
    } else {
      let indexPositionToClear = bench.findIndex((s) => s.name === player.name);
      bench[indexPositionToClear] = { position: "", name: "" };
      setBench(() => [...bench]);
      addPlayerBackIntoSquadOptions(player);
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
      <main className="flex">
        <Squad currentFormation={currentFormation} bench={bench} removePlayer={removePlayer} />
        <AvailablePlayers players={players} addPlayer={addPlayer} />
      </main>
      <Button title="SAVE SQUAD" onClickFunc={saveSquad} size="large" />
    </React.Fragment>
  );
}

function App() {
  const list = useSelector((store) => store.appReducer.list);

  const currentFormation = useSelector((store) => store.appReducer.currentFormation);
  const bench = useSelector((store) => store.appReducer.bench);
  const players = useSelector((store) => store.appReducer.players);
  const dispatch = useDispatch();

  const redux_add = (todo) => dispatch(appActions.redux_add(todo));
  const redux_delete = (id) => dispatch(appActions.redux_delete(id));

  const props = { list, currentFormation, bench, players, redux_add, redux_delete };

  return <Main {...props} />;
}

export default App;
