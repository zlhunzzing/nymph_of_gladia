import { createAction } from 'redux-actions';

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
        { type: 'UP', className: 'card0' },
        { type: 'DOWN', className: 'card1' },
        { type: 'LEFT', className: 'card2' },
        { type: 'RIGHT', className: 'card3' },
        { type: 'GUARD', className: 'card4' },
      ];
      this.uniqueCards = [];
    }
  },
  getCharacter: function (name: string) {
    const character = new initialState.Instance(name);
    if (name === '세키') {
      character.uniqueCards = [
        { type: 'ATT1', className: 'card5' },
        { type: 'ATT2', className: 'card6' },
        { type: 'ATT3', className: 'card7' },
        { type: 'ATT4', className: 'card8' },
        { type: 'MANA UP', className: 'card9' },
      ];
    }
    return character;
  },
  userCharacter: {},
  eneme: {},
  hand: [{}, {}, {}],
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
