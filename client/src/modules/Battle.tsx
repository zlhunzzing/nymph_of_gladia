import { createAction } from "redux-actions";
import * as characterConfig from "../config/Character";

const SELECT_CHARACTER = "App/Battle/SELECT_CHARACTER";

export const selectCharacter = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }

const initialState = {
  userCharacter: "",
  // eneme: characterConfig.getCharacter("Rati"),
};

export default function Battle(state = initialState, action: any) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...state,
        userCharacter: characterConfig.getCharacter(
          action.payload.CharacterName,
        ),
      };
    default:
      return state;
  }
}
