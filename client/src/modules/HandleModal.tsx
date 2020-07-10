import { createAction } from 'redux-actions';

const SET_MODAL_IS_OPEN = 'App/Battle/SET_MODAL_IS_OPEN';
const SET_MODAL_CONTENT = 'App/Battle/SET_MODAL_CONTENT';
const SET_MODAL_IS_BUTTON = 'App/Battle/SET_MODAL_IS_BUTTON';

export const setModalIsOpen = createAction(SET_MODAL_IS_OPEN);
// payload: {isOpen: true, false <boolean> }

export const setModalContent = createAction(SET_MODAL_CONTENT);
// payload: {content: "hello" <string> }

export const setModalIsButton = createAction(SET_MODAL_IS_BUTTON);
// payload: {isButton: true, false <boolean> }

const initialState = {
  modalIsOpen: false,
  modalContent: '',
  modalIsButton: true,
};

export default function HandleModal(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_MODAL_IS_OPEN:
      return {
        ...state,
        modalIsOpen: action.payload.isOpen,
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload.content,
      };
    case SET_MODAL_IS_BUTTON:
      return {
        ...state,
        modalIsButton: action.payload.isButton,
      };
    default:
      return state;
  }
}
