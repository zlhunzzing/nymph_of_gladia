import { createAction } from 'redux-actions';

const SET_TOKEN = 'App/Auth/SET_TOKEN';
const USER_SIGN_IN = 'App/Auth/USER_SIGN_IN';

export const setToken = createAction(SET_TOKEN);
// payload: {token: token}
export const user_sign_in = createAction(USER_SIGN_IN);

const initialState = {
  token: null,
  isUser: false,
};

export default function HandleModal(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case USER_SIGN_IN:
      return {
        ...state,
        isUser: true,
      };
    default:
      return state;
  }
}
