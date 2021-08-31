import { bench as _bench } from "../../options/bench";
import { formations } from "../../options/formations";
import { players as _players } from "../../options/players";

import {
  ADD_PLAYER_TO_BENCH,
  UPDATE_SQUAD_OPTIONS,
  UPDATE_FORMATION,
  SAVE_SQUAD,
  LOAD_SQUAD,
  CLEAR_SQUAD,
} from "../actionTypes";

const initialState = {
  formation: formations[0],
  bench: _bench,
  players: _players,
  savedSquads: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER_TO_BENCH:
      state = {
        ...state,
        bench: action.payload,
      };
      return state;
    case UPDATE_SQUAD_OPTIONS:
      state = {
        ...state,
        players: action.payload,
      };
      return state;
    case UPDATE_FORMATION:
      state = {
        ...state,
        bench: initialState.bench,
        players: initialState.players,
        formation: action.payload,
      };
      return state;
    case SAVE_SQUAD:
      state = {
        ...state,
        savedSquads: [...state.savedSquads, action.payload],
      };
      return state;
    case LOAD_SQUAD:
      state = {
        ...state,
        formation: action.payload,
        bench: action.payload.bench,
        players: action.payload.players,
      };
      return state;

    case CLEAR_SQUAD:
      state = {
        ...state,
        formation: initialState.formation,
        bench: initialState.bench,
        players: initialState.players,
      };
      return state;
    default:
      return state;
  }
}
