import { createAction } from 'redux-actions';
import { Card, PhaseNumber } from '../common/interface/BattleInterface';
import store from '..';
import CARD_DICTIONARY from '../common/CardDictionary';
import { Dispatch } from 'react';

const SELECT_PLAYER = 'App/Battle/SELECT_PLAYER';
const SET_IS_TURN = 'App/Battle/SET_IS_TURN';
const SET_PLAYER1_HAND = 'App/Battle/SET_PLAYER1_HAND';
const SET_PLAYER1_HP = 'App/Battle/SET_PLAYER1_HP';
const SET_PLAYER1_MP = 'App/Battle/SET_PLAYER1_MP';
const SET_PLAYER1_DEF = 'App/Battle/SET_PLAYER1_DEF';
const SET_PLAYER2_HP = 'App/Battle/SET_PLAYER2_HP';
const MOVE_PLAYER1_X_POSITION = 'App/Battle/MOVE_PLAYER1_X_POSITION';
const MOVE_PLAYER1_Y_POSITION = 'App/Battle/MOVE_PLAYER1_Y_POSITION';
const MOVE_PLAYER2_X_POSITION = 'App/Battle/MOVE_PLAYER2_X_POSITION';
const MOVE_PLAYER2_Y_POSITION = 'App/Battle/MOVE_PLAYER2_Y_POSITION';
const FIELD_ACTIVATION = 'App/Battle/FIELD_ACTIVATION';

export const select_player = createAction(SELECT_PLAYER);
// payload: {CharacterName: Seki <string> }
export const set_is_turn = createAction(SET_IS_TURN);
export const set_player1_hand = createAction(SET_PLAYER1_HAND);
// payload: {hand: [{},{},{}] Array<Card> }
export const set_player1_hp = createAction(SET_PLAYER1_HP);
// payload: {hp: 75 <number> }
export const set_player1_mp = createAction(SET_PLAYER1_MP);
// payload: {mp: 50 <mumber> }
export const set_player1_def = createAction(SET_PLAYER1_DEF);
// payload: {defence: 10 <number> }
export const set_player2_hp = createAction(SET_PLAYER2_HP);
// payload: {hp: 75 <number> }
export const move_player1_x_position = createAction(MOVE_PLAYER1_X_POSITION);
// payload: {x: 1 <number> }
export const move_player1_y_position = createAction(MOVE_PLAYER1_Y_POSITION);
// payload: {y: 1 <number> }
export const move_player2_position = createAction(MOVE_PLAYER2_X_POSITION);
// payload: {x: 1 <number> }
export const move_player2_y_position = createAction(MOVE_PLAYER2_Y_POSITION);
// payload: {y: 1 <number> }
export const field_activation = createAction(FIELD_ACTIVATION);
// payload: {activeField: ...[[{effect:true},{},{},{}],[],[]] Array<Array<object>> }

