// /* eslint-disable import/prefer-default-export */
// import { createStore } from "redux";
// import reducers from "./modules";

// export const store = createStore(reducers);

import { createStore } from 'redux';
import * as characterConfig from './common/Character';

export default createStore((state: any, action: any) => {
  if (state === undefined) {
    return { userCharacter: null, eneme: characterConfig.getCharacter('Reti') };
  }
  if (action.type === 'SELECT_CHARACTER') {
    return {
      ...state,
      userCharacter: characterConfig.getCharacter(action.name),
    };
  }
  return state;
});
