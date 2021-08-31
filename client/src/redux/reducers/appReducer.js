import { bench as _bench } from "../../options/bench";
import { formations } from "../../options/formations";
import { players as _players } from "../../options/players";
import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";

// const [players, setPlayers] = useState(_players);

const initialState = {
  list: [
    { id: 1, text: "clean the house" },
    { id: 2, text: "buy milk" },
  ],
  currentFormation: formations[0],
  bench: _bench,
  players: _players,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      state = {
        list: [...state.list, action.payload],
      };
      return state;
    case DELETE_ITEM:
      state = {
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
      return state;
    default:
      return state;
  }
}

// also rename based on which file needs these