const initialState = {
  Instance: class Character {
    name: string;
    hp: number;
    mp: number;
    def: number;
    basicCards: Array<object>;
    uniqueCards: Array<object>;
    // player: number;
    hand: Array<Card>;
    position: object;

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
      // this.player = 1;
      this.hand = [
        CARD_DICTIONARY.NONE,
        CARD_DICTIONARY.NONE,
        CARD_DICTIONARY.NONE,
      ];
      this.position = { x: 0, y: 1 };
    }
  },
  createCharacter: function (name: string, isUser: boolean = false) {
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
    if (!isUser) {
      character.hand = [
        CARD_DICTIONARY.LEFT,
        CARD_DICTIONARY.LEFT,
        CARD_DICTIONARY.ATT1,
      ];
      // character.player = 2;
      character.position = { x: 3, y: 1 };
    }
    return character;
  },
  player1: {},
  player2: {},
  isTurn: false,
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
  nextTurn: function (
    setPlayer1: Dispatch<object>,
    setPlayer2: Dispatch<object>,
    setField: Dispatch<Array<object>>,
  ) {
    let firstPhase = false;
    let middlePhase = false;
    let lastPhase = false;
    let player1Hand = store.getState().Battle.player1.hand;
    let player2Hand = store.getState().Battle.player2.hand;

    firstPhase = !firstPhase;
    if (firstPhase) {
      middlePhase = initialState.phase(
        PhaseNumber.FIRST,
        player1Hand,
        player2Hand,
        setPlayer1,
        setPlayer2,
        setField,
      );
    }
    setTimeout(() => {
      if (middlePhase) {
        lastPhase = initialState.phase(
          PhaseNumber.MIDDLE,
          player1Hand,
          player2Hand,
          setPlayer1,
          setPlayer2,
          setField,
        );
      }
    }, 2000);
    setTimeout(() => {
      if (lastPhase) {
        initialState.phase(
          PhaseNumber.LAST,
          player1Hand,
          player2Hand,
          setPlayer1,
          setPlayer2,
          setField,
        );
        setTimeout(() => store.dispatch(set_is_turn()), 2000);
      }
    }, 4000);
  },
  phase(
    phaseNumber: PhaseNumber,
    player1Hand: Array<Card>,
    player2Hand: Array<Card>,
    setPlayer1: Dispatch<object>,
    setPlayer2: Dispatch<object>,
    setField: Dispatch<Array<Array<object>>>,
  ) {
    if (player1Hand[phaseNumber].speed <= player2Hand[phaseNumber].speed) {
      initialState.cardAction(
        true,
        player1Hand[phaseNumber],
        setPlayer1,
        setPlayer2,
        setField,
      );
      setTimeout(
        () =>
          initialState.cardAction(
            false,
            player2Hand[phaseNumber],
            setPlayer1,
            setPlayer2,
            setField,
          ),
        1000,
      );
      initialState.turnCheck();
      return true;
    } else {
      initialState.cardAction(
        false,
        player2Hand[phaseNumber],
        setPlayer1,
        setPlayer2,
        setField,
      );
      setTimeout(
        () =>
          initialState.cardAction(
            true,
            player1Hand[phaseNumber],
            setPlayer1,
            setPlayer2,
            setField,
          ),
        1000,
      );
      initialState.turnCheck();
      return true;
    }
  },
  cardAction(
    isUser: boolean,
    card: Card,
    setPlayer1: Dispatch<object>,
    setPlayer2: Dispatch<object>,
    setField: Dispatch<Array<Array<object>>>,
  ) {
    let field = [
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
    ];
    store.dispatch(field_activation({ field: field.slice(0, 3) }));
    setField(field.slice(0, 3));
    if (isUser) {
      switch (card.type) {
        case CARD_DICTIONARY.UP.type:
          let upY = store.getState().Battle.player1.position.y - 1;
          if (upY < 0) upY = 0;
          store.dispatch(move_player1_y_position({ y: upY }));
          setPlayer1({ ...store.getState().Battle.player1 });
          break;
        case CARD_DICTIONARY.DOWN.type:
          let downY = store.getState().Battle.player1.position.y + 1;
          if (downY > 2) downY = 2;
          store.dispatch(move_player1_y_position({ y: downY }));
          setPlayer1({ ...store.getState().Battle.player1 });
          break;
        case CARD_DICTIONARY.LEFT.type:
          let leftX = store.getState().Battle.player1.position.x - 1;
          if (leftX < 0) leftX = 0;
          store.dispatch(move_player1_x_position({ x: leftX }));
          setPlayer1({ ...store.getState().Battle.player1 });
          break;
        case CARD_DICTIONARY.RIGHT.type:
          let rightX = store.getState().Battle.player1.position.x + 1;
          if (rightX > 3) rightX = 3;
          store.dispatch(move_player1_x_position({ x: rightX }));
          setPlayer1({ ...store.getState().Battle.player1 });
          break;
        case 'ATT':
          let mana = store.getState().Battle.player1.mp - card.cost;
          store.dispatch(set_player1_mp({ mp: mana }));
          setPlayer1({ ...store.getState().Battle.player1 });

          let effectiveRangeX = null;
          let effectiveRangeY = null;
          let player1Position = store.getState().Battle.player1.position;
          let player2Position = store.getState().Battle.player2.position;
          let field = store.getState().Battle.field;
          for (let i = 0; i < card.range.length; i++) {
            effectiveRangeX = player1Position.x + card.range[i][0];
            effectiveRangeY = player1Position.y + card.range[i][1];
            if (
              effectiveRangeX <= 3 &&
              effectiveRangeX >= 0 &&
              effectiveRangeY <= 2 &&
              effectiveRangeY >= -1
            ) {
              field[effectiveRangeY][effectiveRangeX].effect = true;
              if (
                effectiveRangeX === player2Position.x &&
                effectiveRangeY === player2Position.y
              ) {
                let hp = store.getState().Battle.player2.hp - card.power;
                store.dispatch(
                  set_player2_hp({
                    hp: hp,
                  }),
                );
                setPlayer2({ ...store.getState().Battle.player2, hp: hp });
              }
            }
            store.dispatch(field_activation({ field: field.slice(0, 3) }));
            setField(field.slice(0, 3));
          }
          break;
        case CARD_DICTIONARY.MANA_UP.type:
          let mp = store.getState().Battle.player1.mp + 15;
          if (mp >= 100) mp = 100;
          setPlayer1({ ...store.getState().Battle.player1, mp: mp });
          store.dispatch(
            set_player1_mp({
              mp,
            }),
          );
          break;
        case CARD_DICTIONARY.GUARD.type:
          store.dispatch(
            set_player1_def({
              def: 10,
            }),
          );
          break;
      }
    } else {
      switch (card.type) {
        case CARD_DICTIONARY.UP.type:
          let upY = store.getState().Battle.player1.position.y - 1;
          if (upY < 0) upY = 0;
          store.dispatch(move_player2_y_position({ y: upY }));
          setPlayer2({ ...store.getState().Battle.player2 });
          break;
        case CARD_DICTIONARY.DOWN.type:
          let downY = store.getState().Battle.player2.position.y + 1;
          if (downY > 2) downY = 2;
          store.dispatch(move_player2_y_position({ y: downY }));
          setPlayer2({ ...store.getState().Battle.player2 });
          break;
        case CARD_DICTIONARY.LEFT.type:
          let leftX = store.getState().Battle.player2.position.x - 1;
          if (leftX < 0) leftX = 0;
          store.dispatch(move_player2_position({ x: leftX }));
          setPlayer2({ ...store.getState().Battle.player2 });
          break;
        case CARD_DICTIONARY.RIGHT.type:
          let rightX = store.getState().Battle.player2.position.x + 1;
          if (rightX > 3) rightX = 3;
          store.dispatch(move_player2_position({ x: rightX }));
          setPlayer2({ ...store.getState().Battle.player2 });
          break;
        case 'ATT':
          let effectiveRangeX = null;
          let effectiveRangeY = null;
          let player1Position = store.getState().Battle.player1.position;
          let player2Position = store.getState().Battle.player2.position;

          for (let i = 0; i < card.range.length; i++) {
            effectiveRangeX = player2Position.x + card.range[i][0];
            effectiveRangeY = player2Position.y + card.range[i][1];
            if (
              effectiveRangeX <= 3 &&
              effectiveRangeX >= 0 &&
              effectiveRangeY >= 2 &&
              effectiveRangeY >= -1
            ) {
            }
            if (
              effectiveRangeX === player1Position.x &&
              effectiveRangeY === player1Position.y
            ) {
              const hp =
                store.getState().Battle.player1.hp -
                (card.power - store.getState().Battle.player1.def);
              store.dispatch(
                set_player1_hp({
                  hp: hp,
                }),
              );
              setPlayer1({
                ...store.getState().Battle.player1,
                hp: hp,
              });
              store.dispatch(
                set_player1_def({
                  def: 0,
                }),
              );
            }
          }
          break;
      }
    }
  },
  turnCheck: function (lastPhase: boolean = false) {
    let player1Hp = store.getState().Battle.player1.hp;
    let player2Hp = store.getState().Battle.player2.hp;
    if (player1Hp <= 0) {
      if (player2Hp <= 0) {
        console.log('Draw');
      } else {
        console.log('Lose');
      }
    } else if (player2Hp <= 0) {
      console.log('Win');
    } else {
      console.log('Continue...');
    }
    if (lastPhase) {
      let player1Mp = store.getState().Battle.player1.mp + 15;
      if (player1Mp > 100) player1Mp = 100;
      store.dispatch(set_player1_mp({ mp: player1Mp }));
    }
  },
  clearHand: function () {
    store.dispatch(
      set_player1_hand({
        hand: [
          CARD_DICTIONARY.NONE,
          CARD_DICTIONARY.NONE,
          CARD_DICTIONARY.NONE,
        ].slice(0, 3),
      }),
    );
  },
};

