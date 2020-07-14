import { createAction } from 'redux-actions';

const SELECT_CHARACTER = 'App/Battle/SELECT_CHARACTER';

export const selectCharacter = createAction(SELECT_CHARACTER);
// payload: {CharacterName: Seki <string> }

const initialState = {
  Instance: class Character {
    name: string;

    hp: number;

    mp: number;

    xPosition: number;

    yPosition: number;

    basicCards: Array<object>;

    uniqueCards: Array<object>;

    constructor(name: string) {
      this.name = name;
      this.hp = 100;
      this.mp = 100;
      this.xPosition = 0;
      this.yPosition = 0;
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
};

export default function Battle(state: any = initialState, action: any) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...state,
        userCharacter: initialState.getCharacter(action.payload.name),
        eneme: initialState.getCharacter('레티'),
      };
    default:
      return state;
  }
}
