import { createAction } from 'redux-actions';
import io from 'socket.io-client';

export const socketServer = io('http://localhost:3000');

const SET_ROOMS = 'App/Socket/SET_ROOMS';
const SET_ROOM_INFO = 'App/Socket/SET_ROOM_INFO';

export const set_rooms = createAction(SET_ROOMS);
export const set_room_info = createAction(SET_ROOM_INFO);

const initialState = {
  rooms: [],
  roomInfo: null,
};

export default function Socket(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
      };
    case SET_ROOM_INFO:
      return {
        ...state,
        roomInfo: action.payload.roomInfo,
      };
    default:
      return state;
  }
}
