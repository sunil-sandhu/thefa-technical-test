import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";
import React, { useState } from "react";
import Button from "./components/Button";
import Title from "./components/Title";
import FormationContainer from "./components/FormationContainer";
import { sortBenchByPositionOrder } from "./utils/sortBenchByPositionOrder";
import Squad from "./components/Squad";
import AvailablePlayers from "./components/AvailablePlayers";
import SavedSquadsContainer from "./components/SavedSquadContainer";

function Main({
  formation,
  bench,
  players,
  savedSquads,
  redux_update_formation,
  redux_update_squad_options,
  redux_add_player_to_bench,
  redux_save_squad,
  redux_load_squad,
  redux_clear_squad,
}) {
  const addPlayerToBench = (player) => {
    removePlayerFromSquadOptions(player);

    const indexOfMatchingSquadPositionToReplace = bench.findIndex((element) => element.name === "");
    if (indexOfMatchingSquadPositionToReplace !== -1) {
      let updatedBench = bench;
      updatedBench[indexOfMatchingSquadPositionToReplace] = player;
      updatedBench.sort(sortBenchByPositionOrder);
      redux_add_player_to_bench([...updatedBench]);
    }
  };

  const removePlayerFromSquadOptions = (player) => {
    // copy of old state
    let availablePlayers = players;

    // filter selected player out of available players in that player's position
    const playerToRemoveFromAvailablePlayers = players[player.position].filter(
      (p) => p.name !== player.name
    );

    // then replace the values in that position with the new filtered array
    availablePlayers[player.position] = playerToRemoveFromAvailablePlayers;

    redux_update_squad_options(availablePlayers);
  };

  const addPlayerToSquadOptions = (player) => {
    let availablePlayers = players;
    availablePlayers[player.position].push(player);
    redux_update_squad_options(availablePlayers);
  };

  const addPlayer = (player) => {
    let { selections } = formation;

    const returnMinusOneIfStartingLineupIsFull = selections
      .map((position) => position.name)
      .findIndex((element) => element === "");
    if (returnMinusOneIfStartingLineupIsFull === -1) {
      addPlayerToBench(player);
    } else {
      removePlayerFromSquadOptions(player);

      const indexOfMatchingSquadPositionToReplace = selections.findIndex(
        (element) => element.position === player.position && element.name === ""
      );

      if (indexOfMatchingSquadPositionToReplace !== -1) {
        selections[indexOfMatchingSquadPositionToReplace] = player;
        redux_update_formation(Object.assign({}, formation, selections));
      }
    }
  };

  const removePlayer = (player) => {
    let { selections } = formation;
    if (selections.includes(player)) {
      let indexPositionToClear = selections.findIndex((s) => s.name === player.name);
      selections[indexPositionToClear] = { position: player.position, name: "" };
      redux_update_formation(Object.assign({}, formation, selections));
      addPlayerToSquadOptions(player);
    } else {
      let indexPositionToClear = bench.findIndex((s) => s.name === player.name);
      bench[indexPositionToClear] = { position: "", name: "" };
      redux_add_player_to_bench([...bench]);
      addPlayerToSquadOptions(player);
    }
  };

  const [isSquadSaved, setIsSquadSaved] = useState(false);

  const saveSquad = () => {
    const _date = new Date();
    const squadState = {
      date: _date.toString(),
      title: formation.title,
      image: formation.image,
      positions: formation.positions,
      selections: formation.selections,
      bench,
      players,
    };
    redux_save_squad(squadState);
    setIsSquadSaved(true);
    setTimeout(() => {
      setIsSquadSaved(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <SavedSquadsContainer
        savedSquads={savedSquads}
        loadSquad={redux_load_squad}
        clearSquad={redux_clear_squad}
      />
      <Title title="ENGLAND SQUAD" />
      <FormationContainer formation={formation} handleSetFormation={redux_update_formation} />
      <main className="flex flex-column">
        <Squad formation={formation} bench={bench} removePlayer={removePlayer} />
        <AvailablePlayers players={players} addPlayer={addPlayer} />
      </main>
      {isSquadSaved ? (
        <Button title="SAVED" size="large" color="green" />
      ) : (
        <Button title="SAVE SQUAD" onClickFunc={saveSquad} size="large" />
      )}
    </React.Fragment>
  );
}

function App() {
  const formation = useSelector((store) => store.appReducer.formation);
  const bench = useSelector((store) => store.appReducer.bench);
  const players = useSelector((store) => store.appReducer.players);
  const savedSquads = useSelector((store) => store.appReducer.savedSquads);
  const dispatch = useDispatch();

  const redux_add_player_to_bench = (player) =>
    dispatch(appActions.redux_add_player_to_bench(player));

  const redux_update_squad_options = (player) =>
    dispatch(appActions.redux_update_squad_options(player));

  const redux_update_formation = (formation) =>
    dispatch(appActions.redux_update_formation(formation));

  const redux_save_squad = (squad) => dispatch(appActions.redux_save_squad(squad));

  const redux_load_squad = (squad) => dispatch(appActions.redux_load_squad(squad));

  const redux_clear_squad = () => dispatch(appActions.redux_clear_squad());

  const props = {
    formation,
    bench,
    players,
    savedSquads,
    redux_update_squad_options,
    redux_update_formation,
    redux_add_player_to_bench,
    redux_save_squad,
    redux_load_squad,
    redux_clear_squad,
  };

  return <Main {...props} />;
}

export default App;
