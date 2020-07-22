import { createAction } from 'redux-actions';
import { Card, Position } from '../common/interface/BattleInterface';
import store from '..';
import CARD_DICTIONARY from '../common/CardDictionary';
import { Dispatch } from 'react';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';
const SET_IS_TURN = 'App/Battle/SET_IS_TURN';
const SET_USER_HAND = 'App/Battle/SET_USER_HAND';
const SET_USER_MP = 'App/Battle/SET_USER_MP';
// const SET_ENEME_MP = 'App/Battle/SET_ENEME_MP';
const MOVE_USER_X_POSITION = 'App/Battle/MOVE_USER_X_POSITION';
const MOVE_USER_Y_POSITION = 'App/Battle/MOVE_USER_Y_POSITION';
const MOVE_ENEME_X_POSITION = 'App/Battle/MOVE_ENEME_X_POSITION';
const MOVE_ENEME_Y_POSITION = 'App/Battle/MOVE_ENEME_Y_POSITION';

export const select_character = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }
export const set_is_turn = createAction(SET_IS_TURN);
export const set_user_hand = createAction(SET_USER_HAND);
// payload: {hand: [{},{},{}] Array<Card> }
export const set_user_mp = createAction(SET_USER_MP);
// payload: {mp: 50 <mumber> }
// export const set_eneme_mp = createAction(SET_ENEME_MP);
// // payload: {mp: 50 <mumber> }
export const move_user_x_position = createAction(MOVE_USER_X_POSITION);
// payload: {x: 1 <number> }
export const move_user_y_position = createAction(MOVE_USER_Y_POSITION);
// payload: {y: 1 <number> }
export const move_eneme_x_position = createAction(MOVE_ENEME_X_POSITION);
// payload: {x: 1 <number> }
export const move_eneme_y_position = createAction(MOVE_ENEME_Y_POSITION);
// payload: {y: 1 <number> }

