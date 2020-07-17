import { createAction } from 'redux-actions';
import { Card } from '../common/interface/BattleInterface';
import store from '..';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';
const MOVE_UP_USER = 'App/Battle/MOVE_UP_USER';
const MOVE_ENEME = 'App/Battle/MOVE_ENEME';

export const selectCharacter = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }
export const moveUpUser = createAction(MOVE_UP_USER);
// payload: {number: 1 <n> }
export const moveEneme = createAction(MOVE_ENEME);

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
        { type: 'UP', speed: 0, className: 'card0' },
        { type: 'DOWN', speed: 0, className: 'card1' },
        { type: 'LEFT', speed: 0, className: 'card2' },
        { type: 'RIGHT', speed: 0, className: 'card3' },
        { type: 'GUARD', speed: 0, className: 'card4' },
      ];
      this.uniqueCards = [];
    }
  },
  getCharacter: function (name: string) {
    const character = new initialState.Instance(name);
    if (name === '세키' || '레티') {
      character.uniqueCards = [
        { type: 'ATT1', speed: 1, className: 'card5' },
        { type: 'ATT2', speed: 1, className: 'card6' },
        { type: 'ATT3', speed: 1, className: 'card7' },
        { type: 'ATT4', speed: 1, className: 'card8' },
        { type: 'MANA UP', speed: 0, className: 'card9' },
      ];
    }
    return character;
  },
  userCharacter: {},
  eneme: {},
  hand: [{}, {}, {}],
  enemeHand: [
    { type: 'UP', speed: 0 },
    { type: 'UP', speed: 0 },
    { type: 'UP', speed: 0 },
  ],
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
  nextTurn: function (userHand: Array<Card>, enemeHand: Array<Card>) {
    let firstTurn = false;
    // let middleTurn = false;
    // let lastTurn = false;

    firstTurn = !firstTurn;
    if (firstTurn) {
      if (userHand[0].speed <= enemeHand[0].speed) {
        initialState.cardAction(true, userHand[0]);
      } else initialState.cardAction(false, enemeHand[0]);
    }
  },
  cardAction(user: boolean, card: Card) {
    if (user) {
      switch (card.type) {
        case 'UP':
          store.dispatch(
            moveUpUser({ y: store.getState().Battle.userPosition.y }),
          );
      }
    } else {
    }
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
    case MOVE_UP_USER:
      return {
        ...state,
        userPosition: {
          ...state.userPosition,
          y: action.payload.y + 1,
        },
      };
    case MOVE_ENEME:
      return {
        ...state,
        eneme: {
          ...state.eneme,
          enemePosition: action.payload.enemePosition,
        },
      };
    default:
      return state;
  }
}