export default function Battle(state: any = initialState, action: any) {
  switch (action.type) {
    case SELECT_PLAYER:
      return {
        ...state,
        player1: initialState.createCharacter(action.payload.name, true),
        player2: initialState.createCharacter('레티'),
      };
    case SET_IS_TURN:
      return {
        ...state,
        isTurn: !state.isTurn,
      };
    case SET_PLAYER1_HAND:
      return {
        ...state,
        player1: {
          ...state.player1,
          hand: action.payload.hand,
        },
      };
    case SET_PLAYER1_HP:
      return {
        ...state,
        player1: { ...state.player1, hp: action.payload.hp },
      };
    case SET_PLAYER1_MP:
      return {
        ...state,
        player1: { ...state.player1, mp: action.payload.mp },
      };
    case SET_PLAYER1_DEF:
      return {
        ...state,
        player1: {
          ...state.player1,
          def: action.payload.def,
        },
      };
    case SET_PLAYER2_HP:
      return {
        ...state,
        player2: { ...state.player2, hp: action.payload.hp },
      };
    case MOVE_PLAYER1_X_POSITION:
      return {
        ...state,
        player1: {
          ...state.player1,
          position: { ...state.player1.position, x: action.payload.x },
        },
      };
    case MOVE_PLAYER1_Y_POSITION:
      return {
        ...state,
        player1: {
          ...state.player1,
          position: { ...state.player1.position, y: action.payload.y },
        },
      };
    case MOVE_PLAYER2_X_POSITION:
      return {
        ...state,
        player2: {
          ...state.player2,
          position: { ...state.player2.position, x: action.payload.x },
        },
      };
    case MOVE_PLAYER2_Y_POSITION:
      return {
        ...state,
        player2: {
          ...state.player2,
          position: { ...state.player2.position, y: action.payload.y },
        },
      };
    case FIELD_ACTIVATION:
      return {
        ...state,
        field: action.payload.field,
      };
    default:
      return state;
  }
}
