import { createAction } from 'redux-actions';
import { Card, Position } from '../common/interface/BattleInterface';
import store from '..';
import CARD_DICTIONARY from '../common/CardDictionary';
import { Dispatch } from 'react';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';
const SET_IS_TURN = 'App/Battle/SET_IS_TURN';
const SET_USER_HAND = 'App/Battle/SET_USER_HAND';
const SET_USER_HP = 'App/Battle/SET_USER_HP';
const SET_USER_MP = 'App/Battle/SET_USER_MP';
const SET_USER_DEF = 'App/Battle/SET_USER_DEF';
const SET_ENEME_HP = 'App/Battle/SET_ENEME_HP';
const MOVE_USER_X_POSITION = 'App/Battle/MOVE_USER_X_POSITION';
const MOVE_USER_Y_POSITION = 'App/Battle/MOVE_USER_Y_POSITION';
const MOVE_ENEME_X_POSITION = 'App/Battle/MOVE_ENEME_X_POSITION';
const MOVE_ENEME_Y_POSITION = 'App/Battle/MOVE_ENEME_Y_POSITION';

export const select_character = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }
export const set_is_turn = createAction(SET_IS_TURN);
export const set_user_hand = createAction(SET_USER_HAND);
// payload: {hand: [{},{},{}] Array<Card> }
export const set_user_hp = createAction(SET_USER_HP);
// payload: {hp: 75 <number> }
export const set_user_mp = createAction(SET_USER_MP);
// payload: {mp: 50 <mumber> }
export const set_user_def = createAction(SET_USER_DEF);
// payload: {defence: 10 <number> }
export const set_eneme_hp = createAction(SET_ENEME_HP);
// payload: {hp: 75 <number> }
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
    def: number;
    basicCards: Array<object>;
    uniqueCards: Array<object>;

    constructor(name: string) {
      this.name = name;
      this.hp = 100;
      this.mp = 100;
      this.def = 0;
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
  enemeHand: [CARD_DICTIONARY.LEFT, CARD_DICTIONARY.LEFT, CARD_DICTIONARY.ATT1],
  field: [
    [
      { effect: false },
      { effect: false },
      { effect: false },
      { effect: false },
    ],
    [
      { effect: false },
      { effect: false },
      { effect: false },
      { effect: false },
    ],
    [
      { effect: false },
      { effect: false },
      { effect: false },
      { effect: false },
    ],
  ],
  userPosition: { x: 0, y: 1 },
  enemePosition: { x: 3, y: 1 },
  // checkHand: function (hand: any, position: string) {
  //   for (let i = 0; i < hand.length; i++) {
  //     if (hand.position === position) {
  //       return true;
  //     }
  //   }
  // },
  nextTurn: function (
    userHand: Array<Card>,
    enemeHand: Array<Card>,
    setUserPosition: Dispatch<Position>,
    setEnemePosition: Dispatch<Position>,
    setUser: Dispatch<object>,
    setMana: Dispatch<number>,
  ) {
    let firstTurn = false;
    let middleTurn = false;
    let lastTurn = false;

    firstTurn = !firstTurn;
    if (firstTurn) {
      if (userHand[0].speed <= enemeHand[0].speed) {
        initialState.cardAction(
          true,
          userHand[0],
          setUserPosition,
          setUser,
          setMana,
        );
        setTimeout(
          () =>
            initialState.cardAction(
              false,
              enemeHand[0],
              setEnemePosition,
              setUser,
              setMana,
            ),
          500,
        );
        firstTurn = !firstTurn;
        initialState.turnCheck();
        setTimeout(() => (middleTurn = !middleTurn), 1000);
      } else {
        initialState.cardAction(
          false,
          enemeHand[0],
          setEnemePosition,
          setUser,
          setMana,
        );
        setTimeout(
          () =>
            initialState.cardAction(
              true,
              userHand[0],
              setUserPosition,
              setUser,
              setMana,
            ),
          500,
        );
        firstTurn = !firstTurn;
        initialState.turnCheck();
        setTimeout(() => (middleTurn = !middleTurn), 1000);
      }
    }
    setTimeout(() => {
      if (middleTurn) {
        if (userHand[1].speed >= enemeHand[1].speed) {
          initialState.cardAction(
            true,
            userHand[1],
            setUserPosition,
            setUser,
            setMana,
          );
          setTimeout(
            () =>
              initialState.cardAction(
                false,
                enemeHand[1],
                setEnemePosition,
                setUser,
                setMana,
              ),
            500,
          );
          middleTurn = !middleTurn;
          initialState.turnCheck();
          setTimeout(() => (lastTurn = !lastTurn), 1000);
        } else {
          initialState.cardAction(
            false,
            enemeHand[1],
            setEnemePosition,
            setUser,
            setMana,
          );
          setTimeout(
            () =>
              initialState.cardAction(
                true,
                userHand[1],
                setUserPosition,
                setUser,
                setMana,
              ),
            500,
          );
          middleTurn = !middleTurn;
          initialState.turnCheck();
          setTimeout(() => (lastTurn = !lastTurn), 1000);
        }
      }
    }, 1500);
    setTimeout(() => {
      if (lastTurn) {
        if (userHand[2].speed <= enemeHand[2].speed) {
          initialState.cardAction(
            true,
            userHand[2],
            setUserPosition,
            setUser,
            setMana,
          );
          setTimeout(
            () =>
              initialState.cardAction(
                false,
                enemeHand[2],
                setEnemePosition,
                setUser,
                setMana,
              ),
            500,
          );
          lastTurn = !lastTurn;
          initialState.turnCheck();
        } else {
          initialState.cardAction(
            false,
            enemeHand[2],
            setEnemePosition,
            setUser,
            setMana,
          );
          setTimeout(
            () =>
              initialState.cardAction(
                true,
                userHand[2],
                setUserPosition,
                setUser,
                setMana,
              ),
            500,
          );
          lastTurn = !lastTurn;
          initialState.turnCheck();
        }
        setTimeout(() => store.dispatch(set_is_turn()), 2000);
      }
    }, 3000);
  },
  cardAction(
    user: boolean,
    card: Card,
    setPosition: Dispatch<Position>,
    setUser: Dispatch<object>,
    setMana: Dispatch<number>,
  ) {
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
        case 'ATT':
          let mana = store.getState().Battle.userCharacter.mp - card.cost;
          store.dispatch(set_user_mp({ mp: mana }));
          setMana(mana);

          let effectiveRangeX = null;
          let effectiveRangeY = null;
          let userPosition = store.getState().Battle.userPosition;
          let enemePosition = store.getState().Battle.enemePosition;
          for (let i = 0; i < card.range.length; i++) {
            effectiveRangeX = userPosition.x + card.range[i][0];
            effectiveRangeY = userPosition.y + card.range[i][1];
            if (
              effectiveRangeX <= 3 &&
              effectiveRangeX >= 0 &&
              effectiveRangeY >= 2 &&
              effectiveRangeY >= -1
            ) {
            }
            if (
              effectiveRangeX === enemePosition.x &&
              effectiveRangeY === enemePosition.y
            ) {
              store.dispatch(
                set_eneme_hp({
                  hp: store.getState().Battle.eneme.hp - card.power,
                }),
              );
            }
          }
          break;
        case CARD_DICTIONARY.MANA_UP.type:
          let mp = store.getState().Battle.userCharacter.mp + 15;
          if (mp >= 100) mp = 100;
          setUser({ ...store.getState().Battle.userCharacter, mp: mp });
          store.dispatch(
            set_user_mp({
              mp,
            }),
          );
          break;
        case CARD_DICTIONARY.GUARD.type:
          store.dispatch(
            set_user_def({
              def: 10,
            }),
          );
          break;
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
        case 'ATT':
          let effectiveRangeX = null;
          let effectiveRangeY = null;
          let userPosition = store.getState().Battle.userPosition;
          let enemePosition = store.getState().Battle.enemePosition;
          for (let i = 0; i < card.range.length; i++) {
            effectiveRangeX = enemePosition.x + card.range[i][0];
            effectiveRangeY = enemePosition.y + card.range[i][1];
            if (
              effectiveRangeX <= 3 &&
              effectiveRangeX >= 0 &&
              effectiveRangeY >= 2 &&
              effectiveRangeY >= -1
            ) {
            }
            if (
              effectiveRangeX === userPosition.x &&
              effectiveRangeY === userPosition.y
            ) {
              store.dispatch(
                set_user_hp({
                  hp:
                    store.getState().Battle.userCharacter.hp -
                    (card.power - store.getState().Battle.userCharacter.def),
                }),
              );
              store.dispatch(
                set_user_def({
                  def: 0,
                }),
              );
            }
          }
          break;
      }
    }
  },
  turnCheck: function () {
    let userHp = store.getState().Battle.userCharacter.hp;
    let enemeHp = store.getState().Battle.eneme.hp;
    if (userHp <= 0) {
      if (enemeHp <= 0) {
        console.log('Draw');
      } else {
        console.log('Lose');
      }
    } else if (enemeHp <= 0) {
      console.log('Win');
    } else {
      console.log('Continue...');
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
    case SET_USER_HP:
      return {
        ...state,
        userCharacter: { ...state.userCharacter, hp: action.payload.hp },
      };
    case SET_USER_MP:
      return {
        ...state,
        userCharacter: { ...state.userCharacter, mp: action.payload.mp },
      };
    case SET_USER_DEF:
      return {
        ...state,
        userCharacter: { ...state.userCharacter, def: action.payload.def },
      };
    case SET_ENEME_HP:
      return {
        ...state,
        eneme: { ...state.eneme, hp: action.payload.hp },
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
