import { createAction } from 'redux-actions';
import { Card } from '../common/interface/BattleInterface';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';
const MOVE_CHARACTER = 'App/Battle/MOVE_CHARACTER';
const MOVE_ENEME = 'App/Battle/MOVE_ENEME';

export const selectCharacter = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }
export const moveCharacter = createAction(MOVE_CHARACTER);
// payload: {xPosition: 3 <number>, yPosition: 1 <number> }
export const moveEneme = createAction(MOVE_ENEME);
// payload: {xPosition: 3 <number>, yPosition: 1 <number> }

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
  enemeHand: [{ type: 'UP' }, { type: 'UP' }, { type: 'UP' }],
  field: [
    [
      { player: [null, null] },
      { player: [null, null] },
      { player: [null, null] },
      { player: [null, null] },
    ],
    [
      { player: [1, null] },
      { player: [null, null] },
      { player: [null, null] },
      { player: [2, null] },
    ],
    [
      { player: [null, null] },
      { player: [null, null] },
      { player: [null, null] },
      { player: [null, null] },
    ],
  ],
  nextTurn: function (playerHand: Array<Card>) {
    // 서로의 카드를 확인
    let firstTurn = false;
    // let middleTurn = false;
    // let lastTurn = false;

    firstTurn = !firstTurn;
    if (firstTurn) {
      return playerHand[0].speed;
    }
    // 카드를 순서에 맞게 사용
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
    case MOVE_ENEME:
      return {
        ...state,
        eneme: {
          ...state.eneme,
          xPosition: action.payload.xPosition,
          yPosition: action.payload.yPosition,
        },
      };
    default:
      return state;
  }
}
