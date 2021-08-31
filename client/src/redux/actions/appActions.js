import {
  ADD_PLAYER,
  ADD_PLAYER_TO_BENCH,
  ADD_PLAYER_BACK_INTO_SQUAD_OPTIONS,
  REMOVE_SELECTED_PLAYER_FROM_SQUAD_OPTIONS,
  REMOVE_PLAYER,
  ADD_ITEM,
  DELETE_ITEM,
} from "../actionTypes";

// const redux_add_player = (player) => ({

// })

// const redux_add_player_to_bench = (player) => ({

// })

// const redux_add_player_back_into_squad_options = (player) => ({

// })

// const redux_remove_selected_player_from_squad_options = (player) => ({

// })

// const redux_remove_player = (player) => ({

// })

const redux_add = (todo) => ({
  type: ADD_ITEM,
  payload: todo,
});

const redux_delete = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

const appActions = {
  redux_add,
  redux_delete,
};

export default appActions;

// rename this file to be based on whichever component needs them
