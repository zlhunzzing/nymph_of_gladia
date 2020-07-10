import { createAction } from 'redux-actions';
import * as characterConfig from '../common/Character';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';

export const selectCharacter = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }

const initialState = {
  userCharacter: null,
  eneme: characterConfig.getCharacter('레티'),
};

export default function origin(state: any = initialState, action: any) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...state,
        userCharacter: characterConfig.getCharacter(action.payload.name),
      };
    default:
      return state;
  }
}
