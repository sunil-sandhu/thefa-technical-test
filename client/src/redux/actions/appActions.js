import {
  ADD_PLAYER,
  ADD_PLAYER_TO_BENCH,
  UPDATE_SQUAD_OPTIONS,
  REMOVE_PLAYER,
  UPDATE_FORMATION,
  SAVE_SQUAD,
  LOAD_SQUAD,
  CLEAR_SQUAD,
} from "../actionTypes";

const redux_add_player = (player) => ({
  type: ADD_PLAYER,
  payload: player,
});

const redux_add_player_to_bench = (player) => ({
  type: ADD_PLAYER_TO_BENCH,
  payload: player,
});

const redux_update_squad_options = (player) => ({
  type: UPDATE_SQUAD_OPTIONS,
  payload: player,
});

const redux_remove_player = (player) => ({
  type: REMOVE_PLAYER,
  payload: player,
});

const redux_update_formation = (formation) => ({
  type: UPDATE_FORMATION,
  payload: formation,
});

const redux_save_squad = (squad) => ({
  type: SAVE_SQUAD,
  payload: squad,
});

const redux_load_squad = (squad) => ({
  type: LOAD_SQUAD,
  payload: squad,
});

const redux_clear_squad = () => ({
  type: CLEAR_SQUAD,
});

const appActions = {
  redux_add_player,
  redux_add_player_to_bench,
  redux_update_squad_options,
  redux_remove_player,
  redux_update_formation,
  redux_save_squad,
  redux_load_squad,
  redux_clear_squad,
};

export default appActions;
