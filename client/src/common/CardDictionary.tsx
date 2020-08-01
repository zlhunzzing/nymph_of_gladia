const cardRanges = {
  noneRange: [],
  middleRow: [
    [-1, 0],
    [0, 0],
    [1, 0],
  ],
  middleColumn: [
    [0, 1],
    [0, 0],
    [0, -1],
  ],
};

const CARD_DICTIONARY = {
  NONE: {
    type: 'NONE',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'none',
  },
  UP: {
    type: 'UP',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'card0',
  },
  DOWN: {
    type: 'DOWN',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'card1',
  },
  LEFT: {
    type: 'LEFT',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'card2',
  },
  RIGHT: {
    type: 'RIGHT',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'card3',
  },
  MANA_UP: {
    type: 'MANA UP',
    speed: 0,
    cost: 0,
    power: 0,
    range: cardRanges.noneRange,
    position: 'card4',
  },
  ATT1: {
    type: 'ATT',
    speed: 1,
    cost: 15,
    power: 20,
    range: cardRanges.middleRow,
    position: 'card5',
  },
  ATT2: {
    type: 'ATT',
    speed: 1,
    cost: 15,
    power: 20,
    range: cardRanges.middleRow,
    position: 'card6',
  },
  ATT3: {
    type: 'ATT',
    speed: 1,
    cost: 15,
    power: 20,
    range: cardRanges.middleRow,
    position: 'card7',
  },
  ATT4: {
    type: 'ATT',
    speed: 1,
    cost: 15,
    power: 20,
    range: cardRanges.middleRow,
    position: 'card8',
  },
  GUARD: { type: 'GUARD', speed: 0, cost: 0, position: 'card9' },
};

export default CARD_DICTIONARY;