const initialState = {
  Instance: class Character {
    name: string;
    hp: number;
    mp: number;
    basicCards: Array<object>;
    uniqueCards: Array<object>;

    constructor(name: string) {
      this.name = name;
      this.hp = 100;
      this.mp = 100;
      this.basicCards = [
        CARD_DICTIONARY.UP,
        CARD_DICTIONARY.DOWN,
        CARD_DICTIONARY.LEFT,
        CARD_DICTIONARY.RIGHT,
        CARD_DICTIONARY.MANA_UP,
      ];
      this.uniqueCards = [];
    }
  },
  getCharacter: function (name: string) {
    const character = new initialState.Instance(name);
    if (name === '세키' || '레티') {
      character.uniqueCards = [
        CARD_DICTIONARY.ATT1,
        CARD_DICTIONARY.ATT2,
        CARD_DICTIONARY.ATT3,
        CARD_DICTIONARY.ATT4,
        CARD_DICTIONARY.GUARD,
      ];
    }
    return character;
  },
  userCharacter: {},
  eneme: {},
  isTurn: false,
  hand: [{}, {}, {}],
  enemeHand: [CARD_DICTIONARY.LEFT, CARD_DICTIONARY.LEFT, CARD_DICTIONARY.LEFT],
  field: [
    [
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
    ],
    [
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
    ],
    [
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
      { user: [null, null] },
    ],
  ],
  userPosition: { x: 0, y: 1 },
  enemePosition: { x: 3, y: 1 },
  nextTurn: function (
    userHand: Array<Card>,
    enemeHand: Array<Card>,
    setUserPosition: Dispatch<Position>,
    setEnemePosition: Dispatch<Position>,
  ) {
    let firstTurn = false;
    let middleTurn = false;
    let lastTurn = false;

    firstTurn = !firstTurn;
    if (firstTurn) {
      if (userHand[0].speed <= enemeHand[0].speed) {
        initialState.cardAction(true, userHand[0], setUserPosition);
        setTimeout(
          () => initialState.cardAction(false, enemeHand[0], setEnemePosition),
          500,
        );
        firstTurn = !firstTurn;
        setTimeout(() => (middleTurn = !middleTurn), 1000);
      }
    }
    setTimeout(() => {
      if (middleTurn) {
        if (userHand[1].speed <= enemeHand[1].speed) {
          initialState.cardAction(true, userHand[1], setUserPosition);
          setTimeout(
            () =>
              initialState.cardAction(false, enemeHand[1], setEnemePosition),
            500,
          );
          middleTurn = !middleTurn;
          setTimeout(() => (lastTurn = !lastTurn), 1000);
        }
      }
    }, 1500);
    setTimeout(() => {
      if (lastTurn) {
        if (userHand[2].speed <= enemeHand[2].speed) {
          initialState.cardAction(true, userHand[2], setUserPosition);
          setTimeout(
            () =>
              initialState.cardAction(false, enemeHand[2], setEnemePosition),
            500,
          );
          lastTurn = !lastTurn;
        }
        setTimeout(() => store.dispatch(set_is_turn()), 2000);
      }
    }, 3000);
  },
  cardAction(user: boolean, card: Card, setPosition: Dispatch<Position>) {
    if (user) {
      switch (card.type) {
        case CARD_DICTIONARY.UP.type:
          let upY = store.getState().Battle.userPosition.y - 1;
          if (upY < 0) upY = 0;
          store.dispatch(move_user_y_position({ y: upY }));
          setPosition(store.getState().Battle.userPosition);
          break;
        case CARD_DICTIONARY.DOWN.type:
          let downY = store.getState().Battle.userPosition.y + 1;
          if (downY > 2) downY = 2;
          store.dispatch(move_user_y_position({ y: downY }));
          setPosition(store.getState().Battle.userPosition);
          break;
        case CARD_DICTIONARY.LEFT.type:
          let leftX = store.getState().Battle.userPosition.x - 1;
          if (leftX < 0) leftX = 0;
          store.dispatch(move_user_x_position({ x: leftX }));
          setPosition(store.getState().Battle.userPosition);
          break;
        case CARD_DICTIONARY.RIGHT.type:
          let rightX = store.getState().Battle.userPosition.x + 1;
          if (rightX > 3) rightX = 3;
          store.dispatch(move_user_x_position({ x: rightX }));
          setPosition(store.getState().Battle.userPosition);
          break;
        // case 'ATT':
        // let rightX1 = store.getState().Battle.userPosition.x + 1;
        // if (rightX > 3) rightX = 3;
        // store.dispatch(move_user_x_position({ x: rightX }));
        // setPosition(store.getState().Battle.userPosition);
        // break;
      }
    } else {
      switch (card.type) {
        case CARD_DICTIONARY.UP.type:
          let upY = store.getState().Battle.userPosition.y - 1;
          if (upY < 0) upY = 0;
          store.dispatch(move_eneme_y_position({ y: upY }));
          setPosition(store.getState().Battle.enemePosition);
          break;
        case CARD_DICTIONARY.DOWN.type:
          let downY = store.getState().Battle.enemePosition.y + 1;
          if (downY > 2) downY = 2;
          store.dispatch(move_eneme_y_position({ y: downY }));
          setPosition(store.getState().Battle.enemePosition);
          break;
        case CARD_DICTIONARY.LEFT.type:
          let leftX = store.getState().Battle.enemePosition.x - 1;
          if (leftX < 0) leftX = 0;
          store.dispatch(move_eneme_x_position({ x: leftX }));
          setPosition(store.getState().Battle.enemePosition);
          break;
        case CARD_DICTIONARY.RIGHT.type:
          let rightX = store.getState().Battle.enemePosition.x + 1;
          if (rightX > 3) rightX = 3;
          store.dispatch(move_eneme_x_position({ x: rightX }));
          setPosition(store.getState().Battle.enemePosition);
          break;
      }
    }
  },
  clearHand: function () {
    store.dispatch(
      set_user_hand({
        hand: [{}, {}, {}].slice(0, [{}, {}, {}].length),
      }),
    );
  },
};

export default function Battle(state: any = initialState, action: any) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...state,
        userCharacter: initialState.getCharacter(action.payload.name),
        eneme: initialState.getCharacter('레티'),
      };
    case SET_IS_TURN:
      return {
        ...state,
        isTurn: !state.isTurn,
      };
    case SET_USER_HAND:
      return {
        ...state,
        hand: action.payload.hand,
      };
    case SET_USER_MP:
      return {
        ...state,
        userCharacter: { ...state.userCharacter, mp: action.payload.mp },
      };
    case MOVE_USER_X_POSITION:
      return {
        ...state,
        userPosition: {
          ...state.userPosition,
          x: action.payload.x,
        },
      };
    case MOVE_USER_Y_POSITION:
      return {
        ...state,
        userPosition: {
          ...state.userPosition,
          y: action.payload.y,
        },
      };
    case MOVE_ENEME_X_POSITION:
      return {
        ...state,
        enemePosition: {
          ...state.enemePosition,
          x: action.payload.x,
        },
      };
    case MOVE_ENEME_Y_POSITION:
      return {
        ...state,
        enemePosition: {
          ...state.enemePosition,
          y: action.payload.y,
        },
      };
    default:
      return state;
  }
}
