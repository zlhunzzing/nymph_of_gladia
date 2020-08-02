export interface Player {
  name: string;
  hp: number;
  mp: number;
  basicCards: Array<object>;
  uniqueCards: Array<object>;
  hand: Array<Card>;
  position: Position;
}

export interface Card {
  type: string;
  speed: number;
  cost: number;
  power: number;
  range: Array<Array<number>>;
  position: string;
}

export interface Position {
  x: number;
  y: number;
}
